const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCwux7HBWgUzftKZYt38DPYOU07oWMtowY",
  authDomain: "wddm-58f4d.firebaseapp.com",
  projectId: "wddm-58f4d",
  storageBucket: "wddm-58f4d.appspot.com",
  messagingSenderId: "887524626916",
  appId: "1:887524626916:web:d614ed01170f489badf7f1",
  measurementId: "G-025SS92219",
});

//Authentication
//Init authentication from Firebase console
const auth = firebaseApp.auth();

const signUp = () => {
  //Allow us to sign up
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      //If successfully created user
      document.write("You are Signed Up");
      console.log(result);
    })
    .catch((error) => {
      //If unsuccessfully created user
      console.log(error.code);
      console.log(error.message);
    });
};

const signIn = () => {
  //Allow us to sign in
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      //Signed IN
      document.write("You are Signed In");
      console.log(result);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};
