const SocialMediaHandler = {
    async handleSocialMedia(social_media) {
      try {
      const endpoint = `/save-socials`;
      return await apiFetch(endpoint, {
        method: "POST",
        body: social_media,
      });
      } catch (error) {
        console.error(error);
      }
    },

    async handleSocialMediaPrivacy(data) {
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
  
  window.SocialMediaHandler = SocialMediaHandler;