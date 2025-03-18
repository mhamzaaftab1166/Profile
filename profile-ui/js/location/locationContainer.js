class LocationSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="location-card" >

    </div>
    `;
  }
}

customElements.define("location-section", LocationSection);
