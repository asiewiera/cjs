const express = require('express');

const fs = require('fs');

const fsp = fs.promises;

const router = express.Router();
// const users = [
//   {
//     id: 1,
//     name: 'Agnieszka',
//   },

//   {
//     id: 2,
//     name: 'Jola',
//   },
// ];

/* GET users listing. */
router.get('/', (req, res) => {
  fsp.readFile('./data/users.json', 'utf-8')
    .then((file) => res.send(JSON.parse(file)))
    .catch((error) => res.send(error));
  // res.send(users);
});

/* GET users/{id} listing. */
router.get('/:userId', (req, res) => {
  console.log(req.params);
  const { params } = req;
  console.log('index to send', params);
  fsp.readFile('./data/users.json', 'utf-8')
    .then((file) => {
      const users = JSON.parse(file);
      console.log(users);
      const user = users.find((us) => us.id === parseInt(params.userId, 10));
      // users[index.userId];
      console.log('Sending user', user);
      if (!user) {
        return res.status(404).send({ message: 'No user for selected id' });
      }
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.send('Not Found user');
    });
});

router.post('/', (req, res) => {
  console.log('Req body', req);

  // 1. Odczytaj zawartosc pliku users.json
  // 2. Sparsuj to do obiektu js
  // 3. Uzyj metody push aby dodac obiekt (nadaj mu nowe ID za pomoca uuid)
  // 4. Zapisz plik do pliku users.json
  // 5. Zwroc utworzonego usera z jego ID

  fsp.readFile('./data/users.json', 'utf-8')
    .then((file) => {
      const parsedUsers = JSON.parse(file);
      console.log(parsedUsers);

      const newUserName = req.body.name;
      const newUser = {
        id: parsedUsers[parsedUsers.length - 1].id + 1,
        name: newUserName,
      };
      parsedUsers.push(newUser);
      console.log(parsedUsers);

      return fsp.writeFile('./data/users.json', JSON.stringify(parsedUsers), 'utf-8');
    })
    .then(() => res.send(req.body))
    .catch((error) => {
      console.log(error);
      res.status(404).send({ message: error });
    });

  // fsp.writeFile('./data/users2.json', req.body, 'utf-8')
  //   .then((file) => {
  //     fsp.writeFile(JSON.stringify);
  //     console.log(req.body);
  //     return res.send(JSON.parse(file));
  //   })
  //   .catch((error) => res.send(error));
  // res.send('sent');
});

module.exports = router;
