import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv( { allErrors: true } );
ajvErrors(ajv);
// ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
const passPattern = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;

const schema = {
  type: "object",
  properties: {
    login: { 
      type: "string",
      minLength: 2
    },
    password: { 
      type: "string",
      pattern: "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$",
      minLength: 8,
      maxLength: 20,
    },
    age: { 
      type: "integer",
      minimum: 4,
      maximum: 130
    },
    isDeleted: { type: "boolean" },
  },
  required: ["login", "password", "age"],
  additionalProperties: true,
  errorMessage: {
    properties: {
      login: "Login must be a string longer than 2 characters",
      password: `The password must be a string of at least 8 characters, contain uppercase and lowercase letters, numbers and special characters.`,
      age: "Age must be a number greater than or equal to 4 and less than 130",
    },
  },
}

export default ajv.compile(schema);
