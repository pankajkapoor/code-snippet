const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')                            // this connect method returns a promise
    .then(()=>console.log('Connect to MongoDb...'))
    .catch(err => console.log('Could not connect to mongoDB', err));


const courseSchema=new mongoose.Schema({
    name:String,
    category:{
        type: String,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course',courseSchema);


async function createCourse(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['frontend','backend'],
        isPublished:true,
        price:16 
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

async function getCourse(){

    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
            // // starts with Mosh
            // .find({ author: /^Mosh/})
            
            // //Ends with Hamedani
            // .find({author: /Hamedani$/i})

            // // contain Mosh
            // .find({author: /.*Mosh.*/i})
            // .find()
            // .or([{author: 'Mosh'},{isPublished: true}]) // 'and' is same as or
            
            // .find({auther: 'Mosh', isPublished: true})
            // .find({price: {$gte:10, $lte: 20}})
            // .find({price:{ $in: [10,15,20]}})
            .limit(10)
            .sort({name: 1})   // 1 indicates ascending order and -1 indicate desending order .sort("name") ascending OR .sort("-name") descending
            .select({name: 1,tags: 1});  //this query gives name and tags only    .select('name tags')
    console.log(courses);
}

// getCourse();
