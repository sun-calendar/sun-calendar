// Alhorithm was taken from "Astronomical Algorithms" by Jean Meeus.
import { units } from './units';
// Should be <= 1000.
export const minYear = -1000;
// Should be >= 1000.
export const maxYear = 3000;
const unixEpochInJde = 2440587.5;
const table27c = [
    [485, 324.96, 1934.136],
    [203, 337.23, 32964.467],
    [199, 342.08, 20.186],
    [182, 27.85, 445267.112],
    [156, 73.14, 45036.886],
    [136, 171.52, 22518.443],
    [77, 222.54, 65928.934],
    [74, 296.72, 3034.906],
    [70, 243.58, 9037.513],
    [58, 119.81, 33718.147],
    [52, 297.17, 150.678],
    [50, 21.02, 2281.226],
    [45, 247.54, 29929.562],
    [44, 325.15, 31555.956],
    [29, 60.93, 4443.417],
    [18, 155.12, 67555.328],
    [17, 288.79, 4562.452],
    [16, 198.04, 62894.029],
    [14, 199.76, 31436.921],
    [12, 95.39, 14577.848],
    [12, 287.11, 31931.756],
    [12, 320.81, 34777.259],
    [9, 227.73, 1222.144],
    [8, 15.45, 16859.074],
];
function getJde0(year) {
    if (minYear <= year && year <= 1000) {
        const y = year / 1000;
        return 1721139.29189
            + 365242.13740 * y
            + 0.06134 * Math.pow(y, 2)
            + 0.00111 * Math.pow(y, 3)
            - 0.00071 * Math.pow(y, 4);
    }
    else if (year <= maxYear + 1) {
        const y = (year - 2000) / 1000;
        return 2451623.80984
            + 365242.37404 * y
            + 0.05169 * Math.pow(y, 2)
            - 0.00411 * Math.pow(y, 3)
            - 0.00057 * Math.pow(y, 4);
    }
    else {
        throw new Error(`Year ${year} is out of range`);
    }
}
function degCos(degrees) {
    return Math.cos(degrees / 180 * Math.PI);
}
export function getSpringEquinox(year) {
    const jde0 = getJde0(year);
    const t = (jde0 - 2451545) / 36525;
    const w = 35999.373 * t - 2.47;
    const l = 1 + 0.0334 * degCos(w) + 0.0007 * degCos(2 * w);
    let s = 0;
    for (const [a, b, c] of table27c) {
        s += a * degCos(b + c * t);
    }
    const jde = jde0 + (1e-5 * s) / l;
    return (jde - unixEpochInJde) * units.day;
}
