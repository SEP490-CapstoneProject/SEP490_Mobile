# 📱 Skill Snap - Edit Profile Feature

## 📋 Mô tả tính năng

Trang chỉnh sửa thông tin cá nhân cho phép người dùng cập nhật các thông tin cá nhân như:
- **Tên hiển thị** (Editable)
- **Giới thiệu ngắn** (Bio)
- **Email** (Read-only - Không thể chỉnh sửa)
- **Số điện thoại**

## 🎨 Thiết kế và Màu sắc

- **Background Input**: `#E2E8F0`
- **Text Color (Button & Label)**: `#FF4848`
- **Border Radius**: 8px

## 🖼️ Icons được sử dụng

| Chức năng | Icon | File |
|-----------|------|------|
| Quay về | Arrow | `arrow.png` |
| Tên hiển thị | User | `user.png` |
| Tên hiển thị (Edit) | Pencil | `pencil.png` |
| Giới thiệu | Text | `text.png` |
| Email | Mail | `mail.png` |
| Email (Khóa) | Lock | `lock.png` |
| Số điện thoại | Smartphone | `smartphone.png` |

## 📁 Cấu trúc file

```
skill-snap/
├── app/
│   └── (tabs)/
│       └── profile/
│           ├── index.tsx           # Trang profile chính
│           └── editProfile.tsx    # 🆕 Trang chỉnh sửa profile
├── services/
│   ├── profile.storage.ts         # 🆕 Service lưu trữ dữ liệu
│   └── profile.storage.test.ts    # 🆕 Test file
└── profile-storage-test.html      # 🆕 HTML test page
```

## 🚀 Cách sử dụng

### Từ trang Profile chính
1. Bấm vào nút edit (biểu tượng bút chì) cạnh tên người dùng
2. Sẽ chuyển đến trang `editProfile.tsx`

### Trên trang Edit Profile
1. Chỉnh sửa các thông tin cần thiết (ngoại trừ Email)
2. Bấm nút "Lưu thay đổi" để lưu thông tin
3. Quay về trang trước bằng nút mũi tên

## 💾 Lưu trữ dữ liệu

### Trong ứng dụng mobile
- Dữ liệu được lưu bằng **AsyncStorage** (React Native)
- Dữ liệu được lưu dưới key: `user_profile`
- Hỗ trợ đọc/ghi/xóa dữ liệu cục bộ

### Service: `profileStorage`

```typescript
// Lưu profile
await profileStorage.saveProfile(profileData);

// Lấy profile
const profile = await profileStorage.getProfile();

// Kiểm tra sự tồn tại
const exists = await profileStorage.profileExists();

// Xóa profile
await profileStorage.clearProfile();
```

### Cấu trúc dữ liệu
```typescript
interface UserProfile {
  displayName: string;      // Tên hiển thị
  bio: string;             // Giới thiệu ngắn
  email: string;           // Email
  phone: string;           // Số điện thoại
  lastUpdated: string;     // Thời gian cập nhật (ISO string)
}
```

## 🧪 Testing

### Test trong trình duyệt web
1. Mở file `profile-storage-test.html` trong trình duyệt
2. Điền thông tin vào form
3. Bấm nút "Lưu thay đổi"
4. Kiểm tra dữ liệu đã lưu trong phần "Dữ liệu đã lưu"

**Lưu ý**: HTML test page sử dụng `localStorage`, còn app mobile sử dụng `AsyncStorage`

### Test trong ứng dụng mobile
1. Chạy app: `npm start`
2. Điều hướng đến trang Profile
3. Bấm nút Edit
4. Chỉnh sửa thông tin
5. Bấm "Lưu thay đổi"
6. Kiểm tra trong DevTools console

## 📦 Dependencies mới thêm

```json
{
  "@react-native-async-storage/async-storage": "~1.23.1"
}
```

Cài đặt:
```bash
npm install
```

## ✅ Validation

- **Tên hiển thị**: Không được để trống
- **Số điện thoại**: Không được để trống
- **Email**: Không thể chỉnh sửa (read-only)

## 🔄 Flow

```
Profile (index.tsx)
    ↓ [Bấm nút Edit]
    ↓
EditProfile (editProfile.tsx)
    ↓ [Tải dữ liệu từ AsyncStorage]
    ↓ [Chỉnh sửa form]
    ↓ [Bấm "Lưu thay đổi"]
    ↓ [Validate & Lưu vào AsyncStorage]
    ↓ [Quay lại Profile page]
```

## 🐛 Ghi chú

- Trang load dữ liệu từ storage khi khởi tạo component
- Nút Save được disable khi đang lưu dữ liệu
- Email hiển thị với icon khóa để chỉ ra rằng không thể chỉnh sửa
- Thời gian cập nhật được lưu lại cùng với dữ liệu

## 📞 Support

Để thêm hoặc chỉnh sửa tính năng, hãy liên hệ với team development.
