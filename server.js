const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');
const C = require('./model/Connector')

// Set globally the connector to make db request
global.Connector = new C()
const app = bottender({
    dev: process.env.NODE_ENV !== 'production',
});
const port = Number(process.env.PORT) || 5000;

const start = async (retried) => {
    try {
        if (process.env.autoMigrate && retried) {
            // Migrate DB up if new migrations are needed and available
            await Connector.migrateDB()
        }
        // Test the integrity of the db.
        await Connector.checkIntegrity()
        console.log('✅ DB checked')

        // the request handler of the bottender app
        const handle = app.getRequestHandler();
        await app.prepare()
        const server = express()
        const verify = (req, _, buf) => {
            req.rawBody = buf.toString()
        };
        server.use(bodyParser.json({ verify }))
        server.use(bodyParser.urlencoded({ extended: false, verify }))

        // Serve Static pages
        server.get('/api', (req, res) => {
            res.json({ ok: true });
        });

        // route for webhook request
        server.all('*', (req, res) => {
            console.log(`Hi`);
            return handle(req, res)
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`✅ Ready on http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err)
        if (err.code) {
            // Handle
            if (retried) {
                console.log('⛔️ Could not init properly the DB')
                process.exit(1)
            } else {
                await Connector.initDB()
                await start(true)
            }
        }
    }
}

start()