import type { TConfig } from '../config_default';
import { dic } from '../index';

export async function end(settings: TConfig) {
    console.log(`${dic.cmd_end}`);

    let sPath = `http://${settings.serverIP}:${settings.serverPort}/move_session`;
    console.log(sPath);

    // TODO : move paths from ts-server to types
    const response = await fetch(sPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    const body = await response.json();
}
