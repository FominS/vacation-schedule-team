
export class Period {
    start: string;
    end: string;

    constructor( start: string, end: string){
        this.start = start
        this.end = end
    }
}

export class Shedule {
    id: string;
    firstname: string;
    surname: string;
    middlename: string;
    periods: Array<Period>;
    position: string;
    employes: Array<Shedule>;
    head: boolean; 
    
    constructor (id: string, firstname: string, surname: string, middlename: string,
        periods: Array<Period>, position: string, employes: Array<Shedule>, head: boolean ){
        this.id = id
        this.firstname = firstname
        this.surname = surname
        this.middlename = middlename
        this.periods = periods
        this.position = position
        this.employes = employes
        this.head = head
    }
}

