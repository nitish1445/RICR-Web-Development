function search() {
  //   console.log("Hi There!");
  const state = document.getElementById("stateName").value.toLowerCase();

  const flag = document.createElement("i");
  flag.classList.add("bi", "bi-flag-fill", "text-danger", "fs-4");
  flag.style.position = "absolute";

  if (state === "bihar") {
    flag.style.top = "470px";
    flag.style.left = "650px";
    flag.title = "State : Bihar \nCapital : Patna";
  }
  if (state === "an") {
    flag.style.top = "1010px";
    flag.style.left = "900px";
    flag.title = "State : Andaman & Nicobar";
  }
  if (state === "rajasthan") {
    flag.style.top = "450px";
    flag.style.left = "250px";
    flag.title = "State : Rajastan \nCapital : Jaipur";
  }
  if (state === "up" || state === "uttar pradesh") {
    flag.style.top = "430px";
    flag.style.left = "450px";
    flag.title = "State : Uttar Pradesh \nCapital : Lucknow";
  }
  if (state === "mp" || state === "madhya pradesh") {
    flag.style.top = "550px";
    flag.style.left = "370px";
    flag.title = "State : Madhya Pradesh \nCapital : Bhopal";
  }
  if (state === "gujrat") {
    flag.style.top = "550px";
    flag.style.left = "180px";
    flag.title = "State : Gijarat \nCapital : Gandhi Nagar";
  }
  if (state === "delhi") {
    flag.style.top = "350px";
    flag.style.left = "365px";
    flag.title = "State : Delhi \nCapital : Delhi";
  }
  if (state === "haryana") {
    flag.style.top = "320px";
    flag.style.left = "340px";
    flag.title = "State : Haryana \nCapital : Chandigarh";
  }
  if (state === "punjab") {
    flag.style.top = "270px";
    flag.style.left = "300px";
    flag.title = "State : Punjab \nCapital : Chandigarh";
  }
  if (state === "hp" || state === "himachal pradesh") {
    flag.style.top = "240px";
    flag.style.left = "370px";
    flag.title = "State : Himachal Pradesh \nCapital : Sillong";
  }
  if (state === "jk") {
    flag.style.top = "150px";
    flag.style.left = "290px";
    flag.title = "State : Jammu And Kashmir \nCapital : Jammu";
  }
  if (state === "ladakh") {
    flag.style.top = "120px";
    flag.style.left = "370px";
    flag.title = "State : Ladakh \nCapital : Leh";
  }
  if (state === "uttarakhand") {
    flag.style.top = "310px";
    flag.style.left = "440px";
    flag.title = "State : Uttrakhand \nCapital : Dehradun";
  }
  if (state === "jharkhand") {
    flag.style.top = "580px";
    flag.style.left = "630px";
    flag.title = "State : Jharkhand \nCapital : Ranchi";
  }
  if (state === "west bengal" || state === "wb") {
    flag.style.top = "590px";
    flag.style.left = "700px";
    flag.title = "State : West Bengal \nCapital : Kolkata";
  }
  if (state === "chattisgarh") {
    flag.style.top = "650px";
    flag.style.left = "510px";
    flag.title = "State : Chattisgarh \nCapital : Raipur";
  }
  if (state === "odisha") {
    flag.style.top = "670px";
    flag.style.left = "610px";
    flag.title = "State : Odisha \nCapital : Bhubneswar";
  }
  if (state === "maharastra") {
    flag.style.top = "720px";
    flag.style.left = "310px";
    flag.title = "State : Maharastra \nCapital : Mumbai";
  }
  if (state === "karnataka") {
    flag.style.top = "920px";
    flag.style.left = "290px";
    flag.title = "State : Karnataka \nCapital : Benguluru";
  }
  if (state === "goa") {
    flag.style.top = "870px";
    flag.style.left = "235px";
    flag.title = "State : Goa \nCapital : Panji";
  }
  if (state === "telengana") {
    flag.style.top = "780px";
    flag.style.left = "430px";
    flag.title = "State : Telengana \nCapital : Hyderabad";
  }
  if (state === "andhra pradesh" || state === "ap") {
    flag.style.top = "880px";
    flag.style.left = "390px";
    flag.title = "State : Andhra Pradesh \nCapital : Hyderabad";
  }
  if (state === "tamil nadu" || state === "tn") {
    flag.style.top = "1050px";
    flag.style.left = "390px";
    flag.title = "State : TamilNadu \nCapital : Chennai";
  }
  if (state === "kerala") {
    flag.style.top = "1080px";
    flag.style.left = "310px";
    flag.title = "State : Kerala \nCapital : Trianathampuram";
  }
  if (state === "sikkim") {
    flag.style.top = "400px";
    flag.style.left = "730px";
    flag.title = "State : Sikkim \nCapital : Gangtok";
  }
  if (state === "assam") {
    flag.style.top = "440px";
    flag.style.left = "830px";
    flag.title = "State : Assam \nCapital : ";
  }

  if (state === "arunachal pradesh") {
    flag.style.top = "360px";
    flag.style.left = "930px";
    flag.title = "State : Arunchal pradesh \nCapital : Itanagar";
  }

  if (state === "nagaland") {
    flag.style.top = "440px";
    flag.style.left = "930px";
    flag.title = "State : Nagaland \nCapital : kohima";
  }
  if (state === "manipur") {
    flag.style.top = "500px";
    flag.style.left = "910px";
    flag.title = "State : Manipur \nCapital : ";
  }
  if (state === "mizoram") {
    flag.style.top = "550px";
    flag.style.left = "880px";
    flag.title = "State : Mizoram \nCapital : ";
  }
  if (state === "tripura") {
    flag.style.top = "550px";
    flag.style.left = "840px";
    flag.title = "State : tripura \nCapital : ";
  }
  if (state === "meghalya") {
    flag.style.top = "470px";
    flag.style.left = "820px";
    flag.title = "State : Meghalaya \nCapital : ";
  }

  document.getElementById("map").appendChild(flag);
  document.getElementById("stateName").value = "";
}
function clearIcons() {
  // document.querySelectorAll("#map i").forEach((el) => el.remove());
  window.location.reload();
}
