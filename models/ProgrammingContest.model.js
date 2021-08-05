const mongoose = require('mongoose')
const PCschema = new mongoose.Schema({
    teamName : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    contact : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : false,
    },
    institution : {
        type : String,
        required : false,
    },
    total : {
        type : Number,
        required : true,
    },
    paid : {
        type : Number,
        required : true,
    },
    selected : {
        type : Boolean,
        required : true,
    },
    tshirt : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,
    },
    coachName : {
        type : String,
        required : true,
    },
    firstMemberName : {
        type : String,
        required : true,
    },
    firstMemberEmail : {
        type : String,
        required : true,
    },
    firstMemberContact : {
        type : String,
        required : true,
    },
    firstMembertshirt : {
        type : String,
        required : true,
    },
    secondMemberName : {
        type : String,
        required : true,
    },
    secondMemberEmail : {
        type : String,
        required : true,
    },
    secondMemberContact : {
        type : String,
        required : true,
    },
    secondMembertshirt : {
        type : String,
        required : true,
    },
    leaderName : {
        type : String,
        required : true,
    },
    leaderEmail : {
        type : String,
        required : true,
    },
    leaderContact : {
        type : String,
        required : true,
    },
    leadertshirt : {
        type : String,
        required : true,
    },
})

const ProgrammingContest = mongoose.model("ProgrammingContest",PCschema);
module.exports = ProgrammingContest