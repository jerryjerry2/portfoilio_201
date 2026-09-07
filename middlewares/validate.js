const validate = (schema) => (req, res, next) => {
    const { error, value} = schema.validate(req.body, {
        abortEarly : false,  //default true and false for display all condition not match
        // allowUnknown : true
    });

    console.log(error);
    
    if(error){
        return res.json({
            message : 'validate error',
            details : error.details.map((d) => d.message)
        })
    }

    req.body = value;
    next();
}

module.exports = validate;