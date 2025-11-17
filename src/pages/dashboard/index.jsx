// import React, { useEffect, useState } from "react";
// import { Client, Databases, ID } from "appwrite";
// import InvoiceForm from "../../components/invoice";
// import InvoiceRow from "../../assets/invoiceList";
// import Card from "../../components/card";
// import Stat from "../../components/stat";

// // VAT rate
// const VAT_RATE = 0.075;

// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// const databases = new Databases(client);
// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// export default function FinanceDashboard() {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch invoices from Appwrite
//   const fetchInvoices = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
//       setInvoices(res.documents || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load invoices from Appwrite.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Create invoice in Appwrite
//   const createInvoice = async (invoice) => {
//     try {
//       const doc = await databases.createDocument(
//         DATABASE_ID,
//         COLLECTION_ID,
//         ID.unique(),
//         {
//           ...invoice,
//           vat: Number((invoice.amount * VAT_RATE).toFixed(2)),
//           total: Number(
//             (invoice.amount + invoice.amount * VAT_RATE).toFixed(2)
//           ),
//           paid: false,
//           createdAt: new Date().toISOString(),
//         }
//       );
//       setInvoices((prev) => [doc, ...prev]);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to create invoice.");
//     }
//   };

//   // Toggle paid status
//   const togglePaid = async (id, currentStatus) => {
//     try {
//       const invoice = invoices.find((i) => i.$id === id);
//       const updated = { ...invoice, paid: !currentStatus };

//       const doc = await databases.updateDocument(
//         DATABASE_ID,
//         COLLECTION_ID,
//         id,
//         updated
//       );
//       setInvoices((prev) => prev.map((i) => (i.$id === id ? doc : i)));
//     } catch (err) {
//       console.error(err);
//       setError("Failed to update invoice status.");
//     }
//   };

//   // Delete invoice
//   const deleteInvoice = async (id) => {
//     try {
//       await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
//       setInvoices((prev) => prev.filter((i) => i.$id !== id));
//     } catch (err) {
//       console.error(err);
//       setError("Failed to delete invoice.");
//     }
//   };

//   // Dashboard calculations
//   const totalRevenue = invoices
//     .filter((i) => i.paid)
//     .reduce((sum, i) => sum + Number(i.amount), 0);

//   const pendingInvoices = invoices.filter((i) => !i.paid).length;

//   const vatCollected = invoices
//     .filter((i) => i.paid)
//     .reduce((sum, i) => sum + Number(i.vat), 0);

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         <header className="flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Finance Dashboard</h1>
//           <div className="text-sm text-slate-600">Vic Group</div>
//         </header>

//         <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Card>
//             <Stat
//               title="Total Revenue (Paid)"
//               value={`$${totalRevenue.toFixed(2)}`}
//             />
//           </Card>
//           <Card>
//             <Stat title="Pending Invoices" value={pendingInvoices} />
//           </Card>
//           <Card>
//             <Stat title="VAT Collected" value={`$${vatCollected.toFixed(2)}`} />
//           </Card>
//         </section>

//         <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-1">
//             <Card>
//               <h2 className="font-semibold mb-3">Create Invoice</h2>
//               <InvoiceForm onCreate={createInvoice} />
//             </Card>
//           </div>

//           <div className="lg:col-span-2">
//             <Card>
//               <h2 className="font-semibold mb-3">Invoices</h2>
//               {loading ? (
//                 <p>Loading invoices...</p>
//               ) : error ? (
//                 <p className="text-red-600">{error}</p>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full table-auto">
//                     <thead>
//                       <tr className="text-left text-slate-600">
//                         <th className="p-3">Client</th>
//                         <th className="p-3">Created</th>
//                         <th className="p-3">Amount</th>
//                         <th className="p-3">VAT</th>
//                         <th className="p-3">Total</th>
//                         <th className="p-3">Status</th>
//                         <th className="p-3">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {invoices.length === 0 && (
//                         <tr>
//                           <td
//                             colSpan={7}
//                             className="p-6 text-center text-slate-500"
//                           >
//                             No invoices yet — create one!
//                           </td>
//                         </tr>
//                       )}
//                       {invoices.map((inv) => (
//                         <InvoiceRow
//                           key={inv.$id}
//                           inv={inv}
//                           onTogglePaid={() => togglePaid(inv.$id, inv.paid)}
//                           onDelete={() => deleteInvoice(inv.$id)}
//                         />
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </Card>
//           </div>
//         </section>

//         <footer className="text-sm text-slate-500 text-center mt-6">
//           Built by Asiya, Victor
//         </footer>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import InvoiceForm from "../../components/invoice";
import InvoiceRow from "../../assets/invoiceList";
import Card from "../../components/card";
import Stat from "../../components/stat";
import { client, databases } from "../../lib/appwrite";
import { useNavigate } from "react-router-dom";
import { account } from "../../lib/appwrite";

// VAT rate
const VAT_RATE = 0.075;

export default function FinanceDashboard() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (err) {
        console.log("User not authenticated", err);
        navigate("/auth"); 
      }
    };

    fetchUser();
  }, []);

  // Fetch invoices from Appwrite
  const fetchInvoices = async () => {
    if (!user) return;
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setInvoices(
        response.documents.map((doc) => ({
          ...doc,
          amount: parseFloat(doc.amount),
          vat: parseFloat(doc.vat),
          total: parseFloat(doc.total),
          paid: doc.paid || false,
        }))
      );
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchInvoices();
  }, [user]);

  // Create invoice
  const createInvoice = async (invoice) => {
    if (!user) return;

    const newInvoice = {
      ...invoice,
      vat: Number((invoice.amount * VAT_RATE).toFixed(2)),
      total: Number((invoice.amount + invoice.amount * VAT_RATE).toFixed(2)),
      paid: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        "unique()",
        newInvoice
      );

      setInvoices([response, ...invoices]);
    } catch (err) {
      console.error("Error creating invoice:", err);
    }
  };

  // Toggle paid/unpaid
  const togglePaid = async (id, currentStatus) => {
    try {
      const updatedInvoice = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        { paid: !currentStatus }
      );

      setInvoices((prev) =>
        prev.map((inv) => (inv.$id === id ? { ...inv, paid: updatedInvoice.paid } : inv))
      );
    } catch (err) {
      console.error("Error toggling paid status:", err);
    }
  };

  // Delete invoice
  const deleteInvoice = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setInvoices((prev) => prev.filter((inv) => inv.$id !== id));
    } catch (err) {
      console.error("Error deleting invoice:", err);
    }
  };

  // Dashboard Calculations
  const totalRevenue = invoices
    .filter((i) => i.paid)
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const pendingInvoices = invoices.filter((i) => !i.paid).length;

  const vatCollected = invoices
    .filter((i) => i.paid)
    .reduce((sum, i) => sum + Number(i.vat), 0);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Finance Dashboard</h1>
          <div className="text-sm text-slate-600">Vic Group</div>
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
                        key={inv.$id}
                        inv={inv}
                        onTogglePaid={() => togglePaid(inv.$id, inv.paid)}
                        onDelete={() => deleteInvoice(inv.$id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        <footer className="text-sm text-slate-500 text-center mt-6">
          Built by Asiya, Victor
        </footer>
      </div>
    </div>
  );
}
