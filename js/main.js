const drawButton = document.getElementById("drawButton");
const textArea = document.getElementById("editorTextArea");
const canvas = document.getElementById("plotCanvas");
const canvasBottomLeftText = document.getElementById("canvasBottomLeftText");
const canvasTopRightText = document.getElementById("canvasTopRightText");

function drawPolyline(points) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  
  let minx = points[0][0];
  let maxx = points[0][0];
  let miny = points[0][1];
  let maxy = points[0][1];
  for (let i = 1; i < points.length; i++) {
    minx = Math.min(minx, points[i][0]);
    maxx = Math.max(maxx, points[i][0]);
    miny = Math.min(miny, points[i][1]);
    maxy = Math.max(maxy, points[i][1]);
  }

  const marginx = (maxx-minx)*0.05;
  const marginy = (maxx-minx)*0.05;
  minx -= marginx;
  maxx += marginx;
  miny -= marginy;
  maxy += marginy;

  function scale(x, len, min, max) {
    return len * (x - min) / (max-min) ;
  }

  minx = Math.floor(minx);
  miny = Math.floor(miny);
  maxx = Math.ceil(maxx);
  maxy = Math.ceil(maxy);

  for (const p of points) {
    p[0] = scale(p[0], w, minx, maxx);
    p[1] = h - scale(p[1], h, miny, maxy);
  }

  for (let i = 0; i+1 < points.length; i++) {
    const a = points[i];
    const b = points[i+1];
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  }

  canvasBottomLeftText.innerHTML = `(${minx}, ${miny})`;
  canvasTopRightText.innerHTML = `(${maxx},${maxy})`;
}

function parseTextAreaContent() {
  const text = textArea.value;
  const numbers = [];

  for (const line of text.split('\n'))
    for (const token of line.split(' '))
      if (token)
        numbers.push(+token);

  if (numbers.length % 2 != 0) {
    alert("ERROR: write an even number of numbers")
    return;
  }

  if (numbers.length == 0) {
    alert("ERROR: need at least a pair of numbers")
    return;
  }

  const points = [];
  for (let i = 0; i < numbers.length; i += 2) {
    points.push([numbers[i], numbers[i+1]]);
  }

  drawPolyline(points);
}

function setDefaultAreaContent() {
  const defaultTextAreaValue = "0 0\n0 7\n1 7\n1 6\n2 6\n2 7\n3 7\n3 5\n1 5\n1 4\n4 4\n4 7\n7 7\n7 6\n5 6\n5 5\n7 5\n7 4\n6 4\n6 3\n7 3\n7 1\n6 1\n6 2\n5 2\n5 0\n2 0\n2 1\n4 1\n4 3\n3 3\n3 2\n2 2\n2 3\n1 3\n1 0\n0 0\n";
  textArea.value = defaultTextAreaValue;  
}

function registerListeners() {
  drawButton.onclick = parseTextAreaContent;
  textArea.onkeydown = (ev) => {
    if (ev.ctrlKey && ev.key === 'Enter') {
      parseTextAreaContent();
    }
  };
}

setDefaultAreaContent();
registerListeners();