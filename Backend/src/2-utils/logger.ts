import path from "path";
import fs from "fs";
import { VerificationUserModel } from "../3-models/verificationUser-model";

// Errors log file:
const errorsLogFile = path.resolve(__dirname, "../1-assets/logs/errors.log");
const activitiesLogFile = path.resolve(
  __dirname,
  "../1-assets/logs/activities.log"
);
const verificationUserFile = path.resolve(
  __dirname,
  "../1-assets/logs/verifyCredentials.json"
);

// Log error:
function logError(message: string, err?: any): void {
  const now = new Date();
  let msgToLog = now.toUTCString() + "\n";
  msgToLog += message + "\n";
  if (typeof err === "string") msgToLog += err + "\n"; // E.g. throw new "Blah..." in some internal library.
  if (err?.stack) msgToLog += `Stack: ${err.stack}\n`;
  msgToLog +=
    "----------------------------------------------------------------------------------------------------\n";
  fs.appendFile(errorsLogFile, msgToLog, () => {}); // Do nothing if fail to log.
}

// Log error:
function logActivity(message: string): void {
  const now = new Date();
  let msgToLog = now.toUTCString() + "\n";
  msgToLog += message + "\n";
  msgToLog +=
    "----------------------------------------------------------------------------------------------------\n";
  fs.appendFile(activitiesLogFile, msgToLog, () => {}); // Do nothing if fail to log.
}

// Log Verification User:
function logVerificationUser(verificationUser: VerificationUserModel): void {
  const dataToSave = JSON.stringify(verificationUser);
  fs.writeFile(verificationUserFile, dataToSave, (err) => {
    if (err) {
      logError("Error writing to file:", err);
      return;
    }
  });
}

// Read Verification User:
function readVerificationUser() {
  fs.readFile(
    verificationUserFile,
    "utf-8",
    (err, data): VerificationUserModel => {
      if (err) {
        console.error("Error reading from file:", err);
        return;
      }
      const parsedData: VerificationUserModel = JSON.parse(data);
      return parsedData;
    }
  );
  fs.unlink(verificationUserFile, (err) =>
    logError("Error deleting file", err.message)
  );
}

export default {
  logError,
  logActivity,
  logVerificationUser,
  readVerificationUser,
};
