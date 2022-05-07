import { SubmitFeedback } from "./submit-feedback"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const submitFeedbackTest =  new SubmitFeedback(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy},
 )  

describe('Submit feedback', () => {
    it('Should be able to submit a feedback', async () => {    
       await expect(submitFeedbackTest.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    })

    it('Should not be able to submit a feedback with an invalid screenshot', async () => {
       await expect(submitFeedbackTest.execute({
            type: 'BUG',
            comment: 'ta tudo bugado',
            screenshot: '3232'
        })).rejects.not.toThrow()
    })

})