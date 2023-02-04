// const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const stripe = require("stripe")(
  "sk_test_51MU9I7JDs8qLOl2jLFW33J3G4WEiXrofOfu5PfVt74FtVD9OBv3GUYR4pZBlCzXzC4ls0Y1RYDXjO6IfwMPvEvYG00As8YH6rF"
);
const Product = require("./../model/ProductModel");
const factoey = require("./handlerfactory");
exports.getCheckoutSession = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.poductId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: `${req.protocol}://${req.get("host")}/`,
      customer_email: req.user.email,
      client_reference_id: req.params.poductId,
      // line_items: [
      //   {
      //     name: product.name,
      //     amount: product.price * 100,
      //     currency: "usd",
      //     quantity: 1,
      //   },
      // ],
      line_items: [
        {
          quantity: 1,
          price: "price_1MXrAUJDs8qLOl2jtOtSLkBH",
        },
      ],
    });

    res.status(200).json({
      product: product,
      session,
    });
  } catch (error) {
    console.log(error);
  }
};

// createCheckoutSession();
{
  /* <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table pricing-table-id="prctbl_1MXrB6JDs8qLOl2j2n4emAfg"
publishable-key="pk_test_51MU9I7JDs8qLOl2jrKZTjBKSf68WzwRUml239dDICy36tPBJfmIhu6A89YJmDP1s9xrwkOtq9ybJQc1N0FOPCZ7I00HXzMYbt2">
</stripe-pricing-table> */
}
