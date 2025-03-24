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
        <div class="aacard-content">
          <div class="aamain-layout" style="position: relative;">
            <div class="aamanagement-section">
              <!-- Added Bootstrap row class here -->
              <div class="aamanagement-layout row">
                <template x-for="(contact, index) in contacts" class="row" :key="index">
                  <!-- Using col-6 with inline style to force 50% width (2 cards per row) -->
                  <div class="aasecondary-contact-column col-6">
                    <div class="aasecondary-contact" style="position: relative;">
                      <!-- Profile Image: Preview if file exists -->
                      <img
                        :src="contact.image ? URL.createObjectURL(contact.image) : 'assets/profile/managplace.png'"
                        class="aaprofile-image"
                        alt="Profile Image"
                      />
                      <!-- Hidden File Input -->
                      <input
                        type="file"
                        accept="image/*"
                        :x-ref="'fileInput' + index"
                        @change="updateImage($event, index)"
                        style="display: none;"
                      />
                      <!-- Choose Button -->
                      <img
                        src="assets/profile/chooseButton.png"
                        alt="Choose Button"
                        @click="$refs['fileInput' + index].click()"
                        style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); width: 98px; height: 40px; cursor: pointer;"
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
                      />
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <button
              class="aaadd-more-button"
              @click="contacts.push({ name: '', role: '', phone: '', image: null })"
            >
              + Add More
            </button>
          </div>
        </div>
      </div>
      <div class="aacard-actions">
        <button class="aadiscard-button" @click="discardContacts()">Discard</button>
        <button class="aasave-button" @click="saveContacts()">Save</button>
      </div>
    </section>
    `;
  }
}

customElements.define("management-section", ManagementSection);
