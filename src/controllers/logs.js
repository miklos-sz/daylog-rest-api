import {db} from '../app/db.js'

export const postLog = async (req, res) => {
    console.log(req.body.data)
    try {
        const query = await db('logs')
            .insert(req.body.data)
        res.sendStatus(200)
    } catch (err) {
        res.send(err)
    }
};

export const getLogs = async (req, res) => {
    try {
        const query = await db('logs')
        res.json(await query);
    } catch (err) {
        res.send(err)
    }
};

export const getLog = async (req, res) => {
    try {
        const query = await db('logs')
            .where('id', req.params.id)
        res.json(await query);
    } catch (err) {
        res.send(err)
    }
};

export const deleteLog = async (req, res) => {
    try {
        const query = await db('logs')
            .where('id', req.body.id)
            .del()
        res.sendStatus(200)
    } catch (err) {
        res.send(err)
    }
};

export const updateLog = async (req, res) => {
    try {
        const query = await db('logs')
            .where({'id': req.body.id})
            .update(req.body.data)
        res.sendStatus(200)
    } catch (err) {
        res.send(err)
    }
}
