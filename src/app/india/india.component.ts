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

  date = [];
  Confirmed = [];
  Recovered = [];
  Deceased = [];

  lastdayConfirmed = 0;
  lastdayRecovered = 0;
  lastdayDeceased = 0;
  lastday : string;

  title = '';
  BarChart = [];
  datatable = [];

  constructor(private dataFetch: DataFetchService) { }

  ngOnInit(): void {
    this.dataFetch.getData()
      .subscribe({
          next : (result)=>{
            result.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.total
                this.lastdayConfirmed = element.total
                this.date.push(element.date)
                this.lastday = element.date
                this.Confirmed.push(element.total)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.total
                this.lastdayRecovered = element.total
                this.Recovered.push(element.total)
              } else {
                this.totalDeceased += element.total
                this.lastdayDeceased = element.total
                this.Deceased.push(element.total)
              }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
          }
        }
      )
      this.initChart('c');
  }
  
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value)
  }

  initChart(caseType: string) {
    this.datatable = [];
    if (caseType == 'c'){
      this.title = 'Daily Confirmed Cases';
      this.datatable = this.Confirmed;
      this.createChart();
    }
    if (caseType == 'd'){
      this.title = 'Daily Deceased Cases';
      this.datatable = this.Deceased;
      this.createChart();
    }
    if (caseType == 'r'){
      this.title = 'Daily Recovered Cases';
      this.datatable = this.Recovered;
      this.createChart();
    }
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
}
