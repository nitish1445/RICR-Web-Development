function guess() {
  const guess = document.getElementById("guessNum").value;
  const num = Math.floor(Math.random() * 10) + 1;
  console.log(num);
  

  if (guess > num) {
    alert("OOPS! SORRY!!! TRY A SMALLER NUMBER.");
  } else if (guess < num) {
    alert("OOPS! SORRY!!! TRY A LARGER NUMBER.");
  } else {
    alert("Correct.");

    document.getElementById("guessNum").value="";
  }
}
