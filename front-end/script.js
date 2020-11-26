// Element references
// Inputs
const lineCountInput = document.getElementById("line-count");
const ampInput = document.getElementById("amplitude");
const spacingInput = document.getElementById("grid-spacing");
const shapeSizeInput = document.getElementById("shape-size");
const seedNumInput = document.getElementById("seed-number");
const showGridCheckbox = document.getElementById("grid-toggle");
const shapeRadios = document.getElementsByName("shape");
const solidRadio = document.getElementsByName("solid");

// Canvas
const board = document.getElementById("board");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let lineCount = 10;
let amplitude = 14;
let gridSpacing = 60;
let shapeSize = 2;
let showGrid = false;
let seedNum = 0;
let shape = "square";

lineCountInput.value = lineCount;
ampInput.value = amplitude;
spacingInput.value = gridSpacing;
shapeSizeInput.value = shapeSize;
seedNumInput.value = seedNum;
shapeRadios[0].checked = true;
solidRadio[0].checked = true;

// Event listeners
lineCountInput.addEventListener("input", (e) => {
  lineCount = parseInt(e.target.value);
  drawPoints();
});

ampInput.addEventListener("input", (e) => {
  amplitude = parseInt(e.target.value);
  drawPoints();
});

spacingInput.addEventListener("input", (e) => {
  gridSpacing = parseInt(e.target.value);
  drawPoints();
});

shapeSizeInput.addEventListener("input", (e) => {
  shapeSize = parseInt(e.target.value);
  drawPoints();
});

seedNumInput.addEventListener("input", (e) => {
  seedNum = parseInt(e.target.value);
  drawPoints();
});

showGridCheckbox.addEventListener("change", (e) => {
  showGrid = e.target.checked;
  drawPoints();
});

shapeRadios.forEach((radioBtn) => {
  radioBtn.addEventListener("change", (e) => {
    if (e.target.checked) {
      shape = e.target.id.split("-")[1];
      drawPoints();
    }
  });
});

solidRadio.forEach((radioBtn) => {
  radioBtn.addEventListener("change", (e) => {
    if (e.target.id === "solid") {
      solid = true;
    } else {
      solid = false;
    }
    drawPoints();
  });
});

function drawPoints() {
  canvas.width = board.offsetWidth;
  canvas.height = board.offsetHeight;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#aaa";

  var points = [];

  for (let i = 0; i < lineCount; i ++) {
    points[i] = [];
  }

  for (let i = 1; i <= lineCount; i++) {
    let y = i * gridSpacing;

    if (showGrid) {
      ctx.strokeStyle = "#ddd";
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1500, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(y, 0);
      ctx.lineTo(y, 1500);
      ctx.stroke();
    }

    for (let j = 1; j <= lineCount; j++) {
      let x = j * gridSpacing;

      const groupOfFourRandomNumbers = [
        pi[i * lineCount + j + seedNum],
        pi[i * lineCount + j + 1 + seedNum],
        pi[i * lineCount + j + 2 + seedNum],
        pi[i * lineCount + j + 3 + seedNum],
      ];

      // A value between 0 and 1
      const offsetAmountX = Number("0." + groupOfFourRandomNumbers[0]);
      const offsetAmountY = Number("0." + groupOfFourRandomNumbers[1]);

      const offsetDirectionX = Math.round(Number("0." + groupOfFourRandomNumbers[2])) ? 1 : -1;
      const offsetDirectionY = Math.round(Number("0." + groupOfFourRandomNumbers[3])) ? 1 : -1;

      const offsetX = offsetAmountX * amplitude * offsetDirectionX;
      const offsetY = offsetAmountY * amplitude * offsetDirectionY;

      points[j - 1].push({ x: x + offsetX, y: y + offsetY });

      ctx.beginPath();
      if (shape === "square") {
        ctx.rect(x + offsetX, y + offsetY, shapeSize, shapeSize);
      } else if (shape === "circle") {
        ctx.arc(
          x + offsetX + shapeSize / 2,
          y + offsetY + shapeSize / 2,
          shapeSize / 2,
          0,
          360
        );
      } else {
        throw new Error("invalid shape was selected!");
      }

      if (solid) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }

  console.log(points);

}

drawPoints();
