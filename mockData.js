export const meals = [
  {
    id: "bf",
    label: "Breakfast",
    time: "7:30 – 9:00 AM",
    options: [
      { id: "bf1", name: "Idli + Sambar", votes: 58, stock: 220, threshold: 60, available: true },
      { id: "bf2", name: "Poha + Chai", votes: 41, stock: 30, threshold: 60, available: true },
      { id: "bf3", name: "Bread Omelette", votes: 30, stock: 0, threshold: 40, available: false },
    ],
  },
  {
    id: "ln",
    label: "Lunch",
    time: "12:30 – 2:00 PM",
    options: [
      { id: "ln1", name: "Rice + Dal Tadka", votes: 72, stock: 300, threshold: 80, available: true },
      { id: "ln2", name: "Chapati + Paneer", votes: 45, stock: 18, threshold: 80, available: true },
      { id: "ln3", name: "Veg Biryani", votes: 25, stock: 0, threshold: 50, available: false },
    ],
  },
  {
    id: "dn",
    label: "Dinner",
    time: "7:30 – 9:00 PM",
    options: [
      { id: "dn1", name: "Roti + Sabzi", votes: 38, stock: 200, threshold: 60, available: true },
      { id: "dn2", name: "Fried Rice", votes: 62, stock: 140, threshold: 60, available: true },
      { id: "dn3", name: "Chole Bhature", votes: 40, stock: 55, threshold: 60, available: true },
    ],
  },
];

export const grocery = [
  { name: "Rice (kg)", qty: 120, threshold: 50 },
  { name: "Dal (kg)", qty: 45, threshold: 20 },
  { name: "Atta (kg)", qty: 30, threshold: 40 },
  { name: "Paneer (kg)", qty: 18, threshold: 25 },
  { name: "Eggs", qty: 0, threshold: 100 },
  { name: "Tomatoes (kg)", qty: 22, threshold: 15 },
  { name: "Onions (kg)", qty: 60, threshold: 30 },
];