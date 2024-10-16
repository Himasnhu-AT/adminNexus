import { logError, logWarning, logInfo, logSuccess, logDebug } from "../logger";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

jest.mock("fs");
jest.mock("chalk", () => ({
  red: jest.fn((msg) => msg),
  yellow: jest.fn((msg) => msg),
  blue: jest.fn((msg) => msg),
  green: jest.fn((msg) => msg),
  cyan: jest.fn((msg) => msg),
}));

describe("Logger Functions", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
  const consoleInfoSpy = jest.spyOn(console, "info").mockImplementation();
  const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  const consoleDebugSpy = jest.spyOn(console, "debug").mockImplementation();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log an error message to the console", () => {
    logError("Test error message", {
      toConsole: true,
      toFile: false,
      toApi: false,
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test error message"),
    );
  });

  it("should log a warning message to the console", () => {
    logWarning("Test warning message", {
      toConsole: true,
      toFile: false,
      toApi: false,
    });
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test warning message"),
    );
  });

  it("should log an info message to the console", () => {
    logInfo("Test info message", {
      toConsole: true,
      toFile: false,
      toApi: false,
    });
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test info message"),
    );
  });

  it("should log a success message to the console", () => {
    logSuccess("Test success message", {
      toConsole: true,
      toFile: false,
      toApi: false,
    });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test success message"),
    );
  });

  it("should log a debug message to the console", () => {
    logDebug("Test debug message", {
      toConsole: true,
      toFile: false,
      toApi: false,
    });
    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringContaining("Test debug message"),
    );
  });

  it("should write an error message to a file", () => {
    logError("Test error message", {
      toConsole: false,
      toFile: true,
      toApi: false,
    });
    expect(fs.appendFileSync).toHaveBeenCalled();
  });

  it("should not log to console if toConsole is false", () => {
    logError("Test error message", {
      toConsole: false,
      toFile: false,
      toApi: false,
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
