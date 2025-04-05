class BannerSection extends HTMLElement {
  static get observedAttributes() {
    return ["userData"];
  }

  constructor() {
    super();
    this.userData = {};
  }

  connectedCallback() {
    this.addEventListener("bannerDataReceived", (event) => {
      this.userData = event.detail;      
      this.render();
    });
  }

  render() {
    const coverImg =
    this.userData.settings.cover_photo === false || this.isPrivacy
      ? `https://api.servehere.com/api/storage/image?path=${this.userData.business.cover_photo}`
      : "assets/profile/coverImage.png";
      const profileImg =
      this.userData.settings.profile_picture === false || this.isPrivacy
        ? `https://api.servehere.com/api/storage/image?path=${this.userData.business.logo}`
        : "assets/profile/profile.png";
    const id = this.userData.business.id;
    const name = this.userData.business.name;
    const userType = this.userData.user_type;
    const description = this.userData.business.description;
    const country = this.userData.business.country;
    const latitude = this.userData.business.latitude;
    const longitude = this.userData.business.longitude;
    const code = this.userData.business.code;
    const socialMedia = this.userData.socials;
    const settings = this.userData.settings;

    const socialData = socialMedia.map((social) => ({
      platform_name: social.platform_name,
      icon: `assets/icons/${social.platform_name}.png`,
      hasPhone: !!social.phone_number,
      linkPlaceholder: social.phone_number
        ? `Enter ${social.platform_name} Number`
        : `Enter ${social.platform_name} link`,
      country_code: social.country_code || "",
      platform_link: social.platform_link || "",
      phone_number: social.phone_number || "",
      nonEditAble: false,
    }));

    socialData.unshift({
      "platform_name": "AddMail",
      "icon": "assets/icons/addMail.png",
      "nonEditAble": true,
      "linkPlaceholder": "Default Generating"
    });

    this.innerHTML = `
     <section 
       x-data="{ 
          businessId: '${id}',
          coverImage: '${coverImg}', 
          profileImage: '${profileImg}',
          coverFile: null,
          profileFile: null,
          profileName: '${name}',
          profileType: '${userType}',
          profileDescription: '${description}',
          profileLatitude: '${latitude}',
          profileLongitude: '${longitude}',
          profileCountry: '${country}',
          profileCode: '${code}',
          profileChecked: ${this.userData.settings.profile_picture},
          coverChecked: ${this.userData.settings.cover_photo},
          
          toggleCoverPrivacy() {
          const payload = { cover_photo: this.coverChecked };
          BannerHandler.handleCoverPicturePrivacy(JSON.stringify(payload));
          console.log('Privacy checked value:', this.coverChecked);
          },

          toggleProfilePrivacy() {
          const payload = { profile_picture: this.profileChecked };
          BannerHandler.handleProfilePicturePrivacy(JSON.stringify(payload));
          console.log('Privacy checked value:', this.profileChecked);
          },

          previewCoverImage(event) {
           const file = event.target.files[0];
           if (file) {
             this.coverFile = file;
             this.coverImage = URL.createObjectURL(file);
           }
         },
         previewProfileImage(event) {
           const file = event.target.files[0];
           if (file) {
             this.profileFile = file;
             this.profileImage = URL.createObjectURL(file);
           }
         },
          saveCover() {
          // Use current reactive state values
          BannerHandler.handleCoverPicture(
            this.businessId,
            this.coverFile,
            this.profileName,
            this.profileDescription, 
            this.profileLatitude,
            this.profileLongitude,
            this.profileCountry
          );
        },
        saveProfile() {
          // Use current reactive state values
          BannerHandler.handleProfilePicture(
            this.businessId,
            this.profileFile,
            this.profileName,
            this.profileDescription, 
            this.profileLatitude,
            this.profileLongitude,
            this.profileCountry
          );
        }
        }"> 

        <div class="profile-wrapper">
          <div class="profile-banner">
            <div class="position-relative">
              <img class="banner-image" :src="coverImage" alt="Banner" />
            <div class="me-1 ms-2 toggle-container privacy-cover-batch isCoverPrivacy">
               <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="coverChecked ? '1' : '0'"
                 aria-label="Privacy toggle switch"
                :data-checked="coverChecked ? '1' : '0'"
                @click="coverChecked = !coverChecked; toggleCoverPrivacy()"
               >
              <div class="toggle-handle"></div>
             </div>
            </div>
              <div class="uploadButton isCoverEdit">
                <button class="add-button" @click="saveCover()">Add Profile Poster</button>
                <input type="file" accept="image/*" class="coverFileInput" style="display: none" @change="previewCoverImage" />
                <p class="file-upload coverFileUpload">Choose file</p>
              </div>
            </div>
            <div class="profile-details">
              <div class="profile-image">
              <div class="profileUploadButton isProfileEdit">
              <button class="add-button" @click="saveProfile()">Add Profile Picture</button>
              <input type="file" accept="image/*" class="profileFileInput" style="display: none" @change="previewProfileImage"/>
              <p class="file-upload profileFileUpload">Choose file</p>
              </div>
              <div class="me-1 ms-2 toggle-container privacy-profile-batch isProfilePrivacy">
               <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="profileChecked ? '1' : '0'"
                aria-label="Privacy toggle switch"
                :data-checked="profileChecked ? '1' : '0'"
                @click="profileChecked = !profileChecked; toggleProfilePrivacy()"
               >
              <div class="toggle-handle"></div>
             </div>
            </div>
                <img class="avatar position-relative" :src="profileImage" alt="Profile" />
              </div>
              <div class="profile-info">
                <h2 class="profile-name" x-text="profileName"></h2>
                <div class="tags">
                  <span class="main-tag">
                    <img class="addMail" src="assets/icons/addMail.png" alt="Add Mail" />
                    <p class="m-0" x-text="profileCode"></p>
                  </span>
                  <span class="sub-tag" x-text="profileType"></span>
                </div>
                <div class="social-icons issocialIcon">
                ${socialMedia
                  .map(
                    (social) => `
                  <a href=${
                    social?.platform_name === "WhatsApp"
                      ? `https://wa.me/${
                          social.country_code + social.phone_number
                        }`
                      : social?.platform_name === "Telegram"
                      ? `https://t.me/${
                          social.country_code + social.phone_number
                        }`
                      : social.platform_link
                  } target="_blank"><img class="socialIcons" src="assets/icons/${
                      social.platform_name
                    }.png" alt=${social.platform_name} /></a>
                  `
                  )
                  .join("")}
                  <a class="add-mail-icon"><img class="socialIcons" src="assets/icons/addMail.png" alt="Add Mail" /></a>
                </div>
                <social-form class="isSocialFormEdit" social-data='${JSON.stringify(
                  socialData
                )}'></social-form>
                 <social-privacy class="isSocialMediaPrivacy" social-data='${JSON.stringify(
                  socialData
                )}'></social-privacy>
              </div>
            </div>
          </div>
        </div>
        </section>
      `;

    this.coverInput = this.querySelector(".isCoverEdit");
    this.profileInput = this.querySelector(".isProfileEdit");
    this.coverPrivacy = this.querySelector(".isCoverPrivacy");
    this.profilePrivacy = this.querySelector(".isProfilePrivacy");
    this.socialMediaPrivacy = this.querySelector(".isSocialMediaPrivacy");
    this.socialFormEdit = this.querySelector(".isSocialFormEdit");
    this.socialIcon = this.querySelector(".issocialIcon");

    this.querySelector(".coverFileUpload").addEventListener("click", () => {
      this.querySelector(".coverFileInput").click();
    });

    this.querySelector(".profileFileUpload").addEventListener("click", () => {
      this.querySelector(".profileFileInput").click();
    });
    
    this.coverInput.style.display = "none";
    this.profileInput.style.display = "none";
    this.coverPrivacy.style.visibility = "hidden";
    this.socialIcon.style.display = "flex";
    this.profilePrivacy.style.display = "none";
    this.socialFormEdit.style.display = "none";
    this.socialMediaPrivacy.style.display = "none";

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    const profileDetails = this.querySelector(".profile-details");

    if (isEdit || isPrivacy) {
      profileDetails.classList.add("h100");
    } else {
      profileDetails.classList.remove("h100");
    }

    if (isEdit) {
      console.log("Edit mode activated: Enabling upload inputs.");
      this.coverInput.style.display = "flex";
      this.profileInput.style.display = "flex";
      this.socialFormEdit.style.display = "flex";
      this.socialIcon.style.display = "none";
      this.coverPrivacy.style.visibility = "hidden";
      this.profilePrivacy.style.display = "none";
      this.socialMediaPrivacy.style.display = "none";
    } else if (isPrivacy) {
      console.log("Privacy mode activated: Enabling upload inputs.");
      this.coverPrivacy.style.visibility = "visible";
      this.profilePrivacy.style.display = "flex";
      this.coverInput.style.display = "none";
      this.profileInput.style.display = "none";
      this.socialFormEdit.style.display = "none";
      this.socialIcon.style.display = "none";
      this.socialMediaPrivacy.style.display = "flex";
    } else {
      console.log("Edit mode deactivated: Hiding upload inputs.");
      this.coverInput.style.display = "none";
      this.profileInput.style.display = "none";
      this.coverPrivacy.style.visibility = "hidden";
      this.profilePrivacy.style.display = "none";
      this.socialFormEdit.style.display = "none";
      this.socialIcon.style.display = "flex";
      this.socialMediaPrivacy.style.display = "none";
    }
  }
}

customElements.define("banner-section", BannerSection);
