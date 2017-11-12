import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ExdeploymentService} from './exdeployment.service';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PanelComponent } from './panel/panel.component';
import { FieldComponent } from './field/field.component';
@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    ExdeploymentService,
    {
      provide: XSRFStrategy,
      useFactory: cookieCsrfFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function cookieCsrfFactory() {
  return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
}
