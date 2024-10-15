// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   // apiKey: "AIzaSyCPKSdV2kKIYmvnD_p2Hz1sOm32F0dyH1c",
//   // authDomain: "college-182c4.firebaseapp.com",
//   // projectId: "college-182c4",
//   // storageBucket: "college-182c4.appspot.com",
//   // messagingSenderId: "949807767524",
//   // appId: "1:949807767524:web:a4885d3fdea396e16731f1"
//   apiKey: "AIzaSyBJ-MruDnp2Le2LqJlFaspAaIry2Ld9bpY",
//   authDomain: "campus-flow-cms.firebaseapp.com",
//   projectId: "campus-flow-cms",
//   storageBucket: "buckets/campus-flow-cms.appspot.com",
//   messagingSenderId: "289319076206",
//   appId: "1:289319076206:web:659be68f4b940a8b64817f"
// };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJ-MruDnp2Le2LqJlFaspAaIry2Ld9bpY",
  authDomain: "campus-flow-cms.firebaseapp.com",
  projectId: "campus-flow-cms",
  storageBucket: "campus-flow-cms.appspot.com",
  messagingSenderId: "289319076206",
  appId: "1:289319076206:web:659be68f4b940a8b64817f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
