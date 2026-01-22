import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../gemini.service';

@Component({
  selector: 'app-culture-generale',
  templateUrl: './culture-generale.component.html',
  styleUrls: ['./culture-generale.component.css']
})

export class CultureGeneraleComponent implements OnInit {
  questions: { clue: string, direction: string, length: number, question: string }[] = [];
  answers: string[] = [];
  crosswordGrid: any[] = [];  // Définir crosswordGrid
  gameOver: boolean = false;  // Définir gameOver

  constructor(private geminiService: GeminiService) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.initializeGrid();
  }

  // Charger les questions dynamiquement
  async loadQuestions(): Promise<void> {
    const cluesData = [
      { clue: 'A Music Show', direction: 'Across', length: 7 },
      { clue: 'An alternate for Result', direction: 'Down', length: 7 },
      { clue: 'Creative work', direction: 'Down', length: 5 },
      { clue: 'Dark Knight', direction: 'Across', length: 6 },
      { clue: 'You get what you give', direction: 'Down', length: 4 },
      { clue: 'Used in Dark', direction: 'Across', length: 5 },
      { clue: 'No corners', direction: 'Down', length: 5 },
      { clue: 'mightier than sword', direction: 'Across', length: 3 },
      { clue: 'Once in a Year', direction: 'Across', length: 9 }
    ];

    for (const clueData of cluesData) {
      const { word, question } = await this.geminiService.generateWordByLengthAndClue(clueData.length, clueData.clue);
      this.questions.push({
        clue: clueData.clue,
        direction: clueData.direction,
        length: clueData.length,
        question: question
      });
      this.answers.push(word);
    }
  }

  // Initialiser la grille de mots croisés (structure de base)
  initializeGrid(): void {
    const gridSize = 10; // Exemple de taille de la grille
    this.crosswordGrid = Array(gridSize).fill(null).map(() => 
      Array(gridSize).fill({ value: '', isClue: false }) // Initialisation avec des objets
    );
  }
  

  // Afficher ou masquer les réponses
  showAnswers(): void {
    this.gameOver = !this.gameOver;  // On bascule l'état de "gameOver"
  }
}

