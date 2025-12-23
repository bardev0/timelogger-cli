import os from 'os';

export type TConfig = {
    defugConfMsg: boolean;
    serverIP: string;
    serverPort: number;
    clientName: string;
    userName: string;
};

export const defaultConfig: TConfig = {
    clientName: os.hostname(),
    userName: os.userInfo().username,
    defugConfMsg: true,
    serverIP: '127.0.0.1',
    serverPort: 7000,
};
