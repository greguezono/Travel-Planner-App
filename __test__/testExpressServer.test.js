import "babel-polyfill"
import { getTripDuration } from '../src/server/helpers'

describe("Testing the getTripDuration functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getTripDuration() function", () => {
        let date1 = new Date(2020, 0, 1)
        let date2 = new Date(2020, 0, 5)
        expect(getTripDuration(date1, date2)).toEqual(4)
    })
});