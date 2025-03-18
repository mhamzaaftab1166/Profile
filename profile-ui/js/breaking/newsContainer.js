class BreakingSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
   <div class="breaking-card" >

    </div>
    `;
  }
}

customElements.define("breaking-section", BreakingSection);
