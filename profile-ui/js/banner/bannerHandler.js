
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2YyYjExMmU0MWEwMTE0NzM1ODkzODY3NmE3YmJiMThjMjUyM2YwYmU1NDcyNjZiMDY4MzgyMWIxMDdjZDdhNzJhZmNhYjk0ODQxMDQ0OWEiLCJpYXQiOjE3NDI5NjkwMjAuNjYwNzMsIm5iZiI6MTc0Mjk2OTAyMC42NjA3MzMsImV4cCI6MTc3NDUwNTAyMC42NTI4MTEsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.2HFXunKrOa_UqgXT4CeHnihASrbZUS_VGzghHlFvUne1GZJkeYM8Ct8DC9LxYJqZqvBlnx7MaV3X3zhZ8rU2_cCm8QuCl3p3bSti2Z30fMGhxr3YqTgLYgluBFWHJ65-7nwPqH7ycniDLs_0vhlgiNenia-6bd_mofT7iFZwjZHFVGD-v9BOoCgYgz0DiTbNZIQfrrlliatpIvmWUJ6bjWR8paJFe1sXrLSoSqmMw71fBfsp1yEH3HNyn4hwLNiqYNNIK3DUAblCI4pVzG8oTWl8yqn6bvhXQqqk912q66ZqG2-8E6apgdhZBRWs9baV1kRG7UoqrMGrJqX4-s78NNh-xpLH8bafdYGTGZJcwfZyzQnCY7gU2JeDhCAvL6N1aXtDzuovCogOvX1kx_fmf3wgSmmbXM71bdveyLNVldkMyYKAuu04-3WvIwlinlydjSMMYUibu9ZGZPpQPjg3KslGCrNwb6C4DN1rrr39XnGjkLsZz0CshWca7e9_HPYiOFi2m4_wx_A_Nckj_8OUlaftMxnLq7ktkg8vqWVc-8FB2YBGXvNUcYs-FQqdiuusDC_CwT0KS2EpxZP2Y-yDetFWMKBKlZ3YXuNtjPpTd7-9xQIsR2U6I6MhDhErCc-WE4Argg8qKrnApQDUUK-z5YqQ0k46KsbvNapEr3hrTf4";

const BannerHandler = {
  async handleCoverPicture(
    businessId,
    coverImage,
    profileName,
    profileDescription,
    profileLatitude,
    profileLongitude,
    profileCountry
  ) {
    const payload = {
      business_cover_photo: coverImage,
      business_name: profileName,
      business_longitude: profileLongitude,
      business_latitude: profileLatitude,
      business_description: profileDescription,
      business_country: profileCountry,
    };
    console.log(payload, 'payload');
    
    try {
      const url = `https://api.servehere.com/api/business/${businessId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      document.dispatchEvent(new CustomEvent("profileDataSaved"));
    } catch (error) {
      console.error(error);
    }
  },
  async handleProfilePicture(
    businessId,
    profileImage,
    profileName,
    profileDescription,
    profileLatitude,
    profileLongitude,
    profileCountry
  ) {
    const payload = {
      business_logo: profileImage,
      business_name: profileName,
      business_longitude: profileLongitude,
      business_latitude: profileLatitude,
      business_description: profileDescription,
      business_country: profileCountry,
    };
    console.log(payload, 'payload');
    
    try {
      const url = `https://api.servehere.com/api/business/${businessId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
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

window.BannerHandler = BannerHandler;

// function openFilePicker(inputSelector) {
//   const fileInput = document.querySelector(inputSelector);
//   if (fileInput) {
//     fileInput.click();
//   } else {
//     console.error("File input element not found!");
//   }
// }
