// Shared mock data for the grocery store dashboard

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  outstandingBalance: number;
  recentPayment: number;
  recentPaymentDate: string;
  status: "Active" | "Pending" | "Inactive";
  joinedDate: string;
}

export interface Transaction {
  id: number;
  customerId: number;
  date: string;
  type: "Purchase" | "Payment" | "Refund";
  description: string;
  amount: number;
  balance: number;
}

export interface Purchase {
  id: number;
  customerId: number;
  date: string;
  items: string;
  quantity: number;
  amount: number;
  status: "Delivered" | "Pending" | "Cancelled";
}

export const customers: Customer[] = [
  { id: 1, name: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@email.com", address: "12, MG Road, Mumbai", totalOrders: 45, totalSpent: 124500, outstandingBalance: 8500, recentPayment: 5000, recentPaymentDate: "2026-04-20", status: "Active", joinedDate: "2025-06-15" },
  { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", address: "45, Park Street, Delhi", totalOrders: 12, totalSpent: 32800, outstandingBalance: 0, recentPayment: 3200, recentPaymentDate: "2026-04-19", status: "Active", joinedDate: "2025-09-22" },
  { id: 3, name: "Amit Patel", phone: "+91 76543 21098", email: "amit@email.com", address: "78, Ring Road, Ahmedabad", totalOrders: 8, totalSpent: 18200, outstandingBalance: 4200, recentPayment: 2000, recentPaymentDate: "2026-04-18", status: "Pending", joinedDate: "2026-01-10" },
  { id: 4, name: "Sunita Devi", phone: "+91 65432 10987", email: "sunita@email.com", address: "23, Lake View, Pune", totalOrders: 67, totalSpent: 215300, outstandingBalance: 12400, recentPayment: 10000, recentPaymentDate: "2026-04-21", status: "Active", joinedDate: "2025-03-08" },
  { id: 5, name: "Mohammed Ali", phone: "+91 54321 09876", email: "ali@email.com", address: "90, Civil Lines, Lucknow", totalOrders: 3, totalSpent: 8400, outstandingBalance: 2100, recentPayment: 1500, recentPaymentDate: "2026-03-15", status: "Inactive", joinedDate: "2025-12-01" },
  { id: 6, name: "Deepa Nair", phone: "+91 43210 98765", email: "deepa@email.com", address: "56, Beach Road, Kochi", totalOrders: 29, totalSpent: 78600, outstandingBalance: 0, recentPayment: 6500, recentPaymentDate: "2026-04-20", status: "Active", joinedDate: "2025-07-14" },
  { id: 7, name: "Vikram Singh", phone: "+91 32109 87654", email: "vikram@email.com", address: "34, Mall Road, Chandigarh", totalOrders: 15, totalSpent: 42100, outstandingBalance: 3800, recentPayment: 4000, recentPaymentDate: "2026-04-17", status: "Active", joinedDate: "2025-08-20" },
  { id: 8, name: "Ananya Reddy", phone: "+91 21098 76543", email: "ananya@email.com", address: "67, Jubilee Hills, Hyderabad", totalOrders: 5, totalSpent: 14800, outstandingBalance: 1400, recentPayment: 2500, recentPaymentDate: "2026-04-16", status: "Pending", joinedDate: "2026-02-05" },
  { id: 9, name: "Ravi Verma", phone: "+91 10987 65432", email: "ravi@email.com", address: "89, Sector 17, Noida", totalOrders: 38, totalSpent: 105200, outstandingBalance: 0, recentPayment: 8000, recentPaymentDate: "2026-04-21", status: "Active", joinedDate: "2025-05-30" },
  { id: 10, name: "Kavita Joshi", phone: "+91 98712 34560", email: "kavita@email.com", address: "11, Lal Bagh Road, Bangalore", totalOrders: 22, totalSpent: 61400, outstandingBalance: 5600, recentPayment: 3500, recentPaymentDate: "2026-04-19", status: "Active", joinedDate: "2025-10-12" },
  { id: 11, name: "Suresh Menon", phone: "+91 87612 34509", email: "suresh@email.com", address: "44, Boat Club, Chennai", totalOrders: 1, totalSpent: 2300, outstandingBalance: 2300, recentPayment: 0, recentPaymentDate: "-", status: "Inactive", joinedDate: "2026-03-01" },
  { id: 12, name: "Neha Gupta", phone: "+91 76512 34098", email: "neha@email.com", address: "22, Hazratganj, Lucknow", totalOrders: 19, totalSpent: 53700, outstandingBalance: 0, recentPayment: 4800, recentPaymentDate: "2026-04-20", status: "Active", joinedDate: "2025-11-18" },
];

export const getTransactions = (customerId: number): Transaction[] => {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return [];
  return [
    { id: 1, customerId, date: "2026-04-21", type: "Purchase", description: "Rice (25kg), Oil (5L), Sugar (10kg)", amount: 3200, balance: customer.outstandingBalance },
    { id: 2, customerId, date: "2026-04-20", type: "Payment", description: "Cash Payment", amount: customer.recentPayment, balance: customer.outstandingBalance + customer.recentPayment },
    { id: 3, customerId, date: "2026-04-18", type: "Purchase", description: "Wheat Flour (10kg), Pulses (5kg)", amount: 1800, balance: customer.outstandingBalance + customer.recentPayment + 1800 },
    { id: 4, customerId, date: "2026-04-15", type: "Purchase", description: "Spices Set, Tea (2kg), Milk (10L)", amount: 2400, balance: 6200 },
    { id: 5, customerId, date: "2026-04-12", type: "Payment", description: "UPI Payment", amount: 4000, balance: 3800 },
    { id: 6, customerId, date: "2026-04-10", type: "Purchase", description: "Vegetables, Fruits, Snacks", amount: 1500, balance: 7800 },
    { id: 7, customerId, date: "2026-04-08", type: "Refund", description: "Returned damaged goods", amount: 500, balance: 6300 },
    { id: 8, customerId, date: "2026-04-05", type: "Purchase", description: "Cooking Oil (10L), Ghee (2kg)", amount: 3500, balance: 6800 },
  ];
};

export const getPurchases = (customerId: number): Purchase[] => {
  return [
    { id: 1, customerId, date: "2026-04-21", items: "Rice (25kg), Oil (5L), Sugar (10kg)", quantity: 3, amount: 3200, status: "Delivered" },
    { id: 2, customerId, date: "2026-04-18", items: "Wheat Flour (10kg), Pulses (5kg)", quantity: 2, amount: 1800, status: "Delivered" },
    { id: 3, customerId, date: "2026-04-15", items: "Spices Set, Tea (2kg), Milk (10L)", quantity: 3, amount: 2400, status: "Delivered" },
    { id: 4, customerId, date: "2026-04-10", items: "Vegetables, Fruits, Snacks", quantity: 5, amount: 1500, status: "Delivered" },
    { id: 5, customerId, date: "2026-04-08", items: "Cooking Oil (10L), Ghee (2kg)", quantity: 2, amount: 3500, status: "Delivered" },
    { id: 6, customerId, date: "2026-04-05", items: "Detergent, Soap, Shampoo", quantity: 6, amount: 1200, status: "Pending" },
    { id: 7, customerId, date: "2026-04-01", items: "Biscuits, Namkeen, Cold Drinks", quantity: 8, amount: 950, status: "Delivered" },
  ];
};

export interface InventoryItem {
  id: number;
  name: string;
  category: "Dairy" | "Grains" | "Produce" | "Snacks" | "Beverages" | "Household";
  stock: number;
  unit: string;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  date: string;
  totalItems: number;
  totalAmount: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
}

export interface Sale {
  id: number;
  orderId: number;
  customerName: string;
  date: string;
  amount: number;
  paymentMethod: "Cash" | "UPI" | "Card";
}

export const inventory: InventoryItem[] = [
  { id: 1, name: "Premium Basmati Rice", category: "Grains", stock: 150, unit: "kg", price: 120, status: "In Stock" },
  { id: 2, name: "Fresh Whole Milk", category: "Dairy", stock: 45, unit: "L", price: 60, status: "In Stock" },
  { id: 3, name: "Organic Sunflower Oil", category: "Household", stock: 12, unit: "L", price: 180, status: "Low Stock" },
  { id: 4, name: "Refined Sugar", category: "Grains", stock: 200, unit: "kg", price: 45, status: "In Stock" },
  { id: 5, name: "Assorted Biscuits", category: "Snacks", stock: 0, unit: "pcs", price: 25, status: "Out of Stock" },
  { id: 6, name: "Fresh Tomatoes", category: "Produce", stock: 25, unit: "kg", price: 40, status: "In Stock" },
  { id: 7, name: "Green Tea Pack", category: "Beverages", stock: 8, unit: "pcs", price: 350, status: "Low Stock" },
];

export const orders: Order[] = [
  { id: 101, customerId: 1, customerName: "Rajesh Kumar", date: "2026-04-21", totalItems: 3, totalAmount: 3200, status: "Pending" },
  { id: 102, customerId: 4, customerName: "Sunita Devi", date: "2026-04-21", totalItems: 5, totalAmount: 12400, status: "Processing" },
  { id: 103, customerId: 2, customerName: "Priya Sharma", date: "2026-04-20", totalItems: 2, totalAmount: 1800, status: "Completed" },
  { id: 104, customerId: 10, customerName: "Kavita Joshi", date: "2026-04-19", totalItems: 4, totalAmount: 5600, status: "Pending" },
];

export const sales: Sale[] = [
  // This Week (April 19 - 25, 2026)
  { id: 501, orderId: 103, customerName: "Priya Sharma", date: "2026-04-20", amount: 1800, paymentMethod: "UPI" },
  { id: 502, orderId: 99, customerName: "Ravi Verma", date: "2026-04-21", amount: 8000, paymentMethod: "Cash" },
  // Last Week (April 12 - 18, 2026)
  { id: 503, orderId: 110, customerName: "Rajesh Kumar", date: "2026-04-15", amount: 4500, paymentMethod: "Card" },
  { id: 504, orderId: 111, customerName: "Deepa Nair", date: "2026-04-13", amount: 2200, paymentMethod: "UPI" },
  // Earlier in April
  { id: 505, orderId: 112, customerName: "Vikram Singh", date: "2026-04-05", amount: 12000, paymentMethod: "Cash" },
  // March 2026
  { id: 506, orderId: 113, customerName: "Amit Patel", date: "2026-03-25", amount: 5600, paymentMethod: "UPI" },
  { id: 507, orderId: 114, customerName: "Sunita Devi", date: "2026-03-10", amount: 9800, paymentMethod: "Card" },
  // February 2026
  { id: 508, orderId: 115, customerName: "Rajesh Kumar", date: "2026-02-15", amount: 15600, paymentMethod: "Cash" },
  // 2025
  { id: 509, orderId: 116, customerName: "Priya Sharma", date: "2025-12-20", amount: 25000, paymentMethod: "Card" },
  { id: 510, orderId: 117, customerName: "Mohammed Ali", date: "2025-11-05", amount: 18500, paymentMethod: "UPI" },
];

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  category: string;
  status: "Active" | "Inactive";
}

export interface PurchaseOrder {
  id: number;
  supplierId: number;
  supplierName: string;
  date: string;
  items: string;
  amount: number;
  status: "Ordered" | "Received" | "Cancelled";
}

export interface Bill {
  id: number;
  customerName: string;
  date: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
  dueDate: string;
}

export const suppliers: Supplier[] = [
  { id: 1, name: "Reliance Fresh Wholesale", contactPerson: "Amit Shah", phone: "+91 99887 76655", email: "wholesale@reliance.com", category: "General Grocery", status: "Active" },
  { id: 2, name: "Mother Dairy Ltd", contactPerson: "Suresh Raina", phone: "+91 99776 65544", email: "sales@motherdairy.com", category: "Dairy", status: "Active" },
  { id: 3, name: "Agri-Fresh Produce", contactPerson: "Kiran Bedi", phone: "+91 99665 54433", email: "contact@agrifresh.com", category: "Produce", status: "Active" },
  { id: 4, name: "P&G Distribution", contactPerson: "Rohit Sharma", phone: "+91 99554 43322", email: "dist@pg.com", category: "Household", status: "Inactive" },
  { id: 5, name: "Hindustan Unilever", contactPerson: "Vijay Verma", phone: "+91 99443 32211", email: "sales.india@hul.com", category: "FMCG", status: "Active" },
  { id: 6, name: "Amul Federation", contactPerson: "Mehul Shah", phone: "+91 99332 21100", email: "orders@amul.coop", category: "Dairy", status: "Active" },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: 801, supplierId: 1, supplierName: "Reliance Fresh Wholesale", date: "2026-04-21", items: "Grains, Spices (Bulk)", amount: 45000, status: "Received" },
  { id: 802, supplierId: 2, supplierName: "Mother Dairy Ltd", date: "2026-04-21", items: "Milk (200L), Curd (50kg)", amount: 15000, status: "Ordered" },
  { id: 803, supplierId: 3, supplierName: "Agri-Fresh Produce", date: "2026-04-20", items: "Potatoes, Onions (100kg)", amount: 8000, status: "Received" },
  { id: 804, supplierId: 5, supplierName: "Hindustan Unilever", date: "2026-04-19", items: "Soaps, Detergents, Tea", amount: 22000, status: "Received" },
  { id: 805, supplierId: 6, supplierName: "Amul Federation", date: "2026-04-18", items: "Butter, Cheese, Paneer", amount: 12000, status: "Cancelled" },
];

export const bills: Bill[] = [
  { id: 2001, customerName: "Rajesh Kumar", date: "2026-04-21", amount: 3200, status: "Paid", dueDate: "2026-04-21" },
  { id: 2002, customerName: "Sunita Devi", date: "2026-04-20", amount: 12400, status: "Unpaid", dueDate: "2026-04-25" },
  { id: 2003, customerName: "Amit Patel", date: "2026-04-18", amount: 4200, status: "Overdue", dueDate: "2026-04-15" },
  { id: 2004, customerName: "Priya Sharma", date: "2026-04-21", amount: 1800, status: "Paid", dueDate: "2026-04-21" },
  { id: 2005, customerName: "Vikram Singh", date: "2026-04-17", amount: 3800, status: "Unpaid", dueDate: "2026-04-22" },
  { id: 2006, customerName: "Deepa Nair", date: "2026-04-20", amount: 6500, status: "Paid", dueDate: "2026-04-20" },
];

export const getOrderById = (id: number) => orders.find(o => o.id === id);

export const formatCurrency = (amount: number): string => {
  return "₹" + amount.toLocaleString("en-IN");
};

export const currentUser = {
  name: "MD Eesha",
  role: "Store Manager",
  email: "eesha@zarooratkart.com",
  joined: "2024-02-15",
  avatar: "ME",
  phone: "+91 99887 76655"
};

export const notifications = [
  { id: 1, title: "New Order", message: "Rajesh Kumar placed a new order for ₹3,200", time: "2 mins ago", type: "order" },
  { id: 2, title: "Stock Alert", message: "Low stock alert: Organic Sunflower Oil (12L left)", time: "1 hour ago", type: "stock" },
  { id: 3, title: "Payment Received", message: "Successfully received ₹8,000 from Ravi Verma", time: "3 hours ago", type: "payment" },
  { id: 4, title: "New Customer", message: "Neha Gupta joined the ZarooratKart platform", time: "5 hours ago", type: "user" },
  { id: 5, title: "Report Ready", message: "Monthly Sales Report for March 2026 is ready", time: "1 day ago", type: "report" },
];
