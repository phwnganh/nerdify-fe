import client from "../client";
import { COURSE_SERVER_URI, FLASHCARD_SERVER_URI, PAYMENT_SERVER_URI } from "./url";
export const getCourseLevelList = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.COURSE_LEVEL);
  return res.data;
};

export const getLevelDetail = async (courseId) => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.COURSE_LEVEL + "/" + courseId);
  return res.data;
};

export const getPhaseList = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.PHASES);
  return res.data;
};

export const getPhaseDetail = async () => {
  const res = await client.get(COURSE_SERVER_URI.COURSE_SERVICE.PHASE_DETAIL);
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

export const getFlashcardList = async () => {
  const res = await client.get(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD);
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

export const updateFlashcard = async (params) => {
  const res = await client.put(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.FLASHCARD_DETAIL, params);
  return res.data;
};

export const createFolder = async (params) => {
  const res = await client.post(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.CREATE_FOLDER, params);
  return res.data;
};

export const addFlashcardToFolder = async () => {
  const res = await client.post(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.ADD_FLASHCARD_TO_FOLDER);
  return res.data;
};

export const updateFlashcardStatus = async (params) => {
  const res = await client.put(FLASHCARD_SERVER_URI.FLASHCARD_SERVICE.UPDATE_FLASHCARD_STATUS, params);
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

export const userGetTransactionDetail = async (transactionId) => {
  const res = await client.get(PAYMENT_SERVER_URI.PAYMENT_SERVICE.USER_GET_TRANSACTION + "/" + transactionId);
  return res.data;
};

export const finishPayment = async (transactionId, params) => {
  const res = await client.post(PAYMENT_SERVER_URI.PAYMENT_SERVICE.FINISH_PAYMENT + "/" + transactionId, params);
  return res.data;
};
