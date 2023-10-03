import { sql } from "../database/database.js";

const getQuestionsByTopic = async (topic_id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
    return rows;
};

const addQuestion = async (topic_id, user_id, question_text) => {
    await sql`INSERT INTO questions (topic_id, user_id, question_text) VALUES (${topic_id}, ${user_id}, ${question_text})`;
};

const deleteQuestionsOfTopic = async (topic_id) => {
    await sql`DELETE FROM questions WHERE topic_id = ${topic_id};`;
};

const getQuestionById = async (question_id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${question_id}`;
    return rows;
};

const deleteQuestion = async (question_id) => {
    await sql`DELETE FROM questions WHERE id = ${question_id};`;
};

export { addQuestion, deleteQuestionsOfTopic, getQuestionsByTopic, getQuestionById, deleteQuestion };
