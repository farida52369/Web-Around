/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=52683edebee485790368edae9e69452f&units=metric";
const serverURL = "http://localhost:8000";
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const date = document.getElementById("date");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear();

// clear the server to prevent fetching
// old data when error arise in getData function
const clearServer = async (url) => {
  await fetch(url, {
    method: "DELETE",
    credentials: "same-origin",
  });
};

// clear UI
const clearUI = () => {
  date.innerHTML = '';
  temp.innerHTML = '';
  content.innerHTML = '';
};

// get Data from Weather API
const getData = async (zip = "", url = "", key = "") => {
  const res = await fetch(url + zip + key);
  try {
    const data = await res.json();
    console.log("Get data from server => ", data);
    return data;
  } catch (error) {
    // clearUI();
    console.log("error => ", error);
  }
};

// send data to server-side
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    // clearUI();
    console.log("error => ", error);
  }
};

// Update UI using get all from server side
const updateUI = async () => {
  const res = await fetch(serverURL + "/all");
  try {
    const data = await res.json();
    console.log("Data from updateUI => ", data);
    if (data.date !== undefined)
      // date
      date.innerHTML = `The date today: ${data.date}`;
    else date.innerHTML = "";
    if (data.temperature !== undefined)
      // temperature
      temp.innerHTML = `Tempertaure: ${data.temperature} ْC`;
    else temp.innerHTML = "";
    if (data.userResponse !== undefined && data.userResponse !== "")
      // content
      content.innerHTML = `Feelings: ${data.userResponse}`;
    else content.innerHTML = "";
    console.log("Updating UI ....");
  } catch (error) {
    // clearUI();
    console.log("error => ", error);
  }
};

// add action for event listener for generate button
function genAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  if (zip !== "") {
    getData(zip, baseURL, apiKey)
      .then((data) => {
        if (data !== undefined) {
          const newData = {
            temperature: Math.round(data.main.temp),
            date: newDate,
            userResponse: feelings,
          };
          console.log("Post Weather to Backend!");
          postData(serverURL + "/addWeather", newData);
        }
      })
      .then(updateUI())
      .catch((error) => console.error("Error => ", error));
    // .then(clearServer(serverURL + "/clear"));
  }
}

// generate button
let genBut = document.getElementById("generate");
genBut.addEventListener("click", genAction);
