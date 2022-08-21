import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  wordAutoCorrect(term: string, dictionary: string[]): string[] {
    return dictionary.filter((word: string) => {
      let isMatch = this.matchWord(word, term);
      if (word.match(/['-/]/)) {
        const _word = word.replace(/['-/]/, '');
        isMatch = this.matchWord(_word, term);
      }
      return isMatch;
    });
  }

  matchWord(str1: string, str2: string): boolean {
    return str1.toLowerCase().startsWith(str2.toLowerCase());
  }
}
