class LocationSection extends HTMLElement {
  static get observedAttributes() {
    return ["locationData"];
  }

  constructor() {
    super();
    this.locationData = {};
    this.currentMode = { isEdit: false, isPrivacy: false };
  }

  connectedCallback() {
    this.addEventListener("locationDataReceived", (event) => {
      this.locationData = event.detail;
      this.render();
    });

    window.addEventListener("actionChange", (event) => {
      this.updateSection(event.detail);
    });

    window.addEventListener("profileDataSaved", () => {
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
      showAll: false,
        isEdit: ${this.currentMode.isEdit},
        isPrivacy: ${this.currentMode.isPrivacy},
      togglePrivacy(location) {
        const newStatus = location.is_active ? 0 : 1;
        console.log("Toggled:", newStatus);
        locationHandler.changeLocationStatus({
          id: location.id,
          payload: { is_active: newStatus }
        });
      }
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
             <template x-for="(location, index) in (showAll ? locations : locations.slice(0,2))" :key="location.id">
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
                 <div 
  class="ms-2 mt-2 toggle-container isMissionPrivacy isLocationPrivacy" 
  x-show="isPrivacy" 
  style="display: flex; justify-content: flex-end; margin-right:20px;"
>

                    <div
                      class="toggle-track"
                      role="switch"
                      tabindex="0"
                      aria-label="Privacy toggle switch"
                      :aria-checked="location.is_active.toString()"
                      :data-checked="location.is_active ? '1' : '0'"
                      @click="togglePrivacy(location)"
                    
                    >
                      <div class="toggle-handle"></div>
                    </div>
                  </div>
                </article>
              </div>
            </template>
          </div>
          <button class="browse-button" @click="showAll = !showAll">
            <span class="browse-text" x-text="showAll ? 'Load Less' : 'Load More'"></span>
            <span class="separator-line"></span>
            <img src="assets/profile/rightArrow.png" class="arrow-icon" alt="Arrow" />
          </button>
        </div>
      </div>
    </section>
  `;

    setTimeout(() => {
      this.toggleSwitches = this.querySelectorAll(".isLocationPrivacy");

      if (this.currentMode.isEdit) {
        this.toggleSwitches.forEach((el) => (el.style.display = "none"));
        this._toggleLocationEntries(true);
      } else if (this.currentMode.isPrivacy) {
        this.toggleSwitches.forEach((el) => (el.style.display = "flex"));
        this._toggleLocationEntries(true);
      } else {
        this.toggleSwitches.forEach((el) => (el.style.display = "none"));
        this._toggleLocationEntries(false);
      }
    }, 0);
  }

  updateSection({ isEdit, isPrivacy }) {
    this.currentMode.isEdit = isEdit;
    this.currentMode.isPrivacy = isPrivacy;

    if (isEdit) {
      this.toggleSwitches.forEach((el) => (el.style.display = "none"));
      this._toggleLocationEntries(true);
    } else if (isPrivacy) {
      this.toggleSwitches.forEach((el) => (el.style.display = "flex"));
      this._toggleLocationEntries(true);
    } else {
      this.toggleSwitches.forEach((el) => (el.style.display = "none"));
      this._toggleLocationEntries(false);
    }
    this.render(); 
  }

  _toggleLocationEntries(showAll) {
    // Instead of targeting the location-item directly,
    // hide the parent container to remove any empty space.
    const cardContainers = this.querySelectorAll(".col-12.col-lg-6.mb-4");
    cardContainers.forEach((container) => {
      const card = container.querySelector(".location-item");
      const toggle = card ? card.querySelector(".toggle-track") : null;
      const isActive = toggle ? toggle.getAttribute("data-checked") : "0";
      if (showAll || isActive === "0") {
        container.style.display = "";
      } else {
        container.style.display = "none";
      }
    });
  }
}

customElements.define("location-section", LocationSection);
