import { Component, OnInit } from '@angular/core';
import { DataFetchService } from 'src/app/data-fetch.service';
import { DataModel } from 'src/app/data';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  totalConfirmed : number;
  totalRecovered : number;
  totalDeceased : number;
  totalActive : number;
  st = 'Andaman and Nicobar Islands';
  si = 0;

  confirmedtable = [];
  recoveredtable = [];
  deceasedtable = [];
  activetable = [];
  datatable = [];
  
  date = [];
  con : number[][];
  dec : number[][];
  rec : number[][];

  PieChart=[];
  BarChart = [];
  title = '';
  coloR = [];
  
  data: DataModel[];
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
    this.con = [];
    for(var i: number = 0; i < 37; i++) {
      this.con[i] = [];
    }
    this.rec = [];
    for(var i: number = 0; i < 37; i++) {
      this.rec[i] = [];
    }
    this.dec = [];
    for(var i: number = 0; i < 37; i++) {
      this.dec[i] = [];
    }
   }

  ngOnInit(): void {
    this.dataFetch.getData()
      .subscribe({
          next : (result)=>{
            
            this.data = result;
            
            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.AN
                this.date.push(element.date)
                this.con[0].push(element.AN)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.AN
                this.rec[0].push(element.AN)
              } else {
                  this.totalDeceased += element.AN
                  this.dec[0].push(element.AN)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.AP
                this.con[1].push(element.AP)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.AP
                this.rec[1].push(element.AP)
              } else {
                  this.totalDeceased += element.AP
                  this.dec[1].push(element.AP)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.AR
                this.con[2].push(element.AR)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.AR
                this.rec[2].push(element.AR)
              } else {
                  this.totalDeceased += element.AR
                  this.dec[2].push(element.AR)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.AS
                this.con[3].push(element.AS)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.AS
                this.rec[3].push(element.AS)
              } else {
                  this.totalDeceased += element.AS
                  this.dec[3].push(element.AS)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.BR
                this.con[4].push(element.BR)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.BR
                this.rec[4].push(element.BR)
              } else {
                  this.totalDeceased += element.BR
                  this.dec[4].push(element.BR)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.CH
                this.con[5].push(element.CH)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.CH
                this.rec[5].push(element.CH)
              } else {
                  this.totalDeceased += element.CH
                  this.dec[5].push(element.CH)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.CT
                this.con[6].push(element.CT)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.CT
                this.rec[6].push(element.CT)
              } else {
                  this.totalDeceased += element.CT
                  this.dec[6].push(element.CT)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.DN
                this.con[7].push(element.DN)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.DN
                this.rec[7].push(element.DN)
              } else {
                  this.totalDeceased += element.DN
                  this.dec[7].push(element.DN)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.DD
                this.con[8].push(element.DD)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.DD
                this.rec[8].push(element.DD)
              } else {
                  this.totalDeceased += element.DD
                  this.dec[8].push(element.DD)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.DL 
                this.con[9].push(element.DL)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.DL
                this.rec[9].push(element.DL)
              } else {
                  this.totalDeceased += element.DL 
                  this.dec[9].push(element.DL)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.GA
                this.con[10].push(element.GA)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.GA
                this.rec[10].push(element.GA)
              } else {
                  this.totalDeceased += element.GA
                  this.dec[10].push(element.GA)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.GJ
                this.con[11].push(element.GJ)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.GJ
                this.rec[11].push(element.GJ)
              } else {
                  this.totalDeceased += element.GJ
                  this.dec[11].push(element.GJ)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.HR
                this.con[12].push(element.HR)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.HR
                this.rec[12].push(element.HR)
              } else {
                  this.totalDeceased += element.HR
                  this.dec[12].push(element.HR)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.HP
                this.con[13].push(element.HP)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.HP
                this.rec[13].push(element.HP)
              } else {
                  this.totalDeceased += element.HP
                  this.dec[13].push(element.HP)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.JK
                this.con[14].push(element.JK)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.JK
                this.rec[14].push(element.JK)
              } else {
                  this.totalDeceased += element.JK
                  this.dec[14].push(element.JK)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.JH
                this.con[15].push(element.JH)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.JH
                this.rec[15].push(element.JH)
              } else {
                  this.totalDeceased += element.JH
                  this.dec[15].push(element.JH)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.KA
                this.con[16].push(element.KA)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.KA
                this.rec[16].push(element.KA)
              } else {
                  this.totalDeceased += element.KA
                  this.dec[16].push(element.KA)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.KL
                this.con[17].push(element.KL)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.KL
                this.rec[17].push(element.KL)
              } else {
                  this.totalDeceased += element.KL
                  this.dec[17].push(element.KL)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.LA
                this.con[18].push(element.LA)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.LA
                this.rec[18].push(element.LA)
              } else {
                  this.totalDeceased += element.LA
                  this.dec[18].push(element.LA)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.LD
                this.con[19].push(element.LD)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.LD
                this.rec[19].push(element.LD)
              } else {
                  this.totalDeceased += element.LD
                  this.dec[19].push(element.LD)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.MP
                this.con[20].push(element.MP)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.MP
                this.rec[20].push(element.MP)
              } else {
                  this.totalDeceased += element.MP
                  this.dec[20].push(element.MP)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.MH
                this.con[21].push(element.MH)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.MH
                this.rec[21].push(element.MH)
              } else {
                  this.totalDeceased += element.MH
                  this.dec[21].push(element.MH)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.MN
                this.con[22].push(element.MN)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.MN
                this.rec[22].push(element.MN)
              } else {
                  this.totalDeceased += element.MN
                  this.dec[22].push(element.MN)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.ML
                this.con[23].push(element.ML)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.ML
                this.rec[23].push(element.ML)
              } else {
                  this.totalDeceased += element.ML
                  this.dec[23].push(element.ML)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.MZ
                this.con[24].push(element.MZ)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.MZ
                this.rec[24].push(element.MZ)
              } else {
                  this.totalDeceased += element.MZ
                  this.dec[24].push(element.MZ)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.NL
                this.con[25].push(element.NL)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.NL
                this.rec[25].push(element.NL)
              } else {
                  this.totalDeceased += element.NL
                  this.dec[25].push(element.NL)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.OR
                this.con[26].push(element.OR)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.OR
                this.rec[26].push(element.OR)
              } else {
                  this.totalDeceased += element.OR
                  this.dec[26].push(element.OR)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.PY
                this.con[27].push(element.PY)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.PY
                this.rec[27].push(element.PY)
              } else {
                  this.totalDeceased += element.PY
                  this.dec[27].push(element.PY)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.PB
                this.con[28].push(element.PB)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.PB
                this.rec[28].push(element.PB)
              } else {
                  this.totalDeceased += element.PB
                  this.dec[28].push(element.PB)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.RJ
                this.con[29].push(element.RJ)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.RJ
                this.rec[29].push(element.RJ)
              } else {
                  this.totalDeceased += element.RJ
                  this.dec[29].push(element.RJ)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.SK
                this.con[30].push(element.SK)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.SK
                this.rec[30].push(element.SK)
              } else {
                  this.totalDeceased += element.SK
                  this.dec[30].push(element.SK)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.TN
                this.con[31].push(element.TN)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.TN
                this.rec[31].push(element.TN)
              } else {
                  this.totalDeceased += element.TN
                  this.dec[31].push(element.TN)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.TG
                this.con[32].push(element.TG)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.TG
                this.rec[32].push(element.TG)
              } else {
                  this.totalDeceased += element.TG
                  this.dec[32].push(element.TG)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.TR
                this.con[33].push(element.TR)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.TR
                this.rec[33].push(element.TR)
              } else {
                  this.totalDeceased += element.TR
                  this.dec[33].push(element.TR)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.UP
                this.con[34].push(element.UP)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.UP
                this.rec[34].push(element.UP)
              } else {
                  this.totalDeceased += element.UP
                  this.dec[34].push(element.UP)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.UT
                this.con[35].push(element.UT)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.UT
                this.rec[35].push(element.UT)
              } else {
                  this.totalDeceased += element.UT
                  this.dec[35].push(element.UT)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = 0;this.totalRecovered = 0;this.totalDeceased = 0;this.totalActive = 0;
            this.data.forEach(element => {
              if(element.status === "Confirmed"){
                this.totalConfirmed += element.WB
                this.con[36].push(element.WB)
              }
              else if (element.status === "Recovered") {
                this.totalRecovered += element.WB
                this.rec[36].push(element.WB)
              } else {
                  this.totalDeceased += element.WB
                  this.dec[36].push(element.WB)
                }
            })
            this.totalActive = this.totalConfirmed - (this.totalRecovered+this.totalDeceased)
            this.confirmedtable.push(this.totalConfirmed)
            this.recoveredtable.push(this.totalRecovered)
            this.deceasedtable.push(this.totalDeceased)
            this.activetable.push(this.totalActive)

            this.totalConfirmed = this.confirmedtable[0];
            this.totalRecovered = this.recoveredtable[0];
            this.totalDeceased = this.deceasedtable[0];
            this.totalActive = this.activetable[0];

          }
        }
      )
      for(var index in this.states){ 
        this.coloR.push(this.dynamicColors());
      }
      this.initChart('a');
      this.initbarChart('x');
  }

  getState(state: string) {
    for(var index in this.states){ 
      if(this.states[index] === state) {
        this.st = ''
        this.st = this.states[index]
        this.si = +index
        this.totalConfirmed = this.confirmedtable[+index];
        this.totalRecovered = this.recoveredtable[+index];
        this.totalDeceased = this.deceasedtable[+index];
        this.totalActive = this.activetable[+index];
        this.initbarChart('x');
      }
    }
  }

  updateChart(input: HTMLInputElement) {
    this.initChart(input.value)
  }

  updatebarChart(input: HTMLInputElement) {
    this.initbarChart(input.value)
  }

  initChart(caseType: string) {
    this.datatable = [];
    if (caseType == 'a'){
      this.title = 'Confirmed Cases';
      this.datatable = this.confirmedtable;
      this.createChart();
    }
    if (caseType == 'd'){
      this.title = 'Deceased Cases';
      this.datatable = this.deceasedtable;
      this.createChart();
    }
    if (caseType == 'r'){
      this.title = 'Recovered Cases';
      this.datatable = this.recoveredtable;
      this.createChart();
    }
  }

  initbarChart(caseType: string) {
    this.datatable = [];
    if (caseType == 'x'){
      this.title = 'Daily Confirmed Cases';
      this.datatable = this.con[this.si];
      this.createbarChart();
    }
    if (caseType == 'y'){
      this.title = 'Daily Deceased Cases';
      this.datatable = this.dec[this.si];
      this.createbarChart();
    }
    if (caseType == 'z'){
      this.title = 'Daily Recovered Cases';
      this.datatable = this.rec[this.si];
      this.createbarChart();
    }
  }

  dynamicColors () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  createChart() {
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
