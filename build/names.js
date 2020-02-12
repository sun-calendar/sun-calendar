export const names = {
    en: {
        months: [
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
            'January',
            'February',
            'Lea'
        ],
        days: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]
    },
    ru: {
        months: [
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
            'Январь',
            'Февраль',
            'Високос'
        ],
        days: [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ]
    }
};
export function nameToValue(name, names) {
    for (const [i, testName] of names.entries()) {
        if (testName.slice(0, name.length) === name) {
            return i + 1;
        }
    }
    return 1;
}
