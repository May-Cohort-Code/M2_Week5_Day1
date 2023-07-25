const express = require('express');
const router = express.Router();
const axios = require('axios')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// axios.get('https://swapi.dev/api/people')
// .then((result)=>{
//   console.log(result.data)
// })

// axios.get('https://restcountries.com/v3.1/all')
// .then(result=>{
//   console.log(result.data)
// })

//exercise 1:

//use the rest countries api https://restcountries.com/
//retrieve the information for your countries data from the api
//console.log the countries information

axios.get('https://restcountries.com/v3.1/all')
.then((result)=>{
  // console.log(result.data)
})

router.get('/countries',(req,res)=>{
  axios.get('https://restcountries.com/v3.1/all')
  .then(result=>{
    res.render('countries',{countries:result.data})
  })
})


//CRUD operations for an API

router.get('/characters',(req,res)=>{
  axios.get('https://ih-crud-api.herokuapp.com/characters')
  .then(result=>{
    console.log(result.data)
    res.render('all-characters.hbs',{allCharacters:result.data})

  })
})

router.get('/characters/:id',(req,res)=>{
  const {id} = req.params
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${id}`)
  .then(result=>{
    console.log(result.data)
    res.render('character-details',{character:result.data})
  })
})

router.post('/characters',(req,res)=>{
  console.log(req.body)
  const {name,occupation,weapon} = req.body
  axios.post('https://ih-crud-api.herokuapp.com/characters/',{name,occupation,weapon})
  .then(()=>{
    res.redirect('/characters')
  })
})

router.post('/characters/:id/delete',(req,res)=>{
  axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
  .then(()=>{
    res.redirect('/characters')
  })
})

router.get('/characters/:id/edit',(req,res)=>{
  axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
  .then((result)=>{
    res.render('edit-character',{character:result.data})
  })
})

router.post('/characters/:id/edit',(req,res)=>{
  console.log(req.body)
  axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,req.body)
  .then((result)=>{
    res.redirect('/characters')
  })
})

module.exports = router;
