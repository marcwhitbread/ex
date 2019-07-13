import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PlanService } from './plan.service';
import * as countries from './../shared/countries.json';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {

  form: FormGroup;
  countriesList = Object.keys(countries);
  cities: any[] = [];
  destinations = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private planService: PlanService
  ) {

    this.form = fb.group({
      'country': [null, Validators.required],
      'city': [null, Validators.required],
      'address': [null, Validators.required],
      'start': [null, Validators.required],
      'end': [null, Validators.required],
      'numberOfTravellers': [null, Validators.required],
      'ticketNumber': [null, Validators.required],
      'spendingLimit': [null, Validators.required],
      'notes': [null, Validators.required],
    });

    this.form.valueChanges.subscribe(() => {
      if (this.form.value.country && countries[this.form.value.country]) {
        this.cities = countries[this.form.value.country];
      }
    });

    this.planService.getDestinations().subscribe(destinations => {
      this.destinations = destinations;
    });

  }

  ngOnInit() {
  }

  add() {

    this.planService
      .createDestination(this.form.value)
      .subscribe(
        () => {
          this.planService.getDestinations().subscribe(destinations => {
            this.destinations = destinations;
          });
        },
        err => {}
      );

  }

  remove(index) {

    this.planService
      .removeDestination(index)
      .subscribe(
        () => {
          this.planService.getDestinations().subscribe(destinations => {
            this.destinations = destinations;
          });
        },
        err => {}
      );

  }

}
