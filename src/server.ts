import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as http from 'http';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

export class Server {
    public static readonly PORT:number = 3001;
    private DATABASE_CLIENT: MongoClient;
    private server: http.Server;
    private app: Application;
    private port: number;

    constructor() {
        dotenv.config();
        this.createApp();
        this.createDatabaseClient();
        this.config();
        this.createServer();
        this.listen();
    }

    private createApp() {
        this.app = express();
        this.app.use(cors());
    }

    private createDatabaseClient(): void {
        const url = process.env.DB_CONNECTION || '';
        this.DATABASE_CLIENT = new MongoClient(url);
    }

    private config() {

        this.port = Number(process.env.SERVER_PORT) || Server.PORT;

        this.app.get('/', (req: Request, res: Response) => {
            res.send('Response from server.');
        })
    }

    private createServer() {
        this.server = http.createServer(this.app);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
    }

    public getApp(): Application {
        return this.app;
    }

    public getDatabaseClient() {
        return this.DATABASE_CLIENT;
    }

}
