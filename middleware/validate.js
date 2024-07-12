const {userValidationSchema ,noteValidationSchema, passwordValidationSchema } = require('../schema.js');
const ExpressError = require('../utils/Expresserror.js');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      next(new ExpressError(400,msg));
    } else {
      next();
    }
  };
};

module.exports = {
  validateUser: validate(userValidationSchema),
  validateNote: validate(noteValidationSchema),
  validatePassword: validate(passwordValidationSchema),
};
