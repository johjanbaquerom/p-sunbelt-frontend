import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent {

  tiposDocumento: string[] = ['C', 'P'];
  selectedTipoDocumento: string = '';
  numeroDocumento: string = '';
  cliente: any = null;
isLoading: any;

  constructor(private http: HttpClient) {}

  consultarCliente(): void {
    if (this.selectedTipoDocumento && this.numeroDocumento) {
      this.http.post<any>('http://localhost:8090/consultarCliente', {
        tipoDocumento: this.selectedTipoDocumento,
        numeroDocumento: this.numeroDocumento
      }).subscribe(
        response => {
          this.cliente = response;
          Swal.fire('Consulta exitosa', 'Los datos del cliente han sido obtenidos correctamente', 'success');
        },
        error => {
          console.error('Error al consultar cliente:', error);
          Swal.fire('Error', 'No se pudo obtener los datos del cliente. Por favor, inténtalo nuevamente', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor selecciona un tipo de documento y proporciona un número de documento', 'error');
    }
  }

}
