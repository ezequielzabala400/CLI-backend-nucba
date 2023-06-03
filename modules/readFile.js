import fs from 'fs';

export const readFile = (path) => {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}