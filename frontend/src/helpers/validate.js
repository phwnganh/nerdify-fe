export const validationRules = {
  required: (message) => ({
    required: true,
    message,
  }),
  maxLength: (max, message) => ({
    max,
    message: message,
  }),
  minLength: (min, message) => ({
      min,
      message: message
  }),
  selectRequired: (message) => ({
    required: true,
    message,
  }),
  email: (message) => ({
    type: "email",
    message,
  }),
};
