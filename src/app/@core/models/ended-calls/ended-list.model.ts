export class EndedCallsList {
    id: number;
    namePatient: string;
    nameClerk: string;
    titles: Array<string>;
    date: string;
    hour: string;
    type: string;

    constructor() {
        this.id = 0;
        this.namePatient = '';
        this.nameClerk = '';
        this.titles = new Array<string>();
        this.date = '';
        this.hour = '';
        this.type = '';
    }
}