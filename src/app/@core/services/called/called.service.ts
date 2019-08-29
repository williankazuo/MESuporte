import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { API } from '../../consts/environment/api.const';
import { CalledModel, UploadModel, SubjectModel } from '../../models/new-called/new-called.model';
import { FilterModel } from '../../models/ended-calls/filter.model';
import { EndedCallsList } from '../../models/ended-calls/ended-list.model';


@Injectable()
export class CalledService {

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método responsavel por registrar um novo chamado
     * @param {CalledModel} called chamado que esta sendo registrado.
     */
    public registerCalled(called: CalledModel): Observable<any> {
        return this.http.post<CalledModel>(API.callSystem + '/api/Called', called);
    }

    /**
     * Método responsavel por registrar imagens relacionadas a um chamado
     * @param {UploadModel} upload imagens que estão sendo registradas de acordo com um id de um chamado.
     */
    public registerImagesCalled(upload: UploadModel): Observable<any> {
        return this.http.post<UploadModel>(API.callSystem + `/api/Called/upload/${upload.idCalled}`, upload.images);
    }

    /**
     * Método responsavel por buscar os assuntos relacionados ao chamado
     */
    public getListCallSubject(): Observable<Array<SubjectModel>> {
        return this.http.get<Array<SubjectModel>>(API.callSystem + '/api/Title');
    }

    /**
     * Método responsável por filtrar os chamados finalizados.
     * @param filter parâmetros dos filtros.
     */
    public filterEndedCalls(filter: FilterModel): Observable<Array<EndedCallsList>> {
        // tslint:disable-next-line: max-line-length
        return this.http.get<Array<EndedCallsList>>(API.callSystem + `/api/Called/filter?namePatient=${filter.namePatient}&title=${filter.title}&nameClerk=${filter.nameClerk}&dateFirst=${filter.dateFirst}&dateLast=${filter.dateLast}`);
    }

    /**
     * Método responsável por buscar um chamado por ID.
     * @param id Id do chamado
     */
    public getCallById(id: number): Observable<CalledModel> {
        return this.http.get<CalledModel>(API.callSystem + `/api/Called/${id}`);
    }
}
