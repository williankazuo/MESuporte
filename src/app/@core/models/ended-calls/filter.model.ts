export class FilterModel {
    namePatient: string;
    nameClerk: string;
    title: string;
    dateFirst: string;
    dateLast: string;

    constructor() {
        this.namePatient = '';
        this.nameClerk = '';
        this.title = '';
        this.dateFirst = '';
        this.dateLast = '';
    }
}