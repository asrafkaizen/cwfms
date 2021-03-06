import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service'


const routes: Routes = [
  { path: 'list', loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule' },
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  { 
    path: 'idea', 
    loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule'
   },
  { 
    path: 'idea/:id', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule' 
  },

  

  // {
  //   path: 'feed',
  //   loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  // },
  // {
  //   path: 'uploader',
  //   loadChildren: () => import('./uploader/uploader.module').then( m => m.UploaderPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  // },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
