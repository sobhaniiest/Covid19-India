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

	states = States;
	private subscription: Subscription;
	public dataShow: any;
	public index: number = 0;

	dateWiseCasesData: DateTableElement[] = [];
	dateWiseCasesTable: string[] = ['position', 'date', 'confirmed', 'recovered', 'deceased'];
	dateWiseCasesTableSource = new MatTableDataSource<DateTableElement>(this.dateWiseCasesData);

	stateWiseCasesData: StateTableElement[] = [];
	stateWiseCasesTable: string[] = ['position', 'state', 'confirmed', 'recovered', 'deceased', 'active'];
	stateWiseCasesTableSource = new MatTableDataSource<StateTableElement>(this.stateWiseCasesData);

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	private BarChart: any;
	public PieChart: any;
	private color: string[] = []
	private datatable: number[] = [];
	public title: string = '';
	public stateTitle: string = '';
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
		console.log('destroy')
		this.subscription.unsubscribe();
	}

	initMap(status: string) {
		this.datatable = [];
		if (status == 'Confirmed') {
		  this.datatable = [...this.dataShow.totalConfirmed].slice(1);
		}
		if (status == 'Deceased') {
		  this.datatable = [...this.dataShow.totalDeceased].slice(1);
		}
		if (status == 'Recovered') {
		  this.datatable = [...this.dataShow.totalRecovered].slice(1);
		}
		if (status == 'Active') {
		  this.datatable = [...this.dataShow.totalActive].slice(1);
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
			  ['andaman and nicobar', this.datatable[0]],
			  ['andhra pradesh', this.datatable[1]],
			  ['arunanchal pradesh', this.datatable[2]],
			  ['assam', this.datatable[3]],  
			  ['bihar', this.datatable[4]],
			  ['chandigarh', this.datatable[5]],
			  ['chhattisgarh', this.datatable[6]],
			  ['dadara and nagar havelli', this.datatable[7]],
			  ['daman and diu', this.datatable[8]],
			  ['nct of delhi', this.datatable[9]],
			  ['goa', this.datatable[10]],
			  ['gujarat', this.datatable[11]],
			  ['haryana', this.datatable[12]],
			  ['himachal pradesh', this.datatable[13]],
			  ['jammu and kashmir', this.datatable[14]],
			  ['jharkhand', this.datatable[15]],
			  ['karnataka', this.datatable[16]],
			  ['kerala', this.datatable[17]],
			  ['lakshadweep', this.datatable[19]],
			  ['madhya pradesh', this.datatable[20]],
			  ['maharashtra', this.datatable[21]],
			  ['manipur', this.datatable[22]],
			  ['meghalaya', this.datatable[23]],
			  ['mizoram', this.datatable[24]],
			  ['nagaland', this.datatable[25]],
			  ['odisha', this.datatable[26]],
			  ['puducherry', this.datatable[27]],
			  ['punjab', this.datatable[28]],
			  ['rajasthan', this.datatable[29]],
			  ['sikkim', this.datatable[30]],
			  ['tamil nadu', this.datatable[31]],
			  ['telangana', this.datatable[32]],
			  ['tripura', this.datatable[33]],
			  ['uttar pradesh', this.datatable[34]],
			  ['uttarakhand', this.datatable[35]],
			  ['west bengal', this.datatable[36]]
			]
		  } as Highcharts.SeriesMapOptions]
		};
		
	  }

	updateBarChart(status: string) {
		this.initbBarChart(status);
	}

	initbBarChart(status: string) {
		this.datatable = [];
		if (status == 'Confirmed') {
			this.title = 'Daily Confirmed Cases';
			this.datatable = [...this.dataShow.states[0].confirmed];
			this.createBarChart();
		}
		if (status == 'Recovered') {
			this.title = 'Daily Recovered Cases';
			this.datatable = [...this.dataShow.states[0].recovered];
			this.createBarChart();
		}
		if (status == 'Deceased') {
			this.title = 'Daily Deceased Cases';
			this.datatable = [...this.dataShow.states[0].deceased];
			this.createBarChart();
		}
	}

	createBarChart() {
		if (this.BarChart != undefined)
			this.BarChart.destroy();
		this.BarChart = new Chart('barChart', {
			type: 'bar',
			data: {
				labels: this.dataShow.date,
				datasets: [{
					label: 'No. of Cases',
					data: this.datatable,
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

	updatePieChart(status: string, piBlock: number) {
		if (status != '')
			this.piStatus = status;
		if (piBlock != 0)
			this.piBlock = piBlock;
		this.initPieChart(this.piStatus, this.piBlock);
		this.initMap(this.piStatus);
	}

	initPieChart(status: string, piBlock: number) {
		this.datatable = [];
		if (status == 'Confirmed') {
			this.datatable = [...this.dataShow.totalConfirmed];
			this.createPieChart();
		}
		if (status == 'Deceased') {
			this.datatable = [...this.dataShow.totalDeceased];
			this.createPieChart();
		}
		if (status == 'Recovered') {
			this.datatable = [...this.dataShow.totalRecovered];
			this.createPieChart();
		}
		if (status == 'Active') {
			this.datatable = [...this.dataShow.totalActive];
			this.createPieChart();
		}
	}

	dynamicColors() {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	}

	createPieChart() {
		console.log(this.datatable)
		let piTable: number[] = [...this.datatable];
		piTable.sort(function (a, b) { return b - a });
		let piStates: string[] = [];
		for (let i = 1; i <= this.piBlock; i++) {
			this.color.push(this.dynamicColors());
			piStates.push(this.states[this.datatable.indexOf(piTable[i]) - 1]);
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
