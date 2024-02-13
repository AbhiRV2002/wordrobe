import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
StatusBar.setOverlaysWebView({ overlay: true });
const hideStatusBar = async () => {
  await StatusBar.hide();
};
import { register } from 'swiper/element/bundle';
register();
///////////////////////////////////////////////firebase
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { getMessaging, getToken } from '@firebase/messaging';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDBitJn3Rz7jB1cPHiwEKyuqCoTju2H9X4',
  authDomain: 'wordrobe-12107.firebaseapp.com',
  projectId: 'wordrobe-12107',
  storageBucket: 'wordrobe-12107.appspot.com',
  messagingSenderId: '223014142158',
  appId: '1:223014142158:web:47ac83a272a8227645109f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
///////////////////////////////////////////////firebase
///////////////////////////////////////////////messaging
// const messaging = getMessaging(app);
// getToken(messaging, {
//   vapidKey:
//     "BLb-NXxeBcBYvV1EDwfonhk8AtQkMOJdbRF2sUs_Xiplr3GHU805xrX62WK_qulXI2GtCCwE5EUnZEjiLhw_3lo",
// }).then((cToken) => {
//   if (cToken) {
//     console.log(cToken, "<<<");
//   } else {
//     console.log("notoken");
//   }
// });
///////////////////////////////////////////////messaging
import { AlertController, IonSelect, LoadingController } from '@ionic/angular';
import { ThemeService } from '../theme.service';
// /////////////////////////notifcations
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { ApiService } from '../api.service';
// /////////////////////////notifcations

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('mySelect', { static: false }) selectRef!: IonSelect;
  public themeColor = [
    { name: 'Default', class: 'default' },
    { name: 'Dark', class: 'dark-theme' },
    { name: 'Purple', class: 'purple' },
    { name: 'Green', class: 'green' },
    { name: 'Red', class: 'red' },
  ];
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/DWGTFZW/whiteshirt.png" alt="whiteshirt" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/wJhpdpP/white.png" alt="white" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/k199ps1/redshirt.png" alt="redshirt" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/cXpXZNg/redchecks.png" alt="redchecks" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/NVJXrQb/red.png" alt="red" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/GCsbdHj/noimg.png" alt="noimg" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/JBJFDTt/grey.png" alt="grey" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/1GR6cZd/blue.png" alt="blue" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/560GFmJ/black.png" alt="black" border="0"></a>
  // <a href="https://imgbb.com/"><img src="https://i.ibb.co/Dw0jXXk/company.png" alt="company" border="0"></a>
  shirts: any = [
    {
      color: "White",
      type: "T-shirt",
      image: "https://i.ibb.co/wJhpdpP/white.png",
      button: "light",
    },
    {
      color: "Black",
      type: "T-shirt",
      image: "https://i.ibb.co/560GFmJ/black.png",
      button: "dark",
    },
    {
      color: "Red",
      type: "T-shirt",
      image: "https://i.ibb.co/NVJXrQb/red.png",
      button: "danger",
    },
    {
      color: "Blue",
      type: "T-shirt",
      image: "https://i.ibb.co/1GR6cZd/blue.png",
      button: "primary",
    },
    {
      color: "Company",
      type: "T-shirt",
      image: "https://i.ibb.co/Dw0jXXk/company.png",
      button: "primary",
    },
    {
      color: "Grey",
      type: "T-shirt",
      image: "https://i.ibb.co/JBJFDTt/grey.png",
      button: "medium",
    },
    {
      color: "White",
      type: "Shirt",
      image: "https://i.ibb.co/DWGTFZW/whiteshirt.png",
      button: "light",
    },
    {
      color: "Red",
      type: "Shirt",
      image: "https://i.ibb.co/k199ps1/redshirt.png",
      button: "danger",
    },
    {
      color: "Red Checks",
      type: "Shirt",
      image: "https://i.ibb.co/cXpXZNg/redchecks.png",
      button: "danger",
    },
  ];
  breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  };
  today: any = new Date();
  months: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  date: any = this.today.getDate() + '-' + this.months[this.today.getMonth()];
  days: any = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  toggle: any;
  dress: any = {
    date: 'Select',
    type: 'Shirt',
    color: 'First',
    image: 'https://i.ibb.co/GCsbdHj/noimg.png',
    day: '',
  };
  snap: any;
  public selectTheme: any = 'default';

  constructor(
    private alertController: AlertController,
    private theme: ThemeService,
    public api: ApiService,
    private loadingCtrl: LoadingController
  ) {
    if (this.selectTheme) {
      this.selectTheme = localStorage.getItem('theme');
    }
    this.dynamicTheme();
  }
  dynamicTheme() {
    localStorage.setItem('theme', this.selectTheme);
    this.theme.activeTheme(this.selectTheme);
  }
  openSelect() {
    this.selectRef.open();
  }
  async presentAlert(status: any, color: any, type: any) {
    const alert = await this.alertController.create({
      header: status,
      subHeader: color + ' ' + type,
      buttons: ['OK'],
    });

    await alert.present();
  }
  ngOnInit() {
    this.showLoading();
    /////////////////////////notification///////////////////////////////////
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
    /////////////////////////notification///////////////////////////////////

    get(child(ref(getDatabase()), `shirts/`))
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          const snap = Object.keys(snapshot.val()).map((key) => ({
            key,
            ...snapshot.val()[key],
          }));
          this.shirts = snap;
          // console.log(this.shirts);
        } else {
          console.log('No data available');
        }
      })
      .then(() => {
        get(child(ref(getDatabase()), `history/`))
        .then((snapshot: any) => {
          if (snapshot.exists()) {
            const snap = Object.keys(snapshot.val()).map((key) => ({
              key,
              ...snapshot.val()[key],
            }));
            this.snap = snap;
            // console.log(this.snap);
            if (
              this.snap[this.snap.length - 1].key ==
              this.today.getFullYear() +
                ':' +
                (this.today.getMonth() + 1 < 10
                  ? '0' + (this.today.getMonth() + 1)
                  : this.today.getMonth() + 1) +
                ':' +
                (this.today.getDate() < 10
                  ? '0' + this.today.getDate()
                  : this.today.getDate())
            ) {
              //code
              this.dress = this.snap[this.snap.length - 1];
            }
          } else {
            console.log('No data available');
          }
        })
        .then(() => {
          this.loadingCtrl.dismiss();
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    //////////////////////////////////////////////////////////////////////////

  }
  change(e: any, type: any, color: any, image: any) {
    this.dress = {
      date: this.date,
      type: type,
      color: color,
      image: image,
      day: this.days[this.today.getDay()],
    };
    console.log(this.dress);

    this.toggle = document.querySelectorAll('.toggle');
    this.toggle.forEach((element: any) => {
      element.checked = false;
    });
    e.target.checked = true;
  }
  confirm() {
    console.log('confirm');
    if (this.dress.date == 'Select') {
      this.presentAlert('Error', 'Please Select Shirt', '');
    } else {
      set(
        ref(
          getDatabase(),
          'history/' +
            this.today.getFullYear() +
            ':' +
            (this.today.getMonth() + 1 < 10
              ? '0' + (this.today.getMonth() + 1)
              : this.today.getMonth() + 1) +
            ':' +
            (this.today.getDate() < 10
              ? '0' + this.today.getDate()
              : this.today.getDate()) +
            '/'
        ),
        this.dress
      ).then(() => {
        this.presentAlert('Success', this.dress.color, this.dress.type);
        let data = {
          to: 'eaQygFOJQJOTpqQsz68fq8:APA91bEESLatyDvrMRUJV66egnoCek4fWb9Be_TPoOkhLc1zTSmZ4oKidOfPLwcF9ok-3hyXXISePNA-NVLVhB5Rw35MfLDtEwqfdarLq4FXQkBPPB6lveC-AU93j2USPhRSzH_okc4j',
          notification: {
            title: `Today's dress : ${this.dress.color} ${this.dress.type}`,
            image: this.dress.image,
          },
        };
        this.api.post(data);
      });
    }
    // firebase
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();
  }
}
