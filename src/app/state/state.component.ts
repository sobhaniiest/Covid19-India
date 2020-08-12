import { Component, OnInit, ViewChild } from '@angular/core';
import { DataFetchService } from 'src/app/data-fetch.service';
import { Chart } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableElement, StateTableElement } from 'src/app/data';
import {MatSort} from '@angular/material/sort'; /** MatSort Not working : Fix it */

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})

export class StateComponent implements OnInit {

  TableData: TableElement[] = []
  StateTableData: StateTableElement[] = [] /** MatSort Not working : Fix it */

  displayedColumns: string[] = ['position', 'date', 'confirmed', 'recovered', 'deceased'];
  dataSource = new MatTableDataSource<TableElement>(this.TableData);

  displayedCols: string[] = ['position', 'state', 'confirm', 'recover', 'decease', 'active']; /** MatSort Not working : Fix it */
  dataS = new MatTableDataSource(this.StateTableData); /** MatSort Not working : Fix it */

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort; /** MatSort Not working : Fix it */

  totalConfirmed : number;
  totalRecovered : number;
  totalDeceased : number;
  totalActive : number;

  st = 'Andaman and Nicobar Islands';
  si : number = 1;

  lastdayConfirmed = 0;
  lastdayRecovered = 0;
  lastdayDeceased = 0;
  lastday : string;

  datatable = [];
  title = '';
  BarChart = [];

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
    
    this.dataFetch.getTotalData()
      .subscribe({
          next : (result)=>{
            result.forEach(element => {
              this.date = element.date
              this.confirmedtable = element.confirm
              this.recoveredtable = element.recover
              this.deceasedtable = element.decease
            })

            this.index = +this.date.length
            
            for (var i = 0; i < 37; i++) {
              this.StateTotalConfirmed[i] = 0;
              this.StateTotalDeceased[i] = 0;
              this.StateTotalRecovered[i] = 0;
            }

            for (var i = 0; i < 37; i++) {
              for (var j = 0; j < this.index; j++) {
                this.StateTotalConfirmed[i] += this.confirmedtable[i+1][j]
                this.StateTotalRecovered[i] += this.recoveredtable[i+1][j]
                this.StateTotalDeceased[i] += this.deceasedtable[i+1][j]
              }
              this.StateTotalActive[i] = this.StateTotalConfirmed[i] - (this.StateTotalRecovered[i]+this.StateTotalDeceased[i])
            }
            this.totalConfirmed = this.StateTotalConfirmed[0];
            this.totalRecovered = this.StateTotalRecovered[0];
            this.totalDeceased = this.StateTotalDeceased[0];
            this.totalActive = this.StateTotalActive[0];

            this.lastdayConfirmed = this.confirmedtable[1][this.index-1]
            this.lastdayRecovered = this.recoveredtable[1][this.index-1]
            this.lastdayDeceased = this.deceasedtable[1][this.index-1]
            this.lastday = this.date[this.index-1]
            this.initbarChart('x');
            for (var i = 0; i < this.index; i++) {
              this.TableData[i] = ({position: +i+1,
                                    date: this.date[i],
                                    confirmed: this.confirmedtable[1][i],
                                    deceased: this.deceasedtable[1][i],
                                    recovered: this.recoveredtable[1][i]})
            }
            this.dataSource.paginator = this.paginator;

            /** MatSort Not working : Fix it */
            for (var i = 0; i < 37; i++) {
              this.StateTableData[i] = ({position: +i+1,
                                        state: this.states[i],
                                        confirm: this.StateTotalConfirmed[i],
                                        decease: this.StateTotalDeceased[i],
                                        recover: this.StateTotalRecovered[i],
                                        active: this.StateTotalActive[i]})
            }
            this.dataS.paginator = this.paginator; /** MatSort Not working : Fix it */
            this.dataS.sort = this.sort;
            
          }
        }
      )
  }

  getState(state: string) {
    for(var index in this.states){ 
      if(this.states[index] === state) {
        this.st = ''
        this.st = this.states[index]
        this.si = +index+1
        this.totalConfirmed = this.StateTotalConfirmed[+index];
        this.totalRecovered = this.StateTotalRecovered[+index];
        this.totalDeceased = this.StateTotalDeceased[+index];
        this.totalActive = this.StateTotalActive[+index];

        this.lastdayConfirmed = this.confirmedtable[+index+1][this.index-1]
        this.lastdayRecovered = this.recoveredtable[+index+1][this.index-1]
        this.lastdayDeceased = this.deceasedtable[+index+1][this.index-1]

        this.initbarChart('x');
        for (var i = 0; i < this.index; i++) {
          this.TableData[i]=({position: +i+1,
                                  date: this.date[+index+1],
                                  confirmed: this.confirmedtable[+index+1][i],
                                  deceased: this.deceasedtable[+index+1][i],
                                  recovered: this.recoveredtable[+index+1][i]})
        }
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  updatebarChart(input: HTMLInputElement) {
    this.initbarChart(input.value)
  }

  initbarChart(caseType: string) {
    this.datatable = [];
    if (caseType == 'x'){
      this.title = 'Daily Confirmed Cases';
      this.datatable = this.confirmedtable[this.si];
      this.createbarChart();
    }
    if (caseType == 'y'){
      this.title = 'Daily Deceased Cases';
      this.datatable = this.deceasedtable[this.si];
      this.createbarChart();
    }
    if (caseType == 'z'){
      this.title = 'Daily Recovered Cases';
      this.datatable = this.recoveredtable[this.si];
      this.createbarChart();
    }
  }

  createbarChart() {
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
}
