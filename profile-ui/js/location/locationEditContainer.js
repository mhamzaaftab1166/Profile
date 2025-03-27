class LocationEditSection extends HTMLElement {
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
    const combinedLocations = [
      ...locations,
      {
        location_name: "",
        location_details: "",
        link: "",
        is_default: 1,
        is_active: 0,
      },
      {
        location_name: "",
        location_details: "",
        link: "",
        is_default: 1,
        is_active: 0,
      },
    ];
    const locationsJson = JSON.stringify(combinedLocations);

    this.innerHTML = `
    <section
      class="locedit-locations-container"
      x-data='{
        locations: ${locationsJson},
        modalOpen: false,
        currentIndex: null,
        map: null,
        marker: null,
        selectedLat: null,
        selectedLng: null,
        addLocation() {
          this.locations.push({
            location_name: "",
            location_details: "",
            link: "Enter Link Here",
            is_default: 0,
            is_active: 0
          });
        },
        toggleDefault(index) {
          this.locations[index].is_default = !this.locations[index].is_default;
        },
        openMapModal(index) {
          this.currentIndex = index;
          this.modalOpen = true;
          this.$nextTick(() => {
            if (!this.map) {
              this.map = L.map("map").setView([51.505, -0.09], 13);
              L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "Map data © OpenStreetMap contributors"
              }).addTo(this.map);
              this.map.on("click", (e) => {
                this.selectedLat = e.latlng.lat;
                this.selectedLng = e.latlng.lng;
                if (this.marker) {
                  this.marker.setLatLng(e.latlng);
                } else {
                  this.marker = L.marker(e.latlng).addTo(this.map);
                }
                this.locations[this.currentIndex].link = "https://www.openstreetmap.org/#map=18/" + this.selectedLat + "/" + this.selectedLng;
                this.closeModal();
              });
            } else {
              this.map.invalidateSize();
            }
          });
        },
        closeModal() {
          this.modalOpen = false;
          this.currentIndex = null;
          this.selectedLat = null;
          this.selectedLng = null;
          if (this.marker) {
            this.map.removeLayer(this.marker);
            this.marker = null;
          }
        },
        saveLocations() {
          locationHandler.handleLocation(JSON.stringify(this.locations, null, 2));
        }
      }'
    >
      <section class="locedit-locations-container">
        <div class="locedit-locations-card">
          <header class="locedit-locations-header">
            <h2 class="locedit-locations-title">Locations</h2>
            <div class="locedit-header-separator"></div>
          </header>
          <div class="locedit-locations-content">
            <div class="locedit-locations-grid">
              <template x-for="(location, index) in locations" :key="index">
                <article class="locedit-location-item">
                  <div class="locedit-location-header">
                    <input
                      type="text"
                      class="locedit-location-name form-control"
                      placeholder="Enter Location Name"
                      x-model="location.location_name"
                    />
                    <div
                      class="locedit-default-badge"
                      @click="toggleDefault(index)"
                      style="cursor: pointer;"
                    >
                      <span class="locedit-badge-text">Default</span>
                      <img
                        :src="location.is_default ? 'assets/profile/checked.png' : 'assets/profile/unchecked.png'"
                        class="locedit-badge-icon"
                        alt="Default icon"
                      />
                    </div>
                  </div>
                  <div class="locedit-location-separator"></div>
                  <div class="locedit-location-details">
                    <textarea
                      class="locedit-details-text form-control"
                      placeholder="Type Details Here"
                      x-model="location.location_details"
                      rows="2"
                    ></textarea>
                    <p class="locedit-view-location-label">View Location</p>
                    <div
                      class="locedit-location-link-input"
                      @click="openMapModal(index)"
                      style="cursor: pointer;"
                    >
                      <img
                        src="assets/profile/pin.png"
                        class="locedit-link-icon"
                        alt="Link icon"
                      />
                      <span
                        class="locedit-link-placeholder"
                        x-text="location.link"
                        style="display: inline-block; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                      ></span>
                    </div>
                  </div>
                </article>
              </template>
            </div>
            <div class="row mt-5" style="margin-left: 12%;">
              <div class="col-12">
                <button class="loc-add-more-button" @click="addLocation()">
                  + Add More
                </button>
              </div>
            </div>
            <div class="locedit-action-buttons">
              <button class="locedit-discard-button">Discard</button>
              <button class="locedit-save-button" @click="saveLocations()">
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
      <div
        class="modal-overlay"
        x-show="modalOpen"
        x-transition
        style="display: none;"
      >
        <div class="modal-content">
          <span class="modal-close" @click="closeModal()">×</span>
          <h4>Select a Location</h4>
          <div id="map"></div>
        </div>
      </div>
    </section>
  `;
  }
}

customElements.define("location-edit", LocationEditSection);
