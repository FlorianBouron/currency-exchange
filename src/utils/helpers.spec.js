import { isObject, mergeDeep } from "./helpers";

test("function isObject expect to return true", () => {
  expect(isObject({})).toBe(true);
});

test("function mergeDeep expect to return a deep copy", () => {
  const target = { a: { b: { c: "c", d: "d" } } };
  const source = { a: { b: { e: "e", f: "f" } } };
  const expectedResult = { a: { b: { c: "c", d: "d", e: "e", f: "f" } } };
  expect(mergeDeep(target, source)).toStrictEqual(expectedResult);
});

test("function mergeDeep expect to fail and return the target", () => {
  const target = { a: "a" };
  const source = undefined;
  expect(mergeDeep(target, source)).toStrictEqual(target);
});
