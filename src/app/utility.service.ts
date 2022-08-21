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

  wordAutoCorrect(term: string, dictionary: string[]): string[] {
    let result: string[] = [];
    let matchedWords: string[] = [];
    let adjacentWords: string[] = [];
    adjacentWords = this.correctAdjacentletter(term, dictionary, 'find');
    matchedWords = dictionary.filter((word: string) => {
      let isMatch = this.matchWord(word, term);
      if (!isMatch) {
        if (word.match(/['-/]/)) {
          const _word = word.replace(/['-/]/, '');
          isMatch = this.matchWord(_word, term);
        } else {
        }
      }
      return isMatch;
    });
    result.push(...adjacentWords);
    result.push(...matchedWords);
    return result;
  }

  matchWord(str1: string, str2: string): boolean {
    return str1.toLowerCase().startsWith(str2.toLowerCase());
  }

  correctAdjacentletter(
    term: string,
    dictionary: string[],
    method: string = 'filter'
  ): string[] {
    let result: string[] | string = [];
    const _equalLengthWords = this.getAllWordsEqualLength(dictionary, term);
    if (_equalLengthWords.length) {
      result = this.identifyAdjacentLetter(
        _equalLengthWords,
        adjacentWords,
        term,
        method
      );
    }
    return result;
  }

  identifyAdjacentLetter(
    words: any,
    adjacentWords: any,
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
        if (replacedLetter.length > 1) {
          replacedLetter.forEach((ele: any) => {
            const replaced = term.replace(term[i], ele);
            if (replaced == word) {
              result.push(replaced);
            }
          });
          if (result.length == 1) {
            isMatch = true;
          }
        }
      }
      return isMatch;
    });
    return Array.isArray(result) ? result : [result];
  }

  getAllWordsEqualLength(list: string[], term: string): string[] {
    return list.filter((word) => word.length == term.length);
  }
}
