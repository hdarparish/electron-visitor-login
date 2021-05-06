const { ipcRenderer } = require("electron");

let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let phoneNumber = document.getElementById("phone-number");
let signinTime = document.getElementById("date-time");

//on load, add the data and time to the input
window.addEventListener("load", (e) => {
  /*   let date = new Date().toLocaleString("en-CA");
  signinTime.value = date; */
});

const showNext = (e) => {
  e.preventDefault();
  //go to the location of the slideshow ID, similar to href
  location.hash = "#slideshow";

  //send the data to backendl.
};

const sendSignin = (e) => {
  e.preventDefault();
  const symptoms = checkSymptoms();
  let request = {
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
    signinTime: signinTime.value,
    symptoms: symptoms,
  };

  console.log(request);
  ipcRenderer.send("user-signin", request);
};

const checkSymptoms = () => {
  return false;
};
