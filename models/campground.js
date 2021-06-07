const mongoose = require('mongoose');
const { campgroundSchema } = require('../Schemas');
const Review = require('./review');
const Schema = mongoose.Schema;

//including virtuals when converting to json
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload','/upload/w_200')
});

const CampgroundSchema = new Schema({
    title: String,  
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates:{
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
},opts);

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

//for the clustermap- a virtual of properties so we can address it everywhere
CampgroundSchema.virtual('properties.popUpMarkUp').get(function () {
    return `<h6>${this.title}</h6><a href="/campgrounds/${this._id}">View campground</a>`
});

module.exports = mongoose.model('Campground', CampgroundSchema);