import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ClienteService } from './clienteService';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent {
  tiposDocumento: string[] = ['C', 'P'];
  selectedTipoDocumento: string = '';
  numeroDocumento: string = '';
  cliente: any;
  isLoading: boolean = false;
  errorMessage: string = " ";

  constructor(private clienteService: ClienteService) {} // Inyecta el servicio ClienteService

  consultarCliente(): void {
    if (this.selectedTipoDocumento && this.numeroDocumento) {
      this.isLoading = true;
      this.clienteService.consultarCliente(this.selectedTipoDocumento, this.numeroDocumento)
        .subscribe(
          response => {
            this.cliente = response;
            this.isLoading = false;
          },
          error => {
            console.error('Error al consultar cliente:', error);
            this.isLoading = false;
            this.errorMessage = 'No se pudo obtener los datos del cliente. Por favor, inténtalo nuevamente';
            this.showErrorMessage(); // Mostrar mensaje de error
          }
        );
    } else {
      this.errorMessage = 'Por favor selecciona un tipo de documento y proporciona un número de documento';
      this.showErrorMessage(); // Mostrar mensaje de error
    }
  }

  showErrorMessage(): void {
    Swal.fire('Error', this.errorMessage, 'error');
  }
}
