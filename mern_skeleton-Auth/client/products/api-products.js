let apiURL = "http://localhost:10000";

const list = async () => {
  try {
    // http://localhost:3000/api/products/
    let response = await fetch(apiURL + "/api/products/", {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { list };
