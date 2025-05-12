require('dotenv').config();
const express = require('express'); 
const app = express();
const db = require('./models');
const rootRouter = require('./routes/index')

const PORT = 5000; 
app.use(express.json())

// Main API 
app.use('/api/v1', rootRouter)

db.sequelize.authenticate()
.then(() => {
    console.log('Kết nối thành công');
})
.catch((err) => {
    console.log('Không thể kết nối dữ liệu', err);
})
app.listen(PORT, () => {
    console.log(`Server đang được chạy tại localhost:${PORT}`);
})