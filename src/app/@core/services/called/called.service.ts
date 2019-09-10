import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { API } from '../../consts/environment/api.const';
import { CalledModel, UploadModel, SubjectModel } from '../../models/new-called/new-called.model';
import { FilterModel } from '../../models/ended-calls/filter.model';
import { EndedCallsList } from '../../models/ended-calls/ended-list.model';
import { CallReset } from '../../consts/ended-calls/callReset.const';


@Injectable()
export class CalledService {

    // criação da propriedade do tipo observavel para 'emitir' as um estado expecifico
    private resetForm = new BehaviorSubject(CallReset.reset);
    // propriedade para o componente que a utilizar conseguir se inscrever para receber a atualização do novo estado
    public resetFormSubscriber = this.resetForm.asObservable();

    constructor(
        private http: HttpClient
    ) { }

    /**
     * metodo responsavel por emitir um estado a todos os componentes que estiver incrito
     * @param reset propriedade para permitir o reset do formulário
     */
    public resetFields(reset: boolean): void {
        this.resetForm.next(reset);
    }

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
        // formata os files para formData para envio ao backend
        const formData = new FormData();
        upload.images.forEach(file => {
            formData.append('images', file.file, file.file.name);
        });
        return this.http.post<UploadModel>(API.callSystem + `/api/Called/image/${upload.idCalled}`, formData);
    }

    /**
     * Metodo responsavel por trazer as imagens relacionadas a um id expecifico de um chamado
     */
    public getImagesById(idCalled: number): Observable<Array<string>> {
        return this.http.get<Array<string>>(API.callSystem + `/api/Called/image/${idCalled}`);
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
