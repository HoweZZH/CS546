

var cal=module.exports={
    sumOfSquares: function(num1,num2,num3){
        if(arguments.length!=3) throw new Error("the number of arguments should be 3");
        if(typeof num1!="number"||typeof num2!="number"||typeof num3!=="number") 
            throw new Error("the arguments should be number");
        return Math.pow(num1,2)+Math.pow(num2,2)+Math.pow(num3,2);
    },
    sayHelloTo: function(firstName, lastName, title){
        if(arguments.length<=0||arguments.length>3) throw new Error("the number of arguments should be 1-3");
        if(firstName)
        switch(arguments.length){
             case 0: 
                throw new Error("the number of arguments should be 1-3");
            case 1: 
                console.log("Hello, "+firstName+"!");
                break;
            case 2: 
                console.log("Hello, "+firstName+" "+lastName+". I hope you are having a good day!");
                break;
            case 3:
                console.log("Hello, "+title+" "+firstName+" "+lastName+"!"+" Have a good evening!");
            default:
                return;
        }
    },
    cupsOfCoffee: function(howManyCups){
        if(arguments.length!=1) throw new Error("the number of argument should be 1");
        if(!Number.isInteger(howManyCups)) throw new Error("the argument should be an Integer");
        if(howManyCups<=0) throw new Error("Please provide a positive number")
        for(let i=howManyCups;i>0;i--){
            let j="cups";
            if(i-1==1) j="cup";
            if(i>1)
                console.log(i+" cups of coffee on the desk! "+i+" cups of coffee!\n"+
                       "Pick one up, drink the cup, "+(i-1)+" "+j+ " of coffee on the desk!\n");
            else
                console.log("1 cup of coffee on the desk! 1 cup of coffee!\n"+
                            "Pick it up, drink the cup, no more coffee left on the desk!");
        }
    },
    countOccurrencesOfSubstring: function(fullString,substring){
        if(arguments.length!=2) throw new Error("the number of arguments should be 2");
        if(!fullString||!substring) throw new Error("missing valid argument")
        if(typeof fullString !='string'||typeof substring !='string') throw new Error("arguments type should be string");
        let pos=0,step=1,n=0;
        while (true) {
            pos = fullString.indexOf(substring, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }
        return n;
    },
    randomizeSentences: function(paragraph){
        if(arguments.length!=1) throw new Error("the number of arguments should be 1");
        if(!paragraph) throw new Error("missing valid argument")
        if(typeof paragraph !='string') throw new Error("argument type should be string");
        var sentences=paragraph.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        function shuffle(array) {
          var currentIndex = array.length, temp, randomIndex;
          while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
          }
            return array;  
        }
        sentences=shuffle(sentences);
        return sentences.join(" ");
    }
}
console.log("test: \n");
var test1 = cal.sumOfSquares(5,3,10);
console.log(test1);
console.log("\n");
//console.log(cal.sumOfSquares("sdf",2,4));
cal.sayHelloTo("Phil");
cal.sayHelloTo("Phil","Barresi");
cal.sayHelloTo("Phil","Barresi","Mr.");
//cal.sayHelloTo("sd","sd","sdf","cv");
console.log("\n");
cal.cupsOfCoffee(5);
console.log("\n");
console.log(cal.countOccurrencesOfSubstring("hello world", "o"));
console.log(cal.countOccurrencesOfSubstring("Helllllllo, class!", "ll"));
//console.log(cal.countOccurrencesOfSubstring(009, "ll"));
console.log("\n");
console.log(cal.randomizeSentences("Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations."));
//console.log(cal.randomizeSentences(99));

