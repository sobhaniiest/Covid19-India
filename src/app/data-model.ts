export interface SingleData {
    confirmed: number[];
    recovered: number[];
    deceased: number[];
}

export interface TotalData {
    date: string[];
    states: SingleData[];
    totalConfirmed: number[];
    totalRecovered: number[];
    totalDeceased: number[];
    totalActive: number[];
}

export interface DateTableElement {
    date: string;
    position: number;
    confirmed: number;
    recovered: number;
    deceased: number;
}

export interface StateTableElement {
    state: string;
    position: number;
    confirmed: number;
    recovered: number;
    deceased: number;
    active: number;
}