# The Sun calendar
## What is the Sun calendar?
The Sun calendar is a [calendar reform](https://en.wikipedia.org/wiki/Calednar_reform).

Its purpose is to be an alternative to the Gregorian calendar in civil life.
### How does it work?
Let's start with some year (Gregorian for now) that is called *minimal*. (Current version uses -1000
a.k.a. 1001 BC.) So, let's find March equinox for that year. The day it takes place is the
first day of the Sun calendar.

Common year consist of __60 weeks of 6 days__ or __12 months of 5 weeks of 6 days__. Leap year has an
extra week in the end, which can be treated as 13th mini-month.

To determine is the year leap, the next March equinox is calculated. Then leap week should be added so,
that the equinox occurs on the first week of the next year.
### Why there is a minimal year?
To calculate date of the equinox I used an algorithm I found in "Astronomical Algorithms" by Jean
Meeus. The available range is [-1000; 3000]. So, there is also the maximum year. But the good news are:
changing maximum year doesn't affect other years at all.
## Installation
For now you can install the library directly from GitHub:

```sh
# Using npm:
npm i https://github.com/sun-calendar/sun-calendar.git

# Or using yarn:
yarn add https://github.com/sun-calendar/sun-calendar.git
```
