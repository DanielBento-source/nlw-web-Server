import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedback-repository";

interface SubmitFeedbackRequest{
    type: string;
    comment: string;
    screenshot?: string;

}

export class SubmitFeedback {
    constructor (
    private feedbacksRepository:FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackRequest ){
        const {type, comment, screenshot} = request;

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color:#222;">`,
                `<p>Tipo do feedback:${type}</p>`,
                `<p>Comentario:${comment}</p>`,
                `</div>`
                ].join('\n')
        })
    }
}