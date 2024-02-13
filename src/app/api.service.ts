import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(public http: HttpClient) {}

  post(body: any) {
    console.log("waitfornotification");
    const header = new HttpHeaders({
      Authorization:
        "key=AAAAM-ytwM4:APA91bEIeEJqbMbk5kfI8UA3drj4Qu_6Nft7tpSqH3avFcJsbU9Ihph-s-4qfp3z6mdFT4xkJ-DoO7GxHOIYvs_pOsHXnNtPq33Pvq8MQkTkfuWlj5OmJPrSBFB3YkBJUrfUXnqkJqOR",
      "Content-Type": "application/json",
    });
    return this.http
      .post("https://fcm.googleapis.com/fcm/send", body, {
        headers: header,
      })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
