let updateProfileSubmitBtn = document.getElementById("UpdateProfileSubmitBtn");

updateProfileSubmitBtn.addEventListener("click", async (e) => {
  let user = {
    firstName: document.getElementById("firstName").innerText.trim(),
    lastName: document.getElementById("lastName").innerText.trim(),
    username: document.getElementById("userName").innerText.trim(),
    phone: document.getElementById("phone").innerText.trim(),
    email: document.getElementById("email").innerText.trim()
  };

  let options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try{
    let res = await fetch("/updateProfile", options);
  } catch(e){
    console.log(e);
  }

  // resMes = await res.json();

  // console.log(res)
});

