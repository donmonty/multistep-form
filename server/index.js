const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.REACT_APP_SECRET_KEY_TEST);
const cors = require("cors");

const app = express();
app.use(cors({ origin: process.env.REACT_APP_CLIENT_URL }));
app.use(express.json());

app.post("/api/card-details", async (req, res) => {
  const { id } = req.body;

  try {
    const customer = await stripe.customers.create({
      payment_method: id,
    });
    return res.status(200).json({ customer });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error });
  }
});

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.REACT_APP_SERVER_PORT}`);
});
