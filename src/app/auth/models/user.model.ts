import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number | null;
  username: string| null;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  emailVerified: boolean | null;

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.username = user.username || '';
    this.email = user.email || '';
    this.imageUrl = user.imageUrl || './assets/media/users/default.jpg';
    this.emailVerified = false;
  }

  constructor() {
    super();
    this.id = null;
    this.username = null;
    this.name = null;
    this.email = null;
    this.imageUrl = null;
    this.emailVerified = null;
  }
}
