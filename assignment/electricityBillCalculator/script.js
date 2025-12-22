function calculateBill() {
  let units = Number(document.getElementById("units").value);
  if (units < 0) {
    alert("Please Enter Valid Units");
    return;
  }

  let u1 = 0,
    u2 = 0,
    u3 = 0,
    u4 = 0;
  let c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  if (units <= 50) {
    u1 = units;
  } else if (units <= 200) {
    u1 = 50;
    u2 = units - 50;
  } else if (units <= 450) {
    u1 = 50;
    u2 = 150;
    u3 = units - 200;
  } else {
    u1 = 50;
    u2 = 150;
    u3 = 250;
    u4 = units - 450;
  }

  c1 = u1 * 0.5;
  c2 = u2 * 0.75;
  c3 = u3 * 1.2;
  c4 = u4 * 1.5;

  let subtotal = c1 + c2 + c3 + c4;
  let surcharge = subtotal * 0.2;
  let total = subtotal + surcharge;

  document.getElementById("billCard").style.display = "block";

  document.getElementById(
    "slab1"
  ).innerHTML = `For the first 50 units (${u1}) : <i class="bi-currency-rupee"></i> ${c1.toFixed(
    2
  )}`;

  document.getElementById(
    "slab2"
  ).innerHTML = `Next 150 units (${u2}) : <i class="bi-currency-rupee"></i> ${c2.toFixed(
    2
  )}`;

  document.getElementById(
    "slab3"
  ).innerHTML = `Next 250 units (${u3}) : <i class="bi-currency-rupee"></i> ${c3.toFixed(
    2
  )}`;

  document.getElementById(
    "slab4"
  ).innerHTML = `Above 450 units (${u4}) : <i class="bi-currency-rupee"></i> ${c4.toFixed(
    2
  )}`;

  document.getElementById(
    "subtotal"
  ).innerHTML = `Subtotal : <i class="bi-currency-rupee"></i> ${subtotal.toFixed(
    2
  )}`;

  document.getElementById(
    "surcharge"
  ).innerHTML = `Surcharge (20%) : <i class="bi-currency-rupee"></i> ${surcharge.toFixed(
    2
  )}`;

  document.getElementById(
    "total"
  ).innerHTML = `Grand Total : <i class="bi-currency-rupee"></i> ${total.toFixed(
    2
  )}`;
}

function resetData() {
  document.getElementById("units").value = "";
  document.getElementById("billCard").style.display = "none";
}
