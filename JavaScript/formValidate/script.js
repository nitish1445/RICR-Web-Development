function submit() {
  const nm = document.getElementById("fullName").value;
  const em = document.getElementById("email").value;
  const mb = document.getElementById("mobileNo").value;
  const dob = document.getElementById("dob").value;

  // validation name
  if (!/^[A-Za-z ]+$/.test(nm)) {
    alert("Invalid Name");
    return;
  }
  // validation email
  if (!/^[\w\.]+@(gmail|outlook|ricr)\.(com|in|co.in)$/.test(em)) {
    alert("Invalid Email");
    return;
  }
//  mobile number validation
  if(!/^[6-9]\d{9}$/.test(mb)){
    alert("Invalid Mobile Number");
    return;
  }

  const data = {
    FullName: nm,
    Email: em,
    Phone: mb,
    DOB: dob,
  };
  console.log(data);

  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mobileNo").value = "";
  document.getElementById("dob").value = "";
}
