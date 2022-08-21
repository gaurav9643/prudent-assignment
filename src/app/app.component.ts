import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { debounceTime, map, Observable, of, Subject } from 'rxjs';
import { UtilsService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  results$!: Observable<string[]>;
  subject = new Subject();
  dictionary: string[] = [];
  suggestions: string[] = [];
  display: string[] = [];
  term: string = '';
  startIndex: number = 0;
  endIndex: number = 0;
  limit: number = 20;

  constructor(private _http: HttpClient, private utility: UtilsService) {}

  ngOnInit(): void {
    this.loadDictionary();
    this.results$ = this.subject.pipe(
      debounceTime(1000),
      map((searchText: any) => {
        return this.utility.wordAutoCorrect(searchText, this.dictionary);
      })
    );
    this.results$.subscribe((result) => {
      this.suggestions = result;
      this.clearResults();
    });
    this.endIndex = this.limit;
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
    if (term !== '') this.subject.next(term);
    else {
      this.suggestions = [];
      this.clearResults();
    }
  }

  loadWords(): void {
    const display = this.suggestions.slice(this.startIndex, this.endIndex);
    this.display.push(...display);
  }

  onScroll() {
    if (this.display.length < this.suggestions.length) {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + this.limit;
      this.loadWords();
    }
  }

  clearResults(): void {
    this.startIndex = 0;
    this.endIndex = this.limit;
    this.display = [];
    this.loadWords();
  }
}
