import type { TConfig } from '../config_default';
import { dic } from '../index';
import type { TnewSesh } from 'timielogger-types';

export async function start(settings: TConfig) {
    console.log(`${dic.cmd_start}`);

    let newSession: TnewSesh = {
        dateStart: new Date(),
        user: settings.userName,
        client: settings.clientName,
    };

//    console.log(newSession);

    // add path form source of truth
    let sPath = `http://${settings.serverIP}:${settings.serverPort}/new_open_session`;
    console.log(sPath);

    // TODO : move paths from ts-server to types
    const response = await fetch(sPath, {
        method: 'POST',
        body: JSON.stringify(newSession),
        headers: { 'Content-Type': 'application/json' },
    });
    const body = await response.json();
	console.log(body)
}
