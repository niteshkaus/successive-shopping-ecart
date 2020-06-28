const bodyParser = require('body-parser');
const cors = require('./cors');

module.exports = (app) => {

    app.use(bodyParser.json({ limit: '20mb' }));
    
    cors(app);

    app.use((req, res, next) => {
       
        next();
    });
}
