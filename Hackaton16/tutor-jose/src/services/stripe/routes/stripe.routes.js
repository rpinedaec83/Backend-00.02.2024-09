import { Router } from "express";
import StripeController from "../controllers/stripe.controller.js";

const stripeService = new StripeController();
const stripeRouter = Router();

stripeRouter.post("/customers", stripeService.crateCustomer);


stripeRouter.post("/products",stripeService.createProduct);

stripeRouter.post("/payment",stripeService.createSessionPayment)



export default stripeRouter;
