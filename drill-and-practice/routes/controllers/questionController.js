import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const addQuestion = async ({ params, request, response, render }) => {
    const body = request.body({ type: "form" });
    const formData = await body.value;
    const questionData = { question_text: formData.get("question_text") };
    const [passes, errors] = await validasaur.validate(
        questionData,
        { question_text: [validasaur.required, validasaur.minLength(1)] },
    );
    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors
        render("topic.eta", questionData);
    }
    else {
        await questionService.addQuestion(params.id, 1, formData.get("question_text"));
        response.redirect(`/topics/${params.id}`);
    }
}

const showQuestion = async ({ render, params }) => {
    render("question.eta", {
        topic_id: params.id,
        options: await optionService.getOptionsByQuestion(params.qId),
        question: (await questionService.getQuestionById(params.qId))[0]
    });
};

export { addQuestion, showQuestion };