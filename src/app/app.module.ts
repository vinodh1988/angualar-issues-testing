import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IssuesDashboardComponent } from './issues-dashboard/issues-dashboard.component';
import { IssueListComponent } from './IssuesDashboard/issue-list/issue-list.component';
import { IssueFormComponent } from './IssuesDashboard/issue-form/issue-form.component';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
import { HttpClient } from '@angular/common/http'; 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) 
{
   return new TranslateHttpLoader(http, './assets/', '.json'); 
}
@NgModule({
  declarations: [
    AppComponent,
    IssuesDashboardComponent,
    IssueListComponent,
    IssueFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({ 
      loader: { provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                 deps: [HttpClient] } })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
