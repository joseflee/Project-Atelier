const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const port = 3000;

app.use(express.static('client'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log('Listening on:', port));