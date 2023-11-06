// import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import router from './user.js'

router.post('/login', async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const user = await User.findOne({ Username });

        // nếu tìm thấy user
        if (user && Password === user.Password) {
            const data = { isAdmin: user.IsAdmin };
            // tạo token
            const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

            res.status(200).json({ 
                success: true,
                message: 'Đăng nhập thành công',
                token: accessToken
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Username hoặc password không chính xác'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }   
});


export default router