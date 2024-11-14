import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../interfaces/housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  housingLocationId = -1;
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(private route: ActivatedRoute, private housingService: HousingService) {
    const housingLocationId = Number(this.route.snapshot.params['id']);    
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {     
       this.housingLocation = housingLocation;   
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
