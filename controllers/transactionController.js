const { getTransactions } = require("../utils/fakeDb");

async function listTransactions(req, res) {
  try {
    console.log("Fetching all transactions", {
      query: req.query,
      requesterIp: req.ip,
    });

    await new Promise((resolve) => setTimeout(resolve, 80));

    const items = getTransactions();
    res.json({ total: items.length, transactions: items });
  } catch (error) {
    console.error("Transaction fetch error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch transactions", error: error.message });
  }
}

module.exports = {
  listTransactions,
};
