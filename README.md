# HaNoiStyle

HaNoiStyle là MVP web public giúp khám phá các shop thời trang nữ local tại Hà Nội. Giao diện ưu tiên mobile, không yêu cầu đăng nhập và hiện dùng dữ liệu mock để có thể thay thế bằng API ở giai đoạn tiếp theo.

## Chạy local

Yêu cầu Node.js 18+.

```bash
npm install
npm run dev
```

Các script có sẵn:

- `npm run dev` — chạy Vite development server.
- `npm run build` — build production vào `dist/`.
- `npm run preview` — xem thử production build.

## Kiến trúc MVP

- `src/data/mockData.js` là ranh giới dữ liệu duy nhất của frontend. Các component chỉ đọc `shops`, `products` và `categories` từ module này; khi backend sẵn sàng, thay module bằng API hooks/service mà không cần đổi UI.
- `src/App.jsx` chứa các luồng browsing chính: tìm kiếm, lọc danh mục, lưu shop, xem chi tiết shop/sản phẩm và các CTA gọi điện, Zalo, bản đồ.
- `src/styles.css` chứa design system và responsive layout mobile-first. Ảnh demo dùng public Unsplash URLs, không phải dữ liệu scraping.

## Lộ trình tích hợp admin & dữ liệu

### Shop verification và admin

Xây dựng admin dashboard với vai trò `admin`/`shop_owner`, quy trình `draft → pending_review → verified → rejected`, audit log và các trường bắt buộc (tên, địa chỉ chính xác, số điện thoại, giờ mở cửa, ảnh, khoảng giá). Chỉ shop đã `verified` mới hiển thị public; chủ shop có thể cập nhật hồ sơ nhưng thay đổi nhạy cảm cần duyệt lại.

### Maps API

Backend nên lưu latitude/longitude và `place_id` sau khi địa chỉ được chuẩn hóa. Frontend có thể dùng Google Maps hoặc Mapbox cho geocoding, marker và deep link chỉ đường. Không nên geocode lại mỗi lần render; cache kết quả và đặt giới hạn quota.

### Thanh toán

MVP hiện chỉ có CTA liên hệ và **không thực hiện thanh toán thật**. Khi có checkout, tạo payment adapter với cùng một interface cho COD, MoMo, ZaloPay và VNPay: tạo order pending, redirect/QR tới nhà cung cấp, nhận webhook có chữ ký, rồi chuyển trạng thái `paid`/`failed`. Không lưu thông tin thẻ hoặc secret key ở frontend.

### Giao hàng

Tạo delivery adapter cho GHN, GHTK và Ahamove (quote phí, tạo vận đơn, tracking, hủy). Lưu provider order code và snapshot địa chỉ trong order để dữ liệu lịch sử không thay đổi theo hồ sơ shop.

### Order flow đề xuất

`cart → pending_confirmation → awaiting_payment (nếu online) → paid/confirmed → preparing → shipping → delivered`, với nhánh `cancelled`/`refunded`. Webhook từ payment/delivery cần idempotency key; mọi chuyển trạng thái nên được ghi event để admin tra cứu.

## Lưu ý

Đây là frontend demo dùng mock/public-source placeholders. Chưa có authentication, database, scraping, thanh toán thật hay tạo vận đơn thật.
