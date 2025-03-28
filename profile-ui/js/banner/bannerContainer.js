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
      `https://api.servehere.com/api/storage/image?path=${this.userData.business.cover_photo}` ||
      "assets/profile/coverImage.png";
    const profileImg =
      `https://api.servehere.com/api/storage/image?path=${this.userData.business.logo}` ||
      "assets/profile/profile.png";
    const name = this.userData.business.name;
    const userType = this.userData.user_type;
    const code = this.userData.business.code;
    const socialMedia = this.userData.socials;

    this.innerHTML = `
     <section 
       x-data="{ 
          coverImage: '${coverImg}', 
          profileImage: '${profileImg}',
          profileName: '${name}',
          profileType: '${userType}',
          profileCode: '${code}',
          previewCoverImage(event) {
           const file = event.target.files[0];
           if (file) {
             this.coverImage = URL.createObjectURL(file);
           }
         },
         previewProfileImage(event) {
           const file = event.target.files[0];
           if (file) {
             this.profileImage = URL.createObjectURL(file);
           }
         }
        }"> 

        <div class="profile-wrapper">
          <div class="profile-banner">
            <div class="position-relative">
              <img class="banner-image" :src="coverImage" alt="Banner" />
              <privacy-button class="privacy-cover-batch isCoverPrivacy"></privacy-button>
              <div class="uploadButton isCoverEdit">
                <button class="add-button">Add Profile Poster</button>
                <input type="file" accept="image/*" class="coverFileInput" style="display: none" @change="previewCoverImage" />
                <p class="file-upload coverFileUpload">Choose file</p>
              </div>
            </div>
            <div class="profile-details">
              <div class="profile-image">
              <div class="profileUploadButton isProfileEdit">
              <button class="add-button">Add Profile Picture</button>
              <input type="file" accept="image/*" class="profileFileInput" style="display: none" @change="previewProfileImage"/>
              <p class="file-upload profileFileUpload">Choose file</p>
              </div>
              <privacy-button class="privacy-profile-batch isProfilePrivacy"></privacy-button>
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
                <social-form class="isSocialFormEdit" social-data='[
                  {"platform_name": "AddMail", "icon": "assets/icons/addMail.png", "nonEditAble": true, "linkPlaceholder": "Default Generating"},
                  {"platform_name": "WhatsApp", "icon": "assets/icons/WhatsApp.png", "hasPhone": true},
                  {"platform_name": "Facebook", "icon": "assets/icons/Facebook.png", "nonEditAble": false, "linkPlaceholder": "Enter Facebook link"},
                  {"platform_name": "Instagram", "icon": "assets/icons/Instagram.png", "nonEditAble": false, "linkPlaceholder": "Enter Instagram link"},
                  {"platform_name": "X", "icon": "assets/icons/X.png", "nonEditAble": false, "linkPlaceholder": "Enter X link"},
                  {"platform_name": "YouTube", "icon": "assets/icons/YouTube.png", "nonEditAble": false, "linkPlaceholder": "Enter Youtube link"},
                  {"platform_name": "WeChat", "icon": "assets/icons/WeChat.png", "nonEditAble": false, "linkPlaceholder": "Enter We Chat link"},
                  {"platform_name": "Telegram", "icon": "assets/icons/Telegram.png", "hasPhone": true}
                ]'></social-form>
                 <social-privacy class="isSocialMediaPrivacy" social-data='[
                  {"platform_name": "AddMail", "icon": "assets/icons/addMail.png", "nonEditAble": true, "linkPlaceholder": "Default Generating"},
                  {"platform_name": "WhatsApp", "icon": "assets/icons/WhatsApp.png", "hasPhone": true, "linkPlaceholder": "Enter WhatsApp Number"},
                  {"platform_name": "Facebook", "icon": "assets/icons/Facebook.png", "nonEditAble": false, "linkPlaceholder": "Enter Facebook link"},
                  {"platform_name": "Instagram", "icon": "assets/icons/Instagram.png", "nonEditAble": false, "linkPlaceholder": "Enter Instagram link"},
                  {"platform_name": "X", "icon": "assets/icons/X.png", "nonEditAble": false, "linkPlaceholder": "Enter X link"},
                  {"platform_name": "YouTube", "icon": "assets/icons/YouTube.png", "nonEditAble": false, "linkPlaceholder": "Enter Youtube link"},
                  {"platform_name": "WeChat", "icon": "assets/icons/WeChat.png", "nonEditAble": false, "linkPlaceholder": "Enter We Chat link"},
                  {"platform_name": "Telegram", "icon": "assets/icons/Telegram.png", "hasPhone": true, "linkPlaceholder": "Enter Telegram Number"}
                ]'></social-privacy>
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
