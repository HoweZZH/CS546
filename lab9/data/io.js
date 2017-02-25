const fs = require('fs');
const path = __dirname + "/notes.json"

let read = () => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', function(err, data) {
			if (err) {
				reject(err); 
				return;
			}
			var obj = JSON.parse(data);
			resolve(obj);
		});
	})
}

let store = (data) => {
	return new Promise((resolve, reject) => {
		data = JSON.stringify(data, null, 4);
		fs.writeFile(path, data, function(err) {
			if (err) {
				reject(err);
				return;
			}
			resolve("file saved\n" + data);
		});
	})
}

module.exports = {
	read: read,
	store: store
}



