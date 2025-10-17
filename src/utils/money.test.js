import { it, expect, describe } from 'vitest';              //Extracting functions from vitest
import { formatMoney } from './money';

describe('formatMoney', () => {                             //Grouping related unit test, e.g., testing { formatMoney } function 
    //Test 1 - check overall format of given input
    it('formats 1999 cents as $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99');
        expect(formatMoney(1124)).toBe('$11.24');
    });
    //Test 2 - check decimals
    it('format 2 decimals', () => {
        expect(formatMoney(1090)).toBe('$10.90');
        expect(formatMoney(100)).toBe('$1.00');
        expect(formatMoney(25)).toBe('$0.25');
        expect(formatMoney(0)).toBe('$0.00');
    })
})


/*
COMMAD to run vitest on commandline >> npx vitest 
it = takes String (that describe what's been tested) and a function that implements expect() and toBe()
expect() == takes the testing function with a passed in argument.
.toBe() == takes a String argument of what the return value should be
NOTE: with each {it} we can run a single expect().toBe() combo or multiple combos
To pass the tests, all combos run within a single {it} to pass. If at least 1 of them failed, the the overall status of {it} return will be failed
The above testing returned, 
        DEV  v3.2.4 C:/Users/sanjs/Documents/Post_TE/Software_Development_React/SuperSimpleDev/react-course/ecommerce-project

        ✓ src/utils/money.test.js (2 tests) 4ms
        ✓ formatMoney > formats 1999 cents as $19.99 2ms
        ✓ formatMoney > format 2 decimals 0ms

        Test Files  1 passed (1)
            Tests  2 passed (2)
        Start at  16:59:06
        Duration  554ms (transform 33ms, setup 0ms, collect 64ms, tests 4ms, environment 0ms, prepare 140ms)
*/