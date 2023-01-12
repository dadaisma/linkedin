//necesitaremos un middleware  const {validateTodo, addDateMiddleware} = require('../middleware');
const UserModel = require("../database/schemas/user");

const getUserList = async (req, res) => {
    const user = await UserModel.find();
    res.json(user);
  }
  
  
  const registerUser = async (req, res)=>{
  try{ 
    const body = req.body
      const {username: username,password}  = body
     
      const data = {
          username : username,
          password : password
         
      }
      const newUser = new UserModel(data)
      await newUser.save()
      res.json(newUser);}
      catch(err){res.status(404).send("something occurred, try again")}
  }
  
  const editUser = async (req, res) =>{
    console.log(req)
    const {id} = req.params
    const user = await UserModel.findByIdAndUpdate(id, req.body);
    res.json(user);
  }
  
  const deleteUser = (req, res) => {
    UserModel.findByIdAndDelete(req.params.id, (err, user ) =>{
        if(!user){
            return res.status(404).send("user not found")
        }
        res.status(200).json(user)
    })
}

const findUser = async (req, res) => {
    const {id} = req.params
    const user = await UserModel.find(id);
    res.json(user);
  }
  
    module.exports = {
      registerUser, 
      getUserList, 
      editUser, 
      deleteUser,
      findUser
    }