import { join, resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import minimist from 'minimist';
import { getUserConfig } from './generator/question';
import { emptyDir, formatTargetDir } from './utils/utils';
import { render } from './generator/render';

const argv = minimist(process.argv.slice(2), { string: ['_'] });

const cwd = process.cwd();
const def = {
  defaultTargetDir: 'vix-project',
};

const init = async () => {
  const config = await getUserConfig({ targetDir: formatTargetDir(argv._[0]) });
  const {
    targetDir,
    overwrite,
    projectName,
    packageName = projectName ?? def.defaultTargetDir,
    description,
    author,
    eslint,
    prettier,
    vue,
    commitlint,
  } = config;

  const root = join(cwd, targetDir ?? def.defaultTargetDir);

  if (existsSync(root) && overwrite) {
    emptyDir(root);
  } else if (!existsSync(root)) {
    mkdirSync(root);
  }

  const pkg = {
    name: packageName,
    description: description ?? '',
    author: author ?? '',
  };
  writeFileSync(resolve(root, 'package.json'), JSON.stringify(pkg, null, 2));

  const templateRoot = resolve(__dirname, 'template');
  if (vue === 2) {
    console.log('cli暂不支持vue2');
    return;
  }
  if (eslint) {
    render(root, templateRoot, 'eslint');
  }
  if (prettier) {
    render(root, templateRoot, 'prettier');
  }
  if (commitlint) {
    render(root, templateRoot, 'commitlint');
  }
};

init().catch((e) => {
  console.error(e);
});
