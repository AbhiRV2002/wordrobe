import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { StatusBar, Style } from "@capacitor/status-bar";
StatusBar.setOverlaysWebView({ overlay: true });
import { getDatabase, ref, child, get, set } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ThemeService } from "../theme.service";
import { LoadingController } from "@ionic/angular";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBitJn3Rz7jB1cPHiwEKyuqCoTju2H9X4",
  authDomain: "wordrobe-12107.firebaseapp.com",
  projectId: "wordrobe-12107",
  storageBucket: "wordrobe-12107.appspot.com",
  messagingSenderId: "223014142158",
  appId: "1:223014142158:web:47ac83a272a8227645109f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
///////////////////////////////////////////////firebase
@Component({
  selector: "app-history",
  templateUrl: "./history.page.html",
  styleUrls: ["./history.page.scss"],
})
export class HistoryPage implements OnInit {
  snap: any = [];
  public selectTheme: any = "default";
  constructor(private location: Location, private theme: ThemeService,
    private loadingCtrl: LoadingController) {
    if (this.selectTheme) {
      this.selectTheme = localStorage.getItem("theme");
    }
  }
  back(): void {
    this.location.back();
  }
  ngOnInit() {
    this.showLoading()
    get(child(ref(getDatabase()), `history/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const snap = Object.keys(snapshot.val()).map((key) => ({
            key,
            ...snapshot.val()[key],
          }));
          this.snap = snap;
          console.log(this.snap);
        } else {
          console.log("No data available");
        }
      }).then(()=>{
        this.loadingCtrl.dismiss()
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();
  }
}
