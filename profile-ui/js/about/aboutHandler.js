const AboutHandler = {
    async handleAbout(businessId, payload) {
  
      try {
        const url = `https://api.servehere.com/api/business/${businessId}`;
  
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        });
  
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
      } catch (error) {
        console.error(error);
      }
    },
    async handleAboutPrivacy(data) {
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
      }finally{
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
      }
    }
  };
  
  window.AboutHandler = AboutHandler;