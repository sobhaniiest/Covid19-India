import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { States } from '../constant';
import { DataFetchService } from '../data-fetch.service';
import { TotalData, DateTableElement } from '../data-model';

@Component({
	selector: 'app-states',
	templateUrl: './states.component.html',
	styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit, OnDestroy {

	private subscription: Subscription;
	public states: string[] = States;
	public state: string = 'Andaman and Nicobar Islands';
	public stateIndex: number = 1;
	public dataShow: any;
	public index: number = 0;

	private dateWiseCasesData: DateTableElement[] = [];
	public dateWiseCasesTable: string[] = ['position', 'date', 'confirmed', 'recovered', 'deceased'];
	public dateWiseCasesTableSource = new MatTableDataSource<DateTableElement>(this.dateWiseCasesData);

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	private BarChart: any;
	private dataTable: number[] = [];
	public title: string = '';

	constructor(public dataService: DataFetchService) { }

	ngOnInit(): void {
		this.dataService.getData();
		this.subscription = this.dataService.emitData.subscribe((res: TotalData) => {
			this.dataShow = res;
			this.index = this.dataShow.date.length - 1;
			this.stateIndex = this.states.indexOf(this.state) + 1;

			for (let i = 0; i <= this.index; i++) {
				this.dateWiseCasesData.push({
					position: +i + 1,
					date: res.date[i],
					confirmed: res.states[this.stateIndex].confirmed[i],
					recovered: res.states[this.stateIndex].recovered[i],
					deceased: res.states[this.stateIndex].deceased[i]
				});
			}
			this.initbBarChart('Confirmed');
			this.dateWiseCasesTableSource.paginator = this.paginator;
			this.dateWiseCasesTableSource.sort = this.sort;

		})
	}

	public onStateChange() {
		this.stateIndex = this.states.indexOf(this.state) + 1;
		for (let i = 0; i <= this.index; i++) {
			this.dateWiseCasesData[i] = ({
				position: +i + 1,
				date: this.dataShow.date[i],
				confirmed: this.dataShow.states[this.stateIndex].confirmed[i],
				recovered: this.dataShow.states[this.stateIndex].recovered[i],
				deceased: this.dataShow.states[this.stateIndex].deceased[i]
			});
		}
		this.initbBarChart('Confirmed');
		this.dateWiseCasesTableSource.paginator = this.paginator;
		this.dateWiseCasesTableSource.sort = this.sort;
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	public updateBarChart(status: string) {
		this.initbBarChart(status);
	}

	private initbBarChart(status: string) {
		this.dataTable = [];
		if (status == 'Confirmed') {
			this.title = 'Daily Confirmed Cases';
			this.dataTable = this.dataShow.states[this.stateIndex].confirmed;
			this.createBarChart();
		}
		if (status == 'Recovered') {
			this.title = 'Daily Recovered Cases';
			this.dataTable = this.dataShow.states[this.stateIndex].recovered;
			this.createBarChart();
		}
		if (status == 'Deceased') {
			this.title = 'Daily Deceased Cases';
			this.dataTable = this.dataShow.states[this.stateIndex].deceased;
			this.createBarChart();
		}
	}

	private createBarChart() {
		if (this.BarChart != undefined)
			this.BarChart.destroy();
		this.BarChart = new Chart('barChart', {
			type: 'bar',
			data: {
				labels: this.dataShow.date,
				datasets: [{
					label: 'No. of Cases',
					data: this.dataTable,
					backgroundColor: 'rgba(54, 162, 245, 0.2)',
					borderColor: 'rgba(54, 162, 255, 1)',
					borderWidth: 1
				}]
			},
			options: {
				title: {
					display: true
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}
}
