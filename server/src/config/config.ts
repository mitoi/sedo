class SedoConfig {
    static get ExpressHost(): string {
        return process.env.EXPRESS_HOST || 'localhost';
    }

    static get ExpressPort(): string {
        return process.env.EXPRESS_PORT || '3000';
    }

    static get Environment(): string {
        return process.env.EXPRESS_ENV || 'development';
    }

    static get MongoHost(): string {
        return process.env.MONGO_HOST || '127.0.0.1';
    }

    static get MongoPort(): string {
        return process.env.MONGO_PORT || '27017';
    }

    static get MongoDbName(): string {
        return process.env.MONGO_DB_NAME || 'sedo';
    }

    static get TokenKey(): string {
        return process.env.TokenKey || 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY0NDE1NDU5OSwiaWF0IjoxNjQ0MTU0NTk5fQ.tiOEiSu9KTYMeZ3FPQZHBXvgSRfrKdeXir8rEilZCkQ';
    }

    static get AccessTokenExpiresIn(): string {
        return process.env.AccessTokenExpiresIn || '2h';
    }

    static get AccessTokenExpiresInSeconds(): string {
        return process.env.AccessTokenExpiresIn || '7200';
    }
}

export default SedoConfig;
