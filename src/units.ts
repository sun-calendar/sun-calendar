export const units: { [x: string]: number } = {
  millisecond: 1e-3,
  second: 1,
};
units.minute = 60 * units.second;
units.hour = 60 * units.minute;
units.day = 24 * units.hour;
units.week = 6 * units.day;
units.month = 5 * units.week;
units.commonYear = 12 * units.month;
units.leapYear = units.commonYear + units.week;
units.julianCentury = 36525 * units.day;

export function expressUnit(oneUnitName: string, anotherUnitName: string) {
  return units[oneUnitName] / units[anotherUnitName];
}
