import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

class Property {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

}

router.get('/', (req: Request, res: Response) => {
    res.send('Hello from property.');
})

module.exports = router;
