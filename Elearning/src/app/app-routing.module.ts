import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { SearchComponent } from './search/search.component';
import { AdminAuthComponent } from './admin-auth/admin-auth.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUpdateCourseComponent } from './admin-update-course/admin-update-course.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { AdminAddCourseComponent } from './admin-add-course/admin-add-course.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: AdminAuthComponent,
    path: 'admin-auth',
  },
  {
    component:AdminHomeComponent,
    path:'admin-home',
    canActivate:[AuthGuard]
  },{
    component:AdminAddCourseComponent,
    path:'admin-add-course',
    canActivate:[AuthGuard]
  },{
    component:AdminUpdateCourseComponent,
    path:'admin-update-course/:id',
    canActivate:[AuthGuard]
  },
  {
    component: SearchComponent,
    path:'search/:query'
  },{
    component:CourseDetailsComponent,
    path:'details/:courseId'
  },{
    component:UserAuthComponent,
    path:'user-auth'
  },{
    component:CartPageComponent,
    path:'cart-page'
  },{
    component:CheckoutComponent,
    path:'checkout'
  },{
    component:MyOrdersComponent,
    path:'my-orders'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
