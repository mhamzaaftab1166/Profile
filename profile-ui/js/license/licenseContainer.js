class LicenseSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="license-card" >

    </div>
    `;
  }
}

customElements.define("license-section", LicenseSection);
