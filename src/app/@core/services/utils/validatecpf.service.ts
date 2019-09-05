import { Injectable } from '@angular/core';

@Injectable()
export class ValidateCPFService {

    constructor() { }


    public validateCPF(cpf: any): boolean {
        const numberVerificadorUm = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        const numberVerificadorDois = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        cpf = cpf.replace(/\./g, '').replace(/\-/g, ''); /* Deixa apenas caracter de Number */
        cpf = cpf.split('');
        const cpfFinal = cpf.slice(cpf.length - 2, cpf.length);

        if (cpf.length === 11) { /* Só verifica se for maior que 11 */
            if (
                cpf[0] === cpf[1] && cpf[0] === cpf[2] && cpf[0] === cpf[3] && cpf[0] === cpf[4] && cpf[0] === cpf[9] && cpf[0] === cpf[10]
            ) {
                return false;
            } else {
                let count = 0;
                let resultado = 0;
                cpf.map(x => {
                    if (count < 9) {
                        resultado = resultado + (x * numberVerificadorUm[count]);
                        count++;
                    }
                })
                resultado = (resultado * 10) % 11;
                /* Se o resto for igual a 10 ou 11 o digito começa com 0 */
                if (resultado === 10 || resultado === 11) {
                    resultado = 0;
                }
                if (resultado === cpfFinal[0]) {
                    count = 0;
                    resultado = 0;
                    cpf.map(x => {
                        if (count < 10) {
                            resultado = resultado + (x * numberVerificadorDois[count]);
                            count++;
                        }
                    })
                    resultado = (resultado * 10) % 11;
                    if (resultado === 10 || resultado === 11) {
                        resultado = 0;
                    }
                    if (resultado !== cpfFinal[1]) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
}
