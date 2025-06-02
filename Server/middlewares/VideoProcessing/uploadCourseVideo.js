const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempPath = path.join(__dirname, '..', '..', 'public', 'temp');
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); 
    cb(null, `video-${uniqueSuffix}${ext}`);
  },
});

const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new Error('Không phải video, hãy upload lại!'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, 
});

exports.uploadSingleVideo = (fileName) => upload.single(fileName);
