import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  ngOnInit() {
    // Page title
    this.titleService.setTitle('Page non trouvée | Wordy');
    // Page meta description
    this.metaService.addTag({
      name: 'description', 
      content: 'Erreur 404 : la page demandée n\'existe pas.'
    })
  }

}
