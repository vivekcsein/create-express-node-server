// log events files
import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";
import { NextFunction } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logEvents = async (message: string, logName: string) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "../../", 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, "../../", 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, "../../", 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}