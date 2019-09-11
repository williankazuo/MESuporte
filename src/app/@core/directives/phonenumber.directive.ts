import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[phone]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: PhoneDirective,
        multi: true
    }]
})
export class PhoneDirective implements ControlValueAccessor, OnInit {

    onTouched: any;
    onChange: any;

    // metadado
    @HostListener('keyup', ['$event'])
    onkeyup($event: any) {
        let phone = $event.target.value;
        phone = String(phone).replace(/[\D]/g, '');
        /* (xx) xxxxx-xxxx */
        let inicio;
        let meio;
        let fim;
        if (phone.length > 2 && phone.length <= 5) {
            inicio = phone.substr(0, 2);
            fim = phone.substr(2, phone.length - 1);
            phone = inicio + ' ' + fim;
        } else if (phone.length > 5 && phone.length <= 6) {
            inicio = phone.substr(0, 2);
            meio = phone.substr(2, 4);
            phone = inicio + ' ' + meio;
        } else if (phone.length > 6 && phone.length <= 10) {
            inicio = phone.substr(0, 2);
            meio = phone.substr(2, 4);
            fim = phone.substr(6, 4);
            phone = inicio + ' ' + meio + '-' + fim;
        } else if (phone.length > 10) {
            inicio = phone.substr(0, 2);
            meio = phone.substr(2, 5);
            fim = phone.substr(7, 4);
            phone = inicio + ' ' + meio + '-' + fim;
        }
        $event.target.value = phone;
        this.onChange(phone);
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

    /**
     * Implementação da interface de desabilitado. Se essa interface não for implementada não funciona o disable com uma diretiva.
     * @param isDisabled desabilitado.
     */
    setDisabledState(isDisabled: boolean): void {
        this._el.nativeElement.disabled = isDisabled;
    }
}
