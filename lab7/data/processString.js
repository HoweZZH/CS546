let exportedMethods = {
    insertStr(stringToBeinserted,insertString,spacing,times){
        if(typeof stringToBeinserted!="string") throw "Textarea Must be a String";
        if (!stringToBeinserted) throw "Textarea Must be provided";
        if(typeof insertString!="string") throw "insertString Must be a String";
        if (!insertString) throw "insertString Must be provided";
        if (typeof spacing!="number") throw "spacing Must be a Number";
        if (!spacing) throw "spacing Must be provided"
        if (typeof times!="number") throw "times Must be a Number";
        if (!times) throw "times Must be provided"
        if (times<1 || times>25) throw "times should be in the range of [1,25]";
        if (spacing<1 || spacing>25) throw "spacing should be in the range of [1,25]";
        //if (times*spacing>stringToBeinserted.length) throw "times*spacing should smaller than or equal to Textarea length"
        let insertStringWithIndex = (stringToBeinserted, index, insertString) => {
               return stringToBeinserted.slice(0, index) + insertString + stringToBeinserted.slice(index);
            }
        let result=stringToBeinserted;
        let len=insertString.length;
        let index=0;
        for (let i = 0; i < times; i++) {
                    if(i*spacing>stringToBeinserted.length) 
                        break;
                    index += spacing;
                    result = insertStringWithIndex(result, index, insertString);
                    index += len;
            }
        return result;
    }
}

module.exports = exportedMethods;