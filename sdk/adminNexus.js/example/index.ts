import {
  logError,
  logInfo,
  logWarning,
  logSuccess,
  logDebug,
} from "admin_nexus";

// Logging with different levels and options
logError("This is an error message", {
  toConsole: true,
  toFile: true,
  toApi: true,
});
logWarning("This is a warning message");
logSuccess("This is a success message");
logInfo("This is an info message", {
  toConsole: true,
  toFile: false,
  toApi: false,
});
logDebug("This is a debug message", {
  toConsole: true,
  toFile: false,
  toApi: false,
});
