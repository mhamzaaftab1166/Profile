class ManagementSection extends HTMLElement {
  static get observedAttributes() {
    return ["managementData"];
  }

  constructor() {
    super();
    this.managementData = [];
    // Explicitly store the current mode state to persist privacy mode.
    this.currentMode = { isEdit: false, isPrivacy: false };
  }

  connectedCallback() {
    this.addEventListener("managementDataReceived", (event) => {
      this.managementData = event.detail;
      this.render();
    });

    // Listen for profile data saved event.
    window.addEventListener("profileDataSaved", () => {
      this.render();
      // Ensure privacy mode remains after profile data is saved.
      if (this.currentMode.isPrivacy) {
        this.updateSection({ isEdit: false, isPrivacy: true });
      }
    });

    window.addEventListener("actionChange", (event) => {
      this.updateSection(event.detail);
    });
  }

  render() {
    const baseUrl = "https://api.servehere.com/api/storage/image?path=";
    // Transform the management data so that profile_image is a complete URL
    const transformedManagements = this.managementData.map((item) => ({
      ...item,
      profile_image: `${baseUrl}${item.profile_image}`,
    }));

    // Create a combined list by adding empty objects at the end for new entries
    const combinedMngList = [
      ...transformedManagements,
      {
        name: "",
        role_name: "",
        phone_number: "",
        profile_image: null,
        is_active: 0,
      },
      {
        name: "",
        role_name: "",
        phone_number: "",
        profile_image: null,
        is_active: 0,
      },
    ];

    // Convert arrays to JSON strings
    const contactsJSON = JSON.stringify(combinedMngList);
    const viewOnlyContactsJSON = JSON.stringify(transformedManagements);

    // Include a new privacyMode property in Alpine's data.
    this.innerHTML = `
    <section
      class="aamanagement-card"
      x-data='{
        contacts: ${contactsJSON},
        viewOnlyContacts: ${viewOnlyContactsJSON},
        privacyMode: ${this.currentMode.isPrivacy},
        updateImage(event, index) {
          const file = event.target.files[0];
          if (file) {
            this.contacts[index].profile_image = file;
          }
        },
        saveContacts() {
          managementHandler.handleManagement(this.contacts.map((contact) => ({
            id: contact.id ? contact.id : null,
            name: contact.name,
            role_name: contact.role_name,
            phone_number: contact.phone_number,
            profile_image: contact.profile_image ? contact.profile_image : null,
            is_active: contact.is_active
          })));
        },
        discardContacts() {
          this.contacts = ${contactsJSON};
        },
        togglePrivacy(contact) {
          const newStatus = contact.is_active ? 0 : 1;
          console.log("Toggled:", newStatus);
          managementHandler.changemanagementStatus({
            id: contact.id,
            payload: { is_active: newStatus }
          });
        }
      }'
    >
      <div>
        <div style="position: relative;">
          <h2 class="aalicense-permissions-title mb-0">Managements</h2>
          <div
            style="width: 50%; height: 1px; margin-left: 0; background-color: #EFEFEF; margin-top: 15px; margin-bottom: 10px;"
          ></div>
        </div>
        
        <!-- Edit Mode -->
        <div class="aacard-content isManagementEdit">
          <div class="aamain-layout" style="position: relative;">
            <div class="aamanagement-section">
              <div class="aamanagement-layout row">
                <template x-for="(contact, index) in contacts" :key="index">
                  <div class="aasecondary-contacts-column col-md-6">
                    <div class="aasecondary-contact" style="position: relative;">
                      <img
                        :src="contact.profile_image ? (typeof contact.profile_image === 'string' ? contact.profile_image : URL.createObjectURL(contact.profile_image)) : 'assets/profile/managplace.png'"
                        class="aaprofile-image"
                        alt="Profile Image"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        :x-ref="'fileInput' + index"
                        @change="updateImage($event, index)"
                        style="display: none;"
                      />
                      <img
                        src="assets/profile/chooseButton.png"
                        alt="Choose Button"
                        @click="$refs['fileInput' + index].click()"
                        style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); width: 85px; height: 40px; cursor: pointer;"
                      />
                      <input type="text" x-model="contact.name" placeholder="Enter Name" class="aacontact-name" />
                      <input type="text" x-model="contact.role_name" placeholder="Enter Role" class="aacontact-phone" />
                      <input type="tel" x-model="contact.phone_number" placeholder="Enter Number" class="aacontact-phone" />
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <button class="aaadd-more-button" @click="contacts.push({ name: '', role_name: '', phone_number: '', profile_image: null, is_active: 0 })">
              + Add More
            </button>
          </div>
        </div>
        <div class="aacard-actions isActionEdit">
          <button class="aadiscard-button" @click="discardContacts()">Discard</button>
          <button class="aasave-button" @click="saveContacts()">Save</button>
        </div>
        <!-- View Only Mode -->
        <div class="aacard-content isViewOnly pb-3">
          <div class="aamain-layout">
            <div class="aamanagement-section row">
              <template x-for="contact in (privacyMode ? viewOnlyContacts : viewOnlyContacts.filter(contact => contact.is_active == 0))" :key="contact.name">
                <div class="aasecondary-contact-column col-md-4">
                  <div class="aasecondary-contact text-center" style="position: relative;">
                    <img
                      :src="contact.profile_image ? contact.profile_image : 'assets/profile/managplace.png'"
                      class="aaprofile-image"
                      alt="Profile Image"
                    />
                    <p style="color: black; margin-top: 11px; font-size: 17px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 600; margin-bottom: 0;" x-text="contact.name"></p>
                    <p style="font-size: 10px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 400;  margin-bottom: 0; color: black;" x-text="contact.role_name"></p>
                    <p style="font-size: 10px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 400; margin-bottom: 0; color: black;" x-text="contact.phone_number"></p>
                    <!-- Privacy toggle: displayed only in privacy mode -->
                    <div
                      class="isManagementPrivacy toggle-track"
                      role="switch"
                      tabindex="0"
                      x-show="privacyMode"
                      :aria-checked="contact.is_active.toString()"
                      :data-checked="contact.is_active ? '1' : '0'"
                      @click="togglePrivacy(contact)"
                      aria-label="Privacy toggle switch"
                      style="position: absolute; bottom: 0px; right: 10px;"
                    >
                      <div class="toggle-handle"></div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;

    // Set default display.
    this.managementEdits = this.querySelectorAll(".isManagementEdit");
    this.managementPrivacies = this.querySelectorAll(".isManagementPrivacy");
    this.viewOnlyTexts = this.querySelectorAll(".isViewOnly");
    this.ActionEdit = this.querySelectorAll(".isActionEdit");

    // Update visibility based on mode.
    this.updateSection(this.currentMode);
  }

  updateSection({ isEdit, isPrivacy }) {
    this.currentMode = { isEdit, isPrivacy };

    // Reapply Alpine's privacyMode property.
    const cardElement = this.querySelector(".aamanagement-card");
    if (cardElement && cardElement.__x && cardElement.__x.$data) {
      cardElement.__x.$data.privacyMode = isPrivacy;
    }

    if (isEdit) {
      this.managementEdits.forEach((el) => (el.style.display = "block"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "none"));
      this.managementPrivacies.forEach((el) => (el.style.display = "none"));
      this.ActionEdit.forEach((el) => {
        el.style.display = "flex";
        el.style.justifyContent = "flex-end";
      });
    } else if (isPrivacy) {
      this.managementEdits.forEach((el) => (el.style.display = "none"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "block"));
      this.managementPrivacies.forEach((el) => (el.style.display = "block"));
      this.ActionEdit.forEach((el) => (el.style.display = "none"));
    } else {
      this.managementEdits.forEach((el) => (el.style.display = "none"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "block"));
      this.managementPrivacies.forEach((el) => (el.style.display = "none"));
      this.ActionEdit.forEach((el) => (el.style.display = "none"));
    }
  }
}

customElements.define("management-section", ManagementSection);
