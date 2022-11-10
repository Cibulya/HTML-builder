const fs = require('fs')
const path = require('path');




// const stylesLocation = path.join(__dirname, 'styles');

// const pathTobundleCss = path.join(__dirname, 'project-dist', 'bundle.css');

// const writebleStream =  fs.createWriteStream(pathTobundleCss);


// fs.promises.readdir(stylesLocation)
  
//   .then(async data => {

//     for (let i = 0; i < data.length; i++){

//       const files = await fs.promises.readdir(stylesLocation);

//       const filesPaths = path.join(stylesLocation, files[i]);

//       console.log(files[i])
      
//       if (files[i].includes('css')) {

//         const readStr = fs.createReadStream(path.join(stylesLocation, path.basename(filesPaths)));

//         readStr.on('data', data => {

//           writebleStream.write(data.toString()+'\n')
//         })
//       }
//     }
//   })
//   .catch(err => {
//     console.log(err)
//   })

const mergeStyles = async () => {

  try {
    const stylesLocation = path.join(__dirname, 'styles');

    const pathTobundleCss = path.join(__dirname, 'project-dist', 'bundle.css');

    const writebleStream = fs.createWriteStream(pathTobundleCss);

    fs.promises.readdir(stylesLocation)
  
      .then(async data => {

        for (let i = 0; i < data.length; i++) {

          const files = await fs.promises.readdir(stylesLocation);

          const filesPaths = path.join(stylesLocation, files[i]);

          console.log(files[i])
      
          if (files[i].includes('css')) {

            const readStr = fs.createReadStream(path.join(stylesLocation, path.basename(filesPaths)));

            readStr.on('data', data => {

              writebleStream.write(data.toString() + '\n')
            })
          }
        }
      })

  }
  catch (err) { }
};

mergeStyles();