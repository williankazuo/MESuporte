import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { MESupportRouting } from './me-support.routing';

import { MeSupportComponent } from './me-support.component';
import { HomeCalledComponent } from 'src/app/pages/home-called/home-called.component';
import { EndedCallsComponent } from 'src/app/pages/ended-calls/ended-calls.component';
import { NewCalledComponent } from 'src/app/pages/new-called/new-called.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/@core/core.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        MESupportRouting,
        FormsModule,
        CoreModule,
    ],
    declarations: [
        MeSupportComponent,
        HomeCalledComponent,
        EndedCallsComponent,
        NewCalledComponent
    ],
    exports: [],
})
export class MESupportModule { }