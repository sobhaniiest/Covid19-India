import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TotalData } from './data-model';

@Injectable({
	providedIn: 'root'
})
export class DataFetchService {

	private dataUrl = `https://api.covid19india.org/csv/latest/state_wise_daily.csv`;

	private data: TotalData = { date: [], states: [], totalConfirmed: [], totalDeceased: [], totalRecovered: [], totalActive: [] };
	private index: number = 0;
	emitData = new Subject<TotalData>();

	constructor(private http: HttpClient) { }

	private callDataAPI(): Observable<any> {
		return this.http.get(this.dataUrl, { responseType: 'text' });
	}

	getData() {
		this.callDataAPI()
			.subscribe(res => {
				this.data = { date: [], states: [], totalConfirmed: [], totalDeceased: [], totalRecovered: [], totalActive: [] };
				for (let i = 0; i < 39; i++) {
					this.data.states.push({ confirmed: [], recovered: [], deceased: [] });
				}

				let rows = res.split('\n');
				rows.splice(0, 1);
				
				for (let row of rows) {
					let cols = row.split(',');
					if (this.index % 3 === 0) {
						this.data.date?.push(cols[1]);
					}
					if (cols[2] === 'Confirmed') {
						for (let i = 3; i < 42; i++) {
							this.data.states[i - 3].confirmed?.push(+cols[i]);
						}
					}
					if (cols[2] === 'Recovered') {
						for (let i = 3; i < 42; i++) {
							this.data.states[i - 3].recovered?.push(+cols[i]);
						}
					}
					if (cols[2] === 'Deceased') {
						for (let i = 3; i < 42; i++) {
							this.data.states[i - 3].deceased?.push(+cols[i]);
						}
					}
					this.index++;
				}

				for (let s of this.data.states) {
					let tc = 0, tr = 0, td = 0;
					for (let i = 0; i < s.confirmed.length; i++) {
						tc += s.confirmed[i];
						tr += s.recovered[i];
						td += s.deceased[i];
					}
					this.data.totalConfirmed.push(tc);
					this.data.totalRecovered.push(tr);
					this.data.totalDeceased.push(td);
					this.data.totalActive.push(tc - (tr + td));
				}

				this.emitData.next({ ...this.data });
			},
			error => {

			});
	}
}

