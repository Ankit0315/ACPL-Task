import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = "http://localhost:5092/api/employee";

   constructor(private http: HttpClient) { }
   saveCandidate(body: any): Observable<any> {
    console.log(body)
    return this.http.post<any>(this.apiUrl, body, {
      headers: {
          'Content-Type': 'application/json'  
      }
  });
}

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
//new chnges
  updateEmployee(employee: any): Observable<any> {
    const url = `${this.apiUrl}/${employee.id}`; // Assuming the employee object has an 'id' property
    return this.http.put<any>(url, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
