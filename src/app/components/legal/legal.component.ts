import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) { }

  ngOnInit() {
    // Page title
    this.titleService.setTitle('Mentions légales | Wordy');
    // Page meta description
    this.metaService.addTag({
      name: 'description', 
      content: 'Mentions légales et politique de confidentialité de la plateforme Wordy.'
    })
  }

}
