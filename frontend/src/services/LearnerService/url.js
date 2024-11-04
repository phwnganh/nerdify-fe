// Initial path: /src/services/LearnerService/url.js
import { BASE_SERVER } from "../../constants/common.constant";

const DOMAIN = BASE_SERVER;
const API_PREFIXES = {
  COURSE: "/api/courses",
  FLASHCARD: "/api/flashcards",
  PAYMENT: "/api/payment",
  BLOG: "/api/blog",
};

const URI_COURSES_SERVICE = {
  COURSE_LEVEL: API_PREFIXES.COURSE + "/levels",
  PHASES: API_PREFIXES.COURSE + "/phases",
  EXERCISE: API_PREFIXES.COURSE + "/exercises",
  EXERCISE_DETAIL: API_PREFIXES.COURSE + "/exercises",
  SUBMIT_EXERCISE: API_PREFIXES.COURSE + "/submissions/submit-exercise",
  SUBMIT_FINALEXAM: API_PREFIXES.COURSE + "/submissions/submit-final-exam",
  GET_ALL_SUBMISSIONS: API_PREFIXES.COURSE + "/submissions/get-all-submission",
  GET_SUBMISSION_DETAIL: API_PREFIXES.COURSE + "/submissions/get-submission",
  LEARNING_PROGRESS: API_PREFIXES.COURSE + "/learning-progress",
  GET_USER_TROPHY: API_PREFIXES.COURSE + "/user/trophy",
  GET_TROPHY_BY_PHASE_ID: API_PREFIXES.COURSE + "/levels/get-trophy-by-phase",
};

const URI_FLASHCARDS_SERVICE = {
  FLASHCARD: API_PREFIXES.FLASHCARD,
  UPDATE_FLASHCARD_STATUS: API_PREFIXES.FLASHCARD + "/:flashcardId/visibility",
  CREATE_FOLDER: API_PREFIXES + "/folders",
  ADD_FLASHCARD_TO_FOLDER: API_PREFIXES.FLASHCARD + "/folders/:folderId" + "/flashcards/:flashcardId",
  GET_MY_FOLDER: API_PREFIXES.FLASHCARD + "/folders/my-folders",
  CREATE_FOLDER: API_PREFIXES.FLASHCARD + "/folders",
  SEARCH_FLASHCARD: API_PREFIXES.FLASHCARD + "/search",
};

const URI_PAYMENT_SERVICE = {
  PACKAGE: API_PREFIXES.PAYMENT + "/packages",
  CREATE_PAYMENT: API_PREFIXES.PAYMENT + "/main/create-payment",
  FINISH_PAYMENT: API_PREFIXES.PAYMENT + "/main/finish-payment/",
  USER_GET_CURRENT_PACKAGE: API_PREFIXES.PAYMENT + "/user/my-current-package",
  USER_GET_TRANSACTION: API_PREFIXES.PAYMENT + "/user/transactions",
  USER_HISTORY_TRANSACTION: API_PREFIXES.PAYMENT + "/user",
};

const URI_BLOG_SERVICE = {
  BLOG: API_PREFIXES.BLOG,
};

export const COURSE_SERVER_URI = {
  DOMAIN: DOMAIN,
  COURSE_SERVICE: URI_COURSES_SERVICE,
};

export const FLASHCARD_SERVER_URI = {
  DOMAIN: DOMAIN,
  FLASHCARD_SERVICE: URI_FLASHCARDS_SERVICE,
};

export const PAYMENT_SERVER_URI = {
  DOMAIN: DOMAIN,
  PAYMENT_SERVICE: URI_PAYMENT_SERVICE,
};

export const BLOG_SERVICE_URI = {
  DOMAIN: DOMAIN,
  BLOG_SERVICE: URI_BLOG_SERVICE,
};
