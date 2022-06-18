import { red, reset } from 'kolorist';
import prompts from 'prompts';
import {
  canSafelyOverwrite,
  formatTargetDir,
  isValidPackageName,
  toValidPackageName,
} from '../utils/utils';

interface UserConfigOptions {
  targetDir?: string;
}

interface UserConfig {
  targetDir?: string;
  projectName?: string;
  packageName?: string;
  overwrite?: boolean;
  description?: string;
  author?: string;
  vue?: number;
  language?: string;
  commitlint?: boolean;
  eslint?: boolean;
  prettier?: boolean;
}

export const getUserConfig = async ({ targetDir }: UserConfigOptions) => {
  // const cwd = process.cwd();
  let answer: UserConfig = {
    targetDir,
  };
  const questions: Array<prompts.PromptObject<string>> = [
    {
      name: 'projectName',
      type: targetDir ? null : 'text',
      message: reset('Project name:'),
      onState: (state) => {
        answer.targetDir = formatTargetDir(state.value) || targetDir;
      },
    },
    {
      name: 'overwrite',
      type: (prev, options) => {
        if (options.projectName && canSafelyOverwrite(options.projectName)) {
          return null;
        }
        return 'toggle';
      },
      message: () => `目录已经存在，是否覆盖改目录？`,
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'overwriteChecker',
      type: (prev, options) => {
        if (options.overwrite === false) {
          throw new Error(`${red('✖')} Operation cancelled`);
        }
        return null;
      },
    },
    {
      name: 'packageName',
      type: () =>
        answer.targetDir && isValidPackageName(answer.targetDir)
          ? null
          : 'text',
      message: 'Package name:',
      initial: () => toValidPackageName(answer.targetDir || 'vix-project'),
      validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name',
    },
    {
      name: 'description',
      type: 'text',
      message: 'Project description',
      initial: 'A Vue.js project',
    },
    {
      name: 'author',
      type: 'text',
      message: 'Author',
    },
    {
      name: 'vue',
      type: 'select',
      message: 'Please Choose a Vue version(default:V3)',
      choices: [
        { title: 'Vue3', value: 3 },
        { title: 'Vue2', value: 2 },
      ],
      initial: 0,
    },
    {
      name: 'language',
      type: 'select',
      message: 'Please Choose development language is a JS or TS(default:JS)',
      choices: [
        { title: 'JS', value: 'js' },
        { title: 'TS', value: 'ts' },
      ],
      initial: 0,
    },
    {
      name: 'commitlint',
      type: 'toggle',
      message: 'install commitlint ？',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'eslint',
      type: 'toggle',
      message: 'install eslint?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
    {
      name: 'prettier',
      type: (prev, values) => {
        if (!values.eslint) {
          return null;
        }
        return 'toggle';
      },
      message: 'install Prettier?',
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
  ];
  try {
    answer = (await prompts(questions, {
      onCancel: () => {
        throw new Error(`${red('✖')} Operation cancelled`);
      },
    })) as UserConfig;
  } catch (error) {
    console.log(error);
    return answer;
  }

  return answer;
};
