import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pin, User, UserRes } from './User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = `${environment.apiUrl}/odds`;
  private pinUrl = `${environment.apiUrl}/odds/pin`;

  constructor(private httpClient: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  CurrentUser?: User
  CurrentUid!: String

  saveUser(user: User,uid: String){
    this.CurrentUser = user;
    this.CurrentUid = uid;
  }

  addUser(user: User): Observable<User> {
    console.log('addUser() running ...');
    console.log(user);
    return this.httpClient.post<User>(
      this.registerUrl,
      user,
      this.httpOption
    );
  }

  getUser(): Observable<UserRes[]> {
   return this.httpClient.get<UserRes[]>(this.registerUrl+"/",this.httpOption);
  }

  sendPin(pinId: String): Observable<Pin> {
    console.log("sendPin() Running ..")
    console.log("ID PIN:" + pinId)
    return this.httpClient.get<Pin>(this.pinUrl+"/success/"+pinId,this.httpOption);
  }

  getPin(uid: String): Observable<Pin> {
    console.log("getPin() Running");
    console.log(this.pinUrl+"/"+uid,this.httpOption);
    return this.httpClient.get<Pin>(this.pinUrl+"/"+uid,this.httpOption);
  }
}
