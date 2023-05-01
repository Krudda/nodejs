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
            pattern: '/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu',
        },
    },
    required: ['username', 'password', 'email'],
    additionalProperties: true,
    errorMessage: {
        properties: {
            username: 'User name must be a string longer than 2 characters',
            password: 'The password must be a string of at least 8 characters.',
            email: 'Invalid email.',
        },
    },
};

export default ajv.compile(schema);
