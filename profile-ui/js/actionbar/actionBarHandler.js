document.addEventListener("DOMContentLoaded", function () {
  const actionButtons = document.querySelectorAll(
    ".action-bar.primary-actions .action-button"
  );

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      actionButtons.forEach((btn) =>
        btn.classList.remove("action-button--active")
      );
      this.classList.add("action-button--active");
      console.log("Active button:", this.textContent.trim());
    });
  });
});
