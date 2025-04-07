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
      const endpoint = `/business/${businessId}`;
      return await apiFetch(endpoint, {
        method: "POST",
        contentType: "multipart/form-data",
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
      const endpoint = `/business/${businessId}`;
      return await apiFetch(endpoint, {
        method: "POST",
        contentType: "multipart/form-data",
        body: formData,
      });
      
    } catch (error) {
      console.error(error);
    }
  },

  async handleCoverPicturePrivacy(data) {
    try {
      const endpoint = `/user-field-settings`;
      return await apiFetch(endpoint, {
        method: "POST",
        body: data,
      });

    } catch (error) {
      console.error(error);
    }
  },

  async handleProfilePicturePrivacy(data) {
    try {
     const endpoint = `/user-field-settings`;
      return await apiFetch(endpoint, {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

window.BannerHandler = BannerHandler;