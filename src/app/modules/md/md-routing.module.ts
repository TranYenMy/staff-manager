import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamplePageComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    component: ExamplePageComponent
  },
  {
    path: 'example',
    component: ExamplePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MDRoutingModule {
}
