(function () {
    var clientForm = document.getElementById("clientForm");
    if(clientForm){
        let generator = function() {
            let insertStringWithIndex = (stringToBeinserted, index, insertString) => {
                return stringToBeinserted.slice(0, index) + insertString + stringToBeinserted.slice(index);
            }
            let inputText = document.getElementById('inputText');
            let insertString = document.getElementById('insertString');
            let times = document.getElementById('times');
            let spacing = document.getElementById('spacing');
            let result = document.getElementById('clientResult');
            let clientFormControl = document.getElementById('clientForm');
            //console.log("clientForm");
            var resultContainer = document.getElementById("result-container");
            var resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];
            var errorContainer = document.getElementById("error-container");
            var errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

            clientFormControl.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log('submit detected');
                try{
                    errorContainer.classList.add("hidden");
                    resultContainer.classList.add("hidden");
                    let time = parseInt(times.value);
                    let text = inputText.value;
                    let space = parseInt(spacing.value);
                    let insert = insertString.value;
                    let len = insert.length;
                    let result=inputText.value;
                    let index = 0;
                    if (time<1 || time>25) throw "times should be in the range of [1,25]";
                    if (space<1 || space>25) throw "spacing should be in the range of [1,25]";
                    for (let i = 0; i < time; i++) {
                        if(i*space>text.length) 
                            break;
                        index += space;
                        result = insertStringWithIndex(result, index, insert);
                        index += len;
                    }
                    resultTextElement.textContent = result;
                    resultContainer.classList.remove("hidden");
                }catch (e) {
                    var message = typeof e === "string" ? e : e.message;
                    errorTextElement.textContent = e;
                    errorContainer.classList.remove("hidden");
                };
            });

        };
        generator();
    }
})();