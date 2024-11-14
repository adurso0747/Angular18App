import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../interfaces/housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList:HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  constructor(housingService: HousingService) {
    housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {      
      this.housingLocationList = housingLocationList;      
      this.filteredLocationList = housingLocationList;    
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}

