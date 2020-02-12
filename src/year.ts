import { getSpringEquinox, minYear } from './equinox';
import { units } from './units';

const epoch = Math.floor(
  getSpringEquinox(minYear) / units.day) * units.day;

function getLeapWeeks(year: number, equinox: number) {
  const msSinceEpoch = equinox - epoch;
  const yearsSinceEpoch = year - minYear;
  return Math.floor(
    (msSinceEpoch - yearsSinceEpoch * units.commonYear)
    / units.week
  );
}

function isLeap(year: number, beginning: number) {
  const nextEquinox = getSpringEquinox(year + 1);
  const nextBeginningLeap = beginning + units.leapYear;
  return nextEquinox >= nextBeginningLeap;
}

export function getYearParamsByYear(year: number) {
  const equinox = getSpringEquinox(year);
  const leapWeeks = getLeapWeeks(year, equinox);
  const beginning = (year - minYear) * units.commonYear
                     + leapWeeks * units.week
                     + epoch;
  return {
    year,
    beginning,
    isLeap: isLeap(year, beginning),
    equinox,
  }
}

export function getYearParamsByUnix(unix: number) {
  const oldYear = new Date(unix / units.millisecond).getUTCFullYear();
  const yearParams = getYearParamsByYear(oldYear);
  if (yearParams.beginning <= unix) {
    return yearParams;
  }
  return getYearParamsByYear(oldYear - 1);
}

export const zero = getYearParamsByYear(0).beginning
