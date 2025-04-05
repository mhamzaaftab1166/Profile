class LicenseSection extends HTMLElement {
  static get observedAttributes() {
    return ["licenseData"];
  }

  constructor() {
    super();
    this.licenseData = [];
    // Store the current mode: isEdit and isPrivacy.
    this.currentMode = { isEdit: false, isPrivacy: false };
  }

  connectedCallback() {
    // Listen for new license data
    this.addEventListener("licenseDataReceived", (event) => {
      this.licenseData = event.detail;
      this.render();
    });

    // Listen for action changes from the global event.
    window.addEventListener("actionChange", (event) => {
      this.updateSection(event.detail);
    });

    // Listen for profile data saves if needed (to re-render without losing mode)
    window.addEventListener("profileDataSaved", () => {
      this.render();
    });
  }

  render() {
    console.log(this.licenseData, "License Data");
    const licensePrivacy = this.licenseData.settings || {};

    this.innerHTML = `
    <section class="license-permissions-container" x-data='{
      uploads: [{ name: "", path: null, type: "license", is_active: 0 }],
      licenses: ${JSON.stringify(this.licenseData.licenses)},
      parentChecked: ${licensePrivacy.licenses_permissions},
      checked: false,
       showAll: false,
        isEdit: ${this.currentMode.isEdit},
        isPrivacy: ${this.currentMode.isPrivacy},
      togglePrivacy(license) {  
        const newStatus = license.is_active ? 0 : 1;
        console.log("newStatus", newStatus);
        attachHandler.changeAttachmentStatus({
          id: license.id,
          payload: { is_active: newStatus }
        });
      },
      toggleLicenseSectionPrivacy() {
    const payload = { licenses_permissions: this.parentChecked };
    licenseHandler.handleLicensePrivacy(JSON.stringify(payload));
  }
    }'>
      <article class="license-permissions-card">
        <div class="d-flex justify-content-between align-items-center">
          <div class="ms-2 toggle-container isLicensePrivacy">
            <div class="toggle-track" role="switch" tabindex="0"
              :aria-checked="parentChecked.toString()"
              aria-label="Privacy toggle switch"
              :data-checked="parentChecked ? '1' : '0'"
              @click="parentChecked = !parentChecked; toggleLicenseSectionPrivacy()">
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
           <template x-for="(license, index) in (showAll ? licenses : licenses.slice(0,2))" :key="license.id">
            <div style="display: contents;">
              <div class="license-license-entry">
                <div class="license-license-info">
                  <h3 class="license-license-name" x-text="license.name"></h3>
                  <time class="license-license-date" x-text="license.created_at"></time>
                </div>
                <div class="license-action-buttons">
                  <div class="toggle-container isLicensePrivacy" x-show="isPrivacy">
                    <div class="toggle-track" role="switch" tabindex="0"
                      :aria-checked="checked.toString()"
                      aria-label="Privacy toggle switch"
                      :data-checked="license.is_active ? '1' : '0'"
                      @click="togglePrivacy(license)">
                      <div class="toggle-handle"></div>
                    </div>
                  </div>
                  <button class="isLicenseEdit license-btn license-btn-secondary" 
                  x-show="isEdit"
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

        <button class="browse-button" @click="showAll = !showAll">
          <span class="browse-text" x-text="showAll ? 'Browse Less' : 'Browse All'"></span>
          <span class="separator-line"></span>
          <img src="assets/profile/rightArrow.png" class="arrow-icon" alt="Arrow" />
        </button>
      </article>
    </section>
    `;

    // Allow a brief timeout for the DOM update, then initialize mode-specific elements.
    setTimeout(() => {
      this.licenseEdit = this.querySelectorAll(".isLicenseEdit");
      this.licensePrivacy = this.querySelectorAll(".isLicensePrivacy");

      // Hide both edit and privacy elements initially.
      this.licenseEdit.forEach((el) => (el.style.display = "none"));
      this.licensePrivacy.forEach((el) => (el.style.display = "none"));

      // Reapply the current mode settings.
      this.applyMode();
    }, 100);
  }

  updateSection({ isEdit, isPrivacy }) {
    // Update the stored mode.
    this.currentMode.isEdit = isEdit;
    this.currentMode.isPrivacy = isPrivacy;
    // Reapply mode changes.
    this.applyMode();
  }

  applyMode() {
    if (!this.licenseEdit || !this.licensePrivacy) return;
    if (this.currentMode.isEdit) {
      // Show edit elements.
      this.licenseEdit.forEach((el) => (el.style.display = "flex"));
      this.licensePrivacy.forEach((el) => (el.style.display = "none"));
      // In edit mode, show all license entries.
      this._toggleLicenseEntries(true);
    } else if (this.currentMode.isPrivacy) {
      // Show privacy elements.
      this.licenseEdit.forEach((el) => (el.style.display = "none"));
      this.licensePrivacy.forEach((el) => (el.style.display = "block"));
      // In privacy mode, show all license entries.
      this._toggleLicenseEntries(true);
    } else {
      // View mode: hide both edit and privacy elements.
      this.licenseEdit.forEach((el) => (el.style.display = "none"));
      this.licensePrivacy.forEach((el) => (el.style.display = "none"));
      // In view mode, only display license entries with is_active == 0.
      this._toggleLicenseEntries(false);
    }
  }

  _toggleLicenseEntries(showAll) {
    const entries = this.querySelectorAll(".license-license-entry");
    entries.forEach((entry) => {
      const toggleTrack = entry.querySelector(".toggle-track");
      const isActive = toggleTrack
        ? toggleTrack.getAttribute("data-checked")
        : "0";
      let divider = null;
      if (entry.parentElement) {
        divider = entry.parentElement.querySelector(".license-divider");
      }
      if (showAll || isActive === "0") {
        entry.style.display = "";
        if (divider) divider.style.display = "";
      } else {
        entry.style.display = "none";
        if (divider) divider.style.display = "none";
      }
    });
  }
}

customElements.define("license-section", LicenseSection);
