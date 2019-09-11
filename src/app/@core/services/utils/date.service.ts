import { Injectable } from '@angular/core';

@Injectable()
export class DateUtilService {

    constructor() { }


    /**
     * Método responsável por converter a data que vem do Backend.
     * ex. (2019-02-24T00:00:00 ou sem o Time 2019-02-24) para exibição, 24/02/2019
     * @param dateString data que vem do backend.
     */
    public convertShowDate(dateString: string) {
        if (dateString && dateString !== '') {
            const indexOf = dateString.indexOf('T');
            if (indexOf !== -1) {
                dateString = dateString.substring(0, indexOf);
            }
            const dates = dateString.split('-');
            dateString = `${dates[2]}/${dates[1]}/${dates[0]}`;
        }
        return dateString;
    }

    /**
     * Método responsável por converter a data em string e devolver se é uma idade válida para adicionar um dependente.
     * @param dateString data em string que vem do backend.
     */
    public calculateAge(dateString: string): boolean {
        if (dateString && dateString !== '') {
            const dates = dateString.split('/');
            dateString = `${dates[2]}-${dates[1]}-${dates[0]}T00:00:00`;
            const dateTime = new Date(dateString);
            const ageDifMs = Date.now() - dateTime.getTime();
            const ageDate = new Date(ageDifMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);

            if (age < 18) {
                return true;
            } else {
                return false;
            }
        }
    }
}
