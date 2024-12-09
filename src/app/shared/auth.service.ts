import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { username: 'user1', password: 'password1', role: 'user' },
    { username: 'admin', password: 'adminpassword', role: 'admin' }
  ];

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  private currentUser: User | null = null;

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      this.loggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.loggedInSubject.next(false);
  }

  isLogged(): boolean {
    return this.loggedInSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}