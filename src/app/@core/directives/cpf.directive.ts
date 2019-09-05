import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: '[cpf]',
})
export class CPFDirective implements ControlValueAccessor, OnInit {

    onTouched: any;
    onChange: any;

    // tslint:disable-next-line:no-input-rename
    // tslint:disable-next-line:no-inferrable-types
    @Input() acceptZero: boolean = true;

    // metadado
    @HostListener('keyup', ['$event'])
    onkeyup($event: any) {
        let cpf = $event.target.value;
        cpf = String(cpf).replace(/[\D]/g, '');
        /*     999.999.99-99 */
        let inicio;
        let meio;
        let fim;
        let ultimo;
        if (cpf.length > 3 && cpf.length <= 6) {
            inicio = cpf.substr(0, 3);
            fim = cpf.substr(3, cpf.length - 2);
            cpf = inicio + '.' + fim;
        } else if (cpf.length > 6 && cpf.length <= 9) {
            inicio = cpf.substr(0, 3);
            meio = cpf.substr(3, 3);
            fim = cpf.substr(6, 3);
            cpf = inicio + '.' + meio + '.' + fim;
        } else if (cpf.length > 9) {
            inicio = cpf.substr(0, 3);
            meio = cpf.substr(3, 3);
            fim = cpf.substr(6, 3);
            ultimo = cpf.substr(9, 2);
            cpf = inicio + '.' + meio + '.' + fim + '-' + ultimo;
        }
        $event.target.value = cpf;
        // this.onChange(cpf);
    }

    constructor(
        private _el: ElementRef
    ) { }

    ngOnInit() { }

    /* IMPLEMENTAÇÃO DA INTERFACE */

    /**
     * Registra função a ser chamada para atualizar
     * valor na model.
     * @param {any} _fn
     */
    registerOnChange(_fn: any) {
        this.onChange = _fn;
    }

    /**
     * Registra função a ser chamada para atualizar
     * valor na model para evento touched.
     * @param {any} _fn
     */
    registerOnTouched(_fn: any): void {
        this.onTouched = _fn;
    }

    /**
     * Obtém o valor contido na model.
     * @param {any} _value
     */
    writeValue(_value: any): void {
        this._el.nativeElement.value = _value;
    }
}