import pkg from '../../package/package.json';
import { log } from '../utils/log';

interface BaseCmd {
  version?: boolean;
  list?: boolean;
}

const version = () => log.success(`v${pkg.version}`);

export const baseAction = (cmd: BaseCmd) => {
  if (cmd.version) version();
};
