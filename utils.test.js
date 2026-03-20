import { expect, test, describe } from "bun:test";
import { toneDescriptor } from "./utils.js";

describe("toneDescriptor", () => {
  test("returns very warm for values >= 80", () => {
    expect(toneDescriptor(100)).toBe("100 (very warm)");
    expect(toneDescriptor(80)).toBe("80 (very warm)");
  });

  test("returns warm for values >= 60 and < 80", () => {
    expect(toneDescriptor(79)).toBe("79 (warm)");
    expect(toneDescriptor(60)).toBe("60 (warm)");
  });

  test("returns neutral for values >= 40 and < 60", () => {
    expect(toneDescriptor(59)).toBe("59 (neutral)");
    expect(toneDescriptor(40)).toBe("40 (neutral)");
  });

  test("returns blunt for values >= 20 and < 40", () => {
    expect(toneDescriptor(39)).toBe("39 (blunt)");
    expect(toneDescriptor(20)).toBe("20 (blunt)");
  });

  test("returns very blunt for values < 20", () => {
    expect(toneDescriptor(19)).toBe("19 (very blunt)");
    expect(toneDescriptor(0)).toBe("0 (very blunt)");
    expect(toneDescriptor(-10)).toBe("-10 (very blunt)");
  });
});
