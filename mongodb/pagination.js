const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')                            // this connect method returns a promise
    .then(()=>console.log('Connect to MongoDb...'))
    .catch(err => console.log('Could not connect to mongoDB', err));


const courseSchema=new mongoose.Schema({
    name:{                 // This validation is applicable only at the mongoose level mongodb have nothing do with it.
        type: String,     // Mongoose check validation of data and if data is valid then it stores data in the mongodb
        required: true,   // otherwise reject it.
        minlength:5,
        maxlength:255,
        // match: /pattern/     // here we can pass a regular expression
    },
    category:{
        type: String,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length >0;
            },
            message: 'A course should have at least one tag.' 
        }
    },
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price:{
        type: Number,
        required: function() { return this.isPublished;},
        min: 10,   // Same for 
        max: 230   // Date
    }
});

const Course = mongoose.model('Course',courseSchema);





///////////-----########## Implemantation of Pagination #######------///////////
async function getCourse2(){

    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    
    const courses = await Course
            .find({auther: 'Mosh', isPublished: true})
            .skip((pageNumber-1)*pageSize)
            .limit(pageSize)
            .sort({name: 1})   // 1 indicates ascending order and -1 indicate desending order
            .select({name: 1,tags: 1});  //this query gives name and tags only
    console.log(courses);
}

getCourse2();