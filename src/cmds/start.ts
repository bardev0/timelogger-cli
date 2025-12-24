import type { TConfig } from '../config_default';
import { dic } from '../index';

export type TnewSesh = {
    date: Date;
    user: string;
    client: string;
};

export function start(settings: TConfig) {
    console.log(`${dic.cmd_start}`);

    let newSession: TnewSesh = {
        date: new Date(),
        user: settings.userName,
        client: settings.clientName,
    };

    console.log(newSession);
}
