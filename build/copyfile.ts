import { resolve } from 'path';
import { copyFile } from 'fs/promises';
import { rootPath, outputPath } from './utils/path';
export const copyFiles = async () => {
  Promise.all([
    copyFile(resolve(rootPath, 'package.json'), resolve(outputPath, 'package.json')),
    copyFile(resolve(rootPath, 'README.md'), resolve(outputPath, 'README.md')),
  ]);
};
