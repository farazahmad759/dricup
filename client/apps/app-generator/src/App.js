import logo from "./logo.svg";
import JSZip from "jszip";
import saveAs from "file-saver";
import { useEffect, useState } from "react";
import axios from "axios";
// var zip = new JSZip();

import "./App.css";

function App() {
  const [generatorConfig, setGeneratorConfig] = useState({});
  useEffect(() => {});
  const downloadProject = () => {
    axios.get("http://localhost:3000/api/files").then((res) => {
      let files = res.data.data;
      if (files) {
        var zip = new JSZip();
        zip.folder("server/public/images");
        zip.folder("server/public/javascripts");
        zip.folder("client/apps");
        files.forEach((file) => {
          let _content = generateContent(
            JSON.parse(file.content_vars),
            file.content
          );
          zip.file(file.path, _content);
        });
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, "archive.zip");
        });
      }
    });
  };
  function generateContent(options, content) {
    let _content = "`" + content + "`";
    _content = new Function("options", "return `" + content + "`").call(
      content,
      options
    );
    // _content = `
    // {
    //   "hello": "hi",
    //   ${options.knex && '"knex": "1.2.3"'}
    // }
    // `;
    return _content;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() => {
            downloadProject();
          }}
        >
          Download
        </button>
      </header>
    </div>
  );
}

export default App;
