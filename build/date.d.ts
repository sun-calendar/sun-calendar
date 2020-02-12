export declare class SunDate {
    [x: string]: any;
    private static units;
    constructor(unix?: number, zoneName?: string, locale?: string);
    setDelta(delta: number): SunDate;
    setOne(name: string, value: number | string): SunDate;
    set(values: {
        [name: string]: number | string;
    }): SunDate;
    static zero(values?: {}): SunDate;
    get now(): SunDate;
    parse(str: string, format: string): this;
    format(format: string): string;
}
