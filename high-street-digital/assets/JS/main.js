(function () {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const backToTop = document.querySelector("[data-back-to-top]");
  const progress = document.querySelector(".scroll-progress");
  const loader = document.querySelector(".page-loader");

  const storedTheme = localStorage.getItem("hsd-theme");
  if (storedTheme) {
    root.setAttribute("data-theme", storedTheme);
  }

  const setThemeIcon = () => {
    if (!themeToggle) return;
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  };

  setThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (nextTheme === "light") {
        root.removeAttribute("data-theme");
        localStorage.setItem("hsd-theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("hsd-theme", "dark");
      }
      setThemeIcon();
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  const updateChrome = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("scrolled", scrollTop > 8);
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 520);
    if (progress) progress.style.width = height > 0 ? `${(scrollTop / height) * 100}%` : "0%";
  };

  window.addEventListener("scroll", updateChrome, { passive: true });
  updateChrome();

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  document.querySelectorAll("[data-accordion] article button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest("article");
      const group = button.closest("[data-accordion]");
      group.querySelectorAll("article").forEach((article) => {
        if (article !== item) article.classList.remove("open");
      });
      item.classList.toggle("open");
    });
  });

  document.querySelectorAll("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      if (input && input.checkValidity()) {
        input.value = "";
        input.placeholder = "Thanks for subscribing";
      }
    });
  });

  window.addEventListener("load", () => {
    if (loader) loader.classList.add("hide");
  });
})();
