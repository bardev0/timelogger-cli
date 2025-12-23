import { defaultConfig, type TConfig } from './config_default';

const home = Bun.env.HOME;
const configFolder = '/.config/timelogger/';
const configFile = 'tl.json';
const confPath = home + configFolder + configFile;
const configuration = Bun.file(confPath);

const dic = {
    confFileExists: 'Configuration File Exists',
    missingConfFike: 'Configuration File not found',
    promptCreateConfig: `Would u like to create a default configuration file ? (y/n) : `,
    creatingConf: `Creating configuration file in ${configFolder}`,
};

let settings : TConfig

// check for configuration file
// if conf is present read conf and continue operations
if (await configuration.exists()) {
	settings = await import(confPath)

    // debug message that conf exisist -> can turn off in config file
    if (settings.defugConfMsg) {console.log(dic.confFileExists)}
	
	// debug of settings
	//console.log(settings);
	
} else {
    console.log(dic.missingConfFike);
    process.stdout.write(dic.promptCreateConfig);

    // input
    for await (const chunk of Bun.stdin.stream()) {
        const chunkText = Buffer.from(chunk).toString().trim();
        if (chunkText == 'y') {
            console.log(dic.creatingConf);
            await Bun.write(
                confPath,
                JSON.stringify(defaultConfig, null, 2) + '\n',
            );
        } else {
            console.log(false);
        }

        break;
    }
}

// read conf

// commands -> args for cli for different functions
const args = ['start', 'end', 'status', 'stats'];
