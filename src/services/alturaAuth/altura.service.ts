import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions} from '@angular/http';
import { ApiVars } from '../../api-variables';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AlturaAuthService {

  body: any;
  options: any;
  apiURL: any;
  processing: boolean;
  serverError: boolean;
  approved: boolean;
  credentials = {
    username: '',
    password: '',
    password1: '',
    password2: '',
    token: ''
  };
  message: string;
  error: boolean;
  user: string;
  alturaIdToken: string;

  // Observable navItem source
  private _navItemSource = new BehaviorSubject<string>(null);
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  
  constructor(private http: Http,
              public storage: Storage) {}


  public authSuccess(token) {
    //console.log(token);
    this.error = null;
    this.storage.set('altura_id_token', token);
    this.alturaIdToken = token;
    this.approved = true;
    // service command
    this._navItemSource.next(token);
  }

  // Submit your credentials
  public postUser(credentials, connection) {

      //show spinner
      this.processing = true;

      if (connection == "login"){
	      let headers = new Headers({
	        'Content-Type': 'application/json'
	      });
	      this.options = new RequestOptions({
	        headers: headers
	      });

	      this.body = JSON.stringify({
	        username: credentials.username,
	        password: credentials.password
	      });

	      this.apiURL = ApiVars.API_LOGIN;
      }
      else {
	      let headers = new Headers({
	        'Content-Type': 'application/json'
	      });
	      this.options = new RequestOptions({
	        headers: headers
	      });

	      this.body = JSON.stringify({
	        username: credentials.username,
	        password1: credentials.password1,
	        password2: credentials.password2
	      });

	      this.apiURL = ApiVars.API_REGISTRATION;
      }

      this.http
        .post(this.apiURL,
              this.body,
              this.options)
        .toPromise()
        .then(response => {
                          let key: string = response.json().key;
                          
                          this.authSuccess(key);

                          //stop spinner
                          this.processing = false;

                          },
               error =>   { 
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
