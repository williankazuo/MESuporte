import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appDragDrop]'
})
export class DragDropDirective {

    @Output() onFileDropped = new EventEmitter<any>();

    @HostBinding('style.background-color') private background = '#FAFAFB';
    @HostBinding('style.cursor') private cursor = 'pointer';
    @HostBinding('style.opacity') private opacity = '1';

    // Dragover listener
    @HostListener('dragover', ['$event'])
    public onDragOver(evt: any) {

        evt.preventDefault();
        evt.stopPropagation();

        this.background = '#F1F1F1';
        this.opacity = '0.8';
        this.cursor = 'grab';
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt: any) {

        evt.preventDefault();
        evt.stopPropagation();

        this.background = '#FAFAFB';
        this.opacity = '1';
        this.cursor = 'grabbing';
    }

    // Drop listener
    @HostListener('drop', ['$event'])
    public ondrop(evt: any) {

        evt.preventDefault();
        evt.stopPropagation();

        this.background = '#FAFAFB';
        this.opacity = '1';
        this.cursor = 'grabbing';

        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.onFileDropped.emit(files);
        }
    }

}