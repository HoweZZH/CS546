const mongoCollections = require("../config/mongoCollections");
const myInfo = mongoCollections.myInfo;
const file=require("./fileData.js")
module.exports = {
    getMyInfo:function(){
        return file.getFileAsJSON(__dirname+"/myInfoData.json");
    }
}



