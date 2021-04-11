import { Routes } from '@angular/router';
import { HomeRoutes } from './home/home.router';
import { IndexRoutes } from './index/index.router'; 
import { NoPageRoutes } from './no-page/no-page.routes';
export const routes : Routes  = [...HomeRoutes, ...IndexRoutes,...NoPageRoutes];
  