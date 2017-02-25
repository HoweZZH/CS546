
module.exports={
    createMetrics: function(text){
        return new Promise(function(resolve,reject){
            if(!text) reject("reject! err: text is not provided!")
            var list=text.replace(/[^\w\s]|_/g, "").replace(";","").replace(/\s+/g, " ").split(" ");

            list = list.filter(String);
            
            //console.log(list);
            //1: calculate totalLetters
            var totalLetters=0;
            for(let i=0;i<list.length;i++){
                let word=list[i];
                for(let j=0;j<word.length;j++){
                    if (isLetter(word[j])){
                        totalLetters+=1;
                    }
                }
            }
            //2: calculate totalWords
            var totalWords=list.length;

            //3: calculate uniqueWords
            var wordSet=new Set();
            for(let i=0;i<list.length;i++){
                wordSet.add(list[i].toLowerCase());
            }
            var uniqueWords=wordSet.size;

            //4: calculate longWords
            var longWords=0;
            for(let i=0;i<list.length;i++){
                if(list[i].length>=6) longWords+=1; 
            }

            //5: calculate averageWordLength
            var averageWordLength=0;
            averageWordLength=(totalLetters/list.length + 0.00).toFixed(2);

            //6: calculate textComplexity
            //textComplexity: totalWords/numberOfSentences + (longWords x 100)/totalWords
            var sentences=text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
            var textComplexity=  (totalWords/sentences.length + (longWords * 100)/totalWords).toFixed(2);
            
            //7: calculate wordOccurrences
            wordOccurrences={};
            for(let i=0;i<list.length;i++){
                value=list[i].toLowerCase();
                if(wordOccurrences[value]==undefined) wordOccurrences[value]=1;
                else wordOccurrences[value]+=1;
            }
            resolve({totalLetters:totalLetters, totalWords:totalWords,uniqueWords:wordSet.size,longWords:longWords,
                averageWordLength:averageWordLength, textComplexity:textComplexity,wordOccurrences:wordOccurrences});
        });
    }
};

function isLetter(str) {
  return /^[a-zA-Z()]$/.test(str);
};

