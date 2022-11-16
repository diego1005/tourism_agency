const jsonWebToken = require('jsonwebtoken');

module.exports = jwt = {
    sign: (object) => {
        jsonWebToken.sign(object, process.env.SECRET);
    },
    decode: (token) => {
        jsonWebToken.decode(token, process.env.SECRET);
    },
    verify: (token) => {
        jsonWebToken.verify(token, process.env.SECRET, (error) => {
            if (error) return false;

            return true;
        })
    }    
};
