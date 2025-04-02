// /save-socials

const SocialMediaHandler = {
    async handleSocialMedia(social_media) {
  
      try {
        const url = `https://api.servehere.com/api/save-socials`;
  
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
    }
  };
  
  window.SocialMediaHandler = SocialMediaHandler;