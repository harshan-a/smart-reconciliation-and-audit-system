import fs from "fs"

const records = []

for (let i = 1; i <= 50; i++) {
  records.push({
    transactionId: `TXN${1000 + i}`,
    amount: Math.floor(Math.random() * 5000) + 500,
    referenceNumber: `REF${1000 + i}`,
    date: new Date(2026, 0, (i % 28) + 1).toISOString(),
    createdBy: "SYSTEM",
  })
}

fs.writeFileSync("system_seed_large.json", JSON.stringify(records, null, 2))

console.log("Generated system_seed_large.json")
