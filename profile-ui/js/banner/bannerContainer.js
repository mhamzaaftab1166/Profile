class BannerSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="profile-wrapper">
          <div class="profile-banner">
            <div class="position-relative">
              <img class="banner-image" src="assets/profile/coverImage.png" alt="Banner" />
              <privacy-button class="privacy-cover-batch isCoverPrivacy"></privacy-button>
              <div class="uploadButton isCoverEdit">
                <button class="add-button">Add Profile Poster</button>
                <input type="file" accept="image/*" style="display: none" />
                <p class="file-upload">Choose file</p>
              </div>
            </div>
            <div class="profile-details">
              <div class="profile-image">
              <div class="profileUploadButton isProfileEdit">
              <button class="add-button">Add Profile Picture</button>
              <input type="file" accept="image/*" style="display: none" />
              <p class="file-upload">Choose file</p>
              </div>
              <privacy-button class="privacy-profile-batch isProfilePrivacy"></privacy-button>
                <img class="avatar position-relative" src="assets/profile/profile.png" alt="Profile" />
              </div>
              <div class="profile-info">
                <h2 class="profile-name">GIR GIR AUCTION</h2>
                <div class="tags">
                  <span class="main-tag">
                    <img class="addMail" src="assets/icons/addMail.png" alt="Add Mail" />
                    KARACBAR
                  </span>
                  <span class="sub-tag">Admin</span>
                </div>
                <div class="social-icons issocialIcon">
                  <a href="#"><img class="socialIcons" src="assets/icons/whatsApp.png" alt="WhatsApp" /></a>
                  <a href="#"><img class="socialIcons" src="assets/icons/instagram.png" alt="Instagram" /></a>
                  <a href="#"><img class="socialIcons" src="assets/icons/facebook.png" alt="Facebook" /></a>
                  <a href="#"><img class="socialIcons" src="assets/icons/x.png" alt="X" /></a>
                  <a href="#"><img class="socialIcons" src="assets/icons/youtube.png" alt="YouTube" /></a>
                  <a href="#"><img class="socialIcons" src="assets/icons/weChat.png" alt="WeChat" /></a>
                  <a href="#"><img class="socialIcons" src="assets/icons/telegram.png" alt="Telegram" /></a>
                  <a class="add-mail-icon" href="#"><img class="socialIcons" src="assets/icons/addMail.png" alt="Add Mail" /></a>
                </div>
                <social-form class="isSocialFormEdit" social-data='[
                  {"platform_name": "AddMail", "icon": "assets/icons/addMail.png", "nonEditAble": true, "linkPlaceholder": "Default Generating"},
                  {"platform_name": "WhatsApp", "icon": "assets/icons/whatsapp.png", "hasPhone": true},
                  {"platform_name": "Facebook", "icon": "assets/icons/facebook.png", "nonEditAble": false, "linkPlaceholder": "Enter Facebook link"},
                  {"platform_name": "Instagram", "icon": "assets/icons/instagram.png", "nonEditAble": false, "linkPlaceholder": "Enter Instagram link"},
                  {"platform_name": "X", "icon": "assets/icons/x.png", "nonEditAble": false, "linkPlaceholder": "Enter X link"},
                  {"platform_name": "YouTube", "icon": "assets/icons/youtube.png", "nonEditAble": false, "linkPlaceholder": "Enter Youtube link"},
                  {"platform_name": "WeChat", "icon": "assets/icons/wechat.png", "nonEditAble": false, "linkPlaceholder": "Enter We Chat link"},
                  {"platform_name": "Telegram", "icon": "assets/icons/telegram.png", "hasPhone": true}
                ]'></social-form>
                 <social-privacy class="isSocialMediaPrivacy" social-data='[
                  {"platform_name": "AddMail", "icon": "assets/icons/addMail.png", "nonEditAble": true, "linkPlaceholder": "Default Generating"},
                  {"platform_name": "WhatsApp", "icon": "assets/icons/whatsapp.png", "hasPhone": true, "linkPlaceholder": "Enter WhatsApp Number"},
                  {"platform_name": "Facebook", "icon": "assets/icons/facebook.png", "nonEditAble": false, "linkPlaceholder": "Enter Facebook link"},
                  {"platform_name": "Instagram", "icon": "assets/icons/instagram.png", "nonEditAble": false, "linkPlaceholder": "Enter Instagram link"},
                  {"platform_name": "X", "icon": "assets/icons/x.png", "nonEditAble": false, "linkPlaceholder": "Enter X link"},
                  {"platform_name": "YouTube", "icon": "assets/icons/youtube.png", "nonEditAble": false, "linkPlaceholder": "Enter Youtube link"},
                  {"platform_name": "WeChat", "icon": "assets/icons/wechat.png", "nonEditAble": false, "linkPlaceholder": "Enter We Chat link"},
                  {"platform_name": "Telegram", "icon": "assets/icons/telegram.png", "hasPhone": true, "linkPlaceholder": "Enter Telegram Number"}
                ]'></social-privacy>
              </div>
            </div>
          </div>
        </div>
      `;

    this.coverInput = this.querySelector(".isCoverEdit");
    this.profileInput = this.querySelector(".isProfileEdit");
    this.coverPrivacy = this.querySelector(".isCoverPrivacy");
    this.profilePrivacy = this.querySelector(".isProfilePrivacy");
    this.socialMediaPrivacy = this.querySelector(".isSocialMediaPrivacy");
    this.socialFormEdit = this.querySelector(".isSocialFormEdit");
    this.socialIcon = this.querySelector(".issocialIcon");

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
