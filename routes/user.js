import express from "express";
import User from '../models/User.js';
import { verifyPermission } from "../middleware/auth.js";

const router = express.Router();

// GET ALL USERS
router.get('/', verifyPermission, async (req, res) => {
    try {
        const users = await User.find();
        
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả người dùng thành công', 
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
})

// GET USER
router.get('/:id', verifyPermission, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        res.status(200).json({ 
            success: true, 
            message: 'Lấy người dùng thành công!', 
            data: user 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        })
    }
})

// ADD USER
router.post('/create', async (req, res) => {
    const { Username, Email } = req.body;

    try {
        // Kiểm tra userName hoặc email của user mới thêm có tồn tại hay chưa
        const existUserName = await User.findOne({ Username: Username });
        const existEmail = await User.findOne({ Email: Email });

        if (existUserName || existEmail) {
            res.status(400).json({
                success: false,
                message: 'Username hoặc email đã tồn tại'
            });
        } else {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();

            res.status(200).json({
                success: true,
                message: 'Thêm user thành công',
                user: savedUser
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// EDIT USER
router.put('/edit/:id', verifyPermission, async (req, res) => {
    const id = req.params.id;
    const { Username, Email } = req.body;

    try {
        const existUserName = await User.findOne({ Username: Username });
        const existEmail = await User.findOne({ Email: Email });

        if(!existUserName && !existEmail) { 
            const userUpdated = await User.findOneAndUpdate(
                { _id: id },
                { ...req.body },
                { new: true }
            )

            res.status(200).json({
                success: true,
                message: 'Sửa user thành công!',
                data: userUpdated
             });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Username hoặc email đã tồn tại',
             });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// DELETE USER
router.delete('/delete/:id', verifyPermission, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Xóa user thành công'
         });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router