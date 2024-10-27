import client from "../client";
import { BLOG_SERVICE_URI, COURSE_SERVER_URI, FLASHCARD_SERVER_URI, PAYMENT_SERVER_URI } from "./url";
export const getCourseLevelList = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.COURSE_LEVEL);
  return res.data;
};

export const getLevelDetail = async (courseId) => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.COURSE_LEVEL + "/" + courseId);
  return res.data;
};

export const getFinalExamDetailByCourseId = async (courseId) => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.PHASES + "/" + courseId + "/final-exam");
  return res.data;
};

export const getPhaseList = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.PHASES);
  return res.data;
};

export const getEnrollLearnerByCourseId = async (courseId) => {
  const res = await client.post(COURSE_SERVER_URI.COURSE_SERVICE.COURSE_LEVEL + "/enroll" + "/" + courseId);
  return res.data;
};
export const getPhaseDetail = async (phaseId) => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.PHASES + "/" + phaseId);
  return res.data;
};

export const getExerciseList = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.EXERCISE);
  return res.data;
};

export const getExerciseDetail = async (exerciseId) => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.EXERCISE_DETAIL + "/" + exerciseId);
  return res.data;
};

export const getAllSubmissions = async() => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.GET_ALL_SUBMISSIONS);
  return res.data;
}

export const getSubmissionDetail = async(submissionId) => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.GET_SUBMISSION_DETAIL + "/" + submissionId);
  return res.data;
}

export const getUserTrophy = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.GET_USER_TROPHY);
  return res.data;
}

export const getPublicFlashcardList = async () => {
  const res = await client.get(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD);
  return res.data;
};

export const getAllFlashcards = async () => {
  const res = await client.get(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD + "/all-flashcards");
  return res.data;
};

export const getFlashcardDetail = async (flashcardId) => {
  const res = await client.get(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD + "/" + flashcardId);
  return res.data;
};

export const createNewFlashcard = async (params) => {
  const res = await client.post(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD, params);
  return res.data;
};

export const updateFlashcard = async (flashcardId, data) => {
  const res = await client.put(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD + "/" + flashcardId, data);
  return res.data;
};

export const removeFlashcard = async (flashcardId) => {
  const res = await client.delete(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD + "/" + flashcardId);
  return res.data;
}

export const createFolder = async (params) => {
  const res = await client.post(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.CREATE_FOLDER, params);
  return res.data;
};

export const addFlashcardToFolder = async (folderId, flashcardId) => {
  const res = await client.post(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.ADD_FLASHCARD_TO_FOLDER.replace(":folderId", folderId).replace(":flashcardId", flashcardId));
  return res.data;
};

export const updateFlashcardStatus = async (flashcardId, isPublic) => {
  const url = FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.UPDATE_FLASHCARD_STATUS.replace(":flashcardId", flashcardId);
  const res = await client.put(url, { isPublic });
  return res.data;
};

export const getMyFolder = async () => {
  const res = await client.get(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.GET_MY_FOLDER);
  return res.data;
};

export const searchFlashcard = async (query) => {
  const res = await client.get(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.SEARCH_FLASHCARD + "?query=" + query);
  return res.data;
};

export const getPackageList = async () => {
  const res = await client.get(PAYMENT_SERVER_URI.PAYMENT_SERVICE.PACKAGE);
  return res.data;
};

export const createPayment = async (params) => {
  const res = await client.post(PAYMENT_SERVER_URI.PAYMENT_SERVICE.CREATE_PAYMENT, params);
  return res.data;
};

export const getPackageDetail = async (packageId) => {
  const res = await client.get(PAYMENT_SERVER_URI.PAYMENT_SERVICE.PACKAGE + "/" + packageId);
  return res.data;
};

export const submitExercise = async (params) => {
  const res = await client.post(COURSE_SERVER_URI.COURSE_SERVICE.SUBMIT_EXERCISE, params);
  return res.data;
};

export const submitFinalExam = async (params) => {
  const res = await client.post(COURSE_SERVER_URI.COURSE_SERVICE.SUBMIT_FINALEXAM, params);
  return res.data;
};

export const userGetTransactionDetail = async (transactionId) => {
  const res = await client.get(PAYMENT_SERVER_URI.PAYMENT_SERVICE.USER_GET_TRANSACTION + "/" + transactionId);
  return res.data;
};

export const finishPayment = async (transactionId, params) => {
  const res = await client.post(PAYMENT_SERVER_URI.PAYMENT_SERVICE.FINISH_PAYMENT + "/" + transactionId, params);
  return res.data;
};

export const getCurrentPremiumPackage = async () => {
  const res = await client.get(PAYMENT_SERVER_URI.PAYMENT_SERVICE.USER_GET_CURRENT_PACKAGE);
  return res.data;
};

export const historyTransaction = async () => {
  const res = await client.get(PAYMENT_SERVER_URI.PAYMENT_SERVICE.USER_HISTORY_TRANSACTION);
  return res.data;
};

export const getTrophyByPhaseId = async (examId) => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.GET_TROPHY_BY_PHASE_ID + "/" + examId);
  return res.data;
};

export const getBlogList = async () => {
  const res = await client.get(BLOG_SERVICE_URI.BLOG_SERVICE.BLOG);
  return res.data;
};

export const learningProgress = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.LEARNING_PROGRESS);
  return res.data;
};
