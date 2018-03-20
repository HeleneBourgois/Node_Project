import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import { test } from './../test.js'


let testRouter = express.Router()
app.use(bodyParser.json())
 testRouter.use(function(req, res, next) {
     next()
 })

 testRouter.get('/test', (req, res, next) => {
    test()
 })


 export default {
    testRouter: testRouter
}