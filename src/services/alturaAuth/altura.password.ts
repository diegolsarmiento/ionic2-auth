import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions} from '@angular/http';
import { ApiVars } from '../../api-variables';

@Injectable()
export class AlturaPassword {

  body: any;
  options: any;
  apiURL: any;
  processing: boolean;
  serverError: boolean;
  credentials = {
    uid: '',
    token: '',
    new_password1: '',
    new_password2: '',
    email: ''
  };
  message: string;
  error: boolean;
  alturaIdToken: string;
  approved: boolean;

  // Observable navItem source
  private _navItemSource = new BehaviorSubject<string>(null);
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  
  constructor(private http: Http,
              public storage: Storage) {}

  public authPassword(token) {
    //console.log(token);
    this.error = null;
    this.storage.set('altura_id_token', token);
    this.alturaIdToken = token;
    this.approved = true;
    // service command
    this._navItemSource.next(token);
  }

  // Submit your credentials
  public recoverPassword(credentials, connection) {

      //show spinner
      this.processing = true;

      if (connection == "reset"){
	      let headers = new Headers({
	        'Content-Type': 'application/json'
	      });
	      this.options = new RequestOptions({
	        headers: headers
	      });

	      this.body = JSON.stringify({
	        email: credentials.email
	      });

	      this.apiURL = ApiVars.API_RECOVER;
      }
      else {
	      let headers = new Headers({
	        'Content-Type': 'application/json'
	      });
	      this.options = new RequestOptions({
	        headers: headers
	      });

	      this.body = JSON.stringify({
	        uid: credentials.uid,
	        token: credentials.token,
	        new_password1: credentials.new_password1,
          new_password2: credentials.new_password2
	      });

	      this.apiURL = ApiVars.API_CONFIRM;
      }

      this.http
        .post(this.apiURL,
              this.body,
              this.options)
        .toPromise()
        .then(response => {
                          let key: string = response.json().key;

                          this.authPassword(key);

                          //stop spinner
                          this.processing = false;
                          //Check
                          console.log("key: "+key);

                          },
               error =>   {
                          //Check
                          console.log("error: "+error);
                          //Handle error
                          this.handleError(error),
                          this.turnOffSpinning(error)
                          });
  }

  public turnOffSpinning(event: any) {
    this.processing = false;
    this.serverError = true;
  }

  public onChangeInput(event: any) {
    this.processing = false;
    this.serverError = false;
  }

  //In case of error, let me know
  public handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }

}
