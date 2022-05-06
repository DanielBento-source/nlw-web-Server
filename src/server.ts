import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()
const port = 3333

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba24e3424e3888",
      pass: "9485783217d745"
    }
  });

app.post('/feedbacks', async (req,res)=>{
    const {type, comment, screenshot} = req.body;

   const feedback = await prisma.feedback.create({
        data:{
            type,
            comment,
            screenshot,
        }
    })

    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to:'Daniel Bento <dsbld2@gmail.com>',
      subject: 'Novo feedback',
      html: [
        `<div style="font-family: sans-serif; font-size: 16px; color:#222;">`,
        `<p>Tipo do feedback:${type}</p>`,
        `<p>Comentario:${comment}</p>`,
        `</div>`
      ].join('\n')
    })

    return res.status(201).json({ data: feedback})
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`
)
})