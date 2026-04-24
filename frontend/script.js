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
      emailInput.setCustomValidity("Please use your corporate email address.");
      emailInput.reportValidity();
      return;
    }

    emailInput.setCustomValidity("");
    emailInput.reportValidity();

    const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `INQ-${dateCode}-${randomCode}`;
    const submissionDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const confirmationWrap = document.createElement("div");
    confirmationWrap.className = "submission-confirmation";
    confirmationWrap.setAttribute("role", "status");
    confirmationWrap.setAttribute("aria-live", "polite");
    confirmationWrap.innerHTML = `
      <span class="confirmation-watermark" aria-hidden="true">Verified</span>
      <p class="confirmation-title">Submission Confirmed</p>
      <p class="confirmation-text">
        Your request is being processed by our Investor Relations department. Expected response time: 24 hours.
      </p>
      <div class="confirmation-meta" aria-hidden="true">
        <span class="confirmation-stamp">IR Registered</span>
        <span>${submissionDate}</span>
      </div>
      <p class="confirmation-reference">Reference ID: ${referenceId}</p>
      <p class="confirmation-signature">Investor Relations Desk</p>
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
