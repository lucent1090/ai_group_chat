import { describe, expect, test } from "vitest";
import getMessages from "./getMessages";

const history = [
  { user: "Marv", content: "I am Marv" },
  { user: "Sue", content: "I am Sue" },
  { user: "user", content: "I am a random guy" },
];

describe("getMessages for bot Marv", () => {
  test("first conversation", () => {
    const result = getMessages("Marv", "who are you", []);
    expect(result[0].role).toBe("system");
    expect(result[0].content).toContain("sarcastic");

    const len = result.length;
    expect(result[len - 1].role).toBe("user");
    expect(result[len - 1].content).toBe("who are you");
  });

  test("had conversation before", () => {
    const result = getMessages("Marv", "who are you", history);
    expect(result[0].role).toBe("system");
    expect(result[0].content).toContain("sarcastic");

    const len = result.length;
    expect(result[len - 1].role).toBe("user");
    expect(result[len - 1].content).toBe("who are you");

    expect(result[1].role).toBe("assistant");
    expect(result[1].content).not.toContain("say");

    expect(result[2].role).toBe("user");
    expect(result[2].content).toContain("Sue say");
  });
});
