import nodemailer from 'nodemailer'

// export const transporter = nodemailer.createTransport({
//   host: process.env.NEXT_PUBLIC_EMAIL_HOST,
//   port: Number(process.env.NEXT_PUBLIC_EMAIL_PORT),
//   auth: {
//     user: process.env.NEXT_PUBLIC_ADMIN_USER_EMAIL,
//     pass: process.env.NEXT_PUBLIC_ADMIN_USER_PASSWORD,
//   },
// })

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
  },
})
