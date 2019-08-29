import { NgModule } from '@angular/core';

import { PhoneDirective } from './directives/phonenumber.directive';
import { DateDirective } from './directives/birthdate.directive';
import { DragDropDirective } from './directives/drag-and-drop.directive';

@NgModule({
    declarations: [
        PhoneDirective,
        DateDirective,
        DragDropDirective
    ],
    exports: [
        PhoneDirective,
        DateDirective,
        DragDropDirective
    ],
})

export class CoreModule { }