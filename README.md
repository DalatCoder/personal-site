# Nguyễn Trọng Hiếu (@DalatCoder) - Personal Website

> Trang web cá nhân của Nguyễn Trọng Hiếu - Trợ giảng tại Khoa Công nghệ Thông tin, Trường Đại học Đà Lạt

## 🌟 Tổng quan

Đây là trang web portfolio cá nhân được xây dựng với công nghệ hiện đại, sử dụng Tailwind CSS để tạo ra một thiết kế sạch sẽ, hiện đại và dễ bảo trì. Website giới thiệu về bản thân, quá trình học tập và công tác, dự án GitHub, series YouTube và thông tin liên hệ.

## 🚀 Công nghệ sử dụng

- **HTML5** - Cấu trúc trang web semantic
- **Tailwind CSS** - Framework CSS utility-first (via CDN)
- **Vanilla JavaScript** - Tương tác và dynamic content
- **Font Awesome** - Icon fonts
- **GitHub API** - Hiển thị repositories động

## ✨ Tính năng

- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **Modern UI** - Thiết kế sạch sẽ với màu xanh chủ đạo
- 🔗 **GitHub Integration** - Hiển thị repositories từ GitHub API
- 📱 **QR Code Zalo** - Kết nối nhanh qua Zalo
- 🎥 **YouTube Playlists** - Nhúng series lập trình
- 📊 **Smooth Scrolling** - Navigation mượt mà
- 🎯 **Interactive Elements** - Hover effects và transitions
- ⚡ **Fast Loading** - Không cần build process, chạy trực tiếp

## 🎨 Thiết kế

### Bảng màu chính

- **Primary**: Blue shades (`blue-50` to `blue-600`)
- **Secondary**: Purple (`purple-500` - Purple timeline cards)
- **Accent**: Orange (`orange-500` - Work experience), Green (`green-500` - Current position), Yellow (`yellow-500` - Achievement)

### Đặc điểm thiết kế

- Clean white background
- Blue color scheme cho consistency
- Card-based layout với shadows
- Hover animations
- Gradient backgrounds cho các section
- Modern typography

## 🏃‍♂️ Cách chạy

### Phương pháp 1: Trực tiếp

Mở file `index.html` trong trình duyệt web - không cần cài đặt gì thêm.

### Phương pháp 2: Local Server

```bash
# Cài đặt http-server (chỉ cần 1 lần)
npm install

# Chạy local server
npm start
```

Website sẽ mở tại: `http://localhost:3000`

## 📁 Cấu trúc dự án

```
personal-site/
├── index.html          # File HTML chính (sử dụng Tailwind CDN)
├── script.js           # JavaScript logic
├── assets/             # Hình ảnh và tài nguyên
│   ├── avatar.jpg      # Ảnh đại diện
│   └── QR.jpg          # QR Code Zalo
├── 404.html           # Trang lỗi 404
├── 502.html           # Trang lỗi 502
├── package.json       # Dependencies (chỉ http-server)
├── LICENSE            # MIT License
└── README.md          # Tài liệu dự án
```

## 🌐 Các section chính

### 1. Header Section

- Avatar với blue ring border
- Tên chính thức: **Nguyễn Trọng Hiếu**
- Nickname: **@DalatCoder**
- Chức vụ hiện tại
- Gradient background blue

### 2. Personal Information Cards

- Ngày sinh: 11/03/2000
- Công việc hiện tại: Trợ giảng tại Khoa CNTT, ĐH Đà Lạt
- Email liên hệ với hover effects

### 3. QR Code Section

- QR Code Zalo để kết nối nhanh
- Hướng dẫn sử dụng step-by-step
- Buttons: Download, Copy link, Share

### 4. Timeline - Quá trình học tập và công tác

- **2015-2018**: THPT Nguyễn Bỉnh Khiêm (Blue)
- **2018-2023**: Trường Đại học Đà Lạt (Purple)
- **01/2023**: Tốt nghiệp thủ khoa CNTT, GPA 3.85/4.0 (Yellow)
- **01/2023-06/2024**: Team Leader - Kỹ sư lập trình tại DOIT SOLUTIONS (Orange)
- **12/2024-Hiện nay**: Trợ giảng tại Khoa CNTT, ĐH Đà Lạt (Green)

### 5. GitHub Projects

- Dynamic loading từ GitHub API
- Repository cards với language và stats
- Link đến tất cả 127+ repositories

### 6. YouTube Series

- Series lập trình cơ bản với C#
- Series lập trình hướng đối tượng
- Dự án quản lý nhân viên
- Embedded video previews

### 7. Social Links

- Facebook: fb.com/dalatcoder
- GitHub: github.com/dalatcoder
- YouTube: youtube.com/@dalatcoder

## 🎯 Performance & SEO

- **Fast Loading**: Sử dụng CDN cho Tailwind CSS
- **Lightweight**: Không có build process phức tạp
- **SEO Optimized**: Semantic HTML và proper meta tags
- **Mobile First**: Responsive design với Tailwind breakpoints

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px (md:)
- **Desktop**: > 1024px (lg:)

## 🔧 Tùy chỉnh

### Thay đổi nội dung

- Cập nhật thông tin cá nhân trong các section HTML
- Thay đổi hình ảnh trong folder `assets/`
- Chỉnh sửa links GitHub, YouTube, Social trong HTML
- Cập nhật timeline với thông tin mới

### Thay đổi màu sắc

Dự án sử dụng Tailwind CSS standard colors. Để thay đổi:

- Thay thế các class `blue-*` bằng màu khác
- Cập nhật gradient backgrounds
- Thay đổi hover states

## 📈 Tối ưu hóa

- Sử dụng Tailwind CSS CDN cho faster loading
- Optimized images trong assets/
- Minimal JavaScript for better performance
- Progressive enhancement approach

## 🤝 Đóng góp

Nếu bạn muốn đóng góp cho dự án:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Liên hệ

- **Email**: nguyentronghieu.dlc@gmail.com
- **GitHub**: [@DalatCoder](https://github.com/DalatCoder)
- **YouTube**: [@dalatcoder](https://youtube.com/@dalatcoder)
- **Facebook**: [dalatcoder](https://fb.com/dalatcoder)

## 📄 License

Dự án này được cấp phép theo [MIT License](LICENSE).

---

Made with ❤️ and Tailwind CSS by **Nguyễn Trọng Hiếu (@DalatCoder)**
