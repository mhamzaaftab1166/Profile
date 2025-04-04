const AboutHandler = {
    async handleAbout(businessId, payload) {
    const { baseUrl, token } = await getApiConfig();

  
      try {
        const url = `${baseUrl}/business/${businessId}`;
  
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        });
  
      } catch (error) {
        console.error(error);
      }
    },
    async handleAboutPrivacy(data) {
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
    }
  };
  
  window.AboutHandler = AboutHandler;