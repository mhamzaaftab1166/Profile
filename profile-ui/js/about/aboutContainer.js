class AboutSection extends HTMLElement {
  static get observedAttributes() {
    return ["aboutProfile"];
  }

  constructor() {
    super();
    (this.aboutData = {}),
      (this.aboutProfile = [
        {
          label: "Email",
          value: "thariq.salina@gmail.com",
          type: "email",
          privacyLabel: "email",
        },
        {
          label: "Phone Number",
          value: "+971 556975051",
          type: "tel",
          privacyLabel: "phone_number",
        },
        {
          label: "Website",
          value: "salina-limited.com",
          type: "text",
          privacyLabel: "website",
        },
        {
          label: "Gender",
          value: "Male",
          type: "select",
          option: ["Male", "Female"],
          privacyLabel: "gender",
        },
        {
          label: "Date Of Birth",
          value: "1990-01-01",
          type: "date",
          privacyLabel: "date_of_birth",
        },
        {
          label: "Nationality",
          value: "India",
          type: "select",
          option: ["India", "Pakistan", "United Arab Emirates"],
          privacyLabel: "nationality",
        },
        {
          label: "National ID Number",
          value: "1234567890",
          type: "text",
          privacyLabel: "national_id_number",
        },
        {
          label: "License Number",
          value: "LIC-987654321",
          type: "text",
          privacyLabel: "license_number",
        },
        {
          label: "Expiry Date",
          value: "2030-12-31",
          type: "date",
          privacyLabel: "expiry_date",
        },
        {
          label: "Permissions",
          value: "Full Access",
          type: "text",
          privacyLabel: "permissions",
        },
        { label: "Other", value: "N/A", type: "text", privacyLabel: "other" },
        {
          label: "Country",
          value: "United Arab Emirates",
          type: "select",
          option: ["India", "Pakistan", "United Arab Emirates"],
          privacyLabel: "country",
        },
        {
          label: "Province/State",
          value: "Dubai",
          type: "select",
          option: ["Dubai", "Ajman", "Ajman Emirate", "Sharjah", "Al Ain"],
          privacyLabel: "province_state",
        },
        {
          label: "City",
          value: "Dubai",
          type: "select",
          option: ["Dubai", "Ajman", "Sharjah", "Al Ain"],
          privacyLabel: "city",
        },
        {
          label: "Postal/Zip Code",
          value: "00000",
          type: "text",
          privacyLabel: "postal_zip_code",
        },
        {
          label: "Address",
          value: "Downtown, Dubai, UAE",
          type: "text",
          privacyLabel: "address",
        },
      ]);
  }

  connectedCallback() {
    this.addEventListener("aboutDataReceived", (event) => {
      this.aboutData = event.detail;
      this.aboutProfile.forEach((item) => {
        if (
          item.label.toLowerCase() === "email" &&
          this.aboutData.business?.email
        ) {
          item.value = this.aboutData.business?.email;
        }
        if (
          item.label.toLowerCase().includes("phone") &&
          this.aboutData.business.contact_no
        ) {
          item.value = this.aboutData.business.contact_no;
        }
        if (
          item.label.toLowerCase() === "gender" &&
          this.aboutData.business.gender
        ) {
          item.value = this.aboutData.business.gender;
        }
        if (
          item.label.toLowerCase() === "website" &&
          this.aboutData.business.website
        ) {
          item.value = this.aboutData.business.website;
        }
        if (
          item.label.toLowerCase() === "date of birth" &&
          this.aboutData.business.date_of_birth
        ) {
          item.value = this.aboutData.business.date_of_birth;
        }
        if (
          item.label.toLowerCase() === "nationality" &&
          this.aboutData.business.nationality
        ) {
          item.value = this.aboutData.business.nationality;
        }
        if (
          item.label.toLowerCase() === "national id number" &&
          this.aboutData.business.national_id_number
        ) {
          item.value = this.aboutData.business.national_id_number;
        }
        if (
          item.label.toLowerCase() === "license number" &&
          this.aboutData.business.license_number
        ) {
          item.value = this.aboutData.business.license_number;
        }
        if (
          item.label.toLowerCase() === "expiry_date" &&
          this.aboutData.business.expiry_date
        ) {
          item.value = this.aboutData.business.expiry_date;
        }
        if (
          item.label.toLowerCase() === "permissions" &&
          this.aboutData.business.permissions
        ) {
          item.value = this.aboutData.business.permissions;
        }
        if (
          item.label.toLowerCase() === "other" &&
          this.aboutData.business.other
        ) {
          item.value = this.aboutData.business.other;
        }
        if (
          item.label.toLowerCase() === "country" &&
          this.aboutData.business.country
        ) {
          item.value = this.aboutData.business.country;
        }
        if (
          item.label.toLowerCase().includes("province") &&
          this.aboutData.business.state
        ) {
          item.value = this.aboutData.business.state;
        }
        if (
          item.label.toLowerCase() === "city" &&
          this.aboutData.business.city
        ) {
          item.value = this.aboutData.business.city;
        }
        if (
          item.label.toLowerCase().includes("postal") &&
          this.aboutData.business.postal_zip_code
        ) {
          item.value = this.aboutData.business.postal_zip_code;
        }
        if (
          item.label.toLowerCase() === "address" &&
          this.aboutData.business.address
        ) {
          item.value = this.aboutData.business.address;
        }
      });
      this.render();
    });
    // Add event listener for Save button
    this.addEventListener("click", async (event) => {
      if (event.target.classList.contains("discard-button")) {
        this.render();
        return; // Stop further processing
      }

      if (event.target.classList.contains("save-button")) {
        const updatedData = {};
        const allData = {};

        const inputs = this.querySelectorAll(
          ".about-input-content, .about-select"
        );

        inputs.forEach((input) => {
          const fieldName = input.name.replace(/_/g, " ");
          const existingField = this.aboutProfile.find(
            (profileItem) => profileItem.label.toLowerCase() === fieldName
          );

          allData[input.name] = input.value;

          if (existingField && existingField.value !== input.value) {
            updatedData[input.name] = input.value;
          }
        });

        const descriptionInput = this.querySelector(".about-input-description");
        const updatedDescription = descriptionInput
          ? descriptionInput.value
          : this.aboutData.business.description;

        const payload = JSON.stringify({
          business_address: allData.address,
          business_city: allData.city,
          business_contactno: allData.phone_number,
          business_country: allData.country,
          business_description: updatedDescription,
          business_email: allData.email,
          business_latitude: this.aboutData.business.latitude,
          business_license_number: allData.license_number,
          business_longitude: this.aboutData.business.longitude,
          business_name: this.aboutData.business.name,
          business_other: allData.other,
          business_permissions: allData.permissions,
          business_postal_zip_code: allData["postal/zip_code"],
          business_state: allData["province/state"],
          business_website: allData.website,
          date_of_birth: allData.date_of_birth,
          expiry_date: allData.expiry_date,
          gender: allData.gender,
          national_id_number: allData.national_id_number,
          nationality: allData.nationality,
        });
        const businessId = this.aboutData?.business_id || 1;
        await AboutHandler.handleAbout(businessId, payload);
      }
    });

    this.render();
  }
  render() {
    const aboutDescription =
      (this.aboutData.business && this.aboutData.business.description) || "";
    this.innerHTML = `
      <section 
         x-data='{ 
         description: ${
           this.aboutData?.settings?.about
             ? JSON.stringify("No Description Found")
             : JSON.stringify(aboutDescription)
         },  
         descriptionChecked: ${this.aboutData?.settings?.about},
         fieldChecked: ${JSON.stringify(
           Object.fromEntries(
             Object.entries(this.aboutData?.settings || {}).map(
               ([key, value]) => [key, !!value]
             )
           )
         )},
         togglePrivacy(label) {
         this.fieldChecked[label] = !this.fieldChecked[label];
         const payload = { [label.toLowerCase()]: this.fieldChecked[label] };
         AboutHandler.handleAboutPrivacy(JSON.stringify(payload));
         },

         toggleDescriptionPrivacy() {
         const payload = {about: this.descriptionChecked};
         AboutHandler.handleAboutPrivacy(JSON.stringify(payload));
         } 
        }'>
      <div class="about-card">
        <header class="about-card-title">About Profile</header>
        <div class="about-separator"></div>
        <div class="isAboutEdit">
          <div class="about-container">
            <textarea 
               class="about-input-description" 
               name="description" 
               placeholder="Enter Your Description" 
               rows="2" 
               cols="3" 
               x-text="description">
               </textarea>
            <div class="separator-full-line"></div>
            <div class="about-form-container">
              ${this.aboutProfile
                .map((detail) => this.renderInputField(detail))
                .join("")}
            </div>
          </div>
          <div class="action-button-wrapper">
            <button class="discard-button">Discard</button>
            <button class="save-button">Save</button>
          </div>
        </div>
        <div class="about-container isAboutView">
        <div class="about-inner-wrapper-privacy">
        <div class="ms-2 toggle-container isAboutPrivacy">
        <div
        class="toggle-track"
        role="switch"
        tabindex="0"
        :aria-checked="descriptionChecked ? '1' : '0'"
        aria-label="Privacy toggle switch"
        :data-checked="descriptionChecked ? '1' : '0'"
        @click="descriptionChecked = !descriptionChecked; toggleDescriptionPrivacy()"
        >
        <div class="toggle-handle"></div>
          </div>
            </div>
          <label class="about-label col-5 isAboutPrivacy">About</label>
          </div>
          <p class="about-description" x-text="description"></p>
          <div class="separator-full-line"></div>
          <div class="about-form-container">
            ${this.aboutProfile
              .map(
                (detail) => `
              <div class="${
                this.isPrivacy
                  ? "about-inner-wrapper-privacy"
                  : "about-inner-wrapper"
              }">
            <div class="ms-2 toggle-container isAboutPrivacy">
              <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="fieldChecked['${
                  detail.privacyLabel
                }'] ? '1' : '0'"
                :data-checked="fieldChecked['${
                  detail.privacyLabel
                }'] ? '1' : '0'"
                @click="togglePrivacy('${detail.privacyLabel}')"
              >
              <div class="toggle-handle"></div>
            </div>
            </div>
               <label class="about-label col-5">${detail.label}</label>
               <p class="about-content col-10">${
                 this.isPrivacy !== true &&
                 this.aboutData?.settings[detail?.privacyLabel]
                   ? "Not Provided"
                   : detail.value
               }</p>
          
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
      </section>
    `;

    this.aboutView = this.querySelector(".isAboutView");
    this.aboutEdit = this.querySelector(".isAboutEdit");
    this.aboutView.style.display = "block";
    this.aboutEdit.style.display = "none";
    this.isPrivacy = false;

    this.querySelectorAll(".isAboutPrivacy").forEach((element) => {
      element.style.display = "none";
    });

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  renderInputField(detail) {
    switch (detail.type) {
      case "select":
        return `
          <div class="about-inner-wrapper">
            <label class="about-label col-5">${detail.label}</label>
            <div class="about-select-wrapper select-width">
              <select name="${detail.label
                .toLowerCase()
                .replace(
                  /\s+/g,
                  "_"
                )}" class="about-input-content about-select col-12">
                <option value="" disabled ${
                  !detail.value ? "selected" : ""
                }>Select</option>
                ${detail.option
                  ?.map(
                    (option) => `
                  <option value="${option}" ${
                      option === detail.value ? "selected" : ""
                    }>${option}</option>
                `
                  )
                  .join("")}
              </select>
              <img src="assets/icons/arrow-down-blue.png" alt="arrow" class="dropdown-arrow" />
            </div>
          </div>
        `;
      case "date":
        return `
          <div class="about-inner-wrapper">
            <label class="about-label col-5">${detail.label}</label>
            <input name="${detail.label
              .toLowerCase()
              .replace(
                /\s+/g,
                "_"
              )}" class="about-input-content col-4 hide-date-icon" type="date" value="${
          detail.value
        }" />
          </div>
        `;
      default:
        return `
          <div class="about-inner-wrapper">
            <label class="about-label col-5">${detail.label}</label>
            <input name="${detail.label
              .toLowerCase()
              .replace(/\s+/g, "_")}" class="about-input-content col-9" type="${
          detail.type
        }" value="${detail.value}" placeholder="Enter" />
          </div>
        `;
    }
  }

  updateSection({ isEdit, isPrivacy }) {
    this.isPrivacy = isPrivacy;

    if (isEdit) {
      this.aboutView.style.display = "none";
      this.aboutEdit.style.display = "block";
    } else if (isPrivacy) {
      this.aboutView.style.display = "block";
      this.aboutEdit.style.display = "none";
    } else {
      this.aboutView.style.display = "block";
      this.aboutEdit.style.display = "none";
    }
    this.querySelectorAll(
      ".about-inner-wrapper, .about-inner-wrapper-privacy"
    ).forEach((element) => {
      if (isPrivacy) {
        element.classList.remove("about-inner-wrapper");
        element.classList.add("about-inner-wrapper-privacy");
      } else {
        element.classList.remove("about-inner-wrapper-privacy");
        element.classList.add("about-inner-wrapper");
      }
    });

    this.querySelectorAll(".isAboutPrivacy").forEach((element) => {
      element.style.display = isPrivacy ? "block" : "none";
    });
  }
}

customElements.define("about-section", AboutSection);
