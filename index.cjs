const dotenv = require('dotenv')
const express = require('express')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/hello', (_, res) => {
  res.json({ greeting: 'hello API' })
})

app.get('/api/:date', (req, res) => {
  const date = req.params.date
  if (/\d{5,}/.test(date)) {
    const dateInt = parseInt(date)
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() })
  } else if (!isNaN(new Date(date).getTime())) {
    const dateObj = new Date(date)
    res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() })
  } else {
    res.json({ error: 'Invalid Date' })
  }
})

app.get('/api', (_, res) => {
  const date = new Date()
  res.json({ unix: date.getTime(), utc: date.toUTCString() })
})

const listener = app.listen(PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
