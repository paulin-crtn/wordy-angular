import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { WordService } from 'src/app/core/word.service';
import { Word } from 'src/app/core/word';


@Component({
  selector: 'app-find-word',
  templateUrl: './find-word.component.html',
  styleUrls: ['./find-word.component.scss']
})
export class FindWordComponent implements OnInit {
  words: Word[] = [];
  wordsRemaining: Word[] = [];
  currentWord: Word;
  currentWords: Word[] = [];
  randomDefinitionIndex: number;
  loading: boolean;
  seeMoreDefinition: boolean;
  wordsFound: number = 0;
  lifeRemaining: number = 5;
  gameOver: boolean = false;
  gameCongrats: boolean = false;
  bestScore: number = 0;
  wrongWords: Word[] = [];
  
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private wordService: WordService,
  ) { }

  ngOnInit() {
    // Page title
    this.titleService.setTitle('Trouve le bon mot | Wordy');
    // Page meta description
    this.metaService.addTag({
      name: 'description', 
      content: 'Parmi une liste de mots retrouve celui qui correspond à la définition proposée.'
    })
    // Load data
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

  checkAnswer(word: Word) {
    if (this.currentWord.name === word.name) {
      this.wordsFound += 1;
      if (this.wordsRemaining.length === 0) {
        this.gameCongrats = true;
      } else {
        this.resetWord();
      }
    } else {
      if (this.lifeRemaining > 0) {
        this.wrongWords.push(word);
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
    let randomWordsNumber = 3;
    for (let i = 0; i < randomWordsNumber; i++) {
      const randomIndex =  Math.floor(Math.random() * Math.floor(this.words.length));      
      if (this.currentWords.includes(this.words[randomIndex])) {
        randomWordsNumber +=1;
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
    // Get random definition
    const wordDefinitionsLength = this.currentWord.definitions.length;             
    if (wordDefinitionsLength > 1) {
      this.randomDefinitionIndex =  Math.floor(Math.random() * Math.floor(wordDefinitionsLength));
    } else {
      this.randomDefinitionIndex = 0;
    }
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
    this.seeMoreDefinition = false;
    this.currentWords = [];
    this.wrongWords = [];
    this.getRandomWord();
    this.getRandomWords();
    this.sort();
  }

  sort() {
    this.currentWords.sort(() => {
      return 0.5 - Math.random();
    });
  }
}
