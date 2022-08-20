import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /**
   * Method : Return word(string) if exist based on term & if not exist return undefined.
   * @param term
   * @param dictionary
   * @returns {string | undefined}
   */
  wordAutoCorrect(term: string, dictionary: string[]): string | undefined {
    return dictionary.find((word: string) => word == term);
  }
}
