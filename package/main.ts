import { Command } from 'commander';
import { baseAction } from './commands/version';
const program = new Command();

program
  .option('-v, --version', '查看当前版本')
  .usage('command <option>')
  .description('template-node-cli')
  .action(baseAction);

program.parse(process.argv);
