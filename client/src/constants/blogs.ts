export interface Blog {
  id: number;
  title: string;
  date: string;
  tag: string;
  image: string;
  youtube_link?: string;
}

export const BLOGS_DATA: Blog[] = [
  {
    id: 1,
    title: "Ultimate Guide to Luxury Car Rentals",
    date: "December 9, 2024",
    tag: "Mercedes",
    image: "/images/image_1.jpg",
    youtube_link: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Best Road Trips to Experience in 2025",
    date: "December 9, 2024",
    tag: "G Wagon",
    image: "/images/image_2.jpg",
  },
  {
    id: 3,
    title: "How to Choose the Perfect Rental Car",
    date: "December 9, 2024",
    tag: "G Wagon",
    image: "/images/mercedes.png",
  },
  {
    id: 4,
    title: "Top Premium Cars for Weekend Getaways",
    date: "December 9, 2024",
    tag: "G Wagon",
    image: "/images/range_rover_suv.png",
  },
  {
    id: 5,
    title: "Why Luxury Car Rentals Are Trending",
    date: "December 9, 2024",
    tag: "G Wagon",
    image: "/images/car_preview.jpg",
  },
  {
    id: 6,
    title: "Tips for a Smooth Car Rental Experience",
    date: "December 9, 2024",
    tag: "G Wagon",
    image: "/images/car_preview_2.jpg",
  },
  {
    id: 7,
    title: "Explore Cities in Style With Premium Rides",
    date: "December 9, 2024",
    tag: "Ford Mustang GT",
    image: "/images/image_1.jpg",
  },
  {
    id: 8,
    title: "Most Popular Sports Cars for Rent",
    date: "December 9, 2024",
    tag: "Ford Mustang GT",
    image: "/images/image_2.jpg",
  },
  {
    id: 9,
    title: "Travel Smarter With Luxury Vehicle Rentals",
    date: "December 9, 2024",
    tag: "Ford Mustang GT",
    image: "/images/mercedes.png",
  },
  {
    id: 10,
    title: "Best Cars for Family Travel & Long Drives",
    date: "December 9, 2024",
    tag: "G Wagon",
    image: "/images/range_rover_suv.png",
  },
  {
    id: 11,
    title: "How to Save Money on Premium Car Rentals",
    date: "December 9, 2024",
    tag: "Ford Mustang GT",
    image: "/images/car_preview.jpg",
  },
  {
    id: 12,
    title: "Best Convertible Cars for Summer Drives",
    date: "December 9, 2024",
    tag: "Ford Mustang GT",
    image: "/images/car_preview_2.jpg",
  }
];

export const BLOG_TAGS = [
  "All",
  "Mercedes",
  "Tesla",
  "Land Rover",
  "Ford Motor Company",
  "G Wagon"
];
