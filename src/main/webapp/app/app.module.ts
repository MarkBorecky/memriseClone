import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MemriseCloneSharedModule } from 'app/shared/shared.module';
import { MemriseCloneCoreModule } from 'app/core/core.module';
import { MemriseCloneAppRoutingModule } from './app-routing.module';
import { MemriseCloneHomeModule } from './home/home.module';
import { MemriseCloneEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    MemriseCloneSharedModule,
    MemriseCloneCoreModule,
    MemriseCloneHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MemriseCloneEntityModule,
    MemriseCloneAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class MemriseCloneAppModule {}
