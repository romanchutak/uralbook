export type TConfig = {
    port: number;
    database: TDatabaseConfig;
}

export type TDatabaseConfig = {
    host: string;
    port: number;
    dialect: string;
    username: string;
    password: string;
    database: string;
    timezone: string;
};
