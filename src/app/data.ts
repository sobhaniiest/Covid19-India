export interface TotalData {
    date : string[],
    confirm : number[][],
    recover : number[][],
    decease : number[][]
}

export interface TableElement {
    date: string;
    position: number;
    confirmed: number;
    recovered: number;
    deceased: number;
}

export interface StateTableElement {
    state: string;
    position: number;
    confirm: number;
    recover: number;
    decease: number;
    active: number;
}