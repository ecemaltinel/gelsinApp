const eventEmitter = require('./eventEmitter')
const nodemailer = require('nodemailer')

const emailSender = () =>{
    eventEmitter.on('send_email',(data)=>{

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        let info = transporter.sendMail({
            from : process.env.EMAIL_FROM,
            ...data
        },
        (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
            console.log(err);
        }
        )
    })
}

module.exports = () => {
    emailSender()
}