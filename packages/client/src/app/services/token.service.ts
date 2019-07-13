import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  private token: string;
  private tokenName = 'user';

  constructor() {
    const user = JSON.parse(localStorage.getItem(this.tokenName));
    this.token = user && user.token;
  }

  getToken(): string {

    return this.token;

  }

  setToken(
    email: string,
    token: string
  ): void {

    this.token = token;
    localStorage.setItem(this.tokenName, JSON.stringify({ email, token }));

  }

  clearToken(): void {

    this.token = null;
    localStorage.removeItem(this.tokenName);

  }

}
