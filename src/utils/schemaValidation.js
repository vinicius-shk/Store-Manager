const salesSchema = require('../services/validations/salesSchema');

const schemaValidation = (body) => {
  const validation = body.reduce((acc, cur) => {
    const { error } = salesSchema.validate(cur);
    if (error) return [...acc, error];
    return [...acc];
  }, []);

  if (validation.length >= 1) return { type: 422, message: validation[0].message };
  return { type: null };
};

module.exports = schemaValidation;