const jwt = require('jsonwebtoken'); 
const {User} = require('../../models');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 
    if(token === null) {
        return res.status(401).json({message: "Yêu cầu xác thực token"});
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, decodedPayload) => {
         if(err) {
            if(err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({message: "Token đã hết hạn"})
            }
            res.status(403).json({message: "Token không hợp lệ"})
        }
        const userId = decodedPayload.id
        if(!userId) {
           return res.status(403).json({message: "Thiếu thông tin người dùng"})
        }
         try {
            const user = await User.findByPk(userId);
            if(!user) {
               return res.status(401).json({message: "Xác thực thất bại"})
            }
            req.user = user;
            next();
        } catch (error) {
            next(error)
        }
    })
}

module.exports = authenticateToken;