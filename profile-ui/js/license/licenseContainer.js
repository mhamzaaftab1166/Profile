class LicenseSection extends HTMLElement {
  static get observedAttributes() {
    return ["licenseData"];
  }

  constructor() {
    super();
    this.licenseData = [];
  }

  connectedCallback() {
    this.addEventListener("licenseDataReceived", (event) => {
      this.licenseData = event.detail;
      this.render();
    });
  }

  render() {
    console.log(this.licenseData, "License Data");

    this.innerHTML = `
    <section class="license-permissions-container" x-data='{
      uploads: [{ name: "", path: null, type: "license", is_active: 0 }],
      licenses: ${JSON.stringify(this.licenseData)},
      checked: false,
      togglePrivacy() { console.log("Privacy checked value:", this.checked); }
    }'>
      <article class="license-permissions-card">
        <div class="d-flex justify-content-between align-items-center">
          <div class="ms-2 toggle-container isLicensePrivacy">
            <div class="toggle-track" role="switch" tabindex="0"
              :aria-checked="checked.toString()"
              aria-label="Privacy toggle switch"
              :data-checked="checked ? '1' : '0'"
              @click="checked = !checked; togglePrivacy()">
              <div class="toggle-handle"></div>
            </div>
          </div>
          <h2 class="license-permissions-title mb-0">Licenses & Permissions</h2>
          <button class="ms-3 isLicenseEdit license-btn license-btn-download license-btn-secondary"
            style="width: 120px;"
            @click="uploads.push({ name: '', path: null, type: 'license', is_active: 0 })">
            + Add More
          </button>
        </div>
        <hr class="license-separator-line" />

        <!-- Show message if no records exist -->
        <template x-if="licenses.length === 0">
          <div style="text-align: center; padding: 1rem;">No records found</div>
        </template>

        <!-- Render license entries only if there are records -->
        <template x-if="licenses.length > 0">
          <template x-for="(license, index) in licenses" :key="license.id">
            <div style="display: contents;">
              <div class="license-license-entry">
                <div class="license-license-info">
                  <h3 class="license-license-name" x-text="license.name"></h3>
                  <time class="license-license-date" x-text="license.created_at"></time>
                </div>
                <div class="license-action-buttons">
                  <div class="toggle-container isLicensePrivacy">
                    <div class="toggle-track" role="switch" tabindex="0"
                      :aria-checked="checked.toString()"
                      aria-label="Privacy toggle switch"
                      :data-checked="checked ? '1' : '0'"
                      @click="checked = !checked; togglePrivacy()">
                      <div class="toggle-handle"></div>
                    </div>
                  </div>
                 <button class="isLicenseEdit license-btn license-btn-secondary" 
                @click="window.licenseHandler.deleteLicense(license.id)">Delete</button>
                  <button class="license-btn license-btn-secondary">View</button>
                  <button class="license-btn license-btn-download license-btn-secondary">Download</button>
                </div>
              </div>
              <hr class="license-divider" />
            </div>
          </template>
        </template>

        <!-- Upload Section for adding new licenses -->
        <template x-for="(upload, index) in uploads" :key="index">
          <div class="license-upload-section mb-3 isLicenseEdit">
            <input 
              type="text" 
              class="license-file-name-input" 
              x-model="upload.name" 
              placeholder="Type File Name Here" 
            />
            <input 
              type="file" 
              x-ref="fileInput" 
              class="d-none" 
              @change="upload.path = $event.target.files[0]" 
            />
            <div class="license-action-buttons">
              <button 
                class="license-btn license-btn-secondary" 
                @click="$refs.fileInput.click()">
                Choose File
              </button>
              <button 
                class="license-btn license-btn-secondary" 
                @click="licenseHandler.handleLicense({ name: upload.name, path: upload.path, active: upload.is_active, type: upload.type })">
                Upload
              </button>
            </div>
          </div>
        </template>

        <button class="browse-button">
          <span class="browse-text">Browse All</span>
          <span class="separator-line"></span>
          <img src="assets/profile/rightArrow.png" class="arrow-icon" alt="Arrow" />
        </button>
      </article>
    </section>
  `;

    setTimeout(() => {
      this.licenseEdit = this.querySelectorAll(".isLicenseEdit");
      this.licensePrivacy = this.querySelectorAll(".isLicensePrivacy");

      this.licenseEdit.forEach((el) => (el.style.display = "none"));
      this.licensePrivacy.forEach((el) => (el.style.display = "none"));

      window.addEventListener("actionChange", (event) =>
        this.updateSection(event.detail)
      );
    }, 100);
  }

  updateSection({ isEdit, isPrivacy }) {
    if (isEdit) {
      this.licenseEdit.forEach((button) => (button.style.display = "flex"));
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
