export type TConfig = {
  serverIP: string;
  serverPort: number;
};

export const defaultConfig: TConfig = {
  serverIP: '127.0.0.1',
  serverPort: 7000,
};
