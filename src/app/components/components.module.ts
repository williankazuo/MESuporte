import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../@core/core.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { FormRegistrationDataComponent } from './form-registration-data/form-registration-data.component';
import { CalledSubjectsComponent } from './called-subjects/called-subjects.component';
import { CallInformationComponent } from './call-information/call-information.component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { ModalAddDependentComponent } from './modal-add-dependent/modal-add-dependent.component';
import { ModalIncludeDependentComponent } from './modal-include-dependent/modal-include-dependent.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { ContainerChatComponent } from './container-chat/container-chat.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CoreModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        FormRegistrationDataComponent,
        CalledSubjectsComponent,
        CallInformationComponent,
        ModalAlertComponent,
        ModalAddDependentComponent,
        ModalIncludeDependentComponent,
        ResultsTableComponent,
        ContainerChatComponent,
        UploadImgComponent,
        LoadingComponent,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        FormRegistrationDataComponent,
        CalledSubjectsComponent,
        CallInformationComponent,
        ModalAlertComponent,
        ModalAddDependentComponent,
        ModalIncludeDependentComponent,
        ResultsTableComponent,
        ContainerChatComponent,
        UploadImgComponent,
        LoadingComponent
    ],
})
export class ComponentsModule { }