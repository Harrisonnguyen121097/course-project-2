import { sql } from "../database/database.js";

const addOption = async (question_id, option_text, is_correct) => {
    if (is_correct) {
        await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${question_id}, ${option_text}, TRUE)`;
    }
    else {
        await sql`INSERT INTO question_answer_options (question_id, option_text) VALUES (${question_id}, ${option_text})`;
    }
};

const getOptionsByQuestion = async (question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows;
};


export { addOption, getOptionsByQuestion };
