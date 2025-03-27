class LocationSection extends HTMLElement {
  static get observedAttributes() {
    return ["locationData"];
  }

  constructor() {
    super();
    this.locationData = {};
  }

  connectedCallback() {
    this.addEventListener("locationDataReceived", (event) => {
      this.locationData = event.detail;
      console.log(this.locationData);

      this.render();
    });
  }

  render() {
    const locations = this.locationData || [];
    const locationsJson = JSON.stringify(locations);
    this.innerHTML = `
    <section class="locations-container" x-data='{ 
      locations: ${locationsJson}, 
      checked: false, 
      togglePrivacy(){ console.log("Privacy checked value:", this.checked) } 
    }'>
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
            <template x-for="location in locations" :key="location.location_name">
              <div class="col-12 col-lg-6 mb-4">
                <article class="location-item" style="display: flex; flex-direction: column; height: 100%;">
                  <div>
                    <div class="location-header">
                      <h3 class="location-name ms-3" x-text="location.location_name"></h3>
                      <span class="location-badge me-4" x-show="location.is_default">Default</span>
                    </div>
                    <hr class="location-separator" />
                    <p class="location-address" x-text="location.location_details"></p>
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

    // Optional: Hide toggles and add a MutationObserver, as in your original code.
    const hideToggles = () => {
      this.querySelectorAll(".isLocationPrivacy").forEach((el) => {
        el.style.display = "none";
      });
    };

    hideToggles();
    const observer = new MutationObserver(() => hideToggles());
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
