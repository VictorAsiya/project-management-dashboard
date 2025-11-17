// import { useState } from "react";
// // --- Invoice form component ---
// function InvoiceForm({ onCreate }) {
//   const [clientName, setClientName] = useState("");
//   const [amount, setAmount] = useState(0);
//   const [dueDate, setDueDate] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     const numeric = Number(amount);
//     const vat = Number((numeric * VAT_RATE).toFixed(2));
//     const invoice = {
//       clientName,
//       amount: numeric,
//       vat,
//       total: Number((numeric + vat).toFixed(2)),
//       paid: false,
//       createdAt: new Date().toISOString(),
//       dueDate: dueDate || null,
//     };

//     onCreate(invoice);
//     setClientName("");
//     setAmount(0);
//     setDueDate("");
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//         <input
//           required
//           value={clientName}
//           onChange={(e) => setClientName(e.target.value)}
//           placeholder="Client name"
//           className="border rounded-lg p-2"
//         />
//         <input
//           required
//           type="number"
//           min="0"
//           step="0.01"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Amount"
//           className="border rounded-lg p-2"
//         />
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className="border rounded-lg p-2"
//         />
//       </div>

//       <div className="flex items-center gap-2">
//         <button className="px-4 py-2 rounded-lg bg-sky-600 text-white">Create Invoice</button>
//         <div className="text-sm text-slate-600">VAT will be auto-calculated at {VAT_RATE * 100}%</div>
//       </div>
//     </form>
//   );
// }
// export default InvoiceForm



import { useState } from "react";

const VAT_RATE = 0.075; // 7.5%

function InvoiceForm({ onCreate }) {
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(0);
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const numeric = Number(amount);
    const vat = Number((numeric * VAT_RATE).toFixed(2));

    const invoice = {
      clientName,
      amount: numeric,
      vat,
      total: Number((numeric + vat).toFixed(2)),
      paid: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || null,
    };

    onCreate(invoice);
    setClientName("");
    setAmount(0);
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          required
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client name"
          className="border rounded-lg p-2"
        />
        <input
          required
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border rounded-lg p-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded-lg p-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="px-4 py-2 rounded-lg bg-sky-600 text-white">Create Invoice</button>
        <div className="text-sm text-slate-600">VAT will be auto-calculated at {VAT_RATE * 100}%</div>
      </div>
    </form>
  );
}

export default InvoiceForm;
