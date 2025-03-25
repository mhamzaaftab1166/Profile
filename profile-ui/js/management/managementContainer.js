class ManagementSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
 <section
      class="aamanagement-card"
      x-data="{
        contacts: [
          { name: '', role: '', phone: '', image: null },
          { name: '', role: '', phone: '', image: null }
        ],
        viewOnlyContacts: [
          { name: 'John Doe', role: 'Manager', phone: '123-456-7890', image: null },
          { name: 'Jane Smith', role: 'Director', phone: '987-654-3210', image: null },
              { name: 'John Doe', role: 'Manager', phone: '123-456-7890', image: null },
        ],
        updateImage(event, index) {
          const file = event.target.files[0];
          if (file) {
            this.contacts[index].image = file;
          }
        },
        saveContacts() {
          console.log(
            this.contacts.map((contact) => ({
              name: contact.name,
              role: contact.role,
              phone: contact.phone,
              image: contact.image ? contact.image : null
            }))
          );
        },
        discardContacts() {
          this.contacts = [
            { name: '', role: '', phone: '', image: null },
            { name: '', role: '', phone: '', image: null }
          ];
        }
      }"
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
                        :src="contact.image ? URL.createObjectURL(contact.image) : 'assets/profile/managplace.png'"
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
<<<<<<< HEAD
                        style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); width: 85px; height: 40px; cursor: pointer;"
=======
                        style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); width: 98px; height: 40px; cursor: pointer; object-fit: contain"
                      />
                      <!-- Input Fields -->
                      <input
                        type="text"
                        x-model="contact.name"
                        placeholder="Enter Name"
                        class="aacontact-name"
                      />
                      <input
                        type="text"
                        x-model="contact.role"
                        placeholder="Enter Role"
                        class="aacontact-phone"
                      />
                      <input
                        type="tel"
                        x-model="contact.phone"
                        placeholder="Enter Number"
                        class="aacontact-phone"
>>>>>>> b920b07400698ba88d26e98229b98c017b84e681
                      />
                      <input type="text" x-model="contact.name" placeholder="Enter Name" class="aacontact-name" />
                      <input type="text" x-model="contact.role" placeholder="Enter Role" class="aacontact-phone" />
                      <input type="tel" x-model="contact.phone" placeholder="Enter Number" class="aacontact-phone" />
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <button class="aaadd-more-button" @click="contacts.push({ name: '', role: '', phone: '', image: null })">
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
                        :src="contact.image ? URL.createObjectURL(contact.image) : 'assets/profile/managplace.png'"
                        class="aaprofile-image"
                        alt="Profile Image"
                      />
                    <p style="color: black; margin-top: 11px; font-size: 17px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 600; margin-bottom: 0;" x-text="contact.name"></p>
                    <p style="font-size: 10px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 400;  margin-bottom: 0; color: black;"  x-text="contact.role"></p>
                    <p style="font-size: 10px; font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif; font-weight: 400; margin-bottom: 0; color: black;" c x-text="contact.phone"></p>
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
