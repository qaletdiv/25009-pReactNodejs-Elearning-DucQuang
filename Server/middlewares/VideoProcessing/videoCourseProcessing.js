const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');
const fs = require('fs');

// Middleware xử lý video
exports.processVideo = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const tempFilePath = req.file.path;

  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = '.mp4'; 
    const finalFilename = `video-${uniqueSuffix}${ext}`;
    req.file.processedFileName = finalFilename;

    const finalDirectory = path.join(__dirname, '..', '..', 'public', 'uploads');
    const finalFilePath = path.join(finalDirectory, finalFilename);

    await new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .outputOptions([
          '-c:v libx264', 
          '-preset fast', 
          '-crf 23', 
          '-c:a aac', 
          '-b:a 128k', 
        ])
        .size('1280x720') 
        .save(finalFilePath)
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    // Xóa file tạm
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error('Lỗi khi xóa file tạm:', err);
      } else {
        console.log('Đã xóa file tạm:', tempFilePath);
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};
