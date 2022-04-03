import express from 'express';
import fs from 'fs';

const fsp = fs.promises;

const app = express();

app.get('/', (req, res) => {
  fsp.readFile('./data/hello.txt', 'utf8')
    .then((file) => {
      console.log(file);
      return fsp.writeFile('./data/hello2.txt', file, 'utf-8');
      // .then(() => {
      //   console.log('sucuss2');
      // })
      // .catch((error2) => console.error(error2));
    })
    .then((resultFromSecondPromise) => {
      console.log('sucuss2 from promise chain', resultFromSecondPromise);
    })
    .catch((error) => {
      console.log(error);
    });

  // za pomocą callbacka
  // fs.readFile('./data/hello.txt', 'utf8', (error, data) => {
  //   if (error) {
  //     console.log(error);

  //     return;
  //   }
  //   fs.writeFile('./data/hello2.txt', data, 'utf8', (error2, data2) => {
  //     if (error2) {
  //       console.log(error2);
  //     }
  //     console.log('succuss');
  //   });
  //   console.log(data);
  // });

  res.send('Hello World A');
});

app.listen(5000, () => {
  console.log('App is running on port 5000');
});
