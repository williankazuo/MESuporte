import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[date]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: DateDirective,
        multi: true
    }]
})
export class DateDirective implements ControlValueAccessor, OnInit {
    onTouched: any;
    onChange: any;

    // metadado
    @HostListener('keyup', ['$event'])
    onkeyup($event: any) {
        let birth = $event.target.value;
        birth = String(birth).replace(/[\D]/g, '');
        let inicio;
        let meio;
        let fim;
        if (birth.lenth === 2) {
            inicio = birth.substr(0, 2);
            fim = birth.substr(2, birth.length - 1);
            birth = inicio + '/' + fim;
        } else if (birth.length > 2 && birth.length <= 4) {
            inicio = birth.substr(0, 2);
            meio = birth.substr(2, 2);
            birth = inicio + '/' + meio;
        } else if (birth.length > 4) {
            inicio = birth.substr(0, 2);
            meio = birth.substr(2, 2);
            fim = birth.substr(4, 4);
            birth = inicio + '/' + meio + '/' + fim;
        }
        $event.target.value = birth;
        this.onChange(birth);
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
