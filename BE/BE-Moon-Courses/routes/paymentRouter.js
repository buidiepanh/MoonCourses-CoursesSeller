const express = require("express");
const bodyParser = require("body-parser");
const { createVNPayUrl, vnpayReturn } = require("../services/PaymentServices");
const authenticate = require("../middleware/authenticate");

const paymentRouter = express.Router();
paymentRouter.use(bodyParser.json());

paymentRouter.all("*", authenticate);
paymentRouter.route("/create-payment").post(createVNPayUrl);
paymentRouter.route("/vnpay-return").get(vnpayReturn);

module.exports = paymentRouter;
