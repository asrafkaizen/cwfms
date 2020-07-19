import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
              {
                path: 'feed',
                loadChildren: () => import('.././feed/feed.module').then( m => m.FeedPageModule)
              },
              {
                path: 'uploader',
                loadChildren: () => import('.././uploader/uploader.module').then( m => m.UploaderPageModule)
              },
              {
                path: 'post/:id',
                loadChildren: () => import('.././post/post.module').then( m => m.PostPageModule)
              },
            ]

      },
      
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule {}