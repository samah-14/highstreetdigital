(function () {
  if (window.AOS) {
    AOS.init({
      duration: 720,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }

  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = Number(counter.getAttribute("data-counter"));
    const duration = 1300;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => observer.observe(counter));
})();
