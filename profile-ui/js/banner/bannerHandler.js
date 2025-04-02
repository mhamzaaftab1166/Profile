
const BannerHandler = {
  async handleCoverPicture(
    businessId,
    coverImage,
    profileName,
    profileDescription,
    profileLatitude,
    profileLongitude,
    profileCountry
  ) {
    const payload = {
      business_cover_photo: coverImage,
      business_name: profileName,
      business_longitude: profileLongitude,
      business_latitude: profileLatitude,
      business_description: profileDescription,
      business_country: profileCountry,
    };
    console.log(payload, 'payload');
    
    try {
      const url = `https://api.servehere.com/api/business/${businessId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      document.dispatchEvent(new CustomEvent("profileDataSaved"));
    } catch (error) {
      console.error(error);
    }
  },
  async handleProfilePicture(
    businessId,
    profileImage,
    profileName,
    profileDescription,
    profileLatitude,
    profileLongitude,
    profileCountry
  ) {
    const payload = {
      business_logo: profileImage,
      business_name: profileName,
      business_longitude: profileLongitude,
      business_latitude: profileLatitude,
      business_description: profileDescription,
      business_country: profileCountry,
    };
    console.log(payload, 'payload');
    
    try {
      const url = `https://api.servehere.com/api/business/${businessId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      document.dispatchEvent(new CustomEvent("profileDataSaved"));
    } catch (error) {
      console.error(error);
    }
  }
};

window.BannerHandler = BannerHandler;

// function openFilePicker(inputSelector) {
//   const fileInput = document.querySelector(inputSelector);
//   if (fileInput) {
//     fileInput.click();
//   } else {
//     console.error("File input element not found!");
//   }
// }
