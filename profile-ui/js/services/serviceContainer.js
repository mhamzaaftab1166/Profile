class ServiceSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="service-card" >

    </div>
    `;
  }
}

customElements.define("service-section", ServiceSection);
