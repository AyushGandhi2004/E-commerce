const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp/')
  },
  filename: function (req, file, cb) {
    const customFileName = `${Date.now()}-${file.originalname}`;
    cb(null, customFileName)
    req.localStoragePath=customFileName;
    console.log(req.localStoragePath);
    
  }
})

const upload = multer({ storage });

module.exports = upload;