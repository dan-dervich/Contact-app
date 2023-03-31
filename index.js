const express = require('express')
const app = express()
const cors = require('cors')
const AhavahContact = require('./ahavah')

app.use(express.json())
app.use(cors())
app.use('/ahavah', AhavahContact);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 3001;
app.listen(PORT);