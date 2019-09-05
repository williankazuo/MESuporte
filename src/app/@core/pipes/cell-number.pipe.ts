import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cellphone' })
export class CellPhonePipe implements PipeTransform {
    constructor() { }

    transform(value: any) {
        if (value !== null) {
            let inicio;
            let meio;
            let fim;
            value = value.replace(/[\D]/g, '');
            if (value.length === 11) {
                inicio = value.substr(0, 2);
                meio = value.substr(2, 5);
                fim = value.substr(7, 4);
                value = inicio + ' ' + meio + '-' + fim;
            }
        }

        return value;
    }
}
