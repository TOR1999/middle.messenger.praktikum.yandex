import { expect } from "chai";
import { getMessageFromResponse } from "./getMessageFromResponse";

describe("getMessageFromResponse", () => {
  it("should return the first value from the parsed JSON object", () => {
    const errText = JSON.stringify({ error: "Test error message" });
    const result = getMessageFromResponse(errText);
    expect(result).to.equal("Test error message");
  });

  it("should return an empty string if the JSON is invalid", () => {
    const errText = '{"error: "Test error message"}'; // Invalid JSON
    const result = getMessageFromResponse(errText);
    expect(result).to.equal("");
  });

  it("should return an empty string if the JSON object is empty", () => {
    const errText = JSON.stringify({});
    const result = getMessageFromResponse(errText);
    expect(result).to.equal("");
  });
});
