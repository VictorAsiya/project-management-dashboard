import React, { useEffect, useState } from "react";
import InvoiceForm from "./components/invoice";
import InvoiceRow from "./assets/invoiceList";
import Card from "./components/card";
import Stat from "./components/stat";

// VAT rate (adjustable)
const VAT_RATE = 0.075; // 7.5%

export default function FinanceDashboard() {
  const [invoices, setInvoices] = useState([]);

  // Load invoices from localStorage when app starts
  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(savedInvoices);
  }, []);

  // Saves invoices to localStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("invoices", JSON.stringify(items));
  };

  // Create invoice locally
  function createInvoice(invoice) {
    const newInvoice = {
      ...invoice,
      id: Date.now().toString(),
      vat: Number((invoice.amount * VAT_RATE).toFixed(2)),
      total: Number((invoice.amount + invoice.amount * VAT_RATE).toFixed(2)),
      paid: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [newInvoice, ...invoices];
    setInvoices(updated);
    saveToLocalStorage(updated);
  }

  // Toggle paid/unpaid
  function togglePaid(id, paidStatus) {
    const updated = invoices.map((inv) =>
      inv.id === id ? { ...inv, paid: paidStatus } : inv
    );
    setInvoices(updated);
    saveToLocalStorage(updated);
  }

  // Delete invoice
  function deleteInvoice(id) {
    const updated = invoices.filter((inv) => inv.id !== id);
    setInvoices(updated);
    saveToLocalStorage(updated);
  }

  // Dashboard Calculations
  const totalRevenue = invoices
    .filter((i) => i.paid)
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const pendingInvoices = invoices.filter((i) => !i.paid).length;

  const vatCollected = invoices
    .filter((i) => i.paid)
    .reduce((sum, i) => sum + Number(i.vat), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Finance Dashboard</h1>
          <div className="text-sm text-slate-600">Frontend-Only Version</div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <Stat title="Total Revenue (Paid)" value={`$${totalRevenue.toFixed(2)}`} />
          </Card>
          <Card>
            <Stat title="Pending Invoices" value={pendingInvoices} />
          </Card>
          <Card>
            <Stat title="VAT Collected" value={`$${vatCollected.toFixed(2)}`} />
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <h2 className="font-semibold mb-3">Create Invoice</h2>
              <InvoiceForm onCreate={createInvoice} />
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <h2 className="font-semibold mb-3">Invoices</h2>

              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-left text-slate-600">
                      <th className="p-3">Client</th>
                      <th className="p-3">Created</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">VAT</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-slate-500">
                          No invoices yet — create one!
                        </td>
                      </tr>
                    )}

                    {invoices.map((inv) => (
                      <InvoiceRow
                        key={inv.id}
                        inv={inv}
                        onTogglePaid={togglePaid}
                        onDelete={deleteInvoice}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        <footer className="text-sm text-slate-500 text-center mt-6">
          Built with React + Tailwind — No Backend
        </footer>
      </div>
    </div>
  );
}
