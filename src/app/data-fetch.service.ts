import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { DataModel } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {

  private DataUrl = `https://api.covid19india.org/csv/latest/state_wise_daily.csv`;
  
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.DataUrl, { responseType: 'text' })
    .pipe(
      map(result => {
        let data: DataModel[] = [];
        let rows = result.split('\n');
        rows.splice(0, 1);
        //console.log(rows);
        rows.forEach(row=>{
          let cols = row.split(',')
          //console.log(cols)
          data.push({
            date : cols[0],
            status : cols[1],
            total : +cols[2],
            AN : +cols[3],
            AP : +cols[4],
            AR : +cols[5],
            AS : +cols[6],
            BR : +cols[7],
            CH : +cols[8],
            CT : +cols[9],
            DN : +cols[10],
            DD : +cols[11],
            DL : +cols[12],
            GA : +cols[13],
            GJ : +cols[14],
            HR : +cols[15],
            HP : +cols[16],
            JK : +cols[17],
            JH : +cols[18],
            KA : +cols[19],
            KL : +cols[20],
            LA : +cols[21],
            LD : +cols[22],
            MP : +cols[23],
            MH : +cols[24],
            MN : +cols[25],
            ML : +cols[26],
            MZ : +cols[27],
            NL : +cols[28],
            OR : +cols[29],
            PY : +cols[30],
            PB : +cols[31],
            RJ : +cols[32],
            SK : +cols[33],
            TN : +cols[34],
            TG : +cols[35],
            TR : +cols[36],
            UP : +cols[37],
            UT : +cols[38],
            WB : +cols[39],
            UN : +cols[40]
          })
        })
        return data;
      })
    )
  }

}
