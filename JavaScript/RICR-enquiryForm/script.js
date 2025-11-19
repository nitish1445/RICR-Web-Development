function submit() {
  // Submit Done on click Submit Button
  console.log("Submit Done");

  // Asking if detailed are correct
  alert("Are You Sure");

  //   Details of Student as per filled by them
  const name = document.getElementById("personName").value;
  const number = document.getElementById("contactNumber").value;
  const email = document.getElementById("emailId").value;
  const qualification = document.getElementById("qualificationDetail").value;
  const college = document.getElementById("collegeName").value;
  const year = document.getElementById("yearDetail").value;
  const branch = document.getElementById("branchName").value;

  //   Give the Details on the console side
  console.log("Student Name : " + name);
  console.log("Phone Number : " + number);
  console.log("Email : " + email);
  console.log("Qualification : " + qualification);
  console.log("College/School : " + college);
  console.log("Year : " + year);
  console.log("Branch : " + branch);

  // submit done
  alert("Submitted Successfully !");

  //   Clear the details once Submit button is clicked
  document.getElementById("personName").value = "";
  document.getElementById("contactNumber").value = "";
  document.getElementById("emailId").value = "";
  document.getElementById("qualificationDetail").value = "";
  document.getElementById("collegeName").value = "";
  document.getElementById("yearDetail").value = "";
  document.getElementById("branchName").value = "";
}
