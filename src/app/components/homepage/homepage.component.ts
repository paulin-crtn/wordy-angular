import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  ngOnInit() {
    // Page title
    this.titleService.setTitle('Apprend de nouveaux mots et développe ton vocabulaire | Wordy');
    // Page meta description
    this.metaService.addTag({
      name: 'description', 
      content: 'Plateforme gratuite qui te permet de développer ton vocabulaire de manière simple, rapide et ludique.'
    })
  }

}
