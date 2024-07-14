/*const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    admin_name:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true

    },
    type:{
        type: String,
        required: true
    }

});

module.exports=mongoose.model('Problem',userSchema);*/

const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    admin_name:{
        type: String,
        required: true
    },
    statement:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true

    },
    
    difficulty:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    }

});

module.exports=mongoose.model('Problem',userSchema); 