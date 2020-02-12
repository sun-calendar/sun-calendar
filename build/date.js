import moment from 'moment-timezone';
import { getYearParamsByUnix, getYearParamsByYear, zero } from './year';
import { units } from './units';
import { names, nameToValue } from './names';
import { tokens } from './tokens';
function mod(a, b) {
    return ((a % b) + b) % b;
}
export class SunDate {
    constructor(unix = 0, zoneName = 'UTC', locale = 'en') {
        this.timeValue = Math.floor(unix / units.millisecond);
        this.unix = this.timeValue * units.millisecond;
        this.zoneName = zoneName;
        this.locale = locale;
        const oldDate = moment.unix(unix).tz(zoneName);
        this.zoneAbbr = oldDate.zoneAbbr();
        this.offset = oldDate.utcOffset() * units.minute;
        const yearParams = getYearParamsByUnix(unix + this.offset);
        this.year = yearParams.year;
        this.isLeap = yearParams.isLeap;
        this.beginning = yearParams.beginning;
        this.equinox = yearParams.equinox;
        const secondsOfYear = (unix + this.offset) - yearParams.beginning;
        this.month = Math.floor(secondsOfYear / units.month) + 1;
        this.weekOfYear = Math.floor(secondsOfYear / units.week) + 1;
        this.dayOfYear = Math.floor(secondsOfYear / units.day) + 1;
        this.week = Math.floor(secondsOfYear % units.month / units.week) + 1;
        this.day = Math.floor(secondsOfYear % units.week / units.day) + 1;
        this.monthName = names[locale].months[this.month - 1];
        this.dayName = names[locale].days[this.day - 1];
        const unixWithOffset = unix + this.offset;
        this.hour = Math.floor(mod(unixWithOffset, units.day) / units.hour);
        this.minute = Math.floor(mod(unixWithOffset, units.hour) / units.minute);
        this.second = Math.floor(mod(unixWithOffset, units.minute));
        this.millisecond = Math.round(mod(unixWithOffset, units.second) / units.millisecond);
    }
    setDelta(delta) {
        return new SunDate(this.unix + delta, this.zoneName, this.locale);
    }
    setOne(name, value) {
        if (name in units) {
            return this.setDelta((value - this[name]) * units[name]);
        }
        if (name in SunDate.units) {
            return this.setDelta((value - this[name]) * SunDate.units[name]);
        }
        switch (name) {
            case 'year':
                return this.setDelta(getYearParamsByYear(value).beginning - this.beginning);
            case 'monthName':
                return this.setOne('month', nameToValue(value, names[this.locale].months));
            case 'dayName':
                return this.setOne('day', nameToValue(value, names[this.locale].days));
            case 'zoneName':
                return new SunDate(this.unix, value, this.locale);
            case 'locale':
                return new SunDate(this.unix, this.zoneName, value);
        }
        return this;
    }
    set(values) {
        let newDate = this;
        for (const name in values) {
            newDate = newDate.setOne(name, values[name]);
        }
        return newDate;
    }
    static zero(values = {}) {
        return new SunDate(zero).set(values);
    }
    get now() {
        return this.setOne('timeValue', Date.now());
    }
    parse(str, format) {
        const parsingResult = {};
        // Escape parens.
        let regFormat = format.replace('(', '\\(').replace(')', '\\)');
        for (const token in tokens) {
            const regToken = new RegExp(token, 'g');
            while (regToken.exec(format)) {
                parsingResult[regToken.lastIndex] = tokens[token];
            }
            format = format.replace(token, ' '.repeat(token.length));
            regFormat = regFormat.replace(token, `(${tokens[token].regexp.source})`);
        }
        const parsed = [...str.matchAll(new RegExp(regFormat, 'g'))][0].slice(1);
        let date = this;
        for (const i in parsingResult) {
            const token = parsingResult[i];
            const value = parsed.shift();
            date = token.set(token.convert(value), date);
        }
        return date;
    }
    format(format) {
        for (const token in tokens) {
            const value = tokens[token].get(this);
            format = format.replace(token, value);
        }
        return format;
    }
}
SunDate.units = {
    weekOfDay: units.week,
    dayOfYear: units.day,
    unix: units.second,
    timeValue: units.millisecond,
};
