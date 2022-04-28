import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const tipiUploadAccettati = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    // il primo file, con index 0, perchè il campo upload permette di caricare più files
    let selected = e.target.files[0];
    console.log(selected);
    if (selected && tipiUploadAccettati.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <form>
      <input type="file" onChange={changeHandler} />
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="filename">{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
