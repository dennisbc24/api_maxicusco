
const boom = require('@hapi/boom')

function schemaHandler(schema, property) {
    //clousure
    return(req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false});

        if(error) {
            next(boom.badRequest(error));
        }
        next();
    }
}
//esto lo vamos a usar en el router
module.exports = schemaHandler;