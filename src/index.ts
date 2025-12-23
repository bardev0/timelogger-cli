import { defaultConfig } from './config_default';

console.log('Hello via Bun!');

const home = Bun.env.HOME;
const configFolder = '/.config/timelogger/';
const configFile = 'tl.json';
const confPath = home + configFolder + configFile;
const configuration = Bun.file(confPath);

const dic = {
  confFileExists: 'Configuration File Exists',
  missingConfFike: 'Configuration File not found',
  promptCreateConfig: `Would u like to create a default configuration file ? (y/n) : `,
  creatingConf: `Creating configuration file in ${configFolder} ...`,
};

// check for configuration file
if (await configuration.exists()) {
  console.log(dic.confFileExists);
} else {
  console.log(dic.missingConfFike);
  process.stdout.write(dic.promptCreateConfig);

  // input
  for await (const chunk of Bun.stdin.stream()) {
    const chunkText = Buffer.from(chunk).toString().trim();
    if (chunkText == 'y') {
      console.log(dic.creatingConf);
      await Bun.write(confPath, JSON.stringify(defaultConfig, null, 2) + '\n');
    } else {
      console.log(false);
    }

    break;
  }
}
