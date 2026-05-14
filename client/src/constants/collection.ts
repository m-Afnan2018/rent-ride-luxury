export const COLLECTION_FILTERS = [
  "All",
  "Mercedes",
  "Tesla",
  "Land Rover",
  "Ford Motor Company"
];

export const COLLECTION_DATA = [
  {
    id: 1,
    name: "FORD MUSTANG GT",
    brand: "Ford Motor Company",
    category: "Sports",
    image: "/images/image_1.jpg",
    gallery: [
      "/images/car_preview.jpg",
      "/images/car_preview_2.jpg",
      "/images/car_preview_3.jpg",
      "/images/image_2.jpg"
    ],
    description: "Experience the power and thrill of the iconic Ford Mustang GT, engineered for performance and designed to turn heads. With its aggressive styling, roaring V8 engine, and premium interior, the Mustang GT delivers an unforgettable driving experience for every journey.",
    specs: {
      seats: 4,
      engine: "5.0L V8",
      luggage: "2 Bags",
      type: "Sports Car"
    },
    features: [
      {
        title: "Performance Engine",
        description: "Feel unmatched power with the legendary 5.0L V8 engine built for thrilling acceleration and smooth highway cruising.",
        icon: "/icons/car-engine 1.svg"
      },
      {
        title: "Premium Interior",
        description: "Enjoy luxury leather seating, advanced digital displays, and a driver-focused cockpit designed for maximum comfort.",
        icon: "/icons/car-seat 1.svg"
      },
      {
        title: "Advanced Safety",
        description: "Drive confidently with intelligent safety systems including lane assist, adaptive cruise control, and rear parking sensors.",
        icon: "/icons/shield-check.svg"
      },
      {
        title: "Sport Driving Mode",
        description: "Switch into sport mode for sharper handling, enhanced throttle response, and an adrenaline-filled driving experience.",
        icon: "/icons/sports-car.svg"
      },
      {
        title: "Modern Infotainment",
        description: "Stay connected with a touchscreen infotainment system featuring Apple CarPlay, Android Auto, and premium audio.",
        icon: "/icons/infotainment.svg"
      },
      {
        title: "Iconic Design",
        description: "Bold body lines, signature LED lighting, and muscular styling make the Mustang GT a true modern American classic.",
        icon: "/icons/car-side.svg"
      }
    ],
    price: 28999
  },
  {
    id: 2,
    name: "MERCEDES C63 COUPE",
    brand: "Mercedes",
    category: "Sports",
    image: "/images/image_2.jpg",
    specs: {
      seats: 4,
      engine: "4.0L V8",
      luggage: "2 Bags"
    },
    price: 28999
  },
  {
    id: 3,
    name: "MERCEDES G63 G WAGON",
    brand: "Mercedes",
    category: "Suv",
    image: "/images/mercedes.png",
    specs: {
      seats: 4,
      engine: "4.0L V8",
      luggage: "4 Bags"
    },
    price: 28999
  },
  {
    id: 4,
    name: "TESLA MODEL S PLAID",
    brand: "Tesla",
    category: "Sedan",
    image: "/images/image_1.jpg",
    specs: {
      seats: 5,
      engine: "Tri-Motor",
      luggage: "3 Bags"
    },
    price: 35000
  },
  {
    id: 5,
    name: "RANGE ROVER SPORT",
    brand: "Land Rover",
    category: "Suv",
    image: "/images/range_rover_suv.png",
    specs: {
      seats: 5,
      engine: "3.0L V6",
      luggage: "5 Bags"
    },
    price: 22999
  }
];
