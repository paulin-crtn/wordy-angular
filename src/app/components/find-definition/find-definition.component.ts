import { Component, OnInit } from '@angular/core';

import { WordService } from 'src/app/core/word.service';
import { Word, Definition } from 'src/app/core/word';


@Component({
  selector: 'app-find-definition',
  templateUrl: './find-definition.component.html',
  styleUrls: ['./find-definition.component.scss']
})
export class FindDefinitionComponent implements OnInit {
  words: Word[] = [];
  wordsRemaining: Word[] = [];
  currentWord: Word;
  currentDefinitionIndex: number;
  currentWords: Word[] = [];
  currentDefinitions: Definition[] = [];
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
        this.wordsRemaining = [...this.words];
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
      if (this.wordsRemaining.length === 0) {
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
    let randomIndex: number;
    this.currentWords.forEach(word => {
      if (word.definitions.length > 1) {
        randomIndex =  Math.floor(Math.random() * Math.floor(word.definitions.length));
      } else {
        randomIndex  = 0;
      }
      this.currentDefinitions.push(word.definitions[randomIndex]);
      // Afficher les synonymes associés à une définition
      if (word === this.currentWord) {
        this.currentDefinitionIndex = randomIndex;
      }
    });
  }

  getRandomWords() {
    let randomWordsNumber = 2;
    for (let i = 0; i < randomWordsNumber; i++) {
      const randomIndex =  Math.floor(Math.random() * Math.floor(this.words.length));      
      if (this.currentWords.includes(this.words[randomIndex])) {
        randomWordsNumber += 1;
      } else {
        this.currentWords.push(this.words[randomIndex]);
      }
    }
  }

  getRandomWord() {
    const randomIndex =  Math.floor(Math.random() * Math.floor(this.wordsRemaining.length));      
    this.currentWord = this.wordsRemaining[randomIndex];
    this.currentWords.push(this.wordsRemaining[randomIndex]);
    this.wordsRemaining.splice(randomIndex, 1);
  }

  resetGame() {
    this.wordsRemaining = [...this.words];
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
    this.currentDefinitions.sort(() => {
      return 0.5 - Math.random();
    });
  }
}
