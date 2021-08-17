import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import initialFile from "./files/template.docx";

const Webviewer = () => {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: initialFile,
      },
      viewer.current
    ).then((instance) => {
      //   const { documentViewer } = instance.Core;
      // you can now call WebViewer APIs here...
    });
  }, []);

  return (
    <div className="MyComponent">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
};

export default Webviewer;
