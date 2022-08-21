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
    this.handleFiltering();
    this.endIndex = this.limit;
  }

  /**
   * Method (loadDictionary) : load dictionary from external resources example:- JSON, API
   */
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

  /**
   * Method (handleFiltering) : handle the filtering wait for 1 sec to recall the filter funtion as filter call is costly.
   */
  handleFiltering(): void {
    this.results$ = this.subject.pipe(
      debounceTime(1000),
      map((searchText: any) => {
        let result = [];
        result = this.utility.wordAutoCorrect(searchText, this.dictionary);
        if (!result.length) {
          result = this.utility.advancedAutoCorrect(
            searchText,
            this.dictionary
          );
        }
        return result;
      })
    );
    this.results$.subscribe((result) => {
      this.suggestions = result;
      this.clearResults();
    });
  }

  /**
   * Method (onValueChange) : Handle textbox input event
   * @param $event
   */
  onValueChange($event: any): void {
    const term = $event.target.value;
    if (term !== '') this.subject.next(term);
    else {
      this.suggestions = [];
      this.clearResults();
    }
  }

  /**
   * Method (loadWords) : called on vertical scroll & append the elements based on start & end Index.
   */
  loadWords(): void {
    const display = this.suggestions.slice(this.startIndex, this.endIndex);
    this.display.push(...display);
  }

  /**
   * Method (onScroll) : called on vertical scroll & set start & end Index fror pagination.
   */
  onScroll() {
    if (this.display.length < this.suggestions.length) {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + this.limit;
      this.loadWords();
    }
  }

  /**
   * Method (clearResults) : Reset the inifinite scroll parameters.
   */
  clearResults(): void {
    this.startIndex = 0;
    this.endIndex = this.limit;
    this.display = [];
    this.loadWords();
  }
}
