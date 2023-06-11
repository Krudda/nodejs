import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

const schema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 2,
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 20,
        },
        email: {
            type: 'string',
        },
    },
    required: ['username', 'password', 'email'],
    additionalProperties: true
};

export default ajv.compile(schema);
