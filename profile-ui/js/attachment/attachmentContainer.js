class AttachmentSection extends HTMLElement {
  static get observedAttributes() {
    return ["attachmentData"];
  }

  constructor() {
    super();
    this.attachmentData = [];
    // Store current mode state
    this.currentMode = { isEdit: false, isPrivacy: false };
  }

  connectedCallback() {
    // Listen for new data
    this.addEventListener("attachmentDataReceived", (event) => {
      this.attachmentData = event.detail;
      console.log(this.attachmentData, 'this.attachmentData');
      
      this.render();
    });

    // Listen for mode changes from actionChange events
    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );

    // If profile data is saved, re-render without losing mode state
    window.addEventListener("profileDataSaved", () => {
      this.render();
    });
  }

  render() {
    const safeData = Array.isArray(this.attachmentData.attachments)
      ? this.attachmentData.attachments.map((item) => ({
          id: item.id,
          name: item.name,
          path: item.path,
          type: item.type,
          is_active: item.is_active,
          created_at: item.created_at,
        }))
      : [];
    const attachmentsPrivacy = this.attachmentData.settings || {};
    console.log(safeData, "Safe Attachment Data");
    console.log(attachmentsPrivacy, 'attachmentsPrivacy');
    
    

    // Render each attachment entry and its divider
    this.innerHTML = `
    <section class="license-permissions-container" x-data='{
      uploads: [{ name: "", path: null, type: "document", is_active: 0 }],
      licenses: ${JSON.stringify(safeData)},
      parentChecked: ${attachmentsPrivacy.attachments},
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
         toggleAttachmentsSectionPrivacy() {
    const payload = { attachments: this.parentChecked };
    attachHandler.handleAttachementsPrivacy(JSON.stringify(payload));
  }
    }'>
      <article class="license-permissions-card">
        <div class="d-flex justify-content-between align-items-center">
          <div class="ms-2 toggle-container isLicensePrivacy">
            <div class="toggle-track" role="switch" tabindex="0"
              :aria-checked="parentChecked.toString()"
              aria-label="Privacy toggle switch"
              :data-checked="parentChecked ? '1' : '0'"
              @click="parentChecked = !parentChecked; toggleAttachmentsSectionPrivacy()">
              <div class="toggle-handle"></div>
            </div>
          </div>
          <h2 class="license-permissions-title mb-0">Attachments</h2>
          <button class="ms-3 isLicenseEdit license-btn license-btn-download license-btn-secondary"
            style="width: 120px;"
            @click="uploads.push({ name: '', path: null, type: 'document', is_active: 0 })">
            + Add More
          </button>
        </div>
        <hr class="license-separator-line" />
        
        <!-- If there are no records, display message -->
        <template x-if="licenses.length === 0">
          <div class="no-records-message" style="text-align: center; padding: 1rem;">No records found</div>
        </template>
        
        <!-- Render attachment entries along with a divider -->
        <template x-if="licenses.length > 0">
          <template x-for="(license, index) in (showAll ? licenses : licenses.slice(0,2))" :key="license.id">
            <div style="display: contents;">
              <!-- Add data-active attribute to each entry -->
              <div class="license-license-entry" x-bind:data-active="license.is_active">
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

        <!-- Upload Section for adding new attachments -->
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
                @click="attachHandler.handleAttach({ name: upload.name, path: upload.path, active: upload.is_active, type: upload.type })">
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

    // Wait for the DOM update, then reapply the mode.
    setTimeout(() => {
      this.licenseEdit = this.querySelectorAll(".isLicenseEdit");
      this.licensePrivacy = this.querySelectorAll(".isLicensePrivacy");

      // Initially hide both edit and privacy elements.
      this.licenseEdit.forEach((el) => (el.style.display = "none"));
      this.licensePrivacy.forEach((el) => (el.style.display = "none"));

      // Apply the saved mode (and filter entries accordingly).
      this.applyMode();
    }, 100);
  }

  updateSection({ isEdit, isPrivacy }) {
    // Update the stored mode state.
    this.currentMode.isEdit = isEdit;
    this.currentMode.isPrivacy = isPrivacy;
    this.applyMode();
  }

  applyMode() {
    if (!this.licenseEdit || !this.licensePrivacy) return;

    if (this.currentMode.isEdit) {
      // Edit mode: show edit buttons; display all entries.
      this.licenseEdit.forEach((el) => (el.style.display = "flex"));
      this.licensePrivacy.forEach((el) => (el.style.display = "none"));
      this._toggleAttachmentEntries(true);
    } else if (this.currentMode.isPrivacy) {
      // Privacy mode: show privacy buttons; display all entries.
      this.licenseEdit.forEach((el) => (el.style.display = "none"));
      this.licensePrivacy.forEach((el) => (el.style.display = "block"));
      this._toggleAttachmentEntries(true);
    } else {
      // View mode: hide both edit and privacy elements.
      this.licenseEdit.forEach((el) => (el.style.display = "none"));
      this.licensePrivacy.forEach((el) => (el.style.display = "none"));
      // In view mode, only display entries with is_active == 0.
      this._toggleAttachmentEntries(false);
    }
  }

  _toggleAttachmentEntries(showAll) {
    // Get all attachment entries.
    const entries = this.querySelectorAll(".license-license-entry");
    entries.forEach((entry) => {
      const active = entry.getAttribute("data-active");
      // The divider is assumed to be the immediate sibling with the class "license-divider".
      const divider =
        entry.nextElementSibling &&
        entry.nextElementSibling.classList.contains("license-divider")
          ? entry.nextElementSibling
          : null;
      if (showAll || active === "0") {
        entry.style.display = "";
        if (divider) divider.style.display = "";
      } else {
        // Hide both the entry and its divider if is_active is 1 in view mode.
        entry.style.display = "none";
        if (divider) divider.style.display = "none";
      }
    });
  }
}

customElements.define("attachment-section", AttachmentSection);
