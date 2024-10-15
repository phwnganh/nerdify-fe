export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
export const ACCESS_TOKEN_KEY_COOKIE = "access_token";

export const ROLES = { ADMIN_ROLE: "admin", LEARNER_ROLE: "learner", ACCOUNTANT_ROLE: "accountant" };
export const BASE_SERVER = "http://localhost:9999";
export const EXERCISE_TYPE = {
  LISTENING: "listening",
  READING: "reading",
  GRAMMAR: "grammar",
  VOCABULARY: "vocabulary",
  WRITING: "writing",
  QUIZ: "quiz",
};

export const PART_TYPE = {
  FILL_IN_THE_BLANK: "fill_in_the_blank",
  MULTIPLE_CHOICE: "multiple_choice",
  MATCHING: "matching",
  WRITE_PARAGRAPH: "write_paragraph",
};
