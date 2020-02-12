import { expressUnit } from './units';

export class Token {
  regexp: RegExp;
  set: Function;
  convert: Function;
  get: Function;

  constructor (regexp: RegExp, set, convert, get?) {
    this.regexp = regexp;
    this.set = set;
    this.convert = convert;
    this.get = get;
  }
}

function genericSet(name: string) {
  return (value, date) => date.setOne(name, value);
}

function genericGet(name: string) {
  return (date) => date[name];
}

const wordReg = /[A-Za-zА-Яа-я]+/
const wordReg3 = /[A-Za-zА-Яа-я]{3}/

export const tokens: { [x: string]: Token } = {
  '%hh': new Token(
    /\d{2}/,
    genericSet('hour'),
    Number,
    (date) => date.hour.toString().padStart(2, '0')
  ),
  '%mm': new Token(
    /\d{2}/,
    genericSet('minute'),
    Number,
    (date) => date.minute.toString().padStart(2, '0')
  ),
  '%ss': new Token(
    /\d{2}/,
    genericSet('second'),
    Number,
    (date) => date.second.toString().padStart(2, '0')
  ),
  '%y4': new Token(
    /[+-]?\d{4}/,
    genericSet('year'),
    Number,
    (date) => date.year.toString().padStart(4, '0'),
  ),
  '%y2': new Token(
    /\d{2}/,
    (year, date) => {
      if (year < 70) {
        year += 2000;
      } else {
        year += 1900;
      }
      return date.setOne('year', year);
    },
    Number,
    (date) => date.year.toString().slice(-2),
  ),
  '%y': new Token(
    /[+-]?\d+/,
    genericSet('year'),
    Number,
    genericGet('year'),
  ),
  '%M3': new Token(
    wordReg3,
    genericSet('monthName'),
    String,
    (date) => date.monthName.slice(0, 3),
    ),
  '%M': new Token(
    wordReg,
    genericSet('monthName'),
    String,
    genericGet('monthName'),
  ),
  '%m2': new Token(
    /\d{2}/,
    genericSet('month'),
    Number,
    (date) => date.month.toString().padStart(2, '0')
  ),
  '%m': new Token(
    /\d\d?/,
    genericSet('month'),
    Number,
    genericGet('month'),
  ),
  '%D3': new Token(
    wordReg3,
    genericSet('dayName'),
    String,
    (date) => date.dayName.slice(0, 3),
  ),
  '%D': new Token(
    wordReg,
    genericSet('dayName'),
    String,
    genericGet('dayName'),
  ),
  '%w': new Token(
    /\d/,
    genericSet('week'),
    Number,
    genericGet('week'),
  ),
  '%o3': new Token(
    /\d{3}/,
    genericSet('dayOfYear'),
    Number,
    (date) => date.dayOfYear.toString().padStart(3, '0'),
  ),
  '%o': new Token(
    /\d{1,3}/,
    genericSet('dayOfYear'),
    Number,
    genericGet('dayOfYear'),
  ),
  '%d': new Token(
    /\d/,
    genericSet('day'),
    Number,
    genericGet('day'),
  ),
  '%X': new Token(
    /\d+[.,]?d*/,
    genericSet('unix'),
    Number,
    genericGet('unix')
  ),
  '%x': new Token(
    /\d+/,
    genericSet('timeValue'),
    Number,
    genericGet('timeValue'),
  ),
  '%a': new Token(
    /[apAP][mM]/,
    (meridiem, date) => {
      if (meridiem.toLowerCase() === 'pm') {
        const hour = date.hour();
        const halfADayInHours = expressUnit('day', 'hour') / 2;
        return date.setOne('hour', hour + halfADayInHours);
      }
      return date;
    },
    String,
    (date) => date.hour < 12 ? 'am' : 'pm',
  )
}
