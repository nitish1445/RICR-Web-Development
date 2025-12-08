function complete() {
  const nm = document.getElementById("name").value;
  const ph = document.getElementById("phoneNumber").value;
  const em = document.getElementById("email").value;
  const clg = document.getElementById("college").value;
  const bh = document.getElementById("branch").value;
  const sm = document.getElementById("semester").value;
  const gender = [];
  document
    .querySelectorAll("input[name='gender']:checked")
    .forEach((element) => {
      gender.push(element.value);
    });
  const courses = [];
  document
    .querySelectorAll("input[name='course']:checked")
    .forEach((element) => {
      courses.push(element.value);
    });

  console.log("Name : " + nm);
  console.log("Phone Number : " + ph);
  console.log("Email : " + em);
  console.log("College : " + clg);
  console.log("Branch : " + bh);
  console.log("Semester : " + sm);
  console.log("Gender : " + gender);
  console.log("Courses : " + courses);

  document.getElementById("name").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("email").value = "";
  document.getElementById("college").value = "";
  document.getElementById("branch").value = "";
  document.getElementById("semester").value = "";
  //   document.getElementById("gender").value = "";
  //   document.getElementById("courses").value = "";

  alert(`Thank you for Enrolling, ${nm} !`);
}
function submit() {
  const name = document.getElementById("nameContact");
  const em = document.getElementById("emailContact");
  const msg = document.getElementById("message");

  console.log("Name : " + nm);
  console.log("Email : " + em);
  console.log("Message : " + msg);

  document.getElementById("nameContact").value = "";
  document.getElementById("emailContact").value = "";
  document.getElementById("message").value = "";

  alert(`Thank You for Contacting Us, ${name}!`);
}
