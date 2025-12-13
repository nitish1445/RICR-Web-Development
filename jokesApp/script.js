async function getNewJokes() {
  const response = await fetch(
    "https://official-joke-api.appspot.com/jokes/random"
  );
  //   this ia the response which is in non-readable format.
  //   console.log(response);
  const data = await response.json();
  //   to make it in readable format we convert it into json.
  //   console.log(data);
  document.getElementById("setup").innerText = data.setup;
  document.getElementById("punchline").innerText = data.punchline;
}
