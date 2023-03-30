import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv( { allErrors: true } );
ajvErrors(ajv);

const schema = {
  type: "object",
  properties: {
    login: { 
      type: "string",
      minLength: 2
    },
    password: { 
      type: "string",
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
      password: "The password must be a string of at least 8 and no more than 20 characters",
      age: "Age must be a number greater than or equal to 4 and less than 130",
    },
  },
}

export default ajv.compile(schema);
