import { NgModule } from '@angular/core';

import { PhoneDirective } from './directives/phonenumber.directive';
import { DateDirective } from './directives/birthdate.directive';
import { DragDropDirective } from './directives/drag-and-drop.directive';
import { CPFDirective } from './directives/cpf.directive';
import { CPFPipe } from './pipes/cpf.pipe';
import { CellPhonePipe } from './pipes/cell-number.pipe';

@NgModule({
    declarations: [
        PhoneDirective,
        DateDirective,
        DragDropDirective,
        CPFDirective,
        CPFPipe,
        CellPhonePipe
    ],
    exports: [
        PhoneDirective,
        DateDirective,
        DragDropDirective,
        CPFDirective,
        CPFPipe,
        CellPhonePipe
    ],
})

export class CoreModule { }