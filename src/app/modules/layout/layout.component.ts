import {Component} from '@angular/core';
import {AuthService} from '../../auth/services';
import {Observable} from 'rxjs';

@Component({
  selector: 'cons-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;
  role = "SYS_ADMIN"
  user$: Observable<any>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  onLogout(): void {
    this.authService.logout();
  }
}
