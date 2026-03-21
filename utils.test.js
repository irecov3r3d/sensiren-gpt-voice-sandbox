import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { uid } from "./utils.js";

describe("uid", () => {
  let originalCrypto;

  beforeEach(() => {
    originalCrypto = globalThis.crypto;
  });

  afterEach(() => {
    globalThis.crypto = originalCrypto;
  });

  it("should generate a valid UUID when crypto.randomUUID is available", () => {
    // Bun has a built-in crypto.randomUUID
    const id = uid();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("should generate a valid UUIDv4 when using crypto.getRandomValues fallback", () => {
    // Mock crypto to only have getRandomValues
    globalThis.crypto = {
      getRandomValues: (arr) => {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 256);
        }
        return arr;
      }
    };

    const id = uid();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("should generate a fallback ID when crypto is completely unavailable", () => {
    // Mock crypto to be undefined
    globalThis.crypto = undefined;

    const id = uid();
    // It should look like "timestamp-randomhex"
    expect(id).toMatch(/^\d+-[0-9a-f]+$/);
  });
});
