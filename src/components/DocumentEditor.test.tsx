import {DocumentEditor} from "@onlyoffice/document-editor-react";
import React, {useRef} from "react";

function onDocumentReady(event) {
  console.log("Document is loaded");
}

function onLoadComponentError(errorCode, errorDescription) {
  switch (errorCode) {
  case -1: // Unknown error loading component
    console.log(errorDescription);
    break;

  case -2: // Error load DocsAPI from http://documentserver/
    console.log(errorDescription);
    break;

  case -3: // DocsAPI is not defined
    console.log(errorDescription);
    break;
  }
}

export default function App() {
  return (
    <DocumentEditor
      id="docxEditor"
      documentServerUrl="http://31.97.63.26:8080/"
      config={{
        document: {
          fileType: "docx",
          key: "kop kopeg.docx",
          title: "kop kopeg.docx",
          url: "http://31.97.63.26:8080/kop%20kopeg.docx",
        },
        documentType: "word",
        editorConfig: {
          callbackUrl: "https://projoffice.store/documents/callback",
        },
      }}
      events_onDocumentReady={onDocumentReady}
      onLoadComponentError={onLoadComponentError}
    />
  )
}
