const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const cors = require('cors');
const db = require('./database/db');
const PORT = process.env.PORT || 5500;

const questionsRouter = require('./routes/questionsRoute');
const testCasesRouter = require('./routes/testCasesRoute');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/run', testCasesRouter);
app.use('/api/questions', questionsRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

server.listen( PORT, () => {
    console.log(`server at port ${PORT}`);
});