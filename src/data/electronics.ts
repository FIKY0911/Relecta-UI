export const electronicTypes = [
  { id: 'laptop', name: 'Laptop', price: 50000, icon: 'laptop' },
  { id: 'smartphone', name: 'Smartphone', price: 20000, icon: 'smartphone' },
  { id: 'tv', name: 'TV', price: 35000, icon: 'tv' },
  { id: 'printer', name: 'Printer', price: 25000, icon: 'printer' },
  { id: 'refrigerator', name: 'Kulkas', price: 75000, icon: 'refrigerator' },
  { id: 'monitor', name: 'Monitor', price: 15000, icon: 'monitor' },
];

export const electronicPrices = electronicTypes.reduce((acc, curr) => {
  acc[curr.id] = curr.price;
  return acc;
}, {} as Record<string, number>);
