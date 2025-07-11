import {DocSpace} from "@onlyoffice/docspace-react";
import React, {useRef} from "react";

function onAppReady(e) {
  console.log("ONLYOFFICE DocSpace App is ready!");
}

function onAppError(e) {
  console.log(e);
}

function onLoadComponentError(errorCode, errorDescription) {
  console.log(errorDescription);
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DocSpace
        url="https://sschouse2507030347.onlyoffice.com"
        config={{
          frameId: "onlyoffice-docspace",
          mode: "manager",
          width: "100%",
          height: "100%",
          events: {
            onAppReady: "onAppReady",
            onAppError: "onAppError",
          },
        }}
        onLoadComponentError={onLoadComponentError}
      />
    </div>
  );
}
