const httpStatus = require('http-status')
const { users, create, find, login, modify } = require('../services/users')
const { passwordToHash, generateJWTAccessToken, generateJWTRefreshToken } = require('../scripts/utils/index')
const uuid = require('uuid')
const eventEmitter = require('../scripts/events/eventEmitter')

const getUsers = (req, res) => {
    users()
        .then((response) => {
            if (!response){res.status(httpStatus.BAD_REQUEST).send('No response')}
            else{res.status(httpStatus.OK).send(response)}
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong with server')
        })
}

const createUser = (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    create(req.body)
        .then((response) => {
            if (!response){res.status(httpStatus.BAD_REQUEST).send('Couldnt create a user')}
            else{res.status(httpStatus.OK).send(response)}
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong with server')
        })
}


const findUser = (req, res) => {
    find(req.params.id)
        .then((response) => {
            if (!response) {res.status(httpStatus.BAD_REQUEST).send('Couldnt find the user')}
            else {res.status(httpStatus.OK).send(response)}
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong with server')
        })
}

const loginUser = (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    login(req.body)
        .then((response) => {
            if (!response) res.status(httpStatus.BAD_REQUEST).send('Username or password is wrong')
            else {
                response = {
                    ...response.toObject(),
                    tokens: {
                        access_token: generateJWTAccessToken(response),
                        refresh_token: generateJWTRefreshToken(response)
                    }
                }
                delete response.password
                res.status(httpStatus.OK).send(response)
            }
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong with server')
        })
}

const resetPassword = (req, res) => {
    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`

    modify({ email: req.body.email }, { password: passwordToHash(new_password) }).then((updatedUser) => {
        if (!updatedUser){res.status(httpStatus.NOT_FOUND).send('E-mail not found')}
        else{
            eventEmitter.emit("send_email", {
            to: updatedUser.email,
            subject: "Reset Password",
            html: `User password has been changed regarding to your request. <br/>
            Please change your password after login <br/>
            Your new password -> ${new_password}`
        })
        res.status(httpStatus.OK).send(`New password is sent to given e-mail address`)
    }
    
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong while updating password')
    });
}


module.exports = {
    getUsers,
    createUser,
    findUser,
    loginUser,
    resetPassword

}