const locationHandler = {
  async handleLocation(data) {
    console.log(data);
    
    try {
      // Ensure data is an array
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;
      const filteredData = parsedData.filter(
        (obj) =>
          obj.location_name.trim() &&
          obj.location_details.trim() &&
          obj.link.trim()
      );

      const formData = new FormData();

      filteredData.forEach((obj, index) => {
        let lat = "";
        let long = "";

        try {
          const url = new URL(obj.link);

          if (url.hostname.includes("google.com")) {
            const params = new URLSearchParams(url.search);
            const q = params.get("q");
            if (q) {
              [lat, long] = q.split(",");
            } else {
              console.warn("⚠️ No lat/long found in Google Maps URL.");
            }
          } else if (url.hostname.includes("openstreetmap.org")) {
            console.log("🗺️ OpenStreetMap Link Detected");
            const hashParts = url.hash.split("/");
            if (hashParts.length >= 3) {
              // For OpenStreetMap, index 1 is latitude, index 2 is longitude.
              lat = hashParts[1];
              long = hashParts[2];
              console.log(
                `✅ Extracted from OpenStreetMap: lat=${lat}, long=${long}`
              );
            } else {
              console.warn("⚠️ No lat/long found in OpenStreetMap URL.");
            }
          }
        } catch (error) {
          console.error("🚨 Invalid URL:", obj.link, error);
        }

        formData.append(
          `locations[${index}][location_name]`,
          obj.location_name
        );
        formData.append(`locations[${index}][lat]`, lat);
        formData.append(`locations[${index}][long]`, long);
        formData.append(
          `locations[${index}][location_details]`,
          obj.location_details
        );
        formData.append(`locations[${index}][location_id]`, 1);
        if (obj.id) {
          formData.append(`locations[${index}][id]`, obj.id);
        }
        formData.append(`locations[${index}][link]`, obj.link);
        formData.append(
          `locations[${index}][is_default]`,
          obj.is_default ? 1 : 0
        );
        formData.append(`locations[${index}][is_active]`, obj.is_active);
      });

      // Log FormData entries for debugging using a for...of loop
      console.log("🚀 FormData Ready:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      // Send FormData directly. Do NOT set "Content-Type" header.
      const url = "https://api.servehere.com/api/locations";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ FormData sent successfully.");
      } else {
        console.error("Failed to send FormData", response.statusText);
      }
    } catch (error) {
      console.error("Error in handleLocation:", error);
    }
  },
};

window.locationHandler = locationHandler;
