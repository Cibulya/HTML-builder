const fs = require('fs');
const path = require('path');



const secretFolder = path.resolve(__dirname, 'secret-folder');

fs.readdir(secretFolder, (err, data) => {
  if (err) console.log(err.message);
  data.forEach(file => {
    const pathToFile = path.resolve(secretFolder, `${file}`);
    fs.stat(pathToFile, (err, stats) => {
      if (err) {
        console.log(err)
      } else {
        if (stats.isFile()){
          const fileExtension = path.extname(pathToFile);
          console.log(path.basename(pathToFile, fileExtension) + '  ' + fileExtension.slice(1) + '  ' + Math.ceil(stats.size / 1024) + 'KB');
        }
      }
    })
  })
})