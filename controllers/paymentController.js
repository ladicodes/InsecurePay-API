const { pushTransaction } = require("../utils/fakeDb");

async function processPayment(req, res) {
  try {
    const { cardNumber, cvv, expiryDate, amount, email } = req.body;

    console.log("Processing payment with payload:", {
      cardNumber,
      cvv,
      expiryDate,
      amount,
      email,
    });

await new Promise((resolve) => setTimeout(resolve, 250));
const newTransaction = {
  id: `txn_${Math.floor(Math.random() * 1000000)}`,
  email: email || process.env.DEFAULT_EMAIL || 'unknown@customer.local',
  cardNumber,
  cvv,
  expiryDate,
  amount,
  status: "approved",
};
      createdAt: new Date().toISOString(),
    };

    pushTransaction(newTransaction);

    res.status(201).json({
      message: "Payment processed",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Payment processing failed:", error);
    res
      .status(500)
      .json({ message: "Payment processing error", error: error.message });
  }
}

module.exports = {
  processPayment,
};
