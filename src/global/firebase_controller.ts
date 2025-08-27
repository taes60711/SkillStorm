import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type Auth,
  type UserCredential
} from "firebase/auth";

export class FirebaseController {
  private static instance: FirebaseController;

  static firebaseConfig = {
    apiKey: "AIzaSyAQV5Gbn4D6DEniJhRRumiTgCiI0qqHCIw",
    authDomain: "socialmediammatch.firebaseapp.com",
    projectId: "socialmediammatch",
    storageBucket: "socialmediammatch.firebasestorage.app",
    messagingSenderId: "921286210624",
    appId: "1:921286210624:web:6174d115bb44e455c7dba5",
    measurementId: "G-GER2EB3NKQ"
  };
  static auth: Auth;
  static provider: GoogleAuthProvider;

  public static getInstance(): FirebaseController {
    if (!FirebaseController.instance) {
      FirebaseController.instance = new FirebaseController();
    }
    const app = initializeApp(this.firebaseConfig);
    FirebaseController.auth = getAuth(app);
    FirebaseController.provider = new GoogleAuthProvider();
    return FirebaseController.instance;
  }

  async loginWithGoogle(): Promise<UserCredential | undefined> {
    try {
      const result = await signInWithPopup(
        FirebaseController.auth,
        FirebaseController.provider
      );
      console.log("使用者資訊:", result.user);
      return result;
    } catch (error) {
      console.error("登入錯誤:", error);
      return undefined;
    }
  }

  logout = async () => {
    await signOut(FirebaseController.auth);
  };
}

export const firebaseController = FirebaseController.getInstance();
