import { Component, OnInit } from '@angular/core';
import { DataFetchService } from 'src/app/data-fetch.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})
export class IndiaComponent implements OnInit {

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
  PieChart = [];
  BarChart = [];
  coloR = [];

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

  constructor(private dataFetch: DataFetchService) { 
  }

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
          }
        }
      )
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

  updatePieChart(input: HTMLInputElement) {
    this.initPieChart(input.value)
  }

  initPieChart(caseType: string) {
    this.datatable = [];
    if (caseType == 'u'){
      this.title = 'Confirmed Cases';
      this.datatable = this.StateTotalConfirmed;
      this.createPieChart();
    }
    if (caseType == 'v'){
      this.title = 'Deceased Cases';
      this.datatable = this.StateTotalDeceased;
      this.createPieChart();
    }
    if (caseType == 'w'){
      this.title = 'Recovered Cases';
      this.datatable = this.StateTotalRecovered;
      this.createPieChart();
    }
    if (caseType == 'p'){
      this.title = 'Active Cases';
      this.datatable = this.StateTotalActive;
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
    this.PieChart = []
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
      labels: this.states,
      datasets: [{
          label: 'No. of Cases',
          data: this.datatable,
          backgroundColor: this.coloR,
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
