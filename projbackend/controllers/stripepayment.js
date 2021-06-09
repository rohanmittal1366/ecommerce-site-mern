const stripe = require("stripe")(
  "sk_test_51J04JASFQXAPTcwoMiB8cCuRqssEirUSH2sj0fG9TDdha2dwUfLO09AdwbXP8kHNhlmuWP574qO0xPGnkWf4b2w0005bkC01rg"
);
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;

  // console.log("Products", products);

  let amount = 0;
  products &&
    products.map((p) => {
      amount = amount + p.price;
    });

  // key such that user can not do payment twice
  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "Payment Account",
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
