const User = require('./../models/user.js');
const { formatTime } = require('./../utils/date.js');
const userController = {
  exit: async function(erq,res,next){
    res.cookie('ac', '', { maxAge: 0, httpOnly: true });
    res.json({ code: 200, message: '退出成功'})
  },
  insert: async function(req,res,next){
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let role = req.body.role;
    let created_time = new Date();
    if(!name || !phone || !password || !role){
      res.json({ code: 0, message: '缺少必要参数' });
      return
    }

    try{
      const users = await User.insert({ 
        name, phone, password, role, created_time
      });
      res.json({ 
        code: 200, 
        data: users
      })
    }catch(e){
      console.log(e)
      res.json({ 
        code: 0,
        message: '内部错误'
      })
    }
  },
  show: async function(req,res,next){
    try{
      const users = await User.all();
      res.locals.users = users.map((data)=>{
        data.role_display = ( data.role == 1 ) ? '管理员' : '销售';
        data.created_time_display = formatTime(data.created_time);
        return data
      });
      res.render('admin/user.tpl',{title:'用户管理 -- 用户列表'})
    }catch(e){
      console.log(e)
      res.locals.error = e;
      res.render('error',res.locals);
    }
  },
  edit: async function(req,res,next) {
    try{
      const id = req.params.id;
      const users = await User.select({ id })
      res.locals.user = users[0]
      res.render('admin/user_edit.tpl',{title:'用户管理 -- 编辑用户'})
    }catch(e){
      res.locals.error = e;
      res.render('error',res.locals);
    }
  },
  update: async function(req,res,next) {
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;
    let role = req.body.role;
    let id = req.params.id;
    
    if(!name || !phone || !password || !role){
      res.json({ code: 0, message: '缺少必要参数' });
      return
    }

    try{
      const users = await User.update( id ,{ 
        name, phone, password, role
      });
      res.json({ 
        code: 200, 
        data: users
      })
    }catch(e){
      console.log(e)
      res.json({ 
        code: 0,
        message: '内部错误'
      })
    }
  },
  renderUserCreate: function(req,res,next) {
    res.render('admin/user_create',{title:'用户管理 -- 创建用户'});
  },
}

module.exports = userController;