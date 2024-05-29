import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'http://api.example.com/parties';

  constructor(private http: HttpClient) {}

  getParties(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getParty(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createParty(party: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, party);
  }

  updateParty(id: number, party: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, party);
  }

  deleteParty(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
