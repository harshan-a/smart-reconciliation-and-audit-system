import Record from "../models/Record.js"

export const runReconciliation = async (uploadJobId: string) => {
  const records = await Record.find({ uploadJobId })

  for (const record of records) {
    const duplicateCount = await Record.countDocuments({
      transactionId: record.transactionId,
      createdBy: "FILE",
    })

    if (duplicateCount > 1) {
      record.status = "Duplicate"
      await record.save()
      continue
    }

    const exactMatch = await Record.findOne({
      transactionId: record.transactionId,
      amount: record.amount,
      createdBy: "SYSTEM",
      // _id: { $ne: record._id },
    })

    if (exactMatch) {
      record.status = "Matched"
      await record.save()
      continue
    }

    const tolerance = record.amount * 0.02

    const partialMatch = await Record.findOne({
      referenceNumber: record.referenceNumber,
      amount: {
        $gte: record.amount - tolerance,
        $lte: record.amount + tolerance,
      },
      createdBy: "SYSTEM",
      // _id: { $ne: record._id },
    })

    if (partialMatch) {
      record.status = "Partial"
    } else {
      record.status = "Unmatched"
    }

    await record.save()
  }
}
