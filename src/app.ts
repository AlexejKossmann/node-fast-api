import { Server } from './server';
import { AppUtil } from './util/app';
import express from 'express';

const app = new Server().getApp();
const appUtil = new AppUtil();

const routes = appUtil.getContainer().get('routes');

if (typeof routes !== 'undefined') {

    routes.forEach((route) => {
        let item: express.Router = require('.' + route);
        let file: string[] = route.split('/');
        let fileName: string[] = file[file.length-1].split('.');
        app.use('/' + fileName[0], item);
    })

}

export { app };
