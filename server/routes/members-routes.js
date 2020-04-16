var express = require('express')
var router = express.Router()
var mongoClient = require('../mongo/mongo-client');
var ObjectId = require('mongodb').ObjectID;

router.get('/', (req, res) => {
  try {
      const data = mongoClient.GetMembers();
      data.then(members => res.json(members));

  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

router.get('/:id', (req, res) => {
  try {
    let id = ObjectId(req.params.id);
      const data = mongoClient.GetMember(id);
      data.then(member => {
        res.json(member);
      });

  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

router.delete('/:id', (req, res) => {
  try {
    let id = ObjectId(req.params.id);
    mongoClient.DeleteMember(id);
    res.send('Record deleted successfully!')    
  } catch (error) {
    throw new Error(error)
  }
});

router.put('/', (req, res) => {
  try {
    console.log(req.body)
    let id = ObjectId(req.body._id);
    req.body._id = id;
    mongoClient.UpdateMember(req.body)    
    res.send('Member updated successfully')
  } catch (error) {
    console.log(error)
  }
})

router.post('/', (req, res) => {
  try {
    let id = ObjectId(req.params._id);
    req.body._id = id;
    mongoClient.AddMember(req.body)    
    res.send('Member added successfully')
  } catch (error) {
    res.statusCode(500);
    res.statusMessage('Something went wrong! Please try again!')  
  }
})


module.exports = router