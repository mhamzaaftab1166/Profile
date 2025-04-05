const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWJjMWVkODBhMjIyMjVmYjEzZjRkN2ZmOTE4ZWVlNmRmMWQ1MDBmNTY0YWY0Mzk4OTliZTM5MzMzOTBjOTRjYzZhOTg3Yzc4YmU5M2E2NWMiLCJpYXQiOjE3NDM4MjYyMzYuOTMyNDIzLCJuYmYiOjE3NDM4MjYyMzYuOTMyNDI2LCJleHAiOjE3NzUzNjIyMzYuOTIzNzA2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.6bSmzdbWjxexzlBPi86fD7leym9SQ5Ho63E1tIWc1lwWakf0TXp-gFf4efP2R3qmFb598PzBHuxHC6RBYL_xqeAm1wai94b6nf5u61pPNjFMOq3FKQ6kFcRsr4EPwVXYqgwk6mgSXHxCxnpFWi1FwZa4jBIyqKL2t3oWK8zw9WhBNjOtIZp6eQcfGJUyYblbkWBZLfhT66TFTwMUE2KxP1XUwIl0P5CRP7eEwRDoZmZQKmF2KgKHkeXLjXvhuDcbbgIhEkAFyo5TQfWy20CXUMOw0XNItQQux0_SNiyUTt-4_rOPZW0dSiXTtrQmxIuc2i_kk3bNJxLflP-XpYWW-PsEayXnRPrf0iFLmj0QP_UR-3HcuwGjZmQLsKGUFpFFnO06MMPxgKzo2WYL7A3NSSvtj1-1w-fM06e34bHkrpxFv5QVHgUm0NO-qTeSMZeCnn6tY4XJ7I1A5wUKVQ1og1oBjoLxN9m7kolgyfbvpNc57_OLBNzXeb_F8ljeBw5ZDb7sboiZYIlzJPchgg_1Xs9Q7pegM3sMsjYn1sGJVtFR940h9CqJgfEFLe8vQAUuhzb6wmxreLJ-0nIfz0rUWylS25NJY82N4fGTs6zIbgCVSkWDhgLIyq6N665SJbFOpVnQGAzkbpcWqzeMk9Y1Nu6VM_2IH7yYl2ReJ07QbP8";
const MissionHandler = {
  async fetchMission(updateState) {
    try {
      const response = await fetch("http://localhost:3000/missions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Using the manual token
        },
      });

      const data = await response.json();
      if (data.length > 0) {
        updateState(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async handleMission(mission, vision, values,  updateState, myProp) {
    console.log("ID received in handleMission:", myProp);
    try {
      const url = "https://api.servehere.com/api/save-mission";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mission, vision, values }),
      });
    } catch (error) {
      console.error(error);
    }
  },

  async handleMissionPrivacy(data) {
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
    }
  }
};

window.MissionHandler = MissionHandler;
