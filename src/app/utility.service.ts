import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  wordAutoCorrect(term: string, dictionary: string[]): string[] {
    return dictionary.filter((word: string) =>
      word.toLowerCase().startsWith(term.toLowerCase())
    );
  }
}
