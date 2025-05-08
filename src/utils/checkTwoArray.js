import { expect } from "@playwright/test";

function expectArraysToMatchUnordered(expected, actual) {
    // ตรวจสอบจำนวนให้ตรง
    expect(actual).toHaveLength(expected.length);
  
    // ตรวจสอบว่า `actual` มีทุก item ที่ตรงกับ `expected`
    expected.forEach(expectedItem => {
      expect(actual).toEqual(expect.arrayContaining([
        expect.objectContaining(expectedItem)
      ]));
    });
  }
  module.exports = {
    expectArraysToMatchUnordered,
}