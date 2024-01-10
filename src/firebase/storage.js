import { app } from './config'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, getBlob } from "firebase/storage";
import { writeUserData } from './database'

import imageCompression from 'browser-image-compression';

const storage = getStorage(app)

//--------------------------- Firebase Storage ---------------------------
async function uploadStorage(ruteDB, file, db, callback) {

    const imagesRef = ref(storage, ruteDB);

    const options = {
        maxWidthOrHeight: 500,
        maxSizeMB: 0.07,
        alwaysKeepResolution: true,
        useWebWorker: true,
        maxIteration: 300,
        fileType: 'image/webp'
    }

    const compressedFile = file.type != 'image/gif' ? await imageCompression(file, options) : file
    uploadBytes(imagesRef, compressedFile).then(async (snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath))
            .then((url) => {
                let obj = {
                    url,
                }
                console.log(obj)
                return writeUserData(ruteDB, { ...db, ...obj, }, callback)
            })
            .catch((error) => {
            });
    });
}

function downloadFile(path) {

    getDownloadURL(ref(storage, path))
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        console.log(blob)
      };
      xhr.open('GET', url);
      xhr.send();
  
    })
    .catch((error) => {
      // Handle any errors
    });




    // getBlob(ref(storage, path))
    //     .then((blob) => {
    //        return console.log(blob)
    //     })
    //     .catch((err) => {
    //        return console.log(err)
    //     })
}




export { uploadStorage, downloadFile }