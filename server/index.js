const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);
const stripe = new Stripe("sk_test_UQycUqp83YWelcE62E0h6bx3008y0RVoyV"); // replace with your own secret test key!

const cors = require("cors");
const generateUploadURL = require("./s3");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
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

app.get("/api/s3Url", async (req, res) => {
  try {
    const url = await generateUploadURL();
    return res.status(200).json({ url });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ error });
  }
})

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
