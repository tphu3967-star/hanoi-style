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

- `src/data/mockData.js` chứa fixture công khai gồm nhiều shop Hà Nội, sản phẩm, biến thể size/màu và số lượng mẫu; `src/data/catalogStore.js` là store boundary với các action `upsertShop`, `upsertProduct`, `setShopVerification`. Admin Preview dùng boundary này để mô phỏng quản lý dữ liệu trong memory, không ghi database.
- `src/data/vietnamProvinces.js` là taxonomy 63 tỉnh/thành theo scope legacy được yêu cầu cho catalog demo; `mockData.js` tạo fixture tổng hợp có `province`, `region`, tọa độ mẫu và sản phẩm tương ứng cho từng đơn vị.
- `src/utils/location.js` chứa Haversine helper, format khoảng cách và link chỉ đường. `src/config/map.js` là cấu hình provider; hiện dùng Google Maps directions link không cần API key và không nhúng tile/bản đồ thật.
- `src/integrations/catalogAdapter.js` định nghĩa schema chuẩn hóa có validation cho shop, product, inventory và adapter contract (`fetchProducts`, `mapProduct`, `syncInventory`, `reportErrors`). `createMockCatalogAdapter` chỉ chạy preview trên mock data, không gọi network.
- `src/utils/search.js` chuẩn hóa tiếng Việt không dấu, alias quận/huyện và district matching; `src/config/places.js` là boundary provider-agnostic cho Places search. Hiện chỉ tạo Google Maps search/directions links, không gọi Places API.
- `src/App.jsx` chứa các luồng browsing chính: tìm kiếm, lọc danh mục, lưu shop, xem chi tiết shop/sản phẩm, CTA gọi điện/Zalo/chỉ đường, xin quyền geolocation và Admin Preview.
- `src/styles.css` chứa design system và responsive layout mobile-first. Card sản phẩm có badge tồn kho, thông tin biến thể và fallback “Ảnh mẫu” khi URL ảnh lỗi.

### Catalog và hình ảnh mẫu

Toàn bộ shop, sản phẩm, giá, biến thể và số lượng trong MVP là **dữ liệu demo**, không phải inventory thực tế. URL ảnh hiện là ảnh mẫu từ Unsplash dùng để hoàn thiện UI; chúng không được thu thập từ website shop, không ngụ ý thuộc về shop nào và không phải ảnh hàng hóa thật của các shop trong fixture. Khi phát hành production, thay từng `image`/`imageAlt` bằng ảnh do shop cung cấp với quyền sử dụng rõ ràng (hoặc CDN nội bộ), giữ lại `imageAlt`, trạng thái tải lỗi và kiểm duyệt nội dung trước khi public.

### Tìm kiếm toàn Hà Nội

Public browsing hỗ trợ tìm theo tên shop, sản phẩm, danh mục, địa chỉ và quận/huyện trên toàn bộ catalog Hà Nội. Search được chuẩn hóa để các cách nhập như `Hoan Kiem`, `Q. Hoàn Kiếm`, `Dong Da` và tiếng Việt có dấu cùng khớp; các chip khu vực giúp lọc nhanh theo Hoàn Kiếm, Đống Đa, Tây Hồ và các khu vực demo khác. Khi không có kết quả, UI hiển thị empty state và vẫn cho mở Google Maps search link. Các tọa độ/district trong fixture là minh họa, không phải directory shop thật.

Khi bấm **Bật vị trí** hoặc chọn **Gần tôi nhất**, trình duyệt sẽ xin quyền geolocation. Nếu được phép, shop đã xác minh được sắp xếp theo khoảng cách Haversine từ gần đến xa; district/search filters vẫn được áp dụng. Nếu bị từ chối hoặc không khả dụng, người dùng vẫn duyệt bình thường, thấy thông báo fallback và sort không chặn nội dung. Vị trí chỉ được giữ trong state của phiên hiện tại, không có background tracking hay request API ngoài.

`src/config/places.js` giữ provider config (`google-places-ready`, `mode: mock-only`) và endpoint tương lai. Production nên để backend gọi Google Places hoặc provider khác, cache/giới hạn quota, normalize kết quả qua schema và trả về UI qua endpoint nội bộ. API key, OAuth/token và secret phải nằm server-side; không đưa vào Vite bundle. MVP không gọi external Places API và không scraping.

### Catalog toàn quốc

MVP có scope selector searchable theo 63 đơn vị tỉnh/thành (kèm shortcut Hà Nội, Hồ Chí Minh, Đà Nẵng, Cần Thơ), chỉ báo phạm vi đang xem và lọc shop/sản phẩm theo `province`. Các fixture ngoài Hà Nội là shop/sản phẩm **tổng hợp hoàn toàn hư cấu**, dùng tên `Nét ...`, địa chỉ/điện thoại/tọa độ/tồn kho mẫu; không đại diện doanh nghiệp, inventory hay coverage thật. Tên 63 đơn vị là taxonomy legacy để phục vụ yêu cầu demo; khi onboarding production cần xác nhận taxonomy hành chính chính thức đang có hiệu lực tại thời điểm triển khai.

Geolocation vẫn sort shop đã xác minh gần nhất trên toàn quốc bằng Haversine khi được cấp quyền; từ chối quyền vẫn cho duyệt và lọc theo tỉnh bình thường. Khi thay mock bằng dữ liệu thật, backend cần bắt buộc `province`, địa chỉ chuẩn hóa, tọa độ đã kiểm duyệt và nguồn/giấy phép ảnh trước khi public.

### Product automation adapters

Admin Preview có panel **Đồng bộ sản phẩm & tồn kho**. Nút `Chạy sync preview` chạy mock adapter trong memory, validate/mapping toàn bộ sản phẩm, tính trạng thái tồn kho và hiển thị `fetched / mapped / inventory updated`, thời gian chạy và lỗi. Đây không phải live sync và không gửi request ra ngoài.

Backend production nên implement cùng contract trong `src/integrations/catalogAdapter.js` theo từng provider:

| Provider | Adapter implementation |
| --- | --- |
| WooCommerce | REST API với consumer key/secret, map product/variation và stock quantity |
| Shopify | Admin GraphQL/REST API, map variant inventory levels |
| Haravan | API shop/product và tồn kho theo variant |
| KiotViet | OAuth/token API, map hàng hóa và số lượng theo chi nhánh |

Adapter server-side nên lấy dữ liệu theo cursor/page, normalize qua schema, validate trước khi ghi, dùng idempotency + retry có giới hạn và trả `SyncReport` có lỗi theo từng record. OAuth client secret, refresh token, API key và webhook signing secret phải nằm trong secret manager/backend environment; tuyệt đối không đưa vào Vite bundle, localStorage hay public admin preview. UI chỉ gọi endpoint nội bộ như `POST /admin/sync/products` và nhận report đã được server kiểm soát. Không scraping và không giả lập live integration trong MVP.

## Lộ trình tích hợp admin & dữ liệu

### Shop verification và admin

MVP có nút **Quản trị demo** ở header. View này cho phép thêm/sửa shop, thêm/sửa sản phẩm và bật/tắt trạng thái xác minh; dữ liệu chỉ sống trong state của tab và được gắn nhãn `ADMIN PREVIEW · MOCK`. Public browsing chỉ hiển thị shop `verified`.

Khi thay bằng backend, tạo API adapter giữ cùng shape với `catalogStore`: `GET /shops?verified=true`, `POST/PATCH /admin/shops`, `POST/PATCH /admin/products`, `POST /admin/shops/:id/verification`. Dùng authentication/authorization ở server, audit log và optimistic concurrency; không đưa service secret vào Vite/frontend. Quy trình khuyến nghị là `draft → pending_review → verified → rejected`, với các trường bắt buộc (tên, địa chỉ chính xác, số điện thoại, giờ mở cửa, ảnh, khoảng giá). Chủ shop có thể cập nhật hồ sơ nhưng thay đổi nhạy cảm cần duyệt lại.

### Maps API

Mỗi mock shop hiện có `coordinates` minh họa (không đại diện cho dữ liệu shop thật). Người dùng có thể cấp quyền browser geolocation; frontend tính khoảng cách đường chim bay bằng Haversine và tự fallback về khoảng cách khu vực mock nếu quyền bị từ chối hoặc browser không hỗ trợ. CTA **Chỉ đường** mở Google Maps directions bằng latitude/longitude, không yêu cầu API key và không tuyên bố có live map tiles. Backend nên lưu latitude/longitude và `place_id` sau khi địa chỉ được chuẩn hóa. Khi cần bản đồ nhúng, thay `src/config/map.js` bằng provider adapter (Google Maps/Mapbox), đặt key qua biến môi trường public phù hợp và giới hạn quota; không geocode lại mỗi lần render.

### Thanh toán

MVP hiện chỉ có CTA liên hệ và **không thực hiện thanh toán thật**. Khi có checkout, tạo payment adapter với cùng một interface cho COD, MoMo, ZaloPay và VNPay: tạo order pending, redirect/QR tới nhà cung cấp, nhận webhook có chữ ký, rồi chuyển trạng thái `paid`/`failed`. Không lưu thông tin thẻ hoặc secret key ở frontend.

### Giao hàng

Tạo delivery adapter cho GHN, GHTK và Ahamove (quote phí, tạo vận đơn, tracking, hủy). Lưu provider order code và snapshot địa chỉ trong order để dữ liệu lịch sử không thay đổi theo hồ sơ shop.

### Order flow đề xuất

`cart → pending_confirmation → awaiting_payment (nếu online) → paid/confirmed → preparing → shipping → delivered`, với nhánh `cancelled`/`refunded`. Webhook từ payment/delivery cần idempotency key; mọi chuyển trạng thái nên được ghi event để admin tra cứu.

## Lưu ý

Đây là frontend demo dùng mock/public-source placeholders. Chưa có authentication, database, scraping, thanh toán thật hay tạo vận đơn thật.
