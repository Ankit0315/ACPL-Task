import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from './Service/api.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'project';
  employees: any[] = [];

  isDropdownOpen = false;
  options: string[] = ['ReactJs', 'Angular', '.NET Core', 'SQL', 'NodeJS'];
  selectedOptions: string[] = [];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleOption(option: string) {
    if (this.selectedOptions.includes(option)) {
      this.selectedOptions = this.selectedOptions.filter(
        (item) => item !== option
      );
    } else {
      this.selectedOptions.push(option);
    }
  }

  removeOption(option: string) {
    this.selectedOptions = this.selectedOptions.filter(
      (item) => item !== option
    );
  }

  resetForm(form: NgForm): void {
    form.resetForm();
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCandidates().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    // console.log(form.value)
    const req = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      designation: form.value.interests,
    };
    this.apiService.saveCandidate(req).subscribe(
      (response) => {
        console.log('API Response:', response);

        form.reset();
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
    window.location.reload();
  }

  // onSelectionChange(event: any): void {
  //   this.selectedOptions = Array.from(event.target.selectedOptions, (option: any) => parseInt(option.value));
  // }
}
