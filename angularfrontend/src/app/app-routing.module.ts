import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PostsComponent } from './posts/posts/posts.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'updatepost/:id',
    component: UpdatePostComponent
  },          
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
