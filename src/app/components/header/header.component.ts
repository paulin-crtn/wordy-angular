import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() wordsFound: number;
  @Input() wordsTotal: number;
  @Input() bestScore: number;
  @Input() lifeRemaining: number;

  constructor() { }

  ngOnInit() {
  }

}
