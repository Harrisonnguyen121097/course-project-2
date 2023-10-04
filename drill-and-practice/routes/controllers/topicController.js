import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const showTopics = async (context) => {
    const isAdmin = context.user.admin;
    context.render("topics.eta", { topics: await topicService.listTopics(), isAdmin: isAdmin });
};

const addTopic = async ({ request, response, render }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const topicData = { name: params.get("name") };
    const [passes, errors] = await validasaur.validate(
        topicData,
        { name: [validasaur.required, validasaur.minLength(1)] },
    );
    if (!passes) {
        console.log(errors);
        topicData.validationErrors = errors
        render("topics.eta", topicData);
    }
    else {
        await topicService.addTopic(params.get("name"));
        response.redirect("/topics");
    }
};

const deleteTopic = async ({ params, response }) => {
    await topicService.deleteTopic(params.id);
    response.redirect("/topics");
}

const showTopic = async ({ render, params }) => {
    const questions = await questionService.getQuestionsByTopic(params.id);
    render("topic.eta", { topic_id: params.id, questions: questions });
};

export { showTopics, addTopic, deleteTopic, showTopic };