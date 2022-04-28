import { useState, useEffect } from "react";
import { projectStorage, db } from "../firebase/config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = db.collection('images')

    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(uploadTask)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let percentuale = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentuale);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
                setError(error);
              break;
            case 'storage/canceled':
              // User canceled the upload
                setError(error);
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
                setError(error);
              break;
          }        
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log('File available at', downloadURL);
          setUrl(downloadURL)
            // aggiungo il file al database
          collectionRef.add({ url: downloadURL, createdAt: serverTimestamp() })
        });
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
