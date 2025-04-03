class ActionBarSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="action-bar primary-actions">
        <button class="action-button action-button--active" data-action="view">View</button>
        <button class="action-button" data-action="edit">Edit</button>
        <button class="action-button" data-action="privacy">Privacy</button>
        <button class="action-button" data-action="print">Print</button>
        <button class="action-button" data-action="share">Share</button>
      </div>
    `;

    this.buttons = this.querySelectorAll(".action-button");

    this.buttons.forEach((button) => {
      button.addEventListener("click", (event) => this.handleAction(event));
    });
  }

  handleAction(event) {
    this.buttons.forEach((btn) => btn.classList.remove("action-button--active"));
    event.target.classList.add("action-button--active");

    const action = event.target.dataset.action;
    const isEdit = action === "edit";
    const isPrivacy = action === "privacy";
    const print = action === "print";

    window.dispatchEvent(
      new CustomEvent("actionChange", { detail: { isEdit, isPrivacy, print } })
    );
  }
}

customElements.define("action-bar-section", ActionBarSection);
