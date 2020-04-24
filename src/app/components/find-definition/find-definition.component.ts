import { Component, OnInit } from '@angular/core';

import { WordService } from 'src/app/core/word.service';
import { Word } from 'src/app/core/word';


@Component({
  selector: 'app-find-definition',
  templateUrl: './find-definition.component.html',
  styleUrls: ['./find-definition.component.scss']
})
export class FindDefinitionComponent implements OnInit {
  words: Word[] = [];
  currentWord: Word;
  currentWords: number[] = [];
  currentDefinitions: string[] = [];
  wordUsed: number[] = [];
  loading: boolean;
  seeSynonyms: boolean;
  seeAntonyms: boolean;
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

  checkAnswer(definition: string) {
    const isCorrect = this.currentWord.definitions.find(def => {
      if (def.value === definition)
        return true;
    });

    if (isCorrect) {
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

  getRandomDefinitions() {
    this.currentWords.forEach(index => {
      const wordDefinitionsLength = this.words[index].definitions.length;      
      if (wordDefinitionsLength > 1) {
        const randomIndex =  Math.floor(Math.random() * Math.floor(wordDefinitionsLength));
        this.currentDefinitions.push(this.words[index].definitions[randomIndex].value);
      } else {
        this.currentDefinitions.push(this.words[index].definitions[0].value);
      }
    });
  }

  getRandomWords() {
    let numPropositions = 2;
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
        console.log(this.currentWord.name);
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
    this.seeSynonyms = false;
    this.seeAntonyms = false;
    this.currentWords = [];
    this.currentDefinitions = [];
    this.getRandomWord();
    this.getRandomWords();
    this.getRandomDefinitions();
    this.sort();
  }

  sort() {
    this.currentDefinitions.sort();
  }
}
