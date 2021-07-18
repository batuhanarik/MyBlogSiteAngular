import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact/contact';

@Injectable({
  providedIn: 'root'
})
export class HelpeService {

  constructor(private httpClient: HttpClient) { }

  apiUrl: string="https://localhost:44395/api/helper";

  sendContactEmail(contact:Contact){

    return this.httpClient.post(`${this.apiUrl}/SendContactEmail`, contact);

  }
}
