(function () {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const fields = Array.from(form.querySelectorAll("input, select, textarea"));
  const message = form.querySelector(".form-message");

  const setError = (field, text) => {
    const wrapper = field.closest(".form-row") || field.parentElement;
    const small = wrapper ? wrapper.querySelector("small") : null;
    field.setAttribute("aria-invalid", text ? "true" : "false");
    if (small) small.textContent = text;
  };

  const validateField = (field) => {
    const value = field.value.trim();
    let error = "";

    if (field.hasAttribute("required") && !value) {
      error = "This field is required.";
    } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Enter a valid email address.";
    } else if (field.name === "message" && value && value.length < 12) {
      error = "Please add a little more detail.";
    }

    setError(field, error);
    return !error;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    message.textContent = "Thanks. Your enquiry has been received and we will reply within 24 hours.";
    message.classList.add("show");
    form.reset();
    fields.forEach((field) => setError(field, ""));
  });
})();
