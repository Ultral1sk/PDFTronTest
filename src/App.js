import React from "react";
import { saveAs } from "file-saver";

// example is still not working
const App = () => {
  window.Core.setWorkerPath("WebViewer/lib/core");

  function saveBuffer(buf, name, mimetype) {
    const blob = new Blob([buf], {
      type: mimetype,
    });
    return saveAs(blob, name);
  }

  function saveBufferAsPDFDoc(buf, name) {
    return saveBuffer(buf, name, "application/pdf");
  }

  const generatePdf = () => {
    ((exports) => {
      const Core = exports.Core;
      const PDFNet = Core.PDFNet;
      const convertOfficeToPDF = (inputUrl, outputName, l) =>
        Core.office2PDFBuffer(inputUrl, { l }).then((buffer) => {
          console.log(`Finished downloading ${outputName}`);
          saveBufferAsPDFDoc(buffer, outputName);
        });

      const runOfficeToPDF = (fileName, type) => {
        console.log(fileName, type);
        const inputDir = "../files/";

        PDFNet.initialize()
          .then(() => {
            console.log(`inside first promise`);
            return convertOfficeToPDF(
              inputDir + fileName,
              `converted_${type}.pdf`
            );
          })
          .then(() => {
            console.log("Test Complete!");
          })
          .catch((err) => {
            console.log("An error was encountered! :(", err);
          });
      };
      return runOfficeToPDF("template.docx", "DOCX");
    })(window);
  };

  return <button onClick={generatePdf}>Click</button>;
};

export default App;
