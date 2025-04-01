class ManagementSection extends HTMLElement {
  static get observedAttributes() {
    return ["managementData"];
  }

  constructor() {
    super();
    this.managementData = [];
  }

  connectedCallback() {
    this.addEventListener("managementDataReceived", (event) => {
      this.managementData = event.detail;
      this.render();
    });
  }

  render() {
    const baseUrl = "https://api.servehere.com/api/storage/image?path=";
    // Transform the management data so that profile_image is a complete URL
    const transformedManagements = this.managementData.map((item) => ({
      ...item,
      profile_image: `${baseUrl}${item.profile_image}`,
    }));

    // Create a combined list by adding an empty object at the end for new entries
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

    // Use single quotes for the x-data attribute so the JSON strings (which use double quotes) work properly
    this.innerHTML = `
    <section
      class="aamanagement-card"
      x-data='{
        contacts: ${contactsJSON},
        viewOnlyContacts: ${viewOnlyContactsJSON},
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
          this.contacts =${contactsJSON}
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
                  <div class="aasecondary-contact-column col-md-6">
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
                <template x-for="contact in viewOnlyContacts" :key="contact.name">
                  <div class="aasecondary-contact-column col-md-4">
                    <div class="aasecondary-contact text-center">
                      <img
                        :src="contact.profile_image ? contact.profile_image : 'assets/profile/managplace.png'"
                        class="aaprofile-image"
                        alt="Profile Image"
                      />
                    <p style="color: black; margin-top: 11px; font-size: 17px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 600; margin-bottom: 0;" x-text="contact.name"></p>
                    <p style="font-size: 10px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 400;  margin-bottom: 0; color: black;"  x-text="contact.role_name"></p>
                    <p style="font-size: 10px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 400; margin-bottom: 0; color: black;" x-text="contact.phone_number"></p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;

    this.managementEdits = this.querySelectorAll(".isManagementEdit");
    this.managementPrivacies = this.querySelectorAll(".isManagementPrivacy");
    this.viewOnlyTexts = this.querySelectorAll(".isViewOnly");
    this.ActionEdit = this.querySelectorAll(".isActionEdit");

    // Initial state: Show only the view-only layout.
    this.managementEdits.forEach((el) => (el.style.display = "none"));
    this.viewOnlyTexts.forEach((el) => (el.style.display = "block"));
    this.managementPrivacies.forEach((el) => (el.style.display = "none"));
    this.ActionEdit.forEach((el) => (el.style.display = "none"));

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    if (isEdit) {
      this.managementEdits.forEach((el) => (el.style.display = "block"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "none"));
      this.ActionEdit.forEach((el) => {
        el.style.display = "flex";
        el.style.justifyContent = "flex-end";
      });
    } else {
      this.managementEdits.forEach((el) => (el.style.display = "none"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "block"));
      this.managementPrivacies.forEach((el) => (el.style.display = "none"));
      this.ActionEdit.forEach((el) => (el.style.display = "none"));
    }
  }
}

customElements.define("management-section", ManagementSection);
