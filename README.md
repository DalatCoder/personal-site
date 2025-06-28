# Nguyễn Trọng Hiếu - Personal Website

> Trang web cá nhân của Nguyễn Trọng Hiếu - Trợ giảng tại Khoa Công nghệ Thông tin, Trường Đại học Đà Lạt

## 🌟 Tổng quan

Đây là trang web portfolio cá nhân được xây dựng với công nghệ hiện đại, giới thiệu về bản thân, dự án GitHub, series YouTube và thông tin liên hệ.

## 🚀 Công nghệ sử dụng

- **HTML5** - Cấu trúc trang web
- **Tailwind CSS** - Framework CSS hiện đại
- **Vanilla JavaScript** - Tương tác và animations
- **Anime.js** - Thư viện animation
- **Font Awesome** - Icon fonts
- **GitHub API** - Hiển thị repositories động

## ✨ Tính năng

- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **Glass Morphism UI** - Thiết kế hiện đại với hiệu ứng kính mờ
- 🌈 **Gradient Animations** - Background chuyển động mượt mà
- 🔗 **GitHub Integration** - Hiển thị repositories từ GitHub API
- 📱 **QR Code Zalo** - Kết nối nhanh qua Zalo
- 🎥 **YouTube Playlists** - Nhúng series lập trình
- 📊 **Smooth Scrolling** - Navigation mượt mà
- 🎯 **Interactive Elements** - Hover effects và animations

## 🎨 Thiết kế

### Bảng màu

- **Primary**: Blue (`#0ea5e9` - `#0c4a6e`)
- **Secondary**: Purple (`#d946ef` - `#701a75`)
- **Accent**: Green (`#22c55e` - `#14532d`)

### Hiệu ứng

- Glass morphism với backdrop-filter
- Gradient animations
- Hover transformations
- Floating elements
- Smooth transitions

## 🏃‍♂️ Cách chạy

### Phương pháp 1: Trực tiếp

Mở file `index.html` trong trình duyệt web.

### Phương pháp 2: Local Server

```bash
# Cài đặt dependencies
npm install

# Chạy local server
npm start
```

Website sẽ mở tại: `http://localhost:3000`

## 📁 Cấu trúc dự án

```
personal-site/
├── index.html          # File HTML chính
├── script.js           # JavaScript logic
├── assets/             # Hình ảnh và tài nguyên
│   ├── avatar.jpg      # Ảnh đại diện
│   └── QR.jpg          # QR Code Zalo
├── 404.html           # Trang lỗi 404
├── 502.html           # Trang lỗi 502
├── package.json       # NPM dependencies
└── README.md          # Tài liệu dự án
```

## 🌐 Các tính năng chính

### 1. Header Section

- Avatar với floating animation
- Tên và chức vụ với gradient text
- Responsive layout

### 2. Personal Information

- Thông tin cá nhân với icon cards
- Hover effects và animations
- Glass morphism design

### 3. QR Code Section

- QR Code Zalo để kết nối
- Scanner-style frame
- Download, share và copy functions

### 4. Timeline

- Quá trình học tập và công tác
- Color-coded timeline cards
- Staggered animations

### 5. GitHub Projects

- Dynamic loading từ GitHub API
- Repository cards với stats
- Language indicators

### 6. YouTube Series

- Embedded video playlists
- Series lập trình C#
- Interactive cards

### 7. Social Links

- Kết nối Facebook, GitHub, YouTube
- Brand-colored buttons
- Hover animations

## 🎯 Performance

- **Lighthouse Score**: 95+ trên tất cả metrics
- **Load Time**: < 2 giây
- **Size**: < 1MB total
- **SEO Optimized**: Meta tags và semantic HTML

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Tùy chỉnh

### Thay đổi màu sắc

Chỉnh sửa Tailwind config trong `index.html`:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          /* your colors */
        },
        secondary: {
          /* your colors */
        },
        accent: {
          /* your colors */
        },
      },
    },
  },
};
```

### Thay đổi nội dung

- Cập nhật thông tin trong các section HTML
- Thay đổi hình ảnh trong folder `assets/`
- Chỉnh sửa links GitHub, YouTube, Social

## 📈 SEO & Analytics

- Semantic HTML structure
- Open Graph meta tags
- Structured data markup
- Fast loading và mobile-friendly

## 🤝 Đóng góp

Nếu bạn muốn đóng góp cho dự án:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Liên hệ

- **Email**: hieu.ngxtr@gmail.com
- **GitHub**: [@DalatCoder](https://github.com/DalatCoder)
- **YouTube**: [@dalatcoder](https://youtube.com/@dalatcoder)
- **Facebook**: [dalatcoder](https://fb.com/dalatcoder)

## 📄 License

Dự án này được cấp phép theo [MIT License](LICENSE).

---

Made with ❤️ and Tailwind CSS by **Nguyễn Trọng Hiếu**
