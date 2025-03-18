class AttachmentSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="attachment-card" >

    </div>
    `;
  }
}

customElements.define("attachment-section", AttachmentSection);
