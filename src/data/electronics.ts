export const electronicTypes = [
  { 
    id: 'laptop', 
    name: 'Laptop', 
    price: 50000, 
    icon: 'laptop',
    weight: 3,
    ecoFact: 'Daur ulang laptop menghemat energi yang cukup untuk menyalakan TV selama 10 jam.'
  },
  { 
    id: 'smartphone', 
    name: 'Smartphone', 
    price: 20000, 
    icon: 'smartphone',
    weight: 1,
    ecoFact: '1 ton sirkuit HP mengandung emas 100x lebih banyak daripada 1 ton bijih emas.'
  },
  { 
    id: 'tv', 
    name: 'TV', 
    price: 35000, 
    icon: 'tv',
    weight: 10,
    ecoFact: 'Kaca TV mengandung timbal tinggi yang berbahaya jika dibuang sembarangan ke tanah.'
  },
  { 
    id: 'printer', 
    name: 'Printer', 
    price: 25000, 
    icon: 'printer',
    weight: 5,
    ecoFact: 'Tinta printer mengandung karbon hitam yang diklasifikasikan sebagai karsinogen potensial.'
  },
  { 
    id: 'refrigerator', 
    name: 'Kulkas', 
    price: 75000, 
    icon: 'refrigerator',
    weight: 25,
    ecoFact: 'Kulkas lama memiliki CFC yang merusak lapisan ozon jika tidak ditangani dengan benar.'
  },
  { 
    id: 'monitor', 
    name: 'Monitor', 
    price: 15000, 
    icon: 'monitor',
    weight: 6,
    ecoFact: 'Daur ulang monitor mencegah pelepasan merkuri dan kadmium ke ekosistem air.'
  },
];

export const electronicPrices = electronicTypes.reduce((acc, curr) => {
  acc[curr.id] = curr.price;
  return acc;
}, {} as Record<string, number>);
