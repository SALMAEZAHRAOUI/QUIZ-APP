import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LanguageGameComponent} from '../language-game/language-game.component';
import{CultureGeneraleComponent}from '../culture-generale/culture-generale.component'
@Component({
  selector: 'app-pagegame',
  templateUrl: './pagegame.component.html',
  styleUrl: './pagegame.component.css'
})
export class PagegameComponent {
  userName: string = 'salma';
  openQuizGame(){}
  constructor(private dialog: MatDialog) {}

  openLanguageGame(): void {
    this.dialog.open(LanguageGameComponent, {
     
    });
  }
  openCultureGame(){
    this.dialog.open(CultureGeneraleComponent, {
 
    });
  }
}
