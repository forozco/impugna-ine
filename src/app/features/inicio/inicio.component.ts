import { Component } from '@angular/core';
import { EncabezadoComponent } from '../../shared/components/encabezado/encabezado.component';
import { PiePaginaComponent } from '../../shared/components/pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-inicio',
  imports: [EncabezadoComponent, PiePaginaComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
