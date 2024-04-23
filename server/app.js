if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const cors = require('cors');
const express = require('express');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler');

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors())
app.use(router)


app.use(errorHandler)

app.listen(port, () => {
  console.log(`RUNNNNNNNNIIIINNNNGGGGGG on port ${port}`)
})

module.exports = app