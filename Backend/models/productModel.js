const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },

    },],
    category:{
        type:String,
        required:[true,"Please enter Product category"],
        
    },
    Stock:{
        type:Number,
        required:[true,"Please enter Product stock"],
        maxLength:[4,"stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    // type 'mongoose.Schema.ObjectId'. This means it will store the unique identifier (ObjectId) of the user who wrote the post.
    reviews:[
        {   user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
             },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Product",productSchema);
