import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8090/consultarCliente';

  constructor(private http: HttpClient) {}

  consultarCliente(tipoDocumento: string, numeroDocumento: string) {
    return this.http.post<any>(this.apiUrl, { tipoDocumento, numeroDocumento });
  }
}