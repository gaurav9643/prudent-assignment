import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utility.service';
const mockDictionary = [
  'a',
  'b',
  'c',
  'd',
  'all',
  'delhi',
  "can't",
  "shouldn't",
  'common',
  'run',
  'Jean-Christophe',
];
describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(wordAutoCorrect) should return word run from dictinoary', () => {
    const words = service.wordAutoCorrect('run', mockDictionary);
    expect(words).toEqual(['run']);
  });

  it('(wordAutoCorrect) should return empty array', () => {
    const words = service.wordAutoCorrect('abcd', mockDictionary);
    expect(words).toEqual([]);
  });

  it('(wordAutoCorrect) should return all the matching words from dictinoray', () => {
    const words = service.wordAutoCorrect('a', mockDictionary);
    expect(words.length).toEqual(2);
  });

  it('(wordAutoCorrect) should return whether any letters are in upper case or lower case it return delhi', () => {
    const words = service.wordAutoCorrect('Delhi', mockDictionary);
    expect(words).toEqual(['delhi']);
  });

  it('(wordAutoCorrect) should return correct punctuation input: cant expected: can"t', () => {
    const words = service.wordAutoCorrect('cant', mockDictionary);
    expect(words).toEqual(["can't"]);
  });

  it('(wordAutoCorrect) should return correct punctuation input: JeanChristophe expected: Jean-Christophe', () => {
    const words = service.wordAutoCorrect('JeanChristophe', mockDictionary);
    expect(words).toEqual(['Jean-Christophe']);
  });

  it('(wordAutoCorrect) should return correct duplicate letters input: ccommon expected: common', () => {
    const words = service.wordAutoCorrect('ccommon', mockDictionary);
    expect(words).toEqual(['common']);
  });

  it('(advancedAutoCorrect) should return Correct adjacent letters letters input: felhi expected: delhi', () => {
    const words = service.advancedAutoCorrect('felhi', mockDictionary);
    expect(words).toEqual(['delhi']);
  });

  it('(advancedAutoCorrect) should return Correct adjacent letters letters input: selhi expected: delhi', () => {
    const words = service.advancedAutoCorrect('selhi', mockDictionary);
    expect(words).toEqual(['delhi']);
  });

  it('(advancedAutoCorrect) should return Transposing letters input: edhli expected: delhi', () => {
    const words = service.advancedAutoCorrect('edhli', mockDictionary);
    expect(words).toEqual(['delhi']);
  });

  it('(advancedAutoCorrect) should return Transposing letters input: urn expected: run', () => {
    const words = service.advancedAutoCorrect('urn', mockDictionary);
    expect(words).toEqual(['run']);
  });

  it('(matchWord) should return true str1:urn str2: Urn urn expected: true', () => {
    const words = service.matchWord('urn', 'Urn');
    expect(words).toEqual(true);
  });
  it('(matchWord) should return false str1:urn str2: run expected: true', () => {
    const isWord = service.matchWord('urn', 'run');
    expect(isWord).toEqual(false);
  });
  it('(handleDublicates) should return true', () => {
    const isWord = service.handleDublicates('all', 'aall', ['a', 'l']);
    expect(isWord).toEqual(true);
  });

  it('(handleDublicates) should return false', () => {
    const isWord = service.handleDublicates('alll', 'aall', ['a', 'l']);
    expect(isWord).toEqual(false);
  });

  it('(identifyAdjacentLetter) should return delhi from dictinoary', () => {
    const words = service.identifyAdjacentLetter(mockDictionary, 'felhi', 'filter');
    expect(words).toEqual(['delhi']);
  });

  it('(getAllWordsEqualLength) should return list of word based on term letter length', () => {
    const words = service.getAllWordsEqualLength(mockDictionary, 'a');
    expect(words.length).toEqual(4);
  });

  it('(containsSameLetters) should return true if str1 contains same letter to str2', () => {
    const isWords = service.containsSameLetters('abcd', 'bcad');
    expect(isWords).toEqual(true);
  });

  it('(containsSameLetters) should return false if str1 contains same letter to str2', () => {
    const isWords = service.containsSameLetters('abc2', 'bcad');
    expect(isWords).toEqual(false);
  });

});
