import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPKSdV2kKIYmvnD_p2Hz1sOm32F0dyH1c",
  authDomain: "college-182c4.firebaseapp.com",
  projectId: "college-182c4",
  storageBucket: "college-182c4.appspot.com",
  messagingSenderId: "949807767524",
  appId: "1:949807767524:web:a4885d3fdea396e16731f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;