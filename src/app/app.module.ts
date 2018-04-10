import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { SeriesService } from './series.service';
import { SortPipe } from './sort.pipe';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingleViewComponent,
    SortPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'view/:entityName/:id',
        component: SingleViewComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }



    ])
  ],
  providers: [SeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
