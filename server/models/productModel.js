import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        min: 0
    },
    sellPrice: {
        type: Number,
        required: true
    },
    orders: {
        type: String,
        default: '0'
    },
    mrp: {
        type: String,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Indexes for better query performance
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ brand: 1, category: 1 });
productSchema.index({ title: 'text', brand: 'text' }); // For search functionality

const Products = mongoose.model("Product", productSchema);

export default Products;
