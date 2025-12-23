export type TConfig = {
	defugConfMsg: boolean,
    serverIP: string;
    serverPort: number;
};

export const defaultConfig: TConfig = {
	defugConfMsg: true,
    serverIP: '127.0.0.1',
    serverPort: 7000,
};
