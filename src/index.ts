import express from 'express';
import cors from 'cors';
import router from './router';
const app = express();

app.use(cors());
app.use(express.json())
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from api-server');
});

app.use(router)

app.listen(port, () => {
  console.log(
    `api-server listening at http://localhost:${port}`
  );
});
