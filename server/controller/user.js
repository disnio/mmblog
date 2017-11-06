import User from '../model/user'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import config from '../config/'

export async function createUser (req, res) {
  let someuser = await User.find().exec().catch(err=>{
    res.status(500, err)
  });

  if(someuser.length === 0){
    someuser = new User({
      username: config.admin.user,
      password: md5(config.admin.pwd).toLowerCase()
    });
    const newuser = await someuser.save().catch(err=>{
      res.status(500).send({
        success:false,
        message:"保存失败"
      })
    });
    res.json(newuser);
  }else{
    res.status(400).json({
      success:false,
      message:"该用户名已存在"
    })
  }
}

export async function login (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let someuser = await User.findOne({username}).catch(err=>{
    res.status(500, err)
  });

  if(someuser !== null){
    if(someuser.password === md5(password)){
      const token = jwt.sign({
        uid:someuser._id,
        name:someuser.username,
        exp: Math.floor(Date.now()/1000) + 24*60*60
      }, config.jwt.secret);

      res.json({
        success: true,
        uid: someuser._id,
        name:someuser.username,
        token:token
      });
    }else{
      res.status(400).send({
        success: false,
        message:"密码错误"
      })
    }
  }else{
    res.status(400).send({
      success: false,
      message:"用户名错误"
    })
  }
}