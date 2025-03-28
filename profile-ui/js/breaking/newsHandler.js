const newsHandler = {
  async handleNews(data) {
    console.log(data, "🚀 Handling news data...");

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (
        !parsedData.title?.trim() ||
        !parsedData.description?.trim() 
      ) {
        console.error(
          "❌ Missing required fields: title, image, or description"
        );
        return;
      }

      const formData = new FormData();
      formData.append("title", parsedData.title);
      formData.append("description", parsedData.description);

      if (parsedData.image instanceof File) {
        formData.append("image", parsedData.image);
      }

      formData.append("is_active", parsedData.is_active ? 1 : 0);

      // If an id exists, use it in the URL and do not append it to formData.
      const url = parsedData.id
        ? `https://api.servehere.com/api/update-breaking-news/${parsedData.id}`
        : "https://api.servehere.com/api/save-breaking-news";

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
      } else {
        console.error("❌ Failed to send news data:", response.statusText);
      }
    } catch (error) {
      console.error("🚨 Error in handleNews:", error);
    }
  },
};

window.newsHandler = newsHandler;
