const BannerHandler = {
  async handleCoverPicture(
    businessId,
    coverFile,
    profileName,
    profileDescription,
    profileLatitude,
    profileLongitude,
    profileCountry
  ) {
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("business_cover_photo", coverFile);
    formData.append("business_name", profileName);
    formData.append("business_longitude", profileLongitude);
    formData.append("business_latitude", profileLatitude);
    formData.append("business_description", profileDescription);
    formData.append("business_country", profileCountry);

    try {
      const url = `https://api.servehere.com/api/business/${businessId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      
    } catch (error) {
      console.error(error);
    }
  },

  async handleProfilePicture(
    businessId,
    profileFile,
    profileName,
    profileDescription,
    profileLatitude,
    profileLongitude,
    profileCountry
  ) {
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("business_logo", profileFile);
    formData.append("business_name", profileName);
    formData.append("business_longitude", profileLongitude);
    formData.append("business_latitude", profileLatitude);
    formData.append("business_description", profileDescription);
    formData.append("business_country", profileCountry);

    try {
      const url = `https://api.servehere.com/api/business/${businessId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
    } catch (error) {
      console.error(error);
    }
  },

  async handleCoverPicturePrivacy(data) {
    try {
      const url = `https://api.servehere.com/api/user-field-settings`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async handleProfilePicturePrivacy(data) {
    try {
      const url = `https://api.servehere.com/api/user-field-settings`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

window.BannerHandler = BannerHandler;