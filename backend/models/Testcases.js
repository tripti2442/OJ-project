const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    admin_name:{
        type: String,
        
    },
    problem_id:{
        type: String,
        
    },
    input:{
        type: String,
        
    },
    expectedOutput:{
        type: String,
        

    }

});

module.exports=mongoose.model('Testcase',userSchema); 