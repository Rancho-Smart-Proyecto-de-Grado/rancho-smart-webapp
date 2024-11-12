import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, NgIf],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() title: string | undefined;
  @Input() imageUrl: string | undefined;
  @Input() value: string | undefined;
  @Input() extraValue: string | undefined; // Nuevo valor adicional
  @Input() showMenuButton: boolean = false;

  @Output() cardClicked = new EventEmitter<void>();
  @Output() crearClicked = new EventEmitter<void>();
  @Output() verClicked = new EventEmitter<void>();

  onCardClick() {
    this.cardClicked.emit();
  }

  crearLote() {
    this.crearClicked.emit();
  }

  verLotes() {
    this.verClicked.emit();
  }
}
