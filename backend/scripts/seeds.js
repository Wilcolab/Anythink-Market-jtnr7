//TODO: seeds script should come here, so we'll be able to put some data in our local env
require("dotenv").config();

var mongoose = require("mongoose");



mongoose.connect(process.env.MONGODB_URI);

require("../models/User");
require("../models/Item");
require("../models/Comment");
require("../config/passport");


var Item = mongoose.model("Item");
var Comment = mongoose.model("Comment");
var User = mongoose.model("User");

async function saveFakeData(){
    let userId;
    let itemId;

    const users = Array.from(Array(100)).map((_el, i) =>({
            username: `fakename${i}`,
            email:`fakemail${i}@email.com`,
            bio:"fake bio",
            image:"https://picsum.photos/300/300"
    }));

    for ( user of users) {
        const u = new User(user);
        const dbItem = await u.save();

        if(!userId) {
            userId = dbItem._id;
        }
    }

    const items = Array.from(Array(100)).map((_el, i) => ({
            title: `Product${i}`,
            description: "Test description",
            image: "https://picsum.photos/300/300",
            seller: userId
    }));
    for ( item of items) {
        const i = new Item(item);
        const dbItem = await i.save();

        if(!itemId){
            itemId = dbItem._id;
        }
    }
    
const comments = Array.from(Array(100)).map((_el, i) =>({
            body: `comment ${i}`,
            seller: userId,
            item: itemId
    }));

    for ( comment of comments) {
        const c = new Comment(comment);
        await c.save();

    }
}


saveFakeData().then(()=> {
    process.exit();
}).catch(err => {
    console.log('Checkout the error!!', err);
    process.exit();
});






