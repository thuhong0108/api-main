import jwt from 'jsonwebtoken';

/* 
    - Sau khi đăng nhập, server sẽ trả về 1 token
    - Khi thực hiện 1 request, ta cần phải gửi token đó lên trong phần Headers, có key là Authorization
    - Sau đó middleware `verifyPermission` sẽ kiểm tra xem token gửi lên có hợp lệ hay không
*/

export const verifyPermission = (req, res, next) => {
    // lấy token trong phần `Headers`
    const token = req.header('Authorization');

    //nếu không tìm thấy token gửi lên
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Không tìm thấy token"
        });
    }

    try {
        //jwt.verify: kiểm tra xem token có hợp lệ không, nếu không hợp lệ sẽ chạy function `catch` ở dưới
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // nếu token hợp lệ, tiếp tục kiểm tra người dùng có phải là admin hay không
        if (data.IsAdmin) {
            next();
        } else {
            res.status(403).json({ 
                success: false,
                message: 'Bạn không phải phải là admin'
            });
        }

    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Token không hợp lệ'
        });
    }
}