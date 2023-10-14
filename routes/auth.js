// import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import router from './user.js'

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });

        if (user && password === user.password) {
            // tạo token
            const accessToken = jwt.sign( { id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET );

            res.status(200).json({ 
                success: true,
                message: 'Đăng nhập thành công',
                data: accessToken
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