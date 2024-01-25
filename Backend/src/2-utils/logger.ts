import path from "path";
import fs from "fs";
import VerificationUserModel from "../3-models/verificationUser-model";

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
async function readVerificationUser(): Promise<VerificationUserModel> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      verificationUserFile,
      "utf-8",
      (err: any, data: string): void => {
        if (err) {
          console.error("Error reading from file:", err);
          reject(err);
          return;
        }
        const parsedData: VerificationUserModel = JSON.parse(data);
        resolve(parsedData);
      }
    );
  });
}

function deleteVerifyFile(): void {
  fs.unlink(verificationUserFile, (err: any) =>
    logError("Failed deleting file", err)
  );
}

export default {
  logError,
  logActivity,
  logVerificationUser,
  readVerificationUser,
  deleteVerifyFile,
};
