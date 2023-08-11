const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./database/connection');
const appRoutes = require('./routes/appRoutes');

connectToDatabase.connectToDatabase();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Working Fine');
});

app.use('/api', appRoutes);

app.listen(port, () => {
  console.log(`App listening at PORT:${port} and live at http://localhost:${port}`);
});