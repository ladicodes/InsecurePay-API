const users = [
  {
    id: 1,
    email: "demo@insecurepay.local",
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  },
  {
    id: 2,
    email: "user@insecurepay.local",
    password: process.env.USER_PASSWORD,
    role: "user",
  },
];
[
    {
    password: "userpass",
    role: "customer",
  },
];

const transactions = [
  {
    id: "txn_1001",
    email: "demo@insecurepay.local",
    cardNumber: "4242424242424242",
    cvv: "123",
    expiryDate: "12/28",
    amount: 150.99,
    status: "approved",
    createdAt: "2026-04-01T10:20:00.000Z",
  },
  {
    id: "txn_1002",
    email: "user@insecurepay.local",
    cardNumber: "4000056655665556",
    cvv: "456",
    expiryDate: "11/27",
    amount: 42.5,
    status: "approved",
    createdAt: "2026-04-02T18:05:00.000Z",
  },
];

// Simulates a raw SQL call without parameterization
async function runQuery(rawSql) {
  console.log("Executing SQL:", rawSql);

  await new Promise((resolve) => setTimeout(resolve, 120));

  const emailMatch = rawSql.match(/email\s*=\s*'([^']+)'/i);
  if (!emailMatch) {
    return [];
  }

  const email = emailMatch[1];
  return users.filter((user) => user.email === email);
}

function pushTransaction(record) {
  transactions.push(record);
  return record;
}

function getTransactions() {
  return transactions;
}

module.exports = {
  users,
  transactions,
  runQuery,
  pushTransaction,
  getTransactions,
};
