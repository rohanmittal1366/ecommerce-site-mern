const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "rmdzhgm2vjr7mmb6",
  publicKey: "k2ncfy2v3zvkr6xm",
  privateKey: "39f67f9e8de138be9eb14282957233a4",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate((err, response) => {
    // pass clientToken to your front-end
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.statsu(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};
