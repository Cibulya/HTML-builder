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

    const readAndReplace = async () => {
      const readComps = await fs.promises.readdir(compPath, { encoding: 'utf-8' });
      for (let i = 0; i < readComps.length; i++){
        let filePath = path.join(compPath, `${readComps[i]}`);
        let fileName = path.basename(`${readComps[i]}`, '.html');
        let fileInner = (await fs.promises.readFile(filePath, { encoding: 'utf-8' })).toString();
        const readTempl = await fs.promises.readFile(htmlTempl, { encoding: 'utf-8' });
        // const writeIndex = await fs.promises.writeFile(pathToIndex, readTempl); //create index.html
        const indexInner = await fs.promises.readFile(pathToIndex, { encoding: 'utf-8' });
        const newIndex = indexInner.replace(`{{${fileName}}}`, fileInner);
        let fileIndex = await fs.promises.writeFile(path.join(pathToDist, 'index.html'), newIndex);
        i++;
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







