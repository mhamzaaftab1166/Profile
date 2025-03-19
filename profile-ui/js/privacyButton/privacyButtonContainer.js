class PrivacyButtonSection extends HTMLElement {
    constructor() {
      super();
      this.checked = false;
    }
  
    connectedCallback() {
      this.render();
      this.addEventListeners();
    }
  
    render() {
      this.innerHTML = `
        <div class="me-1 ms-2 toggle-container">
          <div
            class="toggle-track"
            role="switch"
            tabindex="0"
            aria-checked="${this.checked}"
            aria-label="Privacy Toggle"
            data-checked="${this.checked}"
          >
            <div class="toggle-handle"></div>
          </div>
        </div>
      `;
    }
  
    addEventListeners() {
      const toggleTrack = this.querySelector('.toggle-track');
      
      toggleTrack.addEventListener('click', this.toggle.bind(this));
      toggleTrack.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.toggle();
        }
      });
    }
  
    toggle() {
      this.checked = !this.checked;
      this.render();
    }
  }
  
  customElements.define("privacy-button", PrivacyButtonSection);
  