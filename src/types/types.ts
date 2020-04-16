export enum ScaleTypes {'months' = 0, 'days' = 1}

export class Period {
    start: string;
    end: string;

    constructor( start: string, end: string){
        this.start = start
        this.end = end
    }
}

export class Schedule {
    id: string;
    firstname: string;
    surname: string;
    middlename: string;
    periods: Array<Period>;
    position: string;
    employes: Array<Schedule>;
    leader: boolean; 
    
    constructor (id: string, surname: string, firstname: string,  middlename: string,
        periods: Array<Period>, position: string, employes: Array<Schedule>, leader: boolean ){
        this.id = id
        this.firstname = firstname
        this.surname = surname
        this.middlename = middlename
        this.periods = periods
        this.position = position
        this.employes = employes
        this.leader = leader
    }
}

