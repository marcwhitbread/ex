import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { PlanService } from './plan.service';
import * as countries from './../shared/countries.json';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {

  form: FormGroup;
  filterForm: FormGroup;
  countriesList = Object.keys(countries);
  cities: any[] = [];
  destinations = [];
  filteredDestinations = [];
  travellers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  months = [{
    value: 0,
    viewValue: 'All'
  }, {
    value: 1,
    viewValue: 'January'
  }, {
    value: 2,
    viewValue: 'February'
  }, {
    value: 3,
    viewValue: 'March'
  }, {
    value: 4,
    viewValue: 'April'
  }, {
    value: 5,
    viewValue: 'May'
  }, {
    value: 6,
    viewValue: 'June'
  }, {
    value: 7,
    viewValue: 'July'
  }, {
    value: 8,
    viewValue: 'August'
  }, {
    value: 9,
    viewValue: 'September'
  }, {
    value: 10,
    viewValue: 'October'
  }, {
    value: 11,
    viewValue: 'November'
  }, {
    value: 12,
    viewValue: 'December'
  }];
  budgets = [{
    value: 0,
    op: '>=',
    viewValue: 'All'
  }, {
    value: 100,
    op: '<',
    viewValue: '<$100'
  }, {
    value: 1000,
    op: '<',
    viewValue: '<$1000'
  }, {
    value: 10000,
    op: '<',
    viewValue: '<$10000'
  }, {
    value: 10000,
    op: '>=',
    viewValue: '>=$10000'
  }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private planService: PlanService,
    private datePipe: DatePipe
  ) {

    this.filterForm = fb.group({
      'month': [this.months[0].value, Validators.required],
      'budget': [this.budgets[0], Validators.required],
      'travellers': ['All', Validators.required]
    });

    this.form = fb.group({
      'country': [null, Validators.required],
      'city': [null, Validators.required],
      'address': [null, Validators.required],
      'start': [null, Validators.required],
      'end': [null, Validators.required],
      'numberOfTravellers': [1, Validators.required],
      'ticketNumber': [null, Validators.required],
      'spendingLimit': [null, Validators.required],
      'notes': [null, Validators.required],
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.form.valueChanges.subscribe(() => {
      if (this.form.value.country && countries[this.form.value.country]) {
        this.cities = countries[this.form.value.country];
      }
    });

    this.planService.getDestinations().subscribe(destinations => {
      this.destinations = destinations;
      this.applyFilters();
    });

  }

  ngOnInit() {
  }

  applyFilters() {

    this.filteredDestinations = [...this.destinations];

    if (this.filterForm.value.month) {

      this.filteredDestinations = this.filteredDestinations.filter(item => {
        const startMonth = this.datePipe.transform(item.start, 'M');
        const endMonth = this.datePipe.transform(item.end, 'M');
        return parseInt(startMonth, 10) === this.filterForm.value.month || parseInt(endMonth, 10) === this.filterForm.value.month;
      });

    }

    if (this.filterForm.value.budget) {

      this.filteredDestinations = this.filteredDestinations.filter(item => {
        switch (this.filterForm.value.budget.op) {
          case '<':
            return parseInt(item.spendingLimit, 10) < this.filterForm.value.budget.value;
          case '>=':
            return parseInt(item.spendingLimit, 10) >= this.filterForm.value.budget.value;
          default:
            return true;
        }
      });

    }

    if (this.filterForm.value.travellers && this.filterForm.value.travellers !== 'All') {
      this.filteredDestinations = this.filteredDestinations.filter(item => {
        return parseInt(item.numberOfTravellers, 10) === this.filterForm.value.travellers;
      });
    }

  }

  add() {

    this.planService
      .createDestination(this.form.value)
      .subscribe(
        () => {
          this.planService.getDestinations().subscribe(destinations => {
            this.destinations = destinations;
            this.applyFilters();
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
            this.applyFilters();
          });
        },
        err => {}
      );

  }

}
