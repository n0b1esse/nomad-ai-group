const header = document.querySelector(".site-header");
const progressBar = document.querySelector("#scroll-progress-bar");
const contactForm = document.querySelector(".contact-form");
const disallowedEmailDomains = ["gmail.com", "yahoo.com", "outlook.com"];
const revealElements = document.querySelectorAll(
  "main section, .philosophy-card, .portfolio-logo, .contact-form, .timeline-step, .company-card, .team-card"
);
const filterButtons = document.querySelectorAll("[data-filter]");
const portfolioCards = document.querySelectorAll("[data-sector]");
const bioModal = document.querySelector("#bio-modal");
const bioModalBody = document.querySelector("#bio-modal-body");
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

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = contactForm.querySelector('input[type="email"]');
    if (!emailInput) return;

    const emailValue = emailInput.value.trim().toLowerCase();
    const emailDomain = emailValue.split("@")[1] || "";
    const isBlockedDomain = disallowedEmailDomains.includes(emailDomain);

    if (isBlockedDomain) {
      emailInput.setCustomValidity("Пожалуйста, используйте корпоративный email.");
      emailInput.reportValidity();
      return;
    }

    emailInput.setCustomValidity("");
    emailInput.reportValidity();

    const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `INQ-${dateCode}-${randomCode}`;
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
        Ваш запрос обрабатывается отделом по работе с инвесторами. Ожидаемое время ответа: 24 часа.
      </p>
      <div class="confirmation-meta" aria-hidden="true">
        <span class="confirmation-stamp">Зарегистрировано IR</span>
        <span>${submissionDate}</span>
      </div>
      <p class="confirmation-reference">Идентификатор заявки: ${referenceId}</p>
      <p class="confirmation-signature">Отдел по работе с инвесторами</p>
    `;

    contactForm.replaceWith(confirmationWrap);
  });
}

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

if (filterButtons.length && portfolioCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "all";

      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      portfolioCards.forEach((card) => {
        const sector = card.dataset.sector || "";
        const shouldShow = selectedFilter === "all" || sector === selectedFilter;
        card.hidden = !shouldShow;
      });
    });
  });
}

if (bioModal && bioModalBody) {
  const openBioButtons = document.querySelectorAll("[data-bio]");

  openBioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bioModalBody.textContent = button.dataset.bio || "";
      bioModal.showModal();
    });
  });

  bioModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.hasAttribute("data-close-modal") || target === bioModal) {
      bioModal.close();
    }
  });
}

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
