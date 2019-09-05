import { Injectable } from '@angular/core';

@Injectable()
export class CPFMaskService {

    constructor() { }

    /**
     * Método responsável por remover a máscara de CPF.
     */
    public removeCPFMask(value: string) {
        return value.replace(/[\D]/g, '');
    }
}
