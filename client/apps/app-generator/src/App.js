import logo from "./logo.svg";
import JSZip from "jszip";
import saveAs from "file-saver";
import { useEffect, useState } from "react";
// var zip = new JSZip();

import "./App.css";

function App() {
  const [page, setPage] = useState(null);
  useEffect(() => {});
  const downloadProject = () => {
    var zip = new JSZip();
    zip.file("package.json", "hello");
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "archive.zip");
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={downloadProject}>Download</button>
      </header>
    </div>
  );
}

export default App;
