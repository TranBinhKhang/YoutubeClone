const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');
mongoose.connect('mongodb+srv://Kang:Kang123@englishcluster.uecjh.mongodb.net/unitech?retryWrites=true&w=majority')
.then(() => console.log('Successfully connected to online database.'))
.catch(error => console.error('Unable to connect.'));
const port = process.env.PORT || 4000;
app.listen(port);
app.use(express.json());
app.use(cors());

console.log('connected');

function authorization(req, res, next){
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Unauthorized action.');

  try {
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded;
      next()
  }
  catch{
      res.status(400).send('invalid token')
  }
}


var folderSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
    default: Math.floor(Math.random() * (99999999999999999 - 1000 + 1)) + 1000,

  },
  name: {
      type: String,
      unique: false,
      required: true
  },
  parent: {
      type: Number,
      required: false,
      default: 0
  }
});
var Folder = mongoose.model('Folder', folderSchema);

var videoSchema = new mongoose.Schema({
  name: {
      type: String,
      unique: false,
      required: true
  },
  thumbnail: {
      type: String,
      required: false,
      default: 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'
  },
  uri: {
    type: String,
    required: false,
    default: 'https://res.cloudinary.com/daekmobzf/video/upload/v1618218015/yt1s.com_-_video_placeholder_v144P_sgs82l.mp4'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  views: {
    type: Number,
    unique: false,
    required: true,
    default: 0
  },
  comment:  {
    type: Array,
    required: false,
},
  tag:  {
  type: String,
  required: false,
},
});
var Video = mongoose.model('Video', videoSchema);

var userSchema = new mongoose.Schema({
  username: {
      type: String,
      unique: false,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  watchLater: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
 }],
});
var User = mongoose.model('User', userSchema);

async function createUser(username, password) {
  const user = new User({
    username, password
  });
  const result = await user.save();
};

// async function createVideo(name, thumbnail, uri, author, views) {
//   const video = new Video({
//     name, thumbnail, uri, author, views
//   });
//   const result = await video.save();
// };

// createVideo('America', 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/sourced/s3/2019-04/8E5F857F-716C-4FD1-835F-93FCCACF17D1.jpg?itok=MyJ4Yb0C', 'https://res.cloudinary.com/daekmobzf/video/upload/v1630672810/videoplayback_morv1f.mp4', 'Donald Trump', 10000)

// createUser('Khang', '123456')


var listSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true
  },
  name: {
      type: String,
      unique: true,
      required: true
  },
  category: {
      type: String,
      required: false,
      default: ''
  },
  budget: {
    type: String,
    required: false,
    default: ''
  },
  status: {
    type: String,
    required: false,
    default: ''
  },
  parent: {
    type: String,
    required: false,
    default: ''
  }
});
var List = mongoose.model('List', listSchema);

async function createList(code, name, category, budget, status, parent) {
  const list = new List({
    code, name, category, budget, status, parent
  });
  const result = await list.save();
};
// createList('SYSTEM', 'Quan tri he thong', '', '', 'Working', '')

async function createFolder(name, parent) {
  const folder = new Folder({
      name,
      parent
  });
  const result = await folder.save();
};

// createFolder('Quản Trị', null);


const users = [
      {
        "username": "America",
        "password": "123456"
      },
      {
        "username": "France",
        "password": "123456"
      },
      {
        "username": "Khang",
        "password": "123456"
      }
  ];

    app.get("/test", async (req, res) => {
      try {
      res.send('It works');
      }
      catch {
          res.send('It doesnt wok')
      }
    });

    app.post('/api/login', async (req, res) => {
        const user = JSON.stringify(req.body);
        const allUsers = JSON.stringify(users);       
        if (allUsers.includes(user)) res.send(jwt.sign(user, 'secret'));
        else res.send(null)
    });

    app.get("/api/folders", async (req, res) => {
      const folder = await Folder.find();
      const json = JSON.parse(JSON.stringify(folder));  //mấy cái object dữ liệu của mongo ko thao tác trực tiếp đc vì nó ko phải là object javascript. Phải convert nó thành json.
      const folders = json.map( folder => ({...folder, isOpened: false, showInput: false, 
        showEdit: false, isSelected: false, link: folder.name.replace(/\s/g, '').toLowerCase()}));
      //Vì mấy cái này chỉ để hỗ trợ tương tác nên em ko đưa vào database. lúc lấy từ database ra thì thêm vào chứ ko lưu sẵn trong đó.
      res.send(folders);
    });

    const validateFolderSchema = Joi.object({
      _id: Joi.string(),
      id: Joi.number().required().messages({
        "number.base": `Id should be a number`,
        "number.empty": `Id cannot be an empty field`,
        "any.required": `Id is a required field`
      }),
      name: Joi.string().required().messages({
        'string.base': `Name should be a string`,
        'string.empty': `Name cannot be an empty field`,
        'any.required': `Name is a required field`
      }),
      parent: Joi.number().required().messages({
        "number.base": `Parent should be a type of 'number'`,
        "number.empty": `Parent cannot be an empty field`,
        "any.required": `Parent is a required field`
      }),
    });

    app.post('/api/addfolder', authorization, async (req, res) =>{
      const validation = validateFolderSchema.validate(req.body);
      if (validation.error) res.status(400).json(validation.error.details[0].message);
      else {
      const newFolder = new Folder({
          id: req.body.id,
          name: req.body.name,
          parent: req.body.parent
      });
      await newFolder.save();
      res.send('gaylord');
    }
    });

    app.post('/api/deletefolder', authorization, async (req, res) =>{
      try {
        const folder = await Folder.findOne({ _id: req.body._id});
        folder.remove();
        res.send('delete' + folder.name);
      }
      catch(err) {
          res.send(err)
      }
    });

    app.post('/api/updatefolder', authorization, async (req, res) => {
      const validation = validateFolderSchema.validate(req.body);
      if (validation.error) res.status(400).json(validation.error.details[0].message);
      else {
        const folder = await Folder.findOne({ _id: req.body._id});
        folder.id = req.body.id;
        folder.name = req.body.name;
        folder.parent = req.body.parent;
        folder.save();
        res.send(folder);
        console.log('running');
      }
    });

    app.post('/api/folderupdate', async (req, res) => {
      try {
        let item = await Folder.findOne({ _id: req.body._id});
        res.send(item);
      }
      catch(err) {
          res.send(err)
      }
    });

    app.post('/api/info', authorization, async (req, res) => {
        try {
        const token = req.user
        res.send(token);
        }
        catch {
            res.send('error');
        }
    });


    

    app.post('/api/additem', authorization, async (req, res) => {
      try {
          const newItem = new List({
          code: req.body.code,
          name: req.body.name,
          category: req.body.category,
          budget: req.body.budget,
          status: req.body.status,
          parent: req.body.parent
      });
      await newItem.save();
      res.send(newItem);
      }
      catch(err) {
          res.send(err)
      }
  });

  app.post('/api/deleteitem', authorization, async (req, res) => {
    try {
      const newState = await List.find();
      let item = await List.findOne({ _id: req.body._id});
      item.remove();
      res.send(newState);
    }
    catch(err) {
        res.send(err)
    }
  });

  app.post('/api/fetchupdate', async (req, res) => {
    try {
      let item = await List.findOne({ _id: req.body._id});
      res.send(item);
    }
    catch(err) {
        res.send(err)
    }
  });

  app.post('/api/update', authorization, async (req, res) => {
    try {
      const updateItem = await List.findOne({ _id: req.body._id});
      updateItem.code = req.body.code;
      updateItem.name = req.body.name;
      updateItem.category = req.body.category;
      updateItem.budget = req.body.budget;
      updateItem.status = req.body.status;
      updateItem.save();
      res.send(updateItem);
      console.log('running');

    }
    catch(err) {
        res.send(err)
    }
  });

  app.post('/api/postcomment', authorization, async (req, res) => {
    try {
      const comment = await Video.findOne({ _id: req.body._id}).select('comment');
      const newComment = {
        _id: new mongoose.Types.ObjectId, 
        username: req.body.username,
        postedAt: new Date().toISOString().split('T')[0],
        comment: req.body.comment,
        parent: req.body.parent
    }
    comment.comment.push(newComment);
    comment.save();
    res.send(comment.comment);
    }
    catch(err) {
        res.send(err)
    }
  });

  app.get('/api/list', async (req, res) => {
    try {
      const item = await List.find();
      res.send(item);
    }
    catch(err) {
        res.send(err)
    }
});



app.get('/api/fetchall', async (req, res) => {
  try {
    const video = await Video.find().populate('author', 'username');
    res.send(video);
  }
  catch(err) {
      res.send(err)
  }
});

app.post('/api/fetchvideo', async (req, res) => {
  try {
    let video = await Video.findOne({ _id: req.body._id}).populate('author', 'username');
    let videos = video.comment.map(c => ({...c, showChild: false,
    showReply: false}));
    video.comment = videos;
    res.send(video);
  }
  catch(err) {
      res.send(err)
  }
});

app.post('/api/watchlater', authorization, async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username});
    if (user.watchLater.includes(req.body.videoId)) return;
    else user.watchLater.push(req.body.videoId);
    user.save();
    res.send(user);
  }
  catch(err) {
      res.send(err)
  }
});

app.post('/api/getwatchlater', authorization, async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username}).populate({ 
      path: 'watchLater',
      model: 'Video',
      populate: {
          path: 'author',
          model: 'User'
      }
  });;
    res.send(user);
  }
  catch(err) {
      res.send(err)
  }
});




//   app.post('/api/additem', authorization, async (req, res) => {
//     try {
//         const newItem = new List({
//         code: req.body.code,
//         name: req.body.name,
//         category: req.body.category,
//         budget: req.body.budget,
//         status: req.body.status,
//         parent: req.body.parent
//     });
//     await newItem.save();
//     res.send('what the fuck');
//     }
//     catch(err) {
//         res.send(err)
//     }
// });