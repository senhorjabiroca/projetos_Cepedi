import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';  // Importando o módulo da toolbar

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule],  // Adicionando o MatToolbarModule nas importações do componente
})
export class AppComponent {
  title = 'Mobile Legends Landing Page';
}
