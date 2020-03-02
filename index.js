require("dotenv").config();
const { PORT } = require('./utils/secrets.js');

const server = require("./api/server.js");


server.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}....`)
});