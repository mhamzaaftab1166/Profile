class ServiceSection extends HTMLElement {
  static get observedAttributes() {
    return ["services"];
  }

  constructor() {
    super();
    this.services = [];
    this.serviceFormLength = 4;
    this.serviceForm = [];
    this.isPrivacy = false;
    this.currentIndex = 0;
  }

  connectedCallback() {
    this.addEventListener("serviceDataReceived", (event) => {
      this.services = event.detail;
      console.log(this.services, "services");
      this.serviceForm = this.services.services.map((service) => ({
        id: service.id || null,
        service_image: service.service_image
          ? `https://api.servehere.com/api/storage/image?path=${service.service_image}`
          : "",
        service_name: service.service_name || "",
        service_description: service.service_description || "",
        is_active: service.is_active || 0,
      }));
      this.render();
    });

    this.addEventListener("click", (event) => {
      if (event.target.matches(".save-button")) {
        this.saveServiceChanges();
      } else if (event.target.matches(".discard-button")) {
        this.serviceForm = this.services.services.map((service) => ({
          id: service.id || null,
          service_image: service.service_image
            ? `https://api.servehere.com/api/storage/image?path=${service.service_image}`
            : "",
          service_name: service.service_name || "",
          service_description: service.service_description || "",
          is_active: service.is_active || 0,
        }));
        this.updateSection({ isEdit: false, isPrivacy: false });
        this.render();
      }
    });
  }

  updateServiceForm() {
    const nextServices = this.services.services.slice(this.currentIndex, this.currentIndex + 4);
    this.services = nextServices.map((service) => ({
      id: service.id || null,
      service_image: service.service_image
        ? `https://api.servehere.com/api/storage/image?path=${service.service_image}`
        : "",
      service_name: service.service_name || "",
      service_description: service.service_description || "",
      is_active: service.is_active || 0,
    }));
  }

  render() {
    const remainingServices = this.services.services.length - this.currentIndex;
    const loadMoreButton = remainingServices > 0 ? 
    `<button class="service-browse-button browseButton">
          <span class="service-browse-text">Load More</span>
          <span class="separator-line"></span>
          <img src="assets/profile/rightArrow.png" class="service-browse-icon" alt="Arrow" />
     </button>`
         : '';
    this.innerHTML = `
    <section
    x-data="{
    servicesSectionChecked: ${this.services?.settings?.services},
    toggleServiceSectionPrivacy() {
    const payload = { services: this.servicesSectionChecked };
    ServiceHandler.handleServicePrivacy(JSON.stringify(payload));
    console.log('Privacy checked value:', this.servicesSectionChecked);
      },
    }"
    >
      <div class="position-relative service-card">
        <div class="d-flex justify-content-between align-items-center">
          <div class="ms-2 toggle-container isServicePrivacy">
               <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="servicesSectionChecked?.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="servicesSectionChecked ? '1' : '0'"
                @click="servicesSectionChecked = !servicesSectionChecked; toggleServiceSectionPrivacy()"
              >
                <div class="toggle-handle"></div>
              </div>
          </div>
          <header class="service-head-title">Services</header>
        </div>
        <div class="service-separator"></div>

        <!-- View Mode -->
        <div class="services-wrapper isServiceView">
          <div class="services-grid">
            ${this.services.services.slice(0, 4)
              .map(
                (service, index) => `
                  <div class="${
                    this.isPrivacy
                      ? "service-card-privacy-wrapper"
                      : "service-card-wrapper"
                  }" key=${index}>
                    <div class="service-inner-card">
                      <img class="service-card-img" src="https://api.servehere.com/api/storage/image?path=${
                        service.service_image
                      }" alt="${service.service_name}" />
                      <div>
                        <h5 class="service-card-title">${
                          service.service_name
                        }</h5>
                        <div class="service-separator-line"></div>
                        <p class="service-card-description">${
                          service.service_description
                        }</p>
                      </div>
                    </div>
                    <div class="service-privacy-button isServicePrivacy">
                      <privacy-button></privacy-button>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>

        <!-- Edit Mode (Initially Hidden) -->
        <div class="services-wrapper isServiceEdit" style="display: none;">
          <div class="services-grid">
            ${this.serviceForm
              .map(
                (form, index) => `
                  <div class="service-card-wrapper" key="${index}">
                    <div class="service-inner-card">
                      <div class="position-relative">
                        <img class="service-card-img" src="${
                          form.service_image || "assets/profile/coverImage.png"
                        }" alt="services one" />
                        <div class="uploadButton">
                          <button class="add-button">Add Photo</button>
                          <input type="file" accept="image/*" style="display: none" />
                          <p class="file-upload">Choose file</p>
                        </div>
                      </div>
                      <div>
                        <input class="service-card-input-title" placeholder="Service Name Here" name="service_name" value="${
                          form.service_name
                        }" />
                        <div class="service-separator-line"></div>
                        <textarea class="service-card-input-description" name="service_description" placeholder="Type Service Description .." rows="4" cols="3">${
                          form.service_description
                        }</textarea>
                      </div>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
          <button class="service-add-button isServiceEdit" type="button" style="display: none;">+ Add More</button>
          <div class="action-button-wrapper">
            <button class="discard-button">Discard</button>
            <button class="save-button">Save</button>
          </div>
        </div>

          ${loadMoreButton}
      </div>
      </section>
    `;

    this.serviceView = this.querySelector(".isServiceView");
    this.serviceEdit = this.querySelector(".isServiceEdit");
    this.servicePrivacy = this.querySelector(".isServicePrivacy");
    this.addMoreButton = this.querySelector(".service-add-button");
    this.browseButton = this.querySelector(".service-browse-button");

    this.serviceView.style.display = "block";
    this.serviceEdit.style.display = "none";
    this.servicePrivacy.style.display = "none";
    this.addMoreButton.style.display = "none";
    this.browseButton.style.display = "flex";

    this.querySelector(".load-more-button")?.addEventListener("click", () => {
      this.currentIndex += 4;
      this.updateServiceForm();
      this.render();
    });

    this.querySelectorAll(".isServicePrivacy").forEach((element) => {
      element.style.display = "none";
    });

    this.querySelectorAll(".service-card-input-title").forEach(
      (input, index) => {
        input.addEventListener("input", (event) => {
          this.serviceForm[index].service_name = event.target.value;
        });
      }
    );

    this.querySelectorAll(".service-card-input-description").forEach(
      (textarea, index) => {
        textarea.addEventListener("input", (event) => {
          this.serviceForm[index].service_description = event.target.value;
        });
      }
    );

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );

    if (this.addMoreButton) {
      this.addMoreButton.addEventListener("click", () => {
        this.serviceForm.push({
          service_image: "",
          service_name: "",
          service_description: "",
          is_active: 0,
        });
        this.render();
      });
    }

    const uploadButtons = this.querySelectorAll(".uploadButton");
    uploadButtons.forEach((uploadButton, idx) => {
      const fileInput = uploadButton.querySelector('input[type="file"]');
      const chooseFileText = uploadButton.querySelector(".file-upload");

      chooseFileText.addEventListener("click", () => {
        fileInput.click();
      });

      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          this.serviceForm[idx].service_image = file;

          const imgElement = uploadButton.parentElement.querySelector(
            "img.service-card-img"
          );
          if (imgElement) {
            imgElement.src = URL.createObjectURL(file);
          }
        }
      });
    });
  }

  updateSection({ isEdit, isPrivacy }) {
    this.isPrivacy = isPrivacy;

    if (isEdit) {
      this.serviceView.style.display = "none";
      this.serviceEdit.style.display = "block";
      this.addMoreButton.style.display = "block";
      this.browseButton.style.display = "none";
    } else {
      this.serviceView.style.display = "block";
      this.serviceEdit.style.display = "none";
      this.addMoreButton.style.display = "none";
      this.browseButton.style.display = "flex";
    }

    this.querySelectorAll(
      ".service-card-wrapper, .service-card-privacy-wrapper"
    ).forEach((element) => {
      if (isPrivacy) {
        element.classList.remove("service-card-wrapper");
        element.classList.add("service-card-privacy-wrapper");
      } else {
        element.classList.remove("service-card-privacy-wrapper");
        element.classList.add("service-card-wrapper");
      }
    });

    this.querySelectorAll(".isServicePrivacy").forEach((element) => {
      element.style.display = isPrivacy ? "block" : "none";
    });
  }

  saveServiceChanges() {
    const formData = new FormData();

    this.serviceForm.forEach((form, index) => {
      if (form.id) {
        formData.append(`services[${index}][id]`, form.id);
      }
      formData.append(`services[${index}][service_name]`, form.service_name);
      formData.append(
        `services[${index}][service_description]`,
        form.service_description
      );
      formData.append(`services[${index}][is_active]`, form.is_active);

      if (form.service_image instanceof File) {
        formData.append(
          `services[${index}][service_image]`,
          form.service_image
        );
      } else if (form.service_image) {
        formData.append(
          `services[${index}][service_image_url]`,
          form.service_image
        );
      }
    });

    ServiceHandler.handleServices(formData);
  }
}

customElements.define("service-section", ServiceSection);
