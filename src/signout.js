const { ipcRenderer } = require("electron");

let tbody = document.getElementById("tData");

window.addEventListener("load", (e) => {
  ipcRenderer.send("get-logins");
});

ipcRenderer.on("all-logins-success", (e, data) => {
  // clear existing data from tbody if it exists
  tbody.innerHTML = "";
  data.forEach((element) => {
    let row = tbody.insertRow(0);
    row.insertCell(0).innerHTML = element.first_name;
    row.insertCell(1).innerHTML = element.last_name;
    row.insertCell(2).innerHTML = element.sign_in.toLocaleString();
    let cell4 = row.insertCell(3);
    let btnDocument = document.createElement("BUTTON");
    btnDocument.innerHTML = "Sign out";
    cell4.append(btnDocument);
    /* 
    btnDocument.onclick = function () {
      getRow(this);
    };*/
  });
});
