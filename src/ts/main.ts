import 'bootstrap';
import '../scss/main.scss';
import { addEditorKeyMap, getEditor, getEditorText } from './editor';
import { Point } from "./geometry/point";

const drawButton: HTMLButtonElement = document.getElementById("drawButton") as HTMLButtonElement;
const canvas: HTMLCanvasElement = document.getElementById("plotCanvas") as HTMLCanvasElement;

interface PointMapping {
  original: Point[];
  canvas: Point[];
};

var pointMapping: PointMapping = { original: [], canvas: [] };
var focusPoint: Point | null = null;
var focusPointTag: string = "";

function drawPolyline(points: Point[]): void {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  
  let minx = points[0].x;
  let maxx = points[0].x;
  let miny = points[0].y;
  let maxy = points[0].y;
  for (let i = 1; i < points.length; i++) {
    minx = Math.min(minx, points[i].x);
    maxx = Math.max(maxx, points[i].x);
    miny = Math.min(miny, points[i].y);
    maxy = Math.max(maxy, points[i].y);
  }

  const marginx = (maxx-minx)*0.05;
  const marginy = (maxx-minx)*0.05;
  minx -= marginx;
  maxx += marginx;
  miny -= marginy;
  maxy += marginy;

  function scale(x: number, len: number, min: number, max: number): number {
    return len * (x - min) / (max-min) ;
  }

  function mapPoint(p: Point) {
    return new Point(
      scale(p.x, w, minx, maxx),
      h - scale(p.y, h, miny, maxy)
    );
  }

  var newMapping: PointMapping = {
    original: points,
    canvas: points.map(mapPoint)
  };

  for (let i = 0; i+1 < points.length; i++) {
    const a = newMapping.canvas[i];
    const b = newMapping.canvas[i+1];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  pointMapping = newMapping;
  if (focusPoint !== null) {
    ctx.beginPath();
    const focusPointMapped = mapPoint(focusPoint);
    ctx.font = "15px Arial";
    ctx.fillText(focusPointTag, focusPointMapped.x, focusPointMapped.y);
  }
}

async function parseTextAreaContent(): Promise<void> {
  const text = await getEditorText();
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

  const points: Point[] = [];
  for (let i = 0; i < numbers.length; i += 2) {
    points.push(new Point(numbers[i], numbers[i+1]));
  }

  drawPolyline(points);
}

async function registerListeners() {
  const editor = await getEditor();
  drawButton.onclick = parseTextAreaContent;
  addEditorKeyMap("Ctrl-Enter", parseTextAreaContent);
}

registerListeners();

canvas.onmousemove = ((ev: MouseEvent) => {
  const mapping = pointMapping;
  if (mapping.original.length == 0) return;
  const mousePoint = new Point(ev.offsetX, ev.offsetY);
  var minDist = mousePoint.dist(mapping.canvas[0]);
  var closest = 0;
  for (let i = 1; i < mapping.canvas.length; i += 1) {
    const disti = mousePoint.dist(mapping.canvas[i]);
    if (disti < minDist) {
      minDist = disti;
      closest = i;
    }
  }

  if (minDist < (canvas.width + canvas.height) * 0.02) {
    focusPoint = mapping.original[closest];
    focusPointTag = mapping.original[closest].toString();
    drawPolyline(mapping.original);
  } else if (focusPoint !== null) {
    focusPoint = null;
    focusPointTag = "";
    drawPolyline(mapping.original);
  }
});

canvas.onmouseleave = () => {
  if (focusPoint !== null) {
    focusPoint = null;
    focusPointTag = "";
    drawPolyline(pointMapping.original);
  }
}