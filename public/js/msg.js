let alert = document.getElementById("msg-alert");

if (alert.childNodes[1].innerText === "") {
  alert.style.display = "none";
} else {
  alert.style.display = "";
}
