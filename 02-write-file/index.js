const fs = require('fs');
const path = require('path');
const readline = require('readline');

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const newFile = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));



readLine.on('SIGINT', () => {
  console.log('\n', 'До свидания');
  readLine.close();
  return;
});



function write() {
  readLine.question('Напишите что-то  ', text => {
    console.log(text);
    if (text.toLocaleLowerCase() === 'exit') {
      console.log('\n До свидания');
      readLine.close();
      return;
    }
    newFile.write(text + '\n', err => {
      if (err) {
        console.log(err.message)
      } else {
        write();
      }
    });
  });
}
write();