import { expect, test } from "bun:test";
import { toneDescriptor } from "./utils.js";

test("toneDescriptor", () => {
  expect(toneDescriptor(100)).toBe("100 (very warm)");
  expect(toneDescriptor(80)).toBe("80 (very warm)");
  expect(toneDescriptor(79)).toBe("79 (warm)");
  expect(toneDescriptor(60)).toBe("60 (warm)");
  expect(toneDescriptor(59)).toBe("59 (neutral)");
  expect(toneDescriptor(40)).toBe("40 (neutral)");
  expect(toneDescriptor(39)).toBe("39 (blunt)");
  expect(toneDescriptor(20)).toBe("20 (blunt)");
  expect(toneDescriptor(19)).toBe("19 (very blunt)");
  expect(toneDescriptor(0)).toBe("0 (very blunt)");
});
