
console.log('Hello world')

const TIME_WAIT = 1000;
const MSG ='HEll'

const wait = (time, message)=>{
  return new Promise((resolve, reject)=> {
    setTimeout(()=>{
      if(time>5000){
        reject('spaliles')
      }
      resolve(message)
    }, time)
  })
}
console.log('Przed promise');

//Promise hell - gąsiennice

// wait(TIME_WAIT, MSG)
// .then(response=>{
//   console.log(response);
//   wait(2000, 'kawa gotowa')
//   .then(response2=> {
//     console.log(response2);
//   })
// })
// .catch((error)=>{
//   console.error(error);
// });

console.log('Po promise');
//console.log(wait());

//promise chaining 
// wait(TIME_WAIT, MSG)
// .then(response=>{
//   console.log(response);
//   return wait(6000, 'kawa gotowa').catch((error2)=>{console.log('error2', error2)});
  
// })
// .then(response2=> {
//   console.log(response2);
// })
// .catch((error)=>{
//   console.error(error);
// });


// const fn = async ()=> {
//   try {
//       await watch(2000, 'fffffff');
//       await watch(3000, 'ffrrrrrrrrrrrfffff');
//   }catch(error){
//     console.log(error)
//   }
// }
// fn();

const carList = document.querySelector('#carList');
console.log(carList);
fetch('http://localhost:3003/cars')
  .then(response=> {
    // console.log(response);
    return response.json(); //zwroc sama odpowiedz
  })
  .then(data=> {
    console.log(data);

    
    data.forEach(car=> {
      //console.log(car);
      carList.innerHTML += `<li>${car.Name}</li>`
    })
    


  })
  .catch(error=> {
    console.log('Not found response',error);
  })