let canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var inkColor = "Blue";
var imgSrc = "pages/page (0).jpg";
var dfont = "22px myfont";
var mydata =
  "hi enter your text here...";
var maxWidth = 720;
var lineHeight = 24;
var x = 28;
var y = 22 + 22;
var fontindex = 0;
var totalfontnum = 42;
window.onload = draw();

let text_input = document.getElementById("inputText");
text_input.addEventListener("input", () => {
  //   console.log(text_input.value);
  mydata = text_input.value;
  redraw();
});

function draw() {
  imageObj = loadimg();
  imageObj.onload = function () {
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
    defaultFontload();
  };
}
function redraw() {
  imageObj = loadimg();
  imageObj.onload = function () {
    ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
    drawText(ctx, mydata, x, y, maxWidth, lineHeight);
  };
}
function loadimg() {
  var imageObj = new Image();
  imageObj.src = imgSrc;
  return imageObj;
}

function drawText(context, text, x, y, line_width, line_height) {
  var line = "";
  var paragraphs = text.split("\n");
  for (var i = 0; i < paragraphs.length; i++) {
    var words = paragraphs[i].split(" ");
    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > line_width && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += line_height;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    y += line_height;
    line = "";
  }
}

async function loadFonts() {
  const font = new FontFace(
    "myfont",
    "url('fonts/font (" + fontindex + ").ttf')"
  );
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
  // enable font with CSS class
  // document.body.classList.add("fonts-loaded");
  ctx.font = dfont;
  ctx.fillStyle = inkColor;
  //   drawText(ctx, mydata, x, y, maxWidth, lineHeight);
  redraw();

  //   console.log(i);
}
async function defaultFontload() {
  const font = new FontFace("myfont", "url('fonts/font (0).ttf')");
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
  // enable font with CSS class
  // document.body.classList.add("fonts-loaded");
  ctx.font = dfont;
  ctx.fillStyle = inkColor;
  drawText(ctx, mydata, x, y, maxWidth, lineHeight);

  // console.log("default font loaded");
}
