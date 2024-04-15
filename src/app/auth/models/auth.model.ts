export class AuthModel {
  accessToken: string;
  refreshToken: string;
  type: string;

  setAuth(auth: AuthModel) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
    this.type = auth.type;
  }

  constructor() {
    this.accessToken = '';
    this.refreshToken = '';
    this.type = '';
  }
}
