/** @format */

const Joi = require("joi");

const personValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
    shortname: Joi.string().required(),
    known: Joi.string().required(),
    bio: Joi.string().required(),
  };

  return Joi.validate(data, schema);
};

const productValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
  };

  return Joi.validate(data, schema);
};

const clientValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    pn: Joi.string().min(11).max(15).required(),
    address: Joi.string(),
  };

  return Joi.validate(data, schema);
};

module.exports.personValidation = personValidation;
module.exports.productValidation = productValidation;
module.exports.clientValidation = clientValidation;
