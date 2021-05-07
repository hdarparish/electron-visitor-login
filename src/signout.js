const { ipcRenderer } = require("electron");

let tbody = document.getElementById("tData");

//get list of visitors that are still signed in
window.addEventListener("load", (e) => {
  ipcRenderer.send("get-logins");
});

//populate the table
ipcRenderer.on("all-logins-success", (e, data) => {
  // clear existing data from tbody if it exists
  tbody.innerHTML = "";
  data.forEach((element) => {
    let row = tbody.insertRow(0);
    let cell1 = row.insertCell(0);

    cell1.innerHTML = element.log_id;
    cell1.classList.add("column-hide");
    row.insertCell(1).innerHTML = element.first_name;
    row.insertCell(2).innerHTML = element.last_name;
    row.insertCell(3).innerHTML = element.sign_in.toLocaleString();
    let cell5 = row.insertCell(4);
    let btnDocument = document.createElement("BUTTON");
    btnDocument.innerHTML = "Sign out";

    btnDocument.onclick = function () {
      getLogId(this);
    };
    cell5.append(btnDocument);
  });
});

// get the id for each row and send a request to main
const getLogId = (element) => {
  let tbl = document.getElementById("tbl").getElementsByTagName("tbody")[0];
  // it is -1 because it is counting the table head
  let rowIndex = element.parentElement.parentElement.rowIndex - 1;
  let logId = tbl.rows[rowIndex].cells[0].innerHTML;

  ipcRenderer.send("visitor-logout", logId);
  window.location.replace("./index.html");
};
