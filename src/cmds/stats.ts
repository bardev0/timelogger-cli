import type { TConfig } from '../config_default';
import { dic } from '../index';

// TODO for now just check if can read from server
export async function stats(settings: TConfig) {
    console.log(`${dic.cmd_stats}`);

    const response = await fetch(
        `http://${settings.serverIP}:${settings.serverPort}/return_all_sesionss`,
    );
    const data = await response.json();
    console.log(data);
}
