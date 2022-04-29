import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { db } from "../firebase/config";
import ProgressBar from "./ProgressBar";
import { giocatori, mappe } from "../costanti";

const AddLapSchema = Yup.object().shape({
  giocatore: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  mappa: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  tempo: Yup.number().required("Required").moreThan(0, "Non può essere 0"),
});

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

  const aggiungiTempo = async (dati) => {
    try {
      const docRef = await addDoc(collection(db, "tempi"), {
        ...dati,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Formik
      initialValues={{
        giocatore: "",
        mappa: "",
        tempo: 0,
      }}
      validationSchema={AddLapSchema}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        // console.log(values);
        aggiungiTempo(values);
        // console.log(JSON.stringify(values, null, 2));
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-input">
            <label htmlFor="giocatore">giocatore</label>
            <Field
              id="giocatore"
              name="giocatore"
              placeholder="giocatore"
              as="select"
            >
              {giocatori.map((giocatore) => (
                <option value={giocatore}>{giocatore}</option>
              ))}
              {errors.giocatore && touched.giocatore ? (
                <div className="form-error">{errors.giocatore}</div>
              ) : null}
            </Field>
          </div>
          <div className="form-input">
            <label htmlFor="mappa">mappa</label>
            <Field id="mappa" name="mappa" placeholder="mappa" as="select">
              {mappe.map((mappa) => (
                <option value={mappa.nome}>{mappa.nome}</option>
              ))}
            </Field>
            {errors.mappa && touched.mappa ? (
              <div className="form-error">{errors.mappa}</div>
            ) : null}
          </div>
          <div className="form-input">
            <label htmlFor="tempo">tempo</label>
            <Field name="tempo" placeholder="tempo" />
            {errors.tempo && touched.tempo ? (
              <div className="form-error">{errors.tempo}</div>
            ) : null}
          </div>
          {/* <div className="caricamento-file">
            <input type="file" onChange={changeHandler} />
          </div> */}
          {/* <div className="output">
            {error && <div className="error">{error}</div>}
            {file && <div className="filename">{file.name}</div>}
            {file && <ProgressBar file={file} setFile={setFile} />}
          </div> */}

          <button type="submit">Inserisci</button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
