export class ModalAlert {
    title: string;
    image: string;
    text: string;
    button1Text: string;
    button2Text: string;
    button1Action: any;
    button2Action: any;

    constructor() {
        this.title = '';
        this.image = '';
        this.button1Text = '';
        this.button2Text = '';
    }
}