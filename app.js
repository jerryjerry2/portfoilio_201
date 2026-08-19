const express = require('express');
const personal_info_Routes = require('./routes/personal_info');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

app.use(personal_info_Routes);
app.use(authRoutes);

app.listen(3000);