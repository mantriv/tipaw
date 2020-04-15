const mongoClient = require('mongodb').MongoClient;
const constants = require('../constants')

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
  GetMember
}
