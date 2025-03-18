class ManagementSection extends HTMLElement {
 
  connectedCallback() {
    this.innerHTML = `
    <div class="management-card" >

    </div>
    `;
  }
}

customElements.define("management-section", ManagementSection);
