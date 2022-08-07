import { createWriteStream } from 'fs';
import * as path from 'path';
import { readdir, stat } from 'fs/promises';
import 'dotenv/config';

const currentDir = process.cwd();
const logsPath = path.join(currentDir, 'logs');
const maxLogSize = process.env.LOG_SIZE || 10000;

const writeLine = async (filePath: string, log: string) => {
  const ws = createWriteStream(filePath, { flags: 'a' });
  ws.write(log);
  ws.end();
};

const getFilesList = async () => {
  const files = await readdir(logsPath, { withFileTypes: true });
  return files;
};

const getFileSize = async (filePath: string) => {
  const stats = await stat(filePath);
  return stats.size;
};

const generateFileName = () => {
  const date = new Date();
  return `${date}.txt`;
};

const getCurrentLogFilePath = async () => {
  let files = await getFilesList();
  if (files.length === 0) {
    const filePath = path.join(logsPath, generateFileName());
    await writeLine(filePath, '');
    files = await getFilesList();
  }

  const currentLogFileName = files[files.length - 1].name;
  let currentLogFilePath = path.join(logsPath, currentLogFileName);

  const size = await getFileSize(currentLogFilePath);
  if (size >= maxLogSize) {
    currentLogFilePath = path.join(logsPath, generateFileName());
  }
  return currentLogFilePath;
};

export const writeLog = async (log: string) => {
  const filePath = await getCurrentLogFilePath();
  const date = new Date();
  await writeLine(filePath, `${date} ${log} \n`);
};
