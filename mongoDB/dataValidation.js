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
        enum: ['web', 'mobile', 'network'],
        lowercase: true,                      // mongoose will automatically set this property to lowercase
        uppercase: true,
        trim: true                            // removes padding in string
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
        max: 230,   // Date
        get: v=> Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course',courseSchema);


async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Mosh',
        tags: [1],
        isPublished:true,
        price:16.7
    })

    try{
        const result= await course.save(); 
        console.log(result);
    }
    catch(e){
        console.log(e.message); 
    }

}

createCourse()