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
            // pattern: '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$',
            minLength: 8,
            maxLength: 20,
        },
        email: {
            type: 'string',
        },
        // isDeleted: { type: 'boolean' },
    },
    required: ['username', 'password', 'email'],
    additionalProperties: true,
    errorMessage: {
        properties: {
            username: 'Login must be a string longer than 2 characters',
            password: 'The password must be a string of at least 8 characters, contain uppercase and lowercase letters, numbers and special characters.',
            email: 'Invalid email',
        },
    },
};

export default ajv.compile(schema);
