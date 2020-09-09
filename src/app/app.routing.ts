import {HomepageComponent} from './pages/homepage/homepage/homepage.component';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent
  }
];
