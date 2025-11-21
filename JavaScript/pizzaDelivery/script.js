function submit() {
  console.log("Submit Done");
  const fn = document.getElementById("firstName").value;
  const ln = document.getElementById("lastName").value;
  const em = document.getElementById("email").value;
  const ph = document.getElementById("phone").value;
  const dt = document.getElementById("date").value;
  const cn = document.getElementById("cardNumber").value;
  const pn = document.getElementById("pinNumber").value;
  const an = document.getElementById("additionalNote").value;
  const sz = [];
   document
    .querySelectorAll("input[name='size']:checked")
    .forEach((element) => {
      sz.push(element.value);
    });
  const fv = [];
   document
    .querySelectorAll("input[name='flavour']:checked")
    .forEach((element) => {
      fv.push(element.value);
    });  

    alert("Order Confirmed Successfully!!")

  console.log("Full Name : " + fn);
  console.log("Last Name : " + ln);
  console.log("Email : " + em);
  console.log("Phone : " + ph);
  console.log("Date : " + dt);
  console.log("Size : " + sz);
  console.log("Flavour : " + fv);
  console.log("Card Number : " + cn);
  console.log("Pin Number : " + pn);
  console.log("Additional Notes : " + an);
  console.log("Size :" + size);
  

  document.getElementById("firstName").value="";
  document.getElementById("lastName").value="";
  document.getElementById("email").value="";
  document.getElementById("phone").value="";
  document.getElementById("date").value="";
  document.getElementById("cardNumber").value="";
  document.getElementById("pinNumber").value="";
  document.getElementById("additionalNote").value="";
  document.getElementsByName("flavour").value="";
  document.getElementsByName("size").value="";
}
