const { program } = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'plain')
  .arguments('<filepath1> <filepath2>');
//   .action((path1, path2) => {
//     console.log('path1 :>> ', path1);
//     console.log('path2 :>> ', path2);
//   });

program.parse();
