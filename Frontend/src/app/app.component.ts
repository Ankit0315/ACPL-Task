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

//new chneg
  editedEmployee: any = null;

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


  editEmployee(employee: any) {
    this.editedEmployee = { ...employee };
    employee.editMode = true;
  }

  saveEmployee(employee: any) {
    console.log("emp:", employee)
    this.apiService.updateEmployee(employee).subscribe(
      (response) => {
        console.log('Updated Employee:', response);
        employee.editMode = false;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  cancelEdit(employee: any) {
    employee.editMode = false;
    this.editedEmployee = null;
  }

  deleteEmployee(employee: any)
   {
    console.log("delet",employee)
    this.apiService.deleteEmployee(employee.id).subscribe(
      () => {
        console.log('Deleted Employee:', employee);
        const index = this.employees.indexOf(employee);
        if (index !== -1) {
          this.employees.splice(index, 1);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  
}
