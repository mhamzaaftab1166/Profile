class AboutSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="about-card" >

    </div>
    `;
  }
}

customElements.define("about-section", AboutSection);
