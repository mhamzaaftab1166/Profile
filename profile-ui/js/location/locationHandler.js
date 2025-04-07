const locationHandler = {
  async handleLocation(data) {
    console.log(data);
    // showLoader();

    try {
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

      console.log("🚀 FormData Ready:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      const url = `/locations`;

      const response = await apiFetch(url, {
        method: "POST",
        contentType: "multipart/form-data",
        body: formData,
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ FormData sent successfully.");
        // showToast("Locations saved successfully!", "success");
      } else {
        console.error("❌ Failed to send FormData", response.statusText);
        // showToast("Failed to save locations.", "danger");
      }
    } catch (error) {
      console.error("🚨 Error in handleLocation:", error);
      // showToast("Something went wrong.", "danger");
    } finally {
      hideLoader();
    }
  },

  async changeLocationStatus({ id, payload }) {
    const url = `/locations/${id}/activate`;
    console.log("🚀 Changing location status with payload:", payload, id);
    // showLoader();

    try {
      const response = await apiFetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ Location status updated successfully.");
        // showToast("Location status updated!", "success");
      } else {
        console.error(
          "❌ Failed to update location status:",
          response.statusText
        );
        // showToast("Failed to update location status.", "danger");
      }
    } catch (error) {
      console.error("🚨 Error in changeLocationStatus:", error);
      // showToast("Something went wrong.", "danger");
    } finally {
      hideLoader();
    }
  },
  async handleLocationPrivacy(data) {

    try {
      const url = `/user-field-settings`;

      const response = await apiFetch(url, {
        method: "POST",
        body: data,
      });
      
    } catch (error) {
      console.error(error);
    }
  },
};

window.locationHandler = locationHandler;
