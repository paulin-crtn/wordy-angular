import { Component, OnInit } from '@angular/core';

import { WordService } from 'src/app/core/word.service';
import { Word } from 'src/app/core/word';


@Component({
  selector: 'app-find-word',
  templateUrl: './find-word.component.html',
  styleUrls: ['./find-word.component.scss']
})
export class FindWordComponent implements OnInit {
  words: Word[] = [];
  currentWord: Word;
  randomDefinitionIndex: number;
  currentWords: number[] = [];
  wordUsed: number[] = [];
  loading: boolean;
  seeMoreDefinition: boolean;
  wordsFound: number = 0;
  lifeRemaining: number = 5;
  gameOver: boolean = false;
  gameCongrats: boolean = false;
  bestScore: number = 0;
  
  constructor(
    private wordService: WordService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.wordService.getWords().subscribe(
      words => {
        this.words = words;
        this.resetWord();
        this.loading = false;
      }
    )
  }

  checkAnswer(word: string) {
    if (this.currentWord.name === word) {
      this.wordsFound += 1;
      if (this.wordUsed.length === this.words.length) {
        this.gameCongrats = true;
      } else {
        this.resetWord();
      }
    } else {
      if (this.lifeRemaining > 0) {
        this.lifeRemaining -= 1;
      } else {
        this.gameOver = true;
      }
    }

    if (this.wordsFound > this.bestScore) {
      this.bestScore = this.wordsFound;
    }
  }

  getRandomWords() {
    let numPropositions = 4;
    for (let i = 0; i < numPropositions; i++) {
      const randomIndex =  Math.floor(Math.random() * Math.floor(this.words.length));      
      if (this.currentWords.includes(randomIndex)) {
        numPropositions +=1;
      } else {
        this.currentWords.push(randomIndex);
      }
    }
  }

  getRandomWord() {
    let numWord = 1;
    for (let i = 0; i < numWord; i++) {
      const randomIndex =  Math.floor(Math.random() * Math.floor(this.words.length));      
      if (this.wordUsed.includes(randomIndex)) {
        numWord +=1;
      } else {
        this.currentWords.push(randomIndex);
        this.currentWord = this.words[randomIndex];
        this.wordUsed.push(randomIndex);
        // Get random definition
        const wordDefinitionsLength = this.currentWord.definitions.length;             
        if (wordDefinitionsLength > 1) {
          this.randomDefinitionIndex =  Math.floor(Math.random() * Math.floor(wordDefinitionsLength));
        } else {
          this.randomDefinitionIndex = 0;
        }
      }
    }
  }

  resetGame() {
    this.wordUsed = [];
    this.wordsFound = 0;
    this.lifeRemaining = 5;
    this.gameOver = false;
    this.gameCongrats = false;
    this.resetWord();
  }

  resetWord() {
    this.seeMoreDefinition = false;
    this.currentWords = [];
    this.getRandomWord();
    this.getRandomWords();
    this.sort();
  }

  sort() {
    this.currentWords.sort((a, b) => {
      return a - b;
    });
  }
}
