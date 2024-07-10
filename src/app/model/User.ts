import mongoose,{Schema ,Document} from "mongoose";


export interface Message extends Document{
    content : string ;
    createdAt : Date

}

const MessageSchema : Schema<Message> = new Schema({
    content:{
        type : String,
        required :true     
    },

    createdAt :{
        type:Date,
        required :true,
        default: Date.now
    }

})
export interface User extends Document{
    UserName : string ;
    email :string;
    password :string;
    verifycode :string;
    verifycodeExpiry: Date;
    isverified : boolean;
    isAccepting : boolean;
    messages : Message[]

}

const  UserSchema : Schema<User> = new Schema({
    UserName:{
        type : String,
        required :[true,"username is required"]  ,
        trim :true ,
        unique :true
    },

    email:{
        type : String,
        required :[true,"email is required"]  ,
        unique :true,
        match:[/.+\@.+\..+/,'please use a valid email address']
    },
    password:{
        type : String,
        required :[true,"password is required"]  ,
    },
    verifycode:{
        type : String,
        required :[true,"verifycode is required"]  ,
    },
    verifycodeExpiry:{
        type : Date,
        required :[true,"verify code Expiry is required"]  ,
    },
    isverified:{
        type : Boolean,
        default : false ,
    },
    isAccepting:{
        type : Boolean,
        default : true ,
    },

    messages : [MessageSchema]
})


const UserModel =(mongoose.models.User as mongoose.
    Model<User>) || mongoose.model<User>("User",UserSchema)


    export default UserModel; 
