class LocationSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        class="locations-container"
        x-data="{
          locations: [
            { name: 'Damac Main Office - Dubai', address: '1 Hacker Way, Menlo Park, CA 94025, Silicon Valley. P.O.BOX: 70148.', isDefault: true },
            { name: 'Sharjah Office', address: '2 Sheikh Zayed Road, Sharjah, P.O.BOX: 80214.', isDefault: false },
            { name: 'Abu Dhabi Office', address: '3 Khalifa Street, Abu Dhabi, P.O.BOX: 90231.', isDefault: false },
            { name: 'Ras Al Khaimah Office', address: '4 Al Qawasim Road, Ras Al Khaimah, P.O.BOX: 65214.', isDefault: false }
          ],
          checked: false,
          togglePrivacy() {
            console.log('Privacy checked value:', this.checked);
          },
        }"
      >
        <div class="locations-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="ms-2 mt-2 toggle-container isMissionPrivacy isLocationPrivacy">
              <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="checked.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="checked ? '1' : '0'"
                @click="checked = !checked; togglePrivacy()"
              >
                <div class="toggle-handle"></div>
              </div>
            </div>
            <h2 class="locations-title">Locations</h2>
          </div>
          <hr class="locations-divider" />
          <div class="locations-content">
            <div class="row">
              <!-- Loop through locations array -->
              <template x-for="location in locations" :key="location.name">
                <div class="col-12 col-lg-6 mb-4">
                  <article class="location-item" style="display: flex; flex-direction: column; height: 100%;">
                    <div>
                      <div class="location-header">
                        <h3 class="location-name ms-3" x-text="location.name"></h3>
                        <span class="location-badge me-4" x-show="location.isDefault">Default</span>
                      </div>
                      <hr class="location-separator" />
                      <p class="location-address" x-text="location.address"></p>
                    </div>
                    <div class="location-actions" style="margin-top: auto; display: flex; gap: 10px;">
                      <a href="#" class="location-action-button view-button">
                        <span>View Location</span>
                        <img src="assets/profile/viewLocation.png" alt="View icon" class="action-icon" />
                      </a>
                      <a href="#" class="location-action-button take-me-button">
                        <span>Take Me There</span>
                        <img src="assets/profile/takeme.png" alt="Direction icon" class="action-icon-large" />
                      </a>
                    </div>
                    <div class="ms-2 mt-2 toggle-container isMissionPrivacy isLocationPrivacy" style="display: flex; justify-content: flex-end; margin-right:20px;">
                      <div
                        class="toggle-track"
                        role="switch"
                        tabindex="0"
                        :aria-checked="checked.toString()"
                        aria-label="Privacy toggle switch"
                        :data-checked="checked ? '1' : '0'"
                        @click="checked = !checked; togglePrivacy()"
                      >
                        <div class="toggle-handle"></div>
                      </div>
                    </div>
                  </article>
                </div>
              </template>
            </div>
            <button class="browse-button">
              <span class="browse-text">Load More</span>
              <span class="separator-line"></span>
              <img src="assets/profile/rightArrow.png" class="arrow-icon" alt="Arrow" />
            </button>
          </div>
        </div>
      </section>
    `;

    const hideToggles = () => {
      this.querySelectorAll(".isLocationPrivacy").forEach((el) => {
        el.style.display = "none";
      });
    };

    hideToggles();
    const observer = new MutationObserver((mutations) => {
      hideToggles();
    });
    observer.observe(this, { childList: true, subtree: true });

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    const toggles = this.querySelectorAll(".isLocationPrivacy");
    if (isEdit) {
      toggles.forEach((el) => (el.style.display = "none"));
    } else if (isPrivacy) {
      toggles.forEach((el) => (el.style.display = "flex"));
    } else {
      toggles.forEach((el) => (el.style.display = "none"));
    }
  }
}

customElements.define("location-section", LocationSection);
