import * as pdfjsLib from 'pdfjs-dist';
import { fabric } from "fabric";
import { jsPDF } from "jspdf";
import { ref } from 'vue';

pdfjsLib.GlobalWorkerOptions.workerSrc = "/plugin/build/pdf.worker.js";
// pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";

export function readPdf(file, className) {
  if (file.type == "application/pdf") {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      let pdfData = new Uint8Array(this.result);
      // Using DocumentInitParameters object to load binary data.
      let loadingTask = pdfjsLib.getDocument({ data: pdfData });
      loadingTask.promise.then(function (pdf) {
        // Fetch the first page
        let pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
          let scale = 1.5;
          let viewport = page.getViewport({ scale: scale });

          // Prepare canvas using PDF page dimensions
          let canvas_class = className;
          let canvas = document.querySelector(canvas_class);
          let context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          console.log(canvas)

          // Render PDF page into canvas context
          let renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          let renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            console.log('Page rendered');
          });
        });
      }, function (reason) {
        // PDF loading error
        // console.error(reason);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
}

export function readSign(img, idName) {
  // export function readSign(idName) {
  // this.__canvases = [ ];
  // var canvas = new fabric.Canvas(idName);
  // fabric.Image.fromURL('https://i.imgur.com/5t2B0sl_d.webp?maxwidth=520&shape=thumb&fidelity=high', function (img) {
  //   canvas.add(img.set({ left: 3000, top: 3000 }));
  // });
  // canvas.add(new fabric.Circle({ radius: 30, fill: '#f55' }));
  var canvas = document.getElementById(idName);
  var context = canvas.getContext("2d");

  var imgObject = new Image();
  context.clearRect(0, 0, 200, 100);
  context.fillStyle = 'rgba(255, 255, 255, 0)';
  imgObject.src = img;
  imgObject.addEventListener('load', function () {
    context.drawImage(imgObject, 0, 0, 200, 100);
  });
}

export function downloadPdf(canvasId, name) {
  const pdf = new jsPDF();
  // 將 canvas 存為圖片
  const canvas = document.getElementById(canvasId);
  const image = canvas.toDataURL("image/png");

  // 設定背景在 PDF 中的位置及大小
  const width = pdf.internal.pageSize.width;
  const height = pdf.internal.pageSize.height;

  pdf.addImage(image, "png", 0, 0, width, height);

  // 將檔案取名並下載
  console.log("下載");
  pdf.save(`${name}.pdf`);
}