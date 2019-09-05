import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterDependent } from '../../models/dependent/filter-dependent.model';
import { Observable } from 'rxjs';
import { API } from '../../consts/environment/api.const';
import { ListDependentArray } from '../../models/dependent/list-dependent.model';
import { AttachDependentModel } from '../../models/dependent/attach-dependent.model';
import { NewDependentModel } from '../../models/dependent/new-dependent.model';

@Injectable({
    providedIn: 'root'
})
export class DependentService {

    constructor(private http: HttpClient) { }

    /**
     * Método responsável por filtrar os dependentes na listagem.
     * @param filter opões de filtros.
     */
    public filterDependent(filter: FilterDependent): Observable<ListDependentArray> {
        return this.http.get<ListDependentArray>(API.callSystem + `/api/ExternalServices/siaf` +
            `/filter?name=${filter.name}&medicalRecord=${filter.medicalRecord}&passport=${filter.passport}&document=${filter.document}`);
    }


    /**
     * Método responsável por vincular um dependente ao titular.
     * @param attachDependent dependente que vai ser vinculado.
     */
    public attachDependent(attachDependent: AttachDependentModel) {
        return this.http.post<any>(API.callSystem + '/api/ExternalServices/siaf/union', attachDependent);
    }


    /**
     * Método responsável por adicionar um novo dependente e vincular ao titular.
     * @param newDependent novo dependente.
     */
    public addDependent(newDependent: NewDependentModel) {
        return this.http.post<any>(API.callSystem + '/api/ExternalServices/siaf', newDependent);
    }

}
