const AboutHandler = {
    async handleAbout(businessId, payload) {
  
      try {
        const endpoint = `/business/${businessId}`;
        return await apiFetch(endpoint, {
          method: "PUT",
          body: payload,
        });
  
      } catch (error) {
        console.error(error);
      }
    },
    async handleAboutPrivacy(data) {
      try {
        const endpoint = `/user-field-settings`;
        return await apiFetch(endpoint, {
          method: "POST",
          body: data,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  window.AboutHandler = AboutHandler;