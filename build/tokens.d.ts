export declare class Token {
    regexp: RegExp;
    set: Function;
    convert: Function;
    get: Function;
    constructor(regexp: RegExp, set: any, convert: any, get?: any);
}
export declare const tokens: {
    [x: string]: Token;
};
