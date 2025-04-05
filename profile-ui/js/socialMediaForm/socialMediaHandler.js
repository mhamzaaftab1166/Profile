// /save-socials

const SocialMediaHandler = {
    async handleSocialMedia(social_media) {
    const { baseUrl, token } = await getApiConfig();

  
      try {
        const url = `${baseUrl}/save-socials`;
  
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: social_media,
        });
  
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
      } catch (error) {
        console.error(error);
      }
    },

    async handleSocialMediaPrivacy(data) {
    const { baseUrl, token } = await getApiConfig();

      try {
        const url = `${baseUrl}/user-field-settings`;
  
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
  
  window.SocialMediaHandler = SocialMediaHandler;