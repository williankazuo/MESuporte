import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistrationModel } from '../../models/form-registration-data/user-form.model';
import { API } from '../../consts/environment/api.const';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientDataService {
    public emitterSearch = new EventEmitter();

    constructor(private http: HttpClient) { }

    /**
     * Método responsável por buscar os dados do paciente pelo documento.
     * Este método busca os dados do Meu Einstein.
     * @param document documento
     */
    public getByDocumentME(document: string): Observable<UserRegistrationModel> {
        return this.http.get<UserRegistrationModel>(API.callSystem + `/api/ExternalServices/me/${document}/document`);
    }

    /**
     * Método responsável por buscar os dados do paciente pelo prontuário.
     * Este método busca os dados do Meu Einstein.
     * @param medicalRecord prontuário
     */
    public getByMedicalRecordME(medicalRecord: string): Observable<UserRegistrationModel> {
        return this.http.get<UserRegistrationModel>(API.callSystem + `/api/ExternalServices/me/${medicalRecord}/medicalRecord`);
    }


    /**
     * Método responsável por atualizar os dados do paciente do Meu Einstein.
     * @param user modelo de dados do usuário.
     */
    public updateDataME(user: UserRegistrationModel): Observable<UserRegistrationModel> {
        return this.http.put<UserRegistrationModel>(API.callSystem + '/api/ExternalServices/me', user);
    }


    /**
     * Método responsável por emitir dois valores para preencher o formulário de dados do paciente.
     * @param typeSearch tipo de busca, prontuário ou documento.
     * @param value valor da busca.
     */
    public searchData(typeSearch: string, value: string) {
        this.emitterSearch.emit([typeSearch, value]);
    }


}
