import { app } from './config'
import { getDatabase, ref, onValue, set, child, get, remove, update, query, orderByChild, equalTo } from "firebase/database";

const db = getDatabase(app);
const dbRef = ref(getDatabase());
// -------------------------------Firebase Realtime Database------------------------------------



async function getSpecificData(query, setUserSpecificData, callback) {
  try {
    const snapshot = await get(child(dbRef, `${query}`))
    console.log(query, snapshot.exists())
    if (snapshot.exists()) {
      setUserSpecificData(snapshot.val())
      callback && callback !== undefined ? callback() : ''
      return snapshot.val()
    } else {
      callback && callback !== undefined ? callback() : ''
      setUserSpecificData(null)
      return null
    }
  } catch (error) {
    console.error(error);
  }
}


function getSpecificDataEq(route, children, eq, setUserData, callback) {

  get(query(ref(db, route), orderByChild(children), equalTo(eq)))
    .then(async (snapshot) => {

      if (snapshot.exists()) {
        let snap = snapshot.val()
        console.log(snap)
        setUserData(snap)
        callback && callback()
      }

    })

}

function getLate(setUserData, callback) {
  get(query(ref(db, i), limitToLast(1), orderByChild('date'), endAt(new Date().getTime()),))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let snap = snapshot.val()
        setUserData(snap)
        callback && callback()
      }
    });
}

function writeUserData(rute, object, callback) {
  console.log(rute)
  console.log(object)
  update(ref(db, rute), object)
    .then(() => {
      callback !== null ? callback() : ''
    })
    .catch((err) =>{ 
      console.log(err)
    })
}
function readUserData(route, setUserData, callback) {
  onValue(ref(db, route), (snapshot) => {
    if (snapshot.exists()) {
      setUserData(snapshot.val());
      callback && callback !== undefined ? callback() : ''
    } else {
      callback && callback !== undefined ? callback() : ''
    }
  });
}
function readUserDataLength(route, callback) {
  onValue(ref(db, route), (snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.size)
      const length = snapshot.size
      callback && callback !== undefined ? callback(length) : ''
    } else {
      callback && callback !== undefined ? callback() : ''
    }
  });
}
async function removeData(rute, setUserSuccess, callback) {
  await remove(ref(db, rute))
    .then(() => {
      callback !== null ? callback() : ''
    })
    .catch((err) => {
      console.log(err)
      setUserSuccess('repeat')
    });
}


export { readUserData, readUserDataLength, removeData, getSpecificData, getSpecificDataEq, getLate, writeUserData }