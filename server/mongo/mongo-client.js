const mongoClient = require('mongodb').MongoClient;
const constants = require('../constants')
var ObjectId = require('mongodb').ObjectID;

const mongoDbUrl = `mongodb://localhost:${constants.MONGODB_PORT}`

const CreateDBAndCollection = () => {
  mongoClient.connect(mongoDbUrl, (err, client) => {
    if (err) 
    {
      return console.error(err)
    }
    else
    {
      const db = client.db(constants.MONGO_DB_NAME);
      db.createCollection(constants.MEMBER_COLLECITON_NAME);
    }
  })
}

const AddMember = (document) => {
  mongoClient.connect(mongoDbUrl, (err, client) => {
    if (err) 
    {
      throw new Error(err.message)
    }
    else
    {
      const db = client.db(constants.MONGO_DB_NAME);
      db.collection(constants.MEMBER_COLLECITON_NAME).insertOne(document).then(
        console.log('Member created successfully')
      ).catch(error => {
        throw new Error(error.message)
      });
    }
  })
}

const UpdateMember = (document) => {
  // console.log(JSON.stringify(document))
  const query = {"_id": document._id}
  // console.log(query)
  mongoClient.connect(mongoDbUrl, (err, client) => {
    if (err) 
    {
      throw new Error(err.message)
    }
    else
    {
      const db = client.db(constants.MONGO_DB_NAME);
      var newValues = { $set: {"firstname": document.firstname, "lastname": document.lastname, "email": document.email, 
                  "telephone": document.telephone, "about": document.about, "message":document.message } };
      db.collection(constants.MEMBER_COLLECITON_NAME).updateOne(query, newValues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
    }
  })
}

const DeleteMember = (id) => {
  mongoClient.connect(mongoDbUrl, (err, client) => {
    if (err) 
    {
      throw new Error(err.message)
    }
    else
    {
      const db = client.db(constants.MONGO_DB_NAME);
      db.collection(constants.MEMBER_COLLECITON_NAME).deleteOne({"_id": id}).then(
        console.log('Member deleted successfully')
      ).catch(error => {
        throw new Error(error.message)
      });
    }
  })
}

const GetMembers = () => {
  return new Promise(function(resolve, reject) {
    mongoClient.connect(mongoDbUrl, (err, client) => {
      if (err) 
      {
        return reject(err)
      }
      else
      {
        const db = client.db(constants.MONGO_DB_NAME);
        const members = db.collection(constants.MEMBER_COLLECITON_NAME).find({}).toArray();
        return resolve(members)
      }
    })  
  })
}

const GetMember = (id) => {
  return new Promise(function(resolve, reject) {
    mongoClient.connect(mongoDbUrl, (err, client) => {
      if (err) 
      {
        return reject(err)
      }
      else
      {
        const db = client.db(constants.MONGO_DB_NAME);
        db.collection(constants.MEMBER_COLLECITON_NAME).findOne({"_id": id}).then((member) => {
          return resolve(member)
        }).catch(error => {
          return reject(error);
        });
      }
    })  
  })
}


module.exports = {
  CreateDBAndCollection,
  AddMember,
  DeleteMember,
  GetMembers,
  GetMember,
  UpdateMember
}
