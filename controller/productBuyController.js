const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const Product = require("./../model/ProductModel");
const factoey = require("./handlerfactory");
exports.getCheckoutSession = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.poductId);

    const session = await stripe.checkout.session.create({
      payment_method_types: ["card"],
      cancel_url: "https://example.com/cancel",
      success_url: "https://example.com/success",
      client_reference_id: product.id,
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 500,
            product_data: {
              name: "name of the product",
            },
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      product: product,
    });
  } catch (error) {}
};
