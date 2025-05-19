const multer = require('multer'); 
const path = require('path'); 

const multerStorage = multer.diskStorage({ // diskStorage để lưu trữ
    // Nơi lưu file
    destination: (req, file, cb) => {
        const tempPath = path.join(__dirname,'..','..','public','temp'); 
        cb(null, tempPath);
    },

    // Đặt tên file 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname) //jpg, jpeg, png, gif, webp,...
        cb(null, `image-${uniqueSuffix}${ext}`)
    }
})

const multerFileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error("Không phải là ảnh, hãy upload lại"), false )
    }
}

const upload = multer({
    storage: multerStorage, 
    fileFilter: multerFileFilter, 
    limits: {fileSize: 5*1024*1024} // 5MB 
})

exports.uploadSingleImage = (fileName) =>upload.single(fileName);