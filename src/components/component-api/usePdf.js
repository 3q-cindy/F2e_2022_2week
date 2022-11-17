import * as pdfjsLib from 'pdfjs-dist';
import { fabric } from "fabric";
import { jsPDF } from "jspdf";

export function useReadPDF() {
    const Base64Prefix = "data:application/pdf;base64,";
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/public/plugin/build/pdf.worker.js";

    class PdfReader {
        canvas;
        constructor(canvas) {
            this.canvas = canvas;
        }
        //使用blob解析data
        readBlob = (blob) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener("load", () => resolve(reader.result));
                reader.addEventListener("error", reject);
                reader.readAsDataURL(blob);
            });
        }

        printPDF = async (pdfData) => {
            const dataStr = await this.readBlob(pdfData);
            const data = atob((dataStr).substring(Base64Prefix.length));

            // Using DocumentInitParameters object to load binary data.
            const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
            const pdfPage = await pdfDoc.getPage(1);

            const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            // 控制顯示PDF的寬高
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderContext = {
                canvasContext: context,
                viewport,
            };
            const renderTask = pdfPage.render(renderContext);

            return renderTask.promise.then(() => canvas);
        }

        pdfToImage = async (pdfData) => {
            const scale = 1 / window.devicePixelRatio;
            return new fabric.Image(pdfData, {
                scaleX: scale,
                scaleY: scale,
            });
        }

        pdfEvent = async (file) => {
            this.canvas.requestRenderAll();
            console.log(file)
            const pdfData = await this.printPDF(file);
            const pdfImage = await this.pdfToImage(pdfData);

            // 調整canvas大小
            this.canvas.setWidth(pdfImage.width / window.devicePixelRatio);
            this.canvas.setHeight(pdfImage.height / window.devicePixelRatio);
            this.canvas.setBackgroundImage(pdfImage, this.canvas.renderAll.bind(this.canvas));
        }
    }
    return { PdfReader }
}

//pdf download
export function usePdfDownloader() {
    const pdf = new jsPDF();

    function downloadPDF(canvas, name) {
        // 將 canvas 存為圖片
        const image = canvas.toDataURL("image/png");
        const width = pdf.internal.pageSize.width;
        const height = pdf.internal.pageSize.height;

        pdf.addImage(image, "png", 0, 0, width, height);

        // 將檔案取名並下載
        pdf.save(`${name}.pdf`);
    }
    return { downloadPDF }
}