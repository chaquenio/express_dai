import express from 'express';
import PizzaRouter from './src/controllers/pizzaController.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())
app.use("/api/pizzas",PizzaRouter);

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
});
