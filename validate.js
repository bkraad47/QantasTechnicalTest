
// Validate request should be taken care of by auth client however in this case we will validate against 1234

const validateRequest = (req) =>{
    if(req.headers.apikey === '1234'){
        return true;
    }
    return false;
};
module.exports.validateRequest = validateRequest;

// Check JSON property exists
const validateRequestBody = (body, fields) =>{
    var valid = true;
    fields.forEach(function(element) {
        if(typeof body[element] === "undefined"){
            valid = false;
        }
    });
    return valid;
};
module.exports.validateRequestBody = validateRequestBody;