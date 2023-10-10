import { app } from "../../app.js";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import * as optionService from "../../services/optionService.js";

Deno.test({
    name: "GET /api/questions/random should return a random question",
    async fn() {
        const mockQuestionResponse = {
            "questionId": 1,
            "questionText": "This is my first question",
            "answerOptions": [
                {
                    "optionId": 1,
                    "optionText": "First option"
                },
                {
                    "optionId": 2,
                    "optionText": "Second option"
                }
            ]
        }
        const testClient = await superoak(app);
        await topicService.addTopic('Topic 1', 1);
        await questionService.addQuestion(1, 1, mockQuestionResponse.questionText);
        await optionService.addOption(mockQuestionResponse.questionId, 'First option');
        await optionService.addOption(mockQuestionResponse.questionId, 'Second option', true);
        await testClient.get("/api/questions/random").expect(200).expect(mockQuestionResponse);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST /api/questions/answer a correct answer should return correct",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/api/questions/answer")
            .send({
                "questionId": 1,
                "optionId": 2,
            })
            .expect(200)
            .expect({ correct: true });
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "POST /api/questions/answer a false answer should return incorrect",
    async fn() {
        const testClient = await superoak(app);
        await testClient.post("/api/questions/answer")
            .send({
                "questionId": 1,
                "optionId": 1,
            })
            .expect(200)
            .expect({ correct: false });
    },
    sanitizeResources: false,
    sanitizeOps: false,
});


