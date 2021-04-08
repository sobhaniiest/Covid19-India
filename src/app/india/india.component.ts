import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { DataFetchService } from 'src/app/data-fetch.service';
import { Chart } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableElement, StateTableElement } from 'src/app/data';
import { MatSort } from '@angular/material/sort';
import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import proj4 from 'proj4';
import { environment } from '../../environments/environment';

declare var require: any;

HC_map(Highcharts);
var myvar: number = 0;

const worldMap = require('@highcharts/map-collection/countries/in/custom/in-all-disputed.geo.json');


@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})

export class IndiaComponent implements OnInit {
  env = environment.cache;
  Highcharts: typeof Highcharts = Highcharts;
  chartMap: Highcharts.Options;
  
  TableData: TableElement[] = []
  StateTableData: StateTableElement[] = []

  displayedColumns: string[] = ['position', 'date', 'confirmed', 'recovered', 'deceased'];
  dataSource = new MatTableDataSource<TableElement>(this.TableData);
  displayedCols: string[] = ['position', 'state', 'confirm', 'recover', 'decease', 'active'];
  dataS = new MatTableDataSource(this.StateTableData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  totalConfirmed = 0;
  totalRecovered = 0;
  totalDeceased = 0;
  totalActive = 0;

  lastdayConfirmed = 0;
  lastdayRecovered = 0;
  lastdayDeceased = 0;
  lastday : string;

  datatable = [];
  title = '';
  PieChart;
  BarChart;
  coloR = [];

  st = 'Andaman and Nicobar Islands';
  si : number = 1;

  index : number;
  date = [];
  confirmedtable : number[][];
  recoveredtable : number[][];
  deceasedtable : number[][];

  StateTotalConfirmed = [];
  StateTotalRecovered = [];
  StateTotalDeceased = [];
  StateTotalActive = [];

  states: Array<string> =  ['Andaman and Nicobar Islands', 
                            'Andhra Pradesh', 
                            'Arunachal Pradesh', 
                            'Assam', 'Bihar', 
                            'Chandigarh', 'Chhattisgarh', 
                            'Dadra and Nagar Haveli', 
                            'Daman and Diu', 'Delhi', 'Goa', 
                            'Gujarat', 'Haryana', 'Himachal Pradesh', 
                            'Jammu and Kashmir', 'Jharkhand', 
                            'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 
                            'Madhya Pradesh', 'Maharashtra', 'Manipur', 
                            'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 
                            'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 
                            'Tamil Nadu', 'Telangana', 'Tripura', 
                            'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  constructor(private dataFetch: DataFetchService) { }

  ngOnInit(): void {
    console.log('Environment --->  ' + this.env);
    this.dataFetch.getTotalData()
      .subscribe({
          next : (result)=>{
            result.forEach(element => {
              this.date = element.date
              this.confirmedtable = element.confirm
              this.recoveredtable = element.recover
              this.deceasedtable = element.decease
            })

            for (var i = 0; i < 37; i++) {
              this.StateTotalConfirmed[i] = 0;
              this.StateTotalDeceased[i] = 0;
              this.StateTotalRecovered[i] = 0;
            }
            this.totalConfirmed = 0;
            this.totalRecovered = 0;
            this.totalDeceased = 0; 
            this.totalActive = 0;

            this.index = +this.date.length
            for (var i = 0; i < this.index; i++) {
              this.totalConfirmed += this.confirmedtable[0][i]
              this.totalRecovered += this.recoveredtable[0][i]
              this.totalDeceased += this.deceasedtable[0][i]
            }

            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.lastdayConfirmed = this.confirmedtable[0][this.index-1]
            this.lastdayRecovered = this.recoveredtable[0][this.index-1]
            this.lastdayDeceased = this.deceasedtable[0][this.index-1]
            this.lastday = this.date[this.index-1]


            this.initBarChart('c');

            for (var i = 0; i < 37; i++) {
              for (var j = 0; j < this.index; j++) {
                this.StateTotalConfirmed[i] += this.confirmedtable[i+1][j]
                this.StateTotalRecovered[i] += this.recoveredtable[i+1][j]
                this.StateTotalDeceased[i] += this.deceasedtable[i+1][j]
              }
              this.StateTotalActive[i] = this.StateTotalConfirmed[i] - (this.StateTotalRecovered[i]+this.StateTotalDeceased[i])
            }

            for(var index in this.states){ 
              this.coloR.push(this.dynamicColors());
            }
            this.initPieChart('u');
            this.initMap('u');
            
            for (var i = 0; i < this.index; i++) {
              this.TableData[i]=({position: +i+1,
                                      date: this.date[i],
                                      confirmed: this.confirmedtable[0][i],
                                      deceased: this.deceasedtable[0][i],
                                      recovered: this.recoveredtable[0][i]})
            }
            this.dataSource.paginator = this.paginator;

            for (var i = 0; i < 37; i++) {
              this.StateTableData[i] = ({position: +i+1,
                                        state: this.states[i],
                                        confirm: this.StateTotalConfirmed[i],
                                        decease: this.StateTotalDeceased[i],
                                        recover: this.StateTotalRecovered[i],
                                        active: this.StateTotalActive[i]})
            }   
            this.dataS.sort = this.sort;
          }
        }
      )
  }

  initMap(caseType: string) {
    
    this.datatable = [];
    if (caseType == 'u'){
      this.title = 'Confirmed Cases';
      this.datatable = this.StateTotalConfirmed;
    }
    if (caseType == 'v'){
      this.title = 'Deceased Cases';
      this.datatable = this.StateTotalDeceased;
    }
    if (caseType == 'w'){
      this.title = 'Recovered Cases';
      this.datatable = this.StateTotalRecovered;
    }
    if (caseType == 'p'){
      this.title = 'Active Cases';
      this.datatable = this.StateTotalActive;
    }
    this.chartMap = {
      chart: {
        map: worldMap as any,
        proj4: proj4
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
      /*{
        // Specify points using lat/lon
        
        type: 'mappoint',
        name: 'Canada cities',
        marker: {
            radius: 5,
            fillColor: 'tomato'
        },
        data: [
          {
            name: 'Vancouver',
            //lat: 49.246292,
            //lon: -123.116226
          },
          {
            name: 'Quebec City',
            //lat: 46.829853,
            //lon: -71.254028
          },
          {
            name: 'Yellowknife',
            //lat: 62.4540,
            //lon: -114.3718
          }
        ]
      } as Highcharts.SeriesMappointOptions*/
    };
    
  }

  
  createChart() {
    this.BarChart = []
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
      labels: this.date,
      datasets: [{
          label: 'No. of Cases',
          data: this.datatable,
          backgroundColor: 'rgba(54, 162, 245, 0.2)',
          borderColor: 'rgba(54, 162, 255, 1)',
          borderWidth: 1
        }]
      }, 
      options: {
      title:{
          text:this.title,
          display:true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
        }
      }
    });
  }
  

  updateBarChart(input: HTMLInputElement) {
    this.initBarChart(input.value)
  }

  initBarChart(caseType: string) {
    this.datatable = [];
    if (caseType == 'c'){
      this.title = 'Daily Confirmed Cases';
      this.datatable = this.confirmedtable[0];
      this.createBarChart();
    }
    if (caseType == 'd'){
      this.title = 'Daily Deceased Cases';
      this.datatable = this.deceasedtable[0];
      this.createBarChart();
    }
    if (caseType == 'r'){
      this.title = 'Daily Recovered Cases';
      this.datatable = this.recoveredtable[0];
      this.createBarChart();
    }
  }

  createBarChart() {
    if (this.BarChart != undefined)
      this.BarChart.destroy();
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
      labels: this.date,
      datasets: [{
          label: 'No. of Cases',
          data: this.datatable,
          backgroundColor: 'rgba(54, 162, 245, 0.2)',
          borderColor: 'rgba(54, 162, 255, 1)',
          borderWidth: 1
        }]
      }, 
      options: {
      title:{
          text:this.title,
          display:true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
        }
      }
    });
  }

  updatePieChart(input: HTMLInputElement) {
    this.initPieChart(input.value)
    this.initMap(input.value)
  }

  initPieChart(caseType: string) {
    this.datatable = [];
    if (caseType == 'u'){
      this.title = 'Confirmed Cases';
      this.datatable = this.StateTotalConfirmed;
      this.createPieChart(5);
    }
    if (caseType == 'v'){
      this.title = 'Deceased Cases';
      this.datatable = this.StateTotalDeceased;
      this.createPieChart(5);
    }
    if (caseType == 'w'){
      this.title = 'Recovered Cases';
      this.datatable = this.StateTotalRecovered;
      this.createPieChart(5);
    }
    if (caseType == 'p'){
      this.title = 'Active Cases';
      this.datatable = this.StateTotalActive;
      this.createPieChart(5);
    }
  }

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  createPieChart(caseType: number) {
    var tmp = []
    var sst = []
    var tab = []
    var index : number;
    var nm : number = 0;
    var n : number = caseType;

    for (var i = 0; i < 37; i++) {
      tmp[i] = this.datatable[i]
    }
    for (var i = 0; i < 37; i++) {
      if (nm <= tmp[i]) {
        nm = tmp[i];
        index = +i;
      }
    }
    tmp[index] = -1;
    sst[0] = this.states[index]
    tab[0] = nm

    for (var i = 1; i < 37; i++) { 
      nm = 0;
      for (var j = 0; j < 37; j++) { 
        if (nm <= tmp[j]) {
          nm = tmp[j];
          index = +j;
        }
      }
      tmp[index] = -1;
      sst[i] = this.states[index]
      tab[i] = nm
    }

    if (this.PieChart != undefined)
      this.PieChart.destroy();

    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
      labels: sst.slice(0, n),
      datasets: [{
          label: 'No. of Cases',
          data: tab.slice(0, n),
          backgroundColor: this.coloR.slice(0, n),
          borderColor: 'rgba(200, 200, 200, 0.75)',
          hoverBorderColor: 'rgba(200, 200, 200, 1)',
          borderWidth: 1
        }]
      }, 
      options: {
      title:{
          text:this.title,
          display:true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
        }
      }
    });
  }
}
