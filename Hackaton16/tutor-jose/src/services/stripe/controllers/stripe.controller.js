import { request, response } from "express";
import Stripe from "stripe";

class StripeController {
  constructor() {
    this.secretKey = process.env.STRIPE_SECRET;
    this.stripeClient = new Stripe(this.secretKey);
  }

  crateCustomer = async (req = request, res = response) => {
    const body = req.body;

    const newCustomer = await this.stripeClient.customers.create({
      name: body.email,
      email: body.email,
    });

    res.json(newCustomer);
  };

  createProduct = async (req = request, res = response) => {
    const body = req.body;

    // const newPrice = await this.stripeClient.prices.create({
    //   currency: "usd",
    //   unit_amount: 1000,
    // });
    const newProduct = await this.stripeClient.products.create({
      name: body.name,
      default_price_data: { currency: "usd", unit_amount: body.price },
      images: body.images,
      description: body.description,
    });

    res.json(newProduct);
  };
  createSessionPayment = async (req = request, res = response) => {
    const { items, success_url, customer } = req.body;
    const session = await this.stripeClient.checkout.sessions.create({
      success_url,
      line_items: items,
      //   [
      //     {
      //       price: "price_1MotwRLkdIwHu7ixYcPLm5uZ",
      //       quantity: 2,
      //     },
      //   ],
      customer,
      mode: "payment",
    });

    return res.json(session);
  };
}

export default StripeController;
