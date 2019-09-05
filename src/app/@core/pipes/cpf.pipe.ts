import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpf' })
export class CPFPipe implements PipeTransform {
    constructor() { }
    /* xxx.xxx.xxx.xx */
    transform(value: string): any {
        if (value !== null) {
            let digits = value.toString();
            if (digits.length === 11) {
                let inicio;
                let meio;
                let fim;
                let ultimo;
                digits = digits.replace(/[\D]/g, '');
                inicio = digits.substr(0, 3);
                meio = digits.substr(3, 3);
                fim = digits.substr(6, 3);
                ultimo = digits.substr(9, 2);
                digits = inicio + '.' + meio + '.' + fim + '-' + ultimo;
            }
            return digits;
        } else {
            return '';
        }
    }
}
