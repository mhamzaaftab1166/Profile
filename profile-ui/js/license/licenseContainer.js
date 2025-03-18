class LicenseSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<section class="license-permissions-container" x-data="{ uploads: [{ title: '', file: null }] }">
      <article class="license-permissions-card">
        <div class="d-flex justify-content-between align-items-center gap-3">
          <h2 class="license-permissions-title mb-0">Licenses & Permissions</h2>
          <button class="license-btn btn btn-secondary" style="width: 120px;" @click="uploads.push({ title: '', file: null })">+ Add More</button>
        </div>
        <hr class="license-separator-line" />

        <div class="license-license-entry">
          <div class="license-license-info">
            <h3 class="license-license-name">Simon Junior License</h3>
            <time class="license-license-date">12 April at 09.28 PM</time>
          </div>
          <div class="license-action-buttons">
            <button class="license-btn license-btn-secondary">Delete</button>
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
      </article>
    </section>
    `;
  }
}

customElements.define("license-section", LicenseSection);
