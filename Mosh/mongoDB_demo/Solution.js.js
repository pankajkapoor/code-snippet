const express = require('express');
const app = express()
const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
        .then(()=> console.log("Database connected"))
        .catch(err => console.log('Could not connect to mongoDB', err))

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const course = mongoose.model("course",courseSchema);


/////////////////----------------------- Exercise 1

    // async function displayCourses(){

    //     return await course.find()
    //                                 .select({name:1 , author: 1})
    //                                 .sort({ name: 1})

    // }

    // async function run(){
    //     const courses= await displayCourses();
    //     console.log(courses);
    // }

    // run();


///////////////////------------------------- Excercise 2

    // async function displayCourses(){

    //     return await course.find({isPublished:true})
    //                        .or([{ tags: 'frontend'}, { tags: 'backend'}])
    //                        .find({ isPublished: true, tags:{ $in: ['backend', 'frontend']}})
    //                        .select({name:1 , author: 1})
    //                        .sort({ price: -1})

    // }

    // async function run(){
    //     const courses= await displayCourses();
    //     console.log(courses);
    // }

    // run();

///////////////////------------------------- Excercise 3

async function displayCourses(){

return await course.find({isPublished:true})
                   .or([{price:{$gte: 15}},{name: /.*by.*/i}])
                   .select('name author price')
                   .sort({ price: -1})

}

async function run(){
    const courses= await displayCourses();
    console.log(courses);
}

run();