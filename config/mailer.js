const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host : 'localhost',
    service : 'gmail',
    auth : {
        user : 'chmapikeat@gmail.com',
        pass : 'hulnmggpzegafeal'
    }
});

module.exports = transport;