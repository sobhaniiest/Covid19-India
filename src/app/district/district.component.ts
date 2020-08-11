import { Component, OnInit, Input } from '@angular/core';
import { DataFetchService } from 'src/app/data-fetch.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  totalConfirmed : number = 0;
  totalRecovered : number = 0;
  totalDeceased : number = 0;
  totalActive : number = 0;

  st = ''

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
    
  }


  getState(state: string) {
    
    for(var index in this.states){ 
      if(this.states[index] === state) {
        this.st = ''
        this.st = this.states[index]
        /*
        this.totalConfirmed = this.data[+index][0];
        this.totalRecovered = this.data[+index][0];
        this.totalDeceased = this.data[+index][0];
        this.totalActive = this.data[+index][0];
        */
      }
    }
    
  }

}
