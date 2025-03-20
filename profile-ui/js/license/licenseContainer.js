class LicenseSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="license-permissions-container" x-data="{ uploads: [{ title: '', file: null }] }">
      <article class="license-permissions-card">
        <div class="d-flex justify-content-between align-items-center">
          <privacy-button class="isLicensePrivacy"></privacy-button>
          <h2 class="license-permissions-title mb-0">Licenses & Permissions</h2>
          <button class="ms-3 isLicenseEdit license-btn license-btn-download license-btn-secondary" style="width: 120px;" @click="uploads.push({ title: '', file: null })">+ Add More</button>
        </div>
        <hr class="license-separator-line" />

        <div class="license-license-entry">
          <div class="license-license-info">
            <h3 class="license-license-name">Simon Junior License</h3>
            <time class="license-license-date">12 April at 09.28 PM</time>
          </div>
          <div class="license-action-buttons">
             <privacy-button class="isLicensePrivacy"></privacy-button>
            <button class="isLicenseEdit license-btn license-btn-secondary">Delete</button>
            <button class="license-btn license-btn-secondary">View</button>
            <button class="license-btn license-btn-download license-btn-secondary">Download</button>
          </div>
        </div>

        <hr class="license-divider" />
        <template x-for="(upload, index) in uploads" :key="index">
          <div class="license-upload-section mb-3">
            <input 
              type="text" 
              class="license-file-name-input" 
              x-model="upload.title" 
              placeholder="Type File Name Here" 
            />
            <input 
              type="file" 
              x-ref="fileInput" 
              class="d-none" 
              @change="upload.file = $event.target.files[0]" 
            />

            <div class="license-action-buttons">
              <button 
                class="license-btn license-btn-secondary" 
                @click="$refs.fileInput.click()">Choose File</button>
              <button 
                class="license-btn license-btn-secondary" 
                @click="console.log({ title: upload.title, file: upload.file })">
                Upload
              </button>
            </div>
          </div>
        </template>
        <button class="browse-button">
            <span class="browse-text">Browse All</span>
            <span class="separator-line"></span>
            <img
                src="assets/profile/rightArrow.png"
                class="arrow-icon"
                alt="Arrow"
            />
            </button>
      </article>
    </section>
    `;

    this.licenseEdit = this.querySelectorAll(".isLicenseEdit");
    this.licensePrivacy = this.querySelectorAll(".isLicensePrivacy");

    // Hide all elements initially
    this.licenseEdit.forEach((button) => (button.style.display = "none"));
    this.licensePrivacy.forEach((button) => (button.style.display = "none"));

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    if (isEdit) {
      this.licenseEdit.forEach((button) => (button.style.display = "block"));
      this.licensePrivacy.forEach((button) => (button.style.display = "none"));
    } else if (isPrivacy) {
      this.licenseEdit.forEach((button) => (button.style.display = "none"));
      this.licensePrivacy.forEach((button) => (button.style.display = "block"));
    } else {
      this.licenseEdit.forEach((button) => (button.style.display = "none"));
      this.licensePrivacy.forEach((button) => (button.style.display = "none"));
    }
  }
}

customElements.define("license-section", LicenseSection);
