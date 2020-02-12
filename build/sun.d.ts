import { SunDate } from './date';
import * as tools from './tools';
export { tools };
export declare const consts: {
    minYear: number;
    maxYear: number;
    names: {
        en: {
            months: string[];
            days: string[];
        };
        ru: {
            months: string[];
            days: string[];
        };
    };
    units: {
        [x: string]: number;
    };
};
export declare const zero: typeof SunDate.zero;
