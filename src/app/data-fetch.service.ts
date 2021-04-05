import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { TotalData } from './data';

@Injectable({
  providedIn: 'root'
})

export class DataFetchService {

  private DataUrl = `https://api.covid19india.org/csv/latest/state_wise_daily.csv`;
  
  d : number = 0;
  date = [];
  confirmedtable : number[][];
  recoveredtable : number[][];
  deceasedtable : number[][];
  
  constructor(private http: HttpClient) { }

  getTotalData() {
    return this.http.get(this.DataUrl, { responseType: 'text' })
    .pipe(
      map(result => {
        this.confirmedtable = [];
        for(var i: number = 0; i < 38; i++) {
          this.confirmedtable[i] = [];
        }
        this.recoveredtable = [];
        for(var i: number = 0; i < 38; i++) {
          this.recoveredtable[i] = [];
        }
        this.deceasedtable = [];
        for(var i: number = 0; i < 38; i++) {
          this.deceasedtable[i] = [];
        }
        this.date = [];

        let data: TotalData[] = [];
        let rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach(row=>{
          let cols = row.split(',')

          if (this.d%3 == 0)
          this.date.push(cols[1])

          this.d += 1;

          for (var i = 0; i < 38; i++) {
            if(cols[2] === "Confirmed") {
              this.confirmedtable[i].push(+cols[i+3])
            }
            else if (cols[2] === "Recovered") {
              this.recoveredtable[i].push(+cols[i+3])
            } else {
                this.deceasedtable[i].push(+cols[i+3])
            }
          }
        })
        data.push({date : this.date, 
                  confirm : this.confirmedtable, 
                  recover : this.recoveredtable, 
                  decease : this.deceasedtable})
        return data;
      })
    )
  }
}
