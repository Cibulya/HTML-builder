
let fs = require('fs/promises')
let path = require('path');

const copyFiles = async () => {
  const copyFolder = path.join(__dirname, 'files-copy');
  try {
    for (const file of await fs.readdir(copyFolder)) {
      await fs.unlink(path.join(copyFolder, file));
    }
  }
  catch (err) {
  }
  const createNewFolder = async () => await fs.mkdir(copyFolder, { recursive: true });
  createNewFolder();
  const sourceFolder = path.join(__dirname, 'files');
  const files = await fs.readdir(sourceFolder);
  for (let i = 0; i < files.length; i++){
    fs.copyFile(path.join(sourceFolder, files[i]), path.join(copyFolder, files[i]));
  };
}
copyFiles();