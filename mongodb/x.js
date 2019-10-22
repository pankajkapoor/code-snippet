


// Trade off between  query performance vs consistency


// using Reference (Normalization) -> CONSISTENCY

let author={
    name: 'Mosh Hamedani'
}

let course ={
    author:'id'
}

// Using Embedded Documents (Denormalization)  -> PERFORMANCE

let course = {
    author:{
        name: 'Mosh Hamedani'
    }
}


// Hybrid

let author={
    name: 'Mosh Hamedani'
    // 50 more properties
}

let course = {
    author:{
        id: 'ref',
        name: 'Mosh'
    }
}