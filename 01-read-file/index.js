// решение с туториала
// const fs = require('fs');
// const path = require('path');
// const fileLocation = path.join(__dirname, 'text.txt');
// const stream = new fs.createReadStream(fileLocation);
// stream.pipe(process.stdout)


//мое решение
const fs = require('fs');
const path = require('path');
const rs = fs.createReadStream(path.join(__dirname,'text.txt'));
rs.pipe(process.stdout);