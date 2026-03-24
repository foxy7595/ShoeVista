import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Products from './models/productModel.js';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:5001';

const sampleProducts = [
    // Adidas - Men
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Ultraboost 22 Running Shoes",
        rating: 4.5,
        reviews: 2453,
        sellPrice: 180,
        orders: "5K+",
        mrp: "200",
        discount: 10,
        category: "men"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Forum Low Lifestyle Sneakers",
        rating: 4.3,
        reviews: 1823,
        sellPrice: 110,
        orders: "3K+",
        mrp: "120",
        discount: 8,
        category: "men"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Stan Smith Classic Sneakers",
        rating: 4.7,
        reviews: 5621,
        sellPrice: 95,
        orders: "10K+",
        mrp: "100",
        discount: 5,
        category: "men"
    },
    // Adidas - Women
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Alphaboost V1 Running Shoes",
        rating: 4.6,
        reviews: 1234,
        sellPrice: 160,
        orders: "2K+",
        mrp: "180",
        discount: 11,
        category: "women"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Gazelle Indoor Sneakers",
        rating: 4.8,
        reviews: 3456,
        sellPrice: 100,
        orders: "8K+",
        mrp: "110",
        discount: 9,
        category: "women"
    },
    // Nike - Men
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Air Force 1 '07 White",
        rating: 4.9,
        reviews: 8923,
        sellPrice: 115,
        orders: "25K+",
        mrp: "130",
        discount: 12,
        category: "men"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Air Max 90 Essential",
        rating: 4.6,
        reviews: 4521,
        sellPrice: 140,
        orders: "7K+",
        mrp: "160",
        discount: 13,
        category: "men"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Pegasus 40 Running Shoes",
        rating: 4.7,
        reviews: 6234,
        sellPrice: 130,
        orders: "12K+",
        mrp: "150",
        discount: 13,
        category: "men"
    },
    // Nike - Women
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Air Force 1 '07 Women's",
        rating: 4.8,
        reviews: 7234,
        sellPrice: 115,
        orders: "15K+",
        mrp: "130",
        discount: 12,
        category: "women"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Invincible 3 Running Shoes",
        rating: 4.5,
        reviews: 2134,
        sellPrice: 180,
        orders: "4K+",
        mrp: "200",
        discount: 10,
        category: "women"
    },
    // Puma - Men
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "Suede Classic Sneakers",
        rating: 4.4,
        reviews: 3456,
        sellPrice: 80,
        orders: "6K+",
        mrp: "90",
        discount: 11,
        category: "men"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "RS-X Effers Sneakers",
        rating: 4.3,
        reviews: 1876,
        sellPrice: 120,
        orders: "3K+",
        mrp: "140",
        discount: 14,
        category: "men"
    },
    // Puma - Women
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "Carina Lifestyle Sneakers",
        rating: 4.6,
        reviews: 2890,
        sellPrice: 75,
        orders: "5K+",
        mrp: "85",
        discount: 12,
        category: "women"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "Suede Classic Women's",
        rating: 4.5,
        reviews: 2134,
        sellPrice: 85,
        orders: "4K+",
        mrp: "95",
        discount: 11,
        category: "women"
    },
    // Skechers - Men
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Max Cushioning Elite Sneakers",
        rating: 4.5,
        reviews: 3456,
        sellPrice: 110,
        orders: "5K+",
        mrp: "125",
        discount: 12,
        category: "men"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Go Walk Arch Fit Sneakers",
        rating: 4.7,
        reviews: 5678,
        sellPrice: 90,
        orders: "9K+",
        mrp: "100",
        discount: 10,
        category: "men"
    },
    // Skechers - Women
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Max Cushioning Elite Women's",
        rating: 4.6,
        reviews: 2345,
        sellPrice: 110,
        orders: "4K+",
        mrp: "125",
        discount: 12,
        category: "women"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Go Walk Joy Walking Shoes",
        rating: 4.8,
        reviews: 4567,
        sellPrice: 75,
        orders: "7K+",
        mrp: "85",
        discount: 12,
        category: "women"
    },
    // Kids - Boys
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Altaswift 22 Kids Running",
        rating: 4.5,
        reviews: 890,
        sellPrice: 60,
        orders: "2K+",
        mrp: "70",
        discount: 14,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Dunk Low Retro SE Kids",
        rating: 4.7,
        reviews: 1234,
        sellPrice: 75,
        orders: "3K+",
        mrp: "85",
        discount: 12,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "RS-X Kids Sneakers",
        rating: 4.4,
        reviews: 678,
        sellPrice: 65,
        orders: "1K+",
        mrp: "75",
        discount: 13,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Go Walk Kids Sneakers",
        rating: 4.6,
        reviews: 923,
        sellPrice: 55,
        orders: "2K+",
        mrp: "65",
        discount: 15,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Duramo SL Kids Running",
        rating: 4.3,
        reviews: 567,
        sellPrice: 50,
        orders: "1K+",
        mrp: "60",
        discount: 17,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Revolution 6 Kids Running",
        rating: 4.5,
        reviews: 890,
        sellPrice: 55,
        orders: "2K+",
        mrp: "65",
        discount: 15,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "Future Rider Kids Sneakers",
        rating: 4.6,
        reviews: 445,
        sellPrice: 60,
        orders: "1K+",
        mrp: "70",
        discount: 14,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Stamina Kids Sneakers",
        rating: 4.4,
        reviews: 678,
        sellPrice: 52,
        orders: "1K+",
        mrp: "60",
        discount: 13,
        category: "kids"
    },
    // Kids - Girls
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Altaswift 22 Girls Running",
        rating: 4.6,
        reviews: 756,
        sellPrice: 60,
        orders: "1K+",
        mrp: "70",
        discount: 14,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Air Max 90 SE Girls",
        rating: 4.8,
        reviews: 1567,
        sellPrice: 85,
        orders: "2K+",
        mrp: "95",
        discount: 11,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "Carina Girls Sneakers",
        rating: 4.5,
        reviews: 543,
        sellPrice: 55,
        orders: "1K+",
        mrp: "65",
        discount: 15,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Twinkle Toes Girls Sneakers",
        rating: 4.7,
        reviews: 1234,
        sellPrice: 50,
        orders: "3K+",
        mrp: "60",
        discount: 17,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Adidas",
        title: "Grand Court Kids Girls",
        rating: 4.4,
        reviews: 634,
        sellPrice: 55,
        orders: "1K+",
        mrp: "65",
        discount: 15,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Nike",
        title: "Court Vision Low Girls",
        rating: 4.6,
        reviews: 987,
        sellPrice: 60,
        orders: "2K+",
        mrp: "70",
        discount: 14,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Puma",
        title: "Mayze Classic Girls",
        rating: 4.5,
        reviews: 456,
        sellPrice: 58,
        orders: "1K+",
        mrp: "68",
        discount: 15,
        category: "kids"
    },
    {
        img: `${BASE_URL}/shoe.png`,
        brand: "Skechers",
        title: "Energy Lights Girls",
        rating: 4.8,
        reviews: 1456,
        sellPrice: 65,
        orders: "3K+",
        mrp: "75",
        discount: 13,
        category: "kids"
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await Products.deleteMany();
        console.log('Cleared existing products');

        // Insert sample products
        await Products.insertMany(sampleProducts);
        console.log('Sample products inserted successfully');

        console.log(`Total products: ${sampleProducts.length}`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
