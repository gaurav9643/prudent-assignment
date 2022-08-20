import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'prudent-assignment';
  dictionary: string[] = [];
  //suggestions: string[] = [];
  suggestions: string | undefined = '';
  term: string = '';
  constructor(private _http: HttpClient, private utility: UtilsService) {}

  ngOnInit(): void {
    this.loadDictionary();
  }

  loadDictionary(): void {
    this._http.get('./assets/dictionary.json').subscribe({
      next: (response: any) => {
        this.dictionary = response || [];
      },
      error: (_err) => {
        this.dictionary = [];
        console.log(_err);
      },
    });
  }

  onValueChange($event: any): void {
    const term = $event.target.value;
    if (term)
      this.suggestions = this.utility.wordAutoCorrect(term, this.dictionary);
    else this.suggestions = term;
  }
}
