let b = 1,
  c = 1,
  g = 0,
  s = 0,
  i = 0;
const img = document.getElementById("image");

if (img.src === "http://127.0.0.1:5500/JavaScript/imageEditor/index.html") {
  document.getElementById("image").style.display = "none";
}
function uploadimage() {
  const file = document.getElementById("upload").files[0];

  const fileURL = URL.createObjectURL(file);
  document.getElementById("image").src = fileURL;
  document.getElementById("image").style.display = "block";
  document.getElementById("uploadLabel").style.display = "none";
}

function applyFilter() {
  document.getElementById("image").style.filter = `brightness(${b})
                                                    contrast(${c})
                                                    grayscale(${g}%)
                                                    sepia(${s}%)
                                                    invert(${i}%)`;
}

function changeBrightness() {
  const value = document.getElementById("Brightness").value;
  b = (value * 2) / 100;
  applyFilter();
}

function changeContrast() {
  const value = document.getElementById("contrast").value;
  c = (value * 2) / 100;
  applyFilter();
}

function changeGrayScale() {
  const value = document.getElementById("grayScale").value;
  g = value;
  applyFilter();
}

function changeSepia() {
  const value = document.getElementById("sepia").value;
  s = value;
  applyFilter();
}

function changeinvert() {
  const value = document.getElementById("invert").value;
  i = value;
  applyFilter();
}

function reset() {
  b = 1;
  c = 1;
  g = 0;
  s = 0;
  i = 0;

  applyFilter();
  document.getElementById("Brightness").value = "50";
  document.getElementById("contrast").value = "50";
  document.getElementById("grayscale").value = "0";
  document.getElementById("sepia").value = "0";
  document.getElementById("invert").value = "0";
}
function download() {
  if (img.src === "http://127.0.0.1:5500/JavaScript/imageEditor/index.html") {
    alert("Please Upload the Image First");
    return;
  }
  if (!img.complete) {
    alert("Image Upload is in Progress. Please wait.....");
    return;
  }

  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  //fetch the original width and height of the image
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const filter = getComputedStyle(img).filter;

  ctx.filter = filter === "none" ? "none" : filter;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const dataURL = canvas.toDataURL("image/png");

  const anchorTag = document.createElement("a");

  anchorTag.href = dataURL;

  anchorTag.download = "editedImage.png";

  document.body.appendChild(anchorTag);
  anchorTag.click();
  document.body.removeChild(anchorTag);
}
