import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private registerUrl = `${environment.apiUrl}/odds`;

  constructor(private httpClient: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addUser(user: User): Observable<User> {
    console.log('This is Service');
    console.log(user);
    return this.httpClient.post<User>(
      this.registerUrl,
      user,
      this.httpOption
    );
  }
}
