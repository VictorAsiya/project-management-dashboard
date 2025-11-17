// --- Invoice list item ---
function InvoiceRow({ inv, onTogglePaid, onDelete }) {
  return (
    <tr className="border-b">
      <td className="p-3">{inv.clientName}</td>
      <td className="p-3">{new Date(inv.createdAt).toLocaleDateString()}</td>
      <td className="p-3">${inv.amount.toFixed(2)}</td>
      <td className="p-3">${inv.vat.toFixed(2)}</td>
      <td className="p-3">${inv.total.toFixed(2)}</td>
      <td className="p-3">{inv.paid ? "Paid" : "Unpaid"}</td>
      <td className="p-3">
        <button
          onClick={() => onTogglePaid(inv.$id, !inv.paid)}
          className={`px-3 py-1 rounded-lg mr-2 ${inv.paid ? "bg-amber-500" : "bg-green-600 text-white"}`}>
          {inv.paid ? "Mark Unpaid" : "Mark Paid"}
        </button>
        <button onClick={() => onDelete(inv.$id)} className="px-3 py-1 rounded-lg bg-red-500 text-white">
          Delete
        </button>
      </td>
    </tr>
  );
}
export default InvoiceRow