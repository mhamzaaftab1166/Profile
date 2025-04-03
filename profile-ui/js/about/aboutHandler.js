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
    }
  };
  
  window.AboutHandler = AboutHandler;