const header = document.querySelector(".site-header");
const progressBar = document.querySelector("#scroll-progress-bar");
const contactForms = document.querySelectorAll(".contact-form");
const disallowedEmailDomains = ["gmail.com", "yahoo.com", "outlook.com"];
const revealElements = document.querySelectorAll(
  "main section, .philosophy-card, .contact-form, .timeline-step, .company-card"
);
const caseModal = document.querySelector("#case-modal");
const caseModalMeta = document.querySelector("#case-modal-meta");
const caseModalTitle = document.querySelector("#case-modal-title");
const caseModalBefore = document.querySelector("#case-modal-before");
const caseModalDone = document.querySelector("#case-modal-done");
const caseModalResult = document.querySelector("#case-modal-result");
const caseModalCta = document.querySelector("#case-modal-cta");
const caseModalImage = document.querySelector("#case-modal-image");
const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (mobileMenuToggle && mobileMenu) {
  const closeMobileMenu = () => {
    mobileMenu.hidden = true;
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  };

  mobileMenuToggle.addEventListener("click", () => {
    const shouldOpen = mobileMenu.hidden;
    mobileMenu.hidden = !shouldOpen;
    mobileMenuToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  });

  mobileMenu.querySelectorAll("a").forEach((menuLink) => {
    menuLink.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (mobileMenu.hidden) return;
    if (mobileMenu.contains(target) || mobileMenuToggle.contains(target)) return;
    closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      closeMobileMenu();
    }
  });
}

const onScroll = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  if (progressBar) {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
};

const buildReferenceId = () => {
  const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const randomCode = Math.floor(1000 + Math.random() * 9000);

  return `INQ-${dateCode}-${randomCode}`;
};

const createConfirmationMessage = () => {
  const submissionDate = new Date().toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const confirmationWrap = document.createElement("div");

  confirmationWrap.className = "submission-confirmation";
  confirmationWrap.setAttribute("role", "status");
  confirmationWrap.setAttribute("aria-live", "polite");
  confirmationWrap.innerHTML = `
    <span class="confirmation-watermark" aria-hidden="true">Проверено</span>
    <p class="confirmation-title">Заявка подтверждена</p>
    <p class="confirmation-text">
      Ваш запрос отправлен отделу по работе с инвесторами. Ожидаемое время ответа: 24 часа.
    </p>
    <div class="confirmation-meta" aria-hidden="true">
      <span class="confirmation-stamp">Отправлено в SMTP</span>
      <span>${submissionDate}</span>
    </div>
    <p class="confirmation-reference">Идентификатор заявки: ${buildReferenceId()}</p>
    <p class="confirmation-signature">Отдел по работе с инвесторами</p>
  `;

  return confirmationWrap;
};

const getStatusElement = (form) => {
  let statusElement = form.querySelector(".contact-form-status");

  if (statusElement) {
    return statusElement;
  }

  statusElement = document.createElement("p");
  statusElement.className = "contact-form-status";
  statusElement.hidden = true;
  statusElement.setAttribute("role", "status");
  statusElement.setAttribute("aria-live", "polite");

  const submitButton = form.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.insertAdjacentElement("beforebegin", statusElement);
  } else {
    form.append(statusElement);
  }

  return statusElement;
};

const setFormBusy = (form, isBusy) => {
  const submitButton = form.querySelector('button[type="submit"]');

  form.classList.toggle("is-submitting", isBusy);

  if (!submitButton) {
    return;
  }

  if (!submitButton.dataset.defaultText) {
    submitButton.dataset.defaultText = submitButton.textContent?.trim() || "Отправить";
  }

  submitButton.disabled = isBusy;
  submitButton.textContent = isBusy ? "Отправка..." : submitButton.dataset.defaultText;
};

const buildPayload = (form) => {
  const formData = new FormData(form);
  const name = String(formData.get("name") || formData.get("full-name") || "").trim();
  const institution = String(formData.get("institution") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const composedMessage = institution ? `${message}\n\nОрганизация: ${institution}` : message;

  return {
    name,
    email,
    message: composedMessage,
  };
};

const submitContactForm = async (form) => {
  const emailInput = form.querySelector('input[type="email"]');
  if (!emailInput) return;

  const statusElement = getStatusElement(form);
  const emailValue = emailInput.value.trim().toLowerCase();
  const emailDomain = emailValue.split("@")[1] || "";
  const isBlockedDomain = disallowedEmailDomains.includes(emailDomain);

  statusElement.hidden = true;
  statusElement.removeAttribute("data-state");

  if (isBlockedDomain) {
    emailInput.setCustomValidity("Пожалуйста, используйте корпоративный email.");
    emailInput.reportValidity();
    return;
  }

  emailInput.setCustomValidity("");
  emailInput.reportValidity();

  const payload = buildPayload(form);

  if (!payload.name || !payload.email || !payload.message) {
    statusElement.textContent = "Пожалуйста, заполните обязательные поля формы.";
    statusElement.dataset.state = "error";
    statusElement.hidden = false;
    return;
  }

  setFormBusy(form, true);

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(responseData.message || "Не удалось отправить запрос.");
    }

    setFormBusy(form, false);
    form.replaceWith(createConfirmationMessage());
  } catch (error) {
    setFormBusy(form, false);
    statusElement.textContent =
      error instanceof Error ? error.message : "Не удалось отправить запрос.";
    statusElement.dataset.state = "error";
    statusElement.hidden = false;
  }
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((anchorLink) => {
  anchorLink.addEventListener("click", (event) => {
    const targetId = anchorLink.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  });
});

contactForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitContactForm(form);
  });
});

revealElements.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (
  caseModal &&
  caseModalTitle &&
  caseModalBefore &&
  caseModalDone &&
  caseModalResult &&
  caseModalCta &&
  caseModalMeta &&
  caseModalImage
) {
  const caseOpenButtons = document.querySelectorAll("[data-case-title]");

  caseOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.dataset.caseTitle || "Кейс";
      const meta = button.dataset.caseMeta || "";
      const before = button.dataset.caseBefore || "";
      const done = button.dataset.caseDone || "";
      const result = button.dataset.caseResult || "";
      const cta = button.dataset.caseCta || "Связаться с нами";
      const image = button.dataset.caseImage || "";

      caseModalTitle.textContent = title;
      caseModalMeta.textContent = meta;
      caseModalBefore.textContent = before;
      caseModalDone.textContent = done;
      caseModalResult.textContent = result;
      caseModalCta.textContent = cta;

      if (image) {
        caseModalImage.src = image;
        caseModalImage.alt = `Иллюстрация: ${title}`;
        caseModalImage.hidden = false;
      } else {
        caseModalImage.hidden = true;
        caseModalImage.removeAttribute("src");
      }

      caseModal.showModal();
    });
  });

  caseModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.hasAttribute("data-close-case-modal") || target === caseModal) {
      caseModal.close();
    }
  });
}
