function Submit() {
  const nm = document.getElementById("fullname").value.trim();
  const em = document.getElementById("email").value.trim();
  const ph = document.getElementById("phone").value.trim();
  const db = document.getElementById("dob").value.trim();

  document.querySelectorAll(".Error").forEach((element) => {
    element.innerHTML = "";
  });

  //Validation Starts
  if (!nm) {
    document.getElementById("NameError").innerText = "Required";
    return;
  } else if (!/^[A-Za-z ]+$/.test(nm)) {
    document.getElementById("NameError").innerText =
      "Only Alphabets and Spaces are Allowed";
    return;
  }

  if (!em) {
    document.getElementById("EmailError").innerText = "Required";
    return;
  } else if (!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(em)) {
    document.getElementById("EmailError").innerText = "Use Proper Email Format";
    return;
  }

  if (!ph) {
    document.getElementById("PhoneError").innerText = "Required";
    return;
  } else if (!/^[6-9]\d{9}$/.test(ph)) {
    document.getElementById("PhoneError").innerText =
      "Only Indian Mobile Nummber allowed";
    return;
  }

  if (!db) {
    document.getElementById("NameError").innerText = "Required";
    return;
  } else {
    const currentyear = new Date().getFullYear();
    const birthyear = Number(db.split("-")[0]);
    if (currentyear - birthyear < 17) {
      document.getElementById("DOBError").innerText =
        "You must be 18 years Old";
      return;
    }
  }

  const data = {
    FullName: nm,
    Email: em,
    Phone: ph,
    DOB: db,
  };

  console.log(data);
}
