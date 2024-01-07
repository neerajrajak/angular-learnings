import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BasicHighlightDirective} from 'src/app/basic-highlight/basic-highlight.directive';
import { BetterHighlighDirective } from './better-highlight/better-highligh.directive';
import { UnlessDirectiveDirective } from './unless-directive.directive'

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlighDirective,
    UnlessDirectiveDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
