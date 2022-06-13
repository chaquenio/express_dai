import {Router} from 'express';
import pizzaService from '../services/pizzas-services.js';

const router=Router();

const pizzaService=new PizzaService();


router.get('',async(req,res)=>{
    const pizzas=await pizzaService.getAll();
    return res.status(200).json(pizzas);
});

router.get('/:id',async(req,res)=>{
    const pizzas=await pizzaService.getById(req.params.id);
    return res.status(200).json(pizzas);
});

router.post('',async(req,res)=>{
    const pizzas=await pizzaService.insert(req.body);
    return res.status(201).json(pizzas);
});




