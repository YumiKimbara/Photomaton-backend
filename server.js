const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const authRoute = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const URL = 'mongodb+srv://deydevteam:finalproject@cluster0.bhhad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('ENDPOINT')
});

app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
