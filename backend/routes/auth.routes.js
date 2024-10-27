import express from 'express'
import { GetUsername, Login, Register, VerfiyEmail } from '../controllers/auth.js'
import { GetPreferences, UpdatePreferences } from '../controllers/preference.js'
const AuthRoutes=express.Router()

AuthRoutes.post('/register',Register)
AuthRoutes.post('/verifyEmail',VerfiyEmail)
AuthRoutes.post('/login', Login)
AuthRoutes.post('/update-preferences', UpdatePreferences)
AuthRoutes.get("/get-preferences/:userId", GetPreferences)
AuthRoutes.get("/get-username/:userId", GetUsername)

export default AuthRoutes