import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";
import chalk from "chalk";

// Load environment variables from .env file
config();

const SERVER_URL = process.env.SERVER_URL || "";
const DEFAULT_LOG_PATH = "logs";

// Ensure that the log directory exists
const ensureLogDirectoryExists = (logPath: string = DEFAULT_LOG_PATH) => {
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath, { recursive: true });
  }
};

// Create log filename based on current datetime
const createLogFilename = (logPath: string = DEFAULT_LOG_PATH) => {
  const now = new Date();
  return path.join(logPath, `${now.toISOString()}.log`);
};

const logFilePath = createLogFilename();

// Helper to write logs to a file
const writeToFile = (message: string, logPath: string = logFilePath) => {
  ensureLogDirectoryExists();
  fs.appendFileSync(logPath, `${message}\n`);
};

// Helper to send logs to the server using fetch
const sendToServer = async (message: string) => {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.error(
        chalk.red("Failed to send log to server:"),
        response.statusText,
      );
    }
  } catch (error) {
    console.error(chalk.red("Error sending log to server:"), error);
  }
};

// Log function to either console, file, or API
const logMessage = async (
  level: string,
  message: string,
  options: {
    toConsole?: boolean;
    toFile?: boolean;
    toApi?: boolean;
    logPath?: string;
  } = {},
) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[ ${level.toUpperCase()}: ${timestamp} ] >>> ${message}`;
  const logPath = options.logPath || logFilePath;

  if (options.toConsole) {
    switch (level) {
      case "error":
        console.error(chalk.red(logEntry));
        break;
      case "warning":
        console.warn(chalk.yellow(logEntry));
        break;
      case "info":
        console.info(chalk.blue(logEntry));
        break;
      case "success":
        console.log(chalk.green(logEntry));
        break;
      case "debug":
        console.debug(chalk.cyan(logEntry));
        break;
      default:
        console.log(logEntry);
        break;
    }
  }

  if (options.toFile) {
    writeToFile(logEntry, logPath);
  }

  if (options.toApi && SERVER_URL) {
    await sendToServer(logEntry);
  }
};

// Exported log functions
export const logError = (
  message: string,
  options = { toConsole: true, toFile: true, toApi: false },
) => {
  logMessage("error", message, options);
};

export const logWarning = (
  message: string,
  options = { toConsole: true, toFile: true, toApi: false },
) => {
  logMessage("warning", message, options);
};

export const logInfo = (
  message: string,
  options = { toConsole: true, toFile: true, toApi: false },
) => {
  logMessage("info", message, options);
};

export const logSuccess = (
  message: string,
  options = { toConsole: true, toFile: true, toApi: false },
) => {
  logMessage("success", message, options);
};

export const logDebug = (
  message: string,
  options = { toConsole: true, toFile: true, toApi: false },
) => {
  logMessage("debug", message, options);
};
