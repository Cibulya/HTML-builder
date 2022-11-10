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
      const readTempl = await fs.promises.readFile(htmlTempl, { encoding: 'utf-8' });

      const writeIndex = await fs.promises.writeFile(pathToIndex, readTempl); //create index.html
      const indexInner = await fs.promises.readFile(pathToIndex, { encoding: 'utf-8' })
      const readComps = await fs.promises.readdir(compPath, { encoding:'utf-8' })
      readComps.forEach(async file => {
        let filePath = path.join(compPath, `${file}`);
        let fileName = path.basename(`${file}`, '.html');
        let fileInner = (await fs.promises.readFile(filePath, { encoding: 'utf-8' })).toString();
        // console.log(fileInner + '\n')
        let finalData = (await fs.promises.readFile(pathToIndex, { encoding: 'utf-8' }, 'index.html')).toString();
        // console.log(fileInner)
        let a =  finalData.replace(`{{${fileName}}}`, fileInner.toString())
      
        // const finalHtml= await  fs.promises.writeFile(path.join(pathToDist,'index.html'),finalData)
        // console.log(pathToIndex)
        fs.promises.writeFile(pathToIndex, a)
      })
      
      
 

    
    
    }
    readAndReplace()
  }

  catch(err){}
}
writeIndexHtml();














