import { getCloudInfo, getPrecipInfo } from '../src/client/js/docHandler'

describe("Testing the getCloudInfo functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getCloudInfo() function", () => {
        let clouds1 = 0;
        let expectedText1 = 'clear'
        let clouds2 = 5;
        let expectedText2 = 'partly cloudy'
        let clouds3 = 10;
        let expectedText3 = 'cloudy'
        expect(getCloudInfo(clouds1)).toEqual(expectedText1);
        expect(getCloudInfo(clouds2)).toEqual(expectedText2);
        expect(getCloudInfo(clouds3)).toEqual(expectedText3);
    })
});

describe("Testing the getPrecipInfo functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the getPrecipInfo() function", () => {
        let precip1 = 0;
        let expectedText1 = 'no chance of rain!'
        let precip2 = 3;
        let expectedText2 = 'a low chance of rain.'
        let precip3 = 5;
        let expectedText3 = 'a high chance of rain.'
        expect(getPrecipInfo(precip1)).toEqual(expectedText1);
        expect(getPrecipInfo(precip2)).toEqual(expectedText2);
        expect(getPrecipInfo(precip3)).toEqual(expectedText3);
    })
});
