const sharp = require('sharp');
const path = require('path');
const fs= require('fs');
 
exports.resizeImage= async(req,res,next)=>{
    if(!req.file){
        return next();
    }
 
    const tempFilePath = req.file.path;
 
    try {
        const uniqueSuffix= Date.now()+'-'+Math.round(Math.random()*1E9);
        const ext='.jpeg';
        const finalFilename =`image-${uniqueSuffix}${ext}`;
        req.file.processedFileName= finalFilename;
        
        const finalDirectory=path.join(__dirname,'..','..','public','uploads');
        const finalFilePath = path.join(finalDirectory,finalFilename);
 
        
        
        await sharp(tempFilePath)
            .resize(800)
            .toFormat('jpeg')
            .jpeg({quality:80})
            .toFile(finalFilePath);
 
        
        fs.unlink(tempFilePath,(err)=>{
            if(err){
                console.error("Lỗi khi xóa file tạm",err);
            }else{
                console.error("Đã xóa file tạm");
            }
        })
        next();
        
    } catch (error) {
         next(error);
    }
}