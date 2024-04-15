import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './modules/layout/layout.component';
import {AuthGuard} from './auth/services';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'absence',
        loadChildren: () => import('./modules/absence/absence.module').then(m => m.AbsenceModule)
      },

    ]
  },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
