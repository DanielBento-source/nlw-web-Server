import express from 'express'
import nodemailer from 'nodemailer'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedback } from './use-cases/submit-feedback';

export const routes =express.Router()

routes.post('/feedbacks', async (req,res)=>{
    const {type, comment, screenshot} = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter

   const submitFeedbackUseCase = new SubmitFeedback(prismaFeedbacksRepository,  nodemailerMailAdapter)

   await submitFeedbackUseCase.execute({
       type,
       comment,
       screenshot,
   });

    return res.status(201).send();
})

