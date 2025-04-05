const newsHandler = {
  async handleNews(data) {
    console.log(data, "🚀 Handling news data...");
    showLoader();

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (!parsedData.title?.trim() || !parsedData.description?.trim()) {
        console.error("❌ Missing required fields: title or description");
        showToast("Missing required fields: title or description", "danger");
        return;
      }

      const formData = new FormData();
      formData.append("title", parsedData.title);
      formData.append("description", parsedData.description);

      if (parsedData.image instanceof File) {
        formData.append("image", parsedData.image);
      }

      formData.append("is_active", parsedData.is_active ? 1 : 0);
      const { baseUrl, token } = await getApiConfig();

      const url = parsedData.id
        ? `${baseUrl}/update-breaking-news/${parsedData.id}`
        : `${baseUrl}/save-breaking-news`;

      console.log("🚀 FormData Ready:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ News data sent successfully.");
        showToast("News saved successfully!", "success");
      } else {
        console.error("❌ Failed to send news data:", response.statusText);
        showToast("Failed to save news.", "danger");
      }
    } catch (error) {
      console.error("🚨 Error in handleNews:", error);
      showToast("Something went wrong while saving news.", "danger");
    } finally {
      hideLoader();
    }
  },

  async changeNewsStatus({ id, payload }) {
    const { baseUrl, token } = await getApiConfig();

    const url = `${baseUrl}/save-breaking-news/${id}/activate`;
    console.log("🚀 Changing news status with payload:", payload, id);
    showLoader();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ News status updated successfully.");
        showToast("News status updated!", "success");
      } else {
        console.error("❌ Failed to update News status:", response.statusText);
        showToast("Failed to update news status.", "danger");
      }
    } catch (error) {
      console.error(error);
      showToast("Error updating news status.", "danger");
    } finally {
      hideLoader();
    }
  },

  async handleBreakingPrivacy(data) {
    showLoader();
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

      if (response.ok) {
        showToast("Privacy setting saved!", "success");
      } else {
        showToast("Failed to update privacy setting.", "danger");
      }
    } catch (error) {
      console.error(error);
      showToast("Error updating privacy setting.", "danger");
    } finally {
      document.dispatchEvent(new CustomEvent("profileDataSaved"));
      hideLoader();
    }
  },
};

window.newsHandler = newsHandler;
