import { Injectable } from '@angular/core';

const adjacentWords: any = {
  q: ['Q', 'w', 'W'],
  w: ['W', 'q', 'Q', 'e', 'E'],
  e: ['E', 'w', 'W', 'r', 'R'],
  r: ['R', 'e', 'E', 't', 'T'],
  t: ['T', 'r', 'R', 'y', 'Y'],
  y: ['Y', 't', 'T', 'u', 'U'],
  u: ['U', 'y', 'Y', 'i', 'I'],
  i: ['I', 'u', 'U', 'o', 'O'],
  o: ['O', 'i', 'I', 'p', 'P'],
  p: ['P', 'o', 'O'],
  a: ['A', 's', 'S'],
  s: ['S', 'a', 'A', 'd', 'D'],
  d: ['D', 's', 'S', 'f', 'F'],
  f: ['F', 'd', 'D', 'g', 'G'],
  g: ['G', 'f', 'F', 'h', 'H'],
  h: ['H', 'g', 'G', 'j', 'J'],
  j: ['J', 'h', 'H', 'k', 'K'],
  k: ['K', 'j', 'J', 'l', 'L'],
  l: ['L', 'k', 'K'],
  z: ['Z', 'x', 'X'],
  x: ['X', 'z', 'Z', 'c', 'C'],
  c: ['C', 'x', 'X', 'v', 'V'],
  v: ['V', 'c', 'C', 'b', 'B'],
  b: ['B', 'v', 'V', 'n', 'N'],
  n: ['N', 'b', 'B', 'm', 'M'],
  m: ['M', 'n', 'N'],
};

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  /**
   * Method (wordAutoCorrect): Return matching words based on term.
   * Rules 1 : if word startWith term
   * Rules 2 : if word has dash, slash or apostrophe ignored by method and compare with term.
   * Rules 3 : if term has duplicate letters it handle and return matching letter.
   * @param term string
   * @param dictionary string[]
   * @returns string[]
   */
  wordAutoCorrect(term: string, dictionary: string[]): string[] {
    let result: string[] = [];
    let matchedWords: string[] = [];
    let adjacentWords: string[] = [];
    let duplicates: string[] = [];

    //adjacentWords = this.advancedAutoCorrect(term, dictionary, 'find');
    matchedWords = dictionary.filter((word: string) => {
      let isMatch = this.matchWord(word, term);
      if (!isMatch) {
        if (word.match(/['-/]/)) {
          const _word = word.replace(/['-/]/, '');
          isMatch = this.matchWord(_word, term);
        } else {
          if (!duplicates.length) {
            let termSplit: string[] = term.toLowerCase().split('');
            duplicates = termSplit.filter(
              (value, index, self) => self.indexOf(value) === index
            );
          }
          isMatch = this.handleDublicates(word, term, duplicates);
        }
      }
      return isMatch;
    });
    result.push(...adjacentWords);
    result.push(...matchedWords);
    return result;
  }

  /**
   * Method (matchWord): return true if str1 start with str2.
   * @param str1 string
   * @param str2 string
   * @returns boolean
   */
  matchWord(str1: string, str2: string): boolean {
    return str1.toLowerCase().startsWith(str2.toLowerCase());
  }

  /**
   * Method (handleDublicates): handle duplicates & return true or false if term match with word.
   * @param word string
   * @param term string
   * @param duplicates string[]
   * @returns boolean
   */
  handleDublicates(word: string, term: string, duplicates: string[]): boolean {
    let result: boolean = false;
    duplicates.every((char) => {
      let termSplit: string[] = term.toLowerCase().split('');
      const _index = termSplit.indexOf(char);
      if (_index !== -1) {
        termSplit.splice(_index, 1);
        result = word.toLowerCase() == termSplit.join('').toLowerCase();
        if (result) return false;
      }
      return true;
    });
    return result;
  }

  /**
   * Method (advancedAutoCorrect): return list word based on term.
   * Rules 1 : Correct adjacent letters
   * Rules 2 : Transposing letters
   * @param term  string
   * @param dictionary  string[]
   * @param method string
   * @returns  string[]
   */
  advancedAutoCorrect(
    term: string,
    dictionary: string[],
    method: string = 'filter'
  ): string[] {
    let result: string[] = [];
    const _equalLengthWords = this.getAllWordsEqualLength(dictionary, term);
    if (_equalLengthWords.length) {
      result = this.identifyAdjacentLetter(
        _equalLengthWords,
        term.toLowerCase(),
        method
      );
    }
    return result;
  }

  /**
   * Method (identifyAdjacentLetter) : method is identify Adjacent & Transposing letters.
   * @param words string
   * @param adjacentWords Object
   * @param term string
   * @param method string
   * @returns string[]
   */
  identifyAdjacentLetter(
    words: any,
    term: string,
    method: string
  ): string[] {
    let result: string[] = [];
    result = words[method]((word: string) => {
      const _length = term.length;
      let isMatch = false;
      for (let i = 0; i < _length; i++) {
        let letter = term.charAt(i);
        let replacedLetter = adjacentWords[letter];
        if (replacedLetter && replacedLetter.length > 1) {
          replacedLetter.forEach((ele: any) => {
            const replaced = term.replace(term[i], ele);
            if (replaced == word) {
              isMatch = this.matchWord(replaced, word);
            }
          });
        }
      }
      if (!isMatch)
        isMatch = this.containsSameLetters(
          word.toLowerCase(),
          term.toLowerCase()
        );
      return isMatch;
    });
    return Array.isArray(result) ? result : [result];
  }

  /**
   * Method (getAllWordsEqualLength) : filter the list based on term length;
   * @param list string[]
   * @param term string
   * @returns string[]
   */
  getAllWordsEqualLength(list: string[], term: string): string[] {
    return list.filter((word) => word.length == term.length);
  }

  /**
   * Method (containsSameLetters) : return true if str1 letter exist in str2.
   * @param str1 string
   * @param str2 string
   * @returns boolean
   */
  containsSameLetters(str1: string, str2: string): boolean {
    const letters = [...str1];
    return [...str2].every((x) => {
      var index = letters.indexOf(x);
      if (~index) {
        letters.splice(index, 1);
        return true;
      }
      return false;
    });
  }
}
