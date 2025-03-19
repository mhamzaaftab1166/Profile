class ButtonUploadSection extends HTMLElement {
    connectedCallback() {
      const buttonName = this.getAttribute("buttonName") || "Add";
  
      this.innerHTML = `
          <div class="uploadButton isCoverEdit">
                <button class="add-button">${buttonName}</button>
                <input type="file" accept="image/*" style="display: none" />
                <p class="file-upload">Choose file</p>
              </div>
      `;
    }
  }
  
  customElements.define("button-upload", ButtonUploadSection);
  