import * as pdfjsLib from 'pdfjs-dist';
// import { fabric } from "fabric";
// import { jsPDF } from "jspdf";
import { ref } from 'vue';

pdfjsLib.GlobalWorkerOptions.workerSrc = "/public/plugin/build/pdf.worker.js";

export function readPdf(file, className){    
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
          console.log(canvas)
          let context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          let renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          let renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            // console.log('Page rendered');
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