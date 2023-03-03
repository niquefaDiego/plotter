import 'bootstrap';
import '../scss/main.scss';
import { addEditorKeyMap, getEditor, getEditorText } from './editor';
import { DrawingParser } from './drawing-parser/drawing-parser';
import { PolylineDrawingParser } from './drawing-parser/polyline-drawing-parser';
import { Drawing } from './drawing';
import { DrawerFactory } from './drawer';
import { CanvasDrawerFactory } from "./canvas-drawer";
import { BoundingRect } from './geo';

const drawButton: HTMLButtonElement = document.getElementById("drawButton") as HTMLButtonElement;
const downloadImageButton: HTMLButtonElement = document.getElementById("downloadImageButton") as HTMLButtonElement;
const canvas: HTMLCanvasElement = document.getElementById("plotCanvas") as HTMLCanvasElement;

async function parseTextAreaContent(): Promise<void> {
  const text = await getEditorText();

  var canvasContext: CanvasRenderingContext2D = canvas.getContext("2d")!;
  var parser: DrawingParser = new PolylineDrawingParser();
  var drawerFactory: DrawerFactory = new CanvasDrawerFactory(canvasContext);
  var drawing: Drawing = new Drawing(drawerFactory);
  parser.parse(text, drawing);
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  drawing.draw(BoundingRect.FromCoords(0, 0, canvas.width, canvas.height));
}

function downloadImage(): void {
  const image: HTMLImageElement = new Image();
  image.src = canvas.toDataURL();
  let imageContainer = document.getElementById("imageContainer")!;
  for (const child of imageContainer.children) {
    imageContainer.removeChild(child);
  }
  imageContainer.appendChild(image);
}

async function registerListeners() {
  const editor = await getEditor();
  drawButton.onclick = parseTextAreaContent;
  downloadImageButton.onclick = downloadImage;
  addEditorKeyMap("Ctrl-Enter", parseTextAreaContent);
}

registerListeners();
