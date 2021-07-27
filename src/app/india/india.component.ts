import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
// import proj4 from 'proj4';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { States } from '../constant';
import { DataFetchService } from '../data-fetch.service';
import { TotalData, DateTableElement, StateTableElement } from '../data-model';

declare var require: any;
const worldMap = require('@highcharts/map-collection/countries/in/custom/in-all-disputed.geo.json');

HC_map(Highcharts);

@Component({
	selector: 'app-india',
	templateUrl: './india.component.html',
	styleUrls: ['./india.component.scss']
})
export class IndiaComponent implements OnInit, OnDestroy {
	Highcharts: typeof Highcharts = Highcharts;
	chartMap: Highcharts.Options;

	public states: string[] = States;
	private subscription: Subscription;
	public dataShow: any;
	public index: number = 0;

	private dateWiseCasesData: DateTableElement[] = [];
	public dateWiseCasesTable: string[] = ['position', 'date', 'confirmed', 'recovered', 'deceased'];
	public dateWiseCasesTableSource = new MatTableDataSource<DateTableElement>(this.dateWiseCasesData);

	private stateWiseCasesData: StateTableElement[] = [];
	public stateWiseCasesTable: string[] = ['position', 'state', 'confirmed', 'recovered', 'deceased', 'active'];
	public stateWiseCasesTableSource = new MatTableDataSource<StateTableElement>(this.stateWiseCasesData);

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	private BarChart: any;
	private PieChart: any;
	private color: string[] = []
	private dataTable: number[] = [];
	public title: string = '';
	public piBlock: number = 5;
	public piStatus: string = 'Confirmed';

	constructor(public dataService: DataFetchService) { }

	ngOnInit(): void {
		this.dataService.getData();
		this.subscription = this.dataService.emitData.subscribe((res: TotalData) => {
			this.dataShow = res;
			this.index = this.dataShow.date.length - 1;
			for (let i = 0; i <= this.index; i++) {
				this.dateWiseCasesData.push({
					position: +i + 1,
					date: res.date[i],
					confirmed: res.states[0].confirmed[i],
					recovered: res.states[0].recovered[i],
					deceased: res.states[0].deceased[i]
				});
			}

			for (let i = 1; i < res.states.length - 1; i++) {
				this.stateWiseCasesData.push({
					position: +i,
					state: this.states[+i - 1],
					confirmed: res.totalConfirmed[i],
					recovered: res.totalRecovered[i],
					deceased: res.totalDeceased[i],
					active: res.totalActive[i]
				})
			}
			this.initPieChart('Confirmed', 5);
			this.initbBarChart('Confirmed');
			this.initMap('Confirmed');

			this.dateWiseCasesTableSource.paginator = this.paginator;
			this.dateWiseCasesTableSource.sort = this.sort;
			this.stateWiseCasesTableSource.sort = this.sort;
		})
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	private initMap(status: string) {
		this.dataTable = [];
		if (status == 'Confirmed') {
		  this.dataTable = [...this.dataShow.totalConfirmed].slice(1);
		}
		if (status == 'Deceased') {
		  this.dataTable = [...this.dataShow.totalDeceased].slice(1);
		}
		if (status == 'Recovered') {
		  this.dataTable = [...this.dataShow.totalRecovered].slice(1);
		}
		if (status == 'Active') {
		  this.dataTable = [...this.dataShow.totalActive].slice(1);
		}
		this.chartMap = {
		  chart: {
			map: worldMap as any,
			// proj4: proj4
		  },
		  title: {
			text: 'India'
		  },
		  subtitle: {
			text: `Hover over the map and select case type to visualize the data state wise`
		  },
		  plotOptions: {
			series: {
			  point: {
				events: {
				  mouseOver: function() {
	
				  }
				}
			  }
			}
		  },
		  mapNavigation: {
			enabled: true,
			buttonOptions: {
			  alignTo: 'spacingBox'
			}
		  },
		  legend: {
			enabled: true
		  },
		  colorAxis: {
			min: 0
		  },
		  series: [{
			name: this.title,
			states: {
			  hover: {
				color: '#BADA55'
			  }
			},
			dataLabels: {
			  enabled: true,
			  format: '{point.name}'
			},
			allAreas: false,
			data: [
			  ['andaman and nicobar', this.dataTable[0]],
			  ['andhra pradesh', this.dataTable[1]],
			  ['arunanchal pradesh', this.dataTable[2]],
			  ['assam', this.dataTable[3]],  
			  ['bihar', this.dataTable[4]],
			  ['chandigarh', this.dataTable[5]],
			  ['chhattisgarh', this.dataTable[6]],
			  ['dadara and nagar havelli', this.dataTable[7]],
			  ['daman and diu', this.dataTable[8]],
			  ['nct of delhi', this.dataTable[9]],
			  ['goa', this.dataTable[10]],
			  ['gujarat', this.dataTable[11]],
			  ['haryana', this.dataTable[12]],
			  ['himachal pradesh', this.dataTable[13]],
			  ['jammu and kashmir', this.dataTable[14]],
			  ['jharkhand', this.dataTable[15]],
			  ['karnataka', this.dataTable[16]],
			  ['kerala', this.dataTable[17]],
			  ['lakshadweep', this.dataTable[19]],
			  ['madhya pradesh', this.dataTable[20]],
			  ['maharashtra', this.dataTable[21]],
			  ['manipur', this.dataTable[22]],
			  ['meghalaya', this.dataTable[23]],
			  ['mizoram', this.dataTable[24]],
			  ['nagaland', this.dataTable[25]],
			  ['odisha', this.dataTable[26]],
			  ['puducherry', this.dataTable[27]],
			  ['punjab', this.dataTable[28]],
			  ['rajasthan', this.dataTable[29]],
			  ['sikkim', this.dataTable[30]],
			  ['tamil nadu', this.dataTable[31]],
			  ['telangana', this.dataTable[32]],
			  ['tripura', this.dataTable[33]],
			  ['uttar pradesh', this.dataTable[34]],
			  ['uttarakhand', this.dataTable[35]],
			  ['west bengal', this.dataTable[36]]
			]
		  } as Highcharts.SeriesMapOptions]
		};
		
	  }

	public updateBarChart(status: string) {
		this.initbBarChart(status);
	}

	private initbBarChart(status: string) {
		this.dataTable = [];
		if (status == 'Confirmed') {
			this.title = 'Daily Confirmed Cases';
			this.dataTable = [...this.dataShow.states[0].confirmed];
			this.createBarChart();
		}
		if (status == 'Recovered') {
			this.title = 'Daily Recovered Cases';
			this.dataTable = [...this.dataShow.states[0].recovered];
			this.createBarChart();
		}
		if (status == 'Deceased') {
			this.title = 'Daily Deceased Cases';
			this.dataTable = [...this.dataShow.states[0].deceased];
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

	public updatePieChart(status: string, piBlock: number) {
		if (status != '')
			this.piStatus = status;
		if (piBlock != 0)
			this.piBlock = piBlock;
		this.initPieChart(this.piStatus, this.piBlock);
		this.initMap(this.piStatus);
	}

	private initPieChart(status: string, piBlock: number) {
		this.dataTable = [];
		if (status == 'Confirmed') {
			this.dataTable = [...this.dataShow.totalConfirmed];
			this.createPieChart();
		}
		if (status == 'Deceased') {
			this.dataTable = [...this.dataShow.totalDeceased];
			this.createPieChart();
		}
		if (status == 'Recovered') {
			this.dataTable = [...this.dataShow.totalRecovered];
			this.createPieChart();
		}
		if (status == 'Active') {
			this.dataTable = [...this.dataShow.totalActive];
			this.createPieChart();
		}
	}

	private dynamicColors() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	}

	private createPieChart() {
		let piTable: number[] = [...this.dataTable];
		piTable.sort(function (a, b) { return b - a });
		let piStates: string[] = [];
		for (let i = 1; i <= this.piBlock; i++) {
			this.color.push(this.dynamicColors());
			piStates.push(this.states[this.dataTable.indexOf(piTable[i]) - 1]);
		}

		if (this.PieChart != undefined)
			this.PieChart.destroy();

		this.PieChart = new Chart('pieChart', {
			type: 'pie',
			data: {
				labels: piStates,
				datasets: [{
					label: 'No. of Cases',
					data: piTable.slice(1, this.piBlock + 1),
					backgroundColor: this.color,
					borderColor: 'rgba(200, 200, 200, 0.75)',
					hoverBorderColor: 'rgba(200, 200, 200, 1)',
					borderWidth: 1
				}]
			},
			options: {
				title: {
					display: true
				}
			}
		});
	}
}
