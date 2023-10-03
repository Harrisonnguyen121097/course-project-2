import { sql } from "../database/database.js";

const deleteAllQuestionAnswersOfQuestionOption = async (option_id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${option_id};`;
};

export {deleteAllQuestionAnswersOfQuestionOption};