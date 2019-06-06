import store from "../store.mock";
import { getErrors } from "./errors";

test("selector getErrors return the expected result", () => {
  expect(getErrors(store)).toBe(store.errors);
});
