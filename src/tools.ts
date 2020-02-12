import { expressUnit } from './units'

export function getWeeksInMonth (month: number) {
  if (month > expressUnit('commonYear', 'month')) {
    // Leap week.
    return 1
  } else {
    return expressUnit('month', 'week')
  }
}

export function getMonthsInYear (isLeap: boolean) {
  const monthsInCommonYear = expressUnit('commonYear', 'month')
  if (isLeap) {
    return monthsInCommonYear + 1
  } else {
    return monthsInCommonYear
  }
}
