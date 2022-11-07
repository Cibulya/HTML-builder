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



































// const readFolder = async () => {
//   const secretFolder = path.resolve(__dirname, 'secret-folder');
//   try{
//     const folderFiles = await readdir(secretFolder);
//     folderFiles.forEach((item) => {
//       const pathTofile = path.resolve(secretFolder, item);
//       const itemStats = await stat(pathTofile);
//       if (itemStats.isFile()) {
//         const extension = path.extname(filePath);
//         console.log(path.basename(filePath, extension) + ' - ' + extension.slice(1, extension.length) + ' - ' + stats.size / 1024 + 'Kb');
//       }
//     });
//   } catch (err) {
//     if (err) console.error(err.message);
//   }
// }




// console.log(secretFolder)
// fs.readdir(secretFolder, (err, data) => {
//   if (err) 
//     console.log(err.message);
//     data.forEach(file => {
//       const filePath = path.resolve(secretFolder, file);
//       fs.stat(filePath, (err, stats) => {
//         if (err) {
//           console.log(err.message);
//         } else {
//           if (stats.isFile()) {
//             const extension = path.extname(filePath);
//             console.log(path.basename(filePath, extension) + ' - ' + extension.slice(1, extension.length) + ' - ' + stats.size/1024 + 'Kb');
//           }
//         }
//       })
//     })
//   }
// )

// const removeFileAsync = async (path) => {
//   return new Promise((resolve, reject) => fs.rm(path, (err, data) => {
//     if (err) {
//       return reject(err.message)
//     }
//     resolve()
//   }))
// }
