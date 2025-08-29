import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  
  // Datos de los personajes del Cuaquiverso
  personajes = [
    {
      nombre: 'CUAC',
      descripcion: 'El pato curioso que todo lo quiere explorar.',
      color: 'cuac'
    },
    {
      nombre: 'ROAR',
      descripcion: 'Chigüiro llanero, tranquilo y bonachón.',
      color: 'roar'
    },
    {
      nombre: 'KIKI',
      descripcion: 'Delfín rosado, veloz y aventurero.',
      color: 'kiki'
    },
    {
      nombre: 'YEISON',
      descripcion: 'Oso poeta con mirada soñadora.',
      color: 'yeison'
    },
    {
      nombre: 'ABEJANDRO',
      descripcion: 'Abejita paisa, trabajadora y alegre.',
      color: 'abejandro'
    },
    {
      nombre: 'COLIBRIANA',
      descripcion: 'Tortuga hippie que fluye con la vida.',
      color: 'colibriana'
    },
    {
      nombre: 'TIBURCIO',
      descripcion: 'Colibrí brillante, creativa y libre.',
      color: 'tiburcio'
    },
    {
      nombre: 'ATOLITA',
      descripcion: 'Tiburón costeño, fiestero y valiente.',
      color: 'atolita'
    }
  ];

  // Timeline de la historia de CUAC
  timelineItems = [
    { texto: 'El primer trazo' },
    { texto: 'Tropiezos con estilo' },
    { texto: 'Cuac por Colombia' },
    { texto: 'El salto\nSOFA 2024' },
    { texto: 'Cuaquiverso' },
    { texto: 'De taller\na comunidad' },
    { texto: 'Nuevo capítulo\nSOFA 2025' }
  ];

  constructor() {}

  // Método para manejar el clic en "Cotizar Gratis"
  onCotizarGratis(): void {
    // Aquí puedes agregar la lógica para abrir un modal de contacto
    // o redirigir a una página de cotización
    console.log('Solicitar cotización gratis');
  }

  // Método para manejar el clic en "Conoce nuestro trabajo"
  onConoceNuestroTrabajo(): void {
    // Aquí puedes agregar la lógica para mostrar el portafolio
    // o redirigir a una sección específica
    console.log('Mostrar portafolio');
  }

  // Método para reproducir video (placeholder)
  onPlayVideo(): void {
    // Aquí puedes agregar la lógica para reproducir el video
    console.log('Reproducir video');
  }

  // Método para manejar clic en personaje
  onPersonajeClick(personaje: any): void {
    // Aquí puedes agregar la lógica para mostrar más información del personaje
    console.log('Personaje seleccionado:', personaje);
  }
}
