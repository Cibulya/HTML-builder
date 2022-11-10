const fs = require('fs');
const path = require('path');


const pathToDist = path.join(__dirname, 'project-dist');//path to dist folder





const writeIndexHtml = async() => {
  
  try {
    await fs.promises.mkdir(pathToDist, { recursive: true });//create dist folder
    const compPath = path.join(__dirname, 'components');
    const htmlTempl = path.join(__dirname, 'template.html');
    // console.log(htmlTempl);
    const pathToIndex = path.join(pathToDist, 'index.html');
    let readTempl = await fs.promises.readFile(htmlTempl, { encoding: 'utf-8' });
    let writeIndex = await fs.promises.writeFile(pathToIndex, readTempl); //create index.html
    async function readAndReplace() {
      const readComps = await fs.promises.readdir(compPath, { encoding: 'utf-8' });
      for (let i = 0; i < readComps.length; i++) {
        let filePath = path.join(compPath, `${readComps[i]}`);
        let fileName = path.basename(`${readComps[i]}`, '.html');
        let fileInner = (await fs.promises.readFile(filePath, { encoding: 'utf-8' }));

        let indexInner = await fs.promises.readFile(pathToIndex, { encoding: 'utf-8' });
        let newIndex = indexInner.replace(`{{${fileName}}}`, fileInner);


        await fs.promises.writeFile(pathToIndex, newIndex);
      }
    }
    readAndReplace();
  }

  catch(err){}
}
writeIndexHtml();






const stylesLocation = path.join(__dirname, 'styles');

const pathTobundleCss = path.join(__dirname, 'project-dist', 'style.css');

const writebleStream = fs.createWriteStream(pathTobundleCss);

const filesList = fs.promises.readdir(stylesLocation);

filesList
  .then(async data => {

    for (let i = 0; i < data.length; i++) {

      const files = await fs.promises.readdir(stylesLocation);

      const filesPaths = path.join(stylesLocation, files[i]);

      // console.log(files[i])

      if (files[i].includes('css')) {

        const readStr = fs.createReadStream(path.join(stylesLocation, path.basename(filesPaths)));

        readStr.on('data', data => {

          writebleStream.write(data.toString() + '\n')
        })
      }
    }
  })
  .catch(err => console.log(err))





// const assetsDistPath = path.join(pathToDist, 'assets');

// const newAssets =  fs.promises.mkdir(assetsDistPath);
// const assetsSourcePath = path.join(__dirname, 'assets');



// files
//   .then(async data => {
//     for (let i = 0; i < data.length; i++){
//      await fs.promises.readdir(assetsSourcePath);
//       const file = await fs.promises.readdir(assetsSourcePath);
//       const filesPaths = path.join(assetsSourcePath, file[i])
      
//       console.log(filesPaths)
      
//     }
// })
// .catch(err=>console.log(err))

async function copyAssets() {
  try {
    const assetsDistPath = path.join(pathToDist, 'assets');
    const newAssets =  await fs.promises.mkdir(assetsDistPath);
    const assetsSourcePath = path.join(__dirname, 'assets');
    const files =  fs.readdir(assetsSourcePath)
    for (let i = 0; i < assetsSourcePath.length; i++){
      console.log(files)
    }
  }
  catch {
    
  }
}
copyAssets();