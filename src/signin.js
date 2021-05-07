const { ipcRenderer } = require("electron");

let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let phoneNumber = document.getElementById("phone-number");
let signinTime = document.getElementById("date-time");

//on load, add the data and time to the input
window.addEventListener("load", (e) => {
  /*   let date = new Date().toLocaleString("en-CA");
  signinTime.value = date; */
  //checkSymptoms();
});

const showNext = (e) => {
  e.preventDefault();
  //go to the location of the slideshow ID, similar to href
  //location.hash = "#questionnaire";
  document.getElementById("questionnaire").scrollIntoView();
};
//send the data to backend
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
  ipcRenderer.send("user-signin", request);
};

//check if checkbox is checked and return true or false
const checkSymptoms = () => {
  let questions = document.getElementsByClassName("questions");
  for (let i = 0; i < questions[0].childElementCount; i++) {
    let symptoms = document.getElementById(`question${i + 1}`);
    if (symptoms.checked) {
      //do something else; send email/ display message
      return true;
    }
  }
  return false;
};
