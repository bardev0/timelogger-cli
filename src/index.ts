import { defaultConfig, type TConfig } from './config_default';
import { start } from './cmds/start';
import { end } from './cmds/end';
import { session_status } from './cmds/session_status';
import { stats } from './cmds/stats';

const home = Bun.env.HOME;
export const configFolder = '/.config/timelogger/';
const configFile = 'tl.json';
const confPath = home + configFolder + configFile;
const configuration = Bun.file(confPath);

// commands -> args for cli for different functions
const cmds = {
    start: 'start',
    end: 'end',
    status: 'status',
    stats: 'stats',
};

export const dic = {
    confFileExists: 'Configuration File Exists',
    missingConfFike: 'Configuration File not found',
    promptCreateConfig: `Would u like to create a default configuration file ? (y/n) : `,
    creatingConf: `Creating configuration file in ${configFolder}`,
    cmd_start: 'starting',
    cmd_end: 'ending',
    cmd_session_status: 'session status here',
    cmd_stats: 'statistics',
};

export let settings: TConfig;

// check for configuration file
// if conf is present read conf and continue operations
if (await configuration.exists()) {
    settings = await import(confPath);

    // debug message that conf exisist -> can turn off in config file
    if (settings.defugConfMsg) {
        console.log(dic.confFileExists);
    }

    // debug of settings
    //console.log(settings);

    // MAIN LOOP
    const args = process.argv.slice(2)[0];

    switch (args) {
        case cmds.start:
            start(settings);
            break;
        case cmds.end:
            end();
            break;
        case cmds.status:
            session_status();
            break;
        case cmds.stats:
            stats();
            break;
    }
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
