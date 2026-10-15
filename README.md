# Astronauts QA Technical Assessment - Web Testing & API Automation

Proyek ini dibuat untuk memenuhi instruksi teknis **Astronauts QA Assessment** yang terdiri dari dua tugas utama:
1. **TASK 1 – Web Testing**: Test Plan dan Test Cases untuk web application Astronauts ([astronauts.id](https://www.astronauts.id/)).
2. **TASK 2 – API Testing & Automation**: Desain API Test Cases dan implementasi automasi API menggunakan **Postman** dan **Newman CLI** untuk API [ReqRes](https://reqres.in/).

---

## 📁 Struktur Direktori Proyek

```text
d:\Test Astro\
│
├── astronauts_qa_assessment.xlsx   # Spreadsheet lengkap 4 tab siap di-upload ke Google Sheets
├── package.json                    # Dependensi Newman, reporter, dan skrip automasi
├── runner.js                       # Skrip Node.js Newman runner dengan CLI & HTML report
├── build_postman.js                # Generator Postman Collection & Environment
├── generate_excel.js               # Skrip generator file Excel (xlsx)
├── export_csv.js                   # Skrip export setiap sheet ke format CSV
├── reqres-postman-automation.zip   # Zip file siap submit untuk tim TA
├── README.md                       # Dokumentasi lengkap
│
├── postman/                        # File Postman Collection & Environment JSON
│   ├── astronauts-reqres-collection.json
│   └── astronauts-reqres-environment.json
│
├── reports/                        # Laporan hasil eksekusi automasi
│   └── reqres-api-report.html      # Visual interactive HTML report (newman-reporter-htmlextra)
│
└── sheets_csv/                     # Export CSV per tab untuk Google Sheets
    ├── Test_Plan_Web.csv
    ├── Test_Cases_Web.csv
    ├── API_Test_Cases.csv
    └── Automation_Summary.csv
```

---

## 📋 TASK 1 – Web Testing: Ringkasan Test Plan & Test Cases

File spreadsheet **`astronauts_qa_assessment.xlsx`** telah disusun sesuai format yang diminta di panduan soal:

### Tab 1: `Test Plan (Web)`
- **Test Objectives**: Memvalidasi alur belanja end-to-end dengan fokus utama pada halaman **Cart (Keranjang)** dan navigasi **Homepage**.
- **Scope**:
  - **Cart Page (Mandatory)**: Penambahan barang, kalkulasi harga, penyesuaian kuantitas, catatan pengiriman (*Tambah Catatan*), validasi radius pengiriman (*Alamat tidak tercover*), info lobi gedung, kode promo (*Pilihan Promo*), batas free ongkir, rincian biaya layanan (*Biaya Kemasan & Pembayaran*), potongan saldo refund, verifikasi usia 18+, dan status tombol checkout (*Lanjut ke pembayaran*).
  - **Homepage (Optional - Included)**: Header pencarian (*Search Bar*), carousel promo banner, navigasi kategori (Astro Goods, Cafe, Buah Segar), dan bottom navigation bar.
- **Test Types**: Functional Testing, UI/UX & Usability Testing, Responsive Testing (Viewport 375px & 430px), Validation & Boundary Testing, Error Handling (Offline mode, stok habis).
- **Test Environment**: Google Chrome (Desktop & Mobile Emulation), Firefox, Safari iOS; Viewports: 375x812, 430x932, 1920x1080; OS: Windows 11, macOS, Android, iOS.
- **Tools Used**: Google Sheets, Postman Desktop, Newman CLI, Chrome DevTools, Lighthouse, Node.js.
- **Test Schedule**: Siklus 5 fase (Requirement Analysis, Design, Automation Setup, Execution, Defect Reporting & Sign-off).

### Tab 2: `Test Cases (Web)`
Mengikuti format tabel: `Test Case ID | Test Scenario | Precondition | Steps | Expected Result | Actual Result | Status | Priority`
- **Total Test Cases**: 25 Test Cases menyeluruh (21 Test Cases Cart Page + 4 Test Cases Homepage).
- Mencakup aspek fungsional dan non-fungsional (UI/UX, responsivitas mobile, validasi form, dan handling kondisi offline/error).

---

## ⚡ TASK 2 – API Testing & Automation (Postman & Newman)

Sesuai instruksi soal dan permintaan pengguna, automasi dibuat menggunakan **Postman** dengan target API **https://reqres.in/**:

### Tab 3: `API Test Cases`
Mengikuti format tabel: `API Name | Method | Endpoint | Test Case ID | Test Scenario | Input | Expected Response | Status Code | Priority`
Mencakup 4 HTTP Methods (GET, POST, PUT, DELETE):
1. **GET `/api/users/{id}` & `/api/users`**:
   - `TC-API-001` (Positive): Retrieve single user dengan valid ID=2 (Status: 200 OK).
   - `TC-API-002` (Negative): Retrieve single user non-existent ID=23 (Status: 404 Not Found).
   - `TC-API-003` (Positive): Retrieve user list dengan pagination page=1 (Status: 200 OK).
2. **POST `/api/users` & `/api/register`**:
   - `TC-API-004` (Positive): Create user baru dengan name & job valid (Status: 201 Created).
   - `TC-API-005` (Edge): Create user dengan payload kosong `{}` (Status: 201 Created).
   - `TC-API-006` (Positive): Registrasi akun dengan kredensial valid (Status: 200 OK).
   - `TC-API-007` (Negative): Registrasi akun tanpa password (Status: 400 Bad Request - error: "Missing password").
   - `TC-API-008` (Negative): Registrasi akun tanpa email (Status: 400 Bad Request - error: "Missing email or username").
3. **PUT `/api/users/{id}`**:
   - `TC-API-009` (Positive): Update full profil user (Status: 200 OK).
   - `TC-API-010` (Edge): Update partial field user (Status: 200 OK).
4. **DELETE `/api/users/{id}`**:
   - `TC-API-011` (Positive): Hapus user ID=2 (Status: 204 No Content).

### Tab 4: `Automation Summary`
- **Tools**: Postman Collection v2.1, Postman Environment, Newman CLI v6.2.1, newman-reporter-htmlextra.
- **Hasil Eksekusi**:
  - Total Requests: **11/11 Executed**
  - Total Assertions: **29/29 Passed (100% Pass Rate)**
  - Failed Assertions: **0**
  - Average Response Time: **242 ms** (< 1500ms SLA)

---

## 🚀 Panduan Menjalankan Automasi API

### Opsi 1: Menjalankan via Command Line (Newman Runner - Paling Cepat)
1. Buka PowerShell atau Terminal di direktori proyek (`d:\Test Astro`).
2. Pastikan dependensi terpasang (jika belum, jalankan `npm install`).
3. Jalankan perintah test:
   ```bash
   npm test
   ```
   *Atau:*
   ```bash
   node runner.js
   ```
4. Newman akan mengeksekusi seluruh 11 request dan mencetak hasil berwarna di terminal.
5. Laporan visual interaktif akan otomatis dibuat di:
   `reports/reqres-api-report.html` (dapat langsung dibuka di browser Chrome/Edge).

### Opsi 2: Menjalankan via Postman Desktop GUI
1. Buka aplikasi **Postman**.
2. Klik tombol **Import** di pojok kiri atas.
3. Masukkan 2 file dari folder `postman/`:
   - `astronauts-reqres-collection.json`
   - `astronauts-reqres-environment.json`
4. Di bagian dropdown Environment (pojok kanan atas), pilih:
   **`ReqRes - Astronauts QA Environment`**.
5. Klik pada Collection **`Astronauts QA Assessment - ReqRes API Automation`**.
6. Klik tombol **Run collection** -> lalu klik **Run Astronauts QA Assessment**.
7. Seluruh 29 assertion akan berstatus hijau (**PASS**).

---

## 📤 Langkah Submit ke Google Sheets untuk Tim TA

Sesuai instruksi soal:
> "Make sure your Google Sheet is accessible to anyone with the link (View access) before submitting."

Langkah-langkah upload ke Google Sheets:
1. Buka [Google Sheets](https://sheets.google.com).
2. Buat spreadsheet baru (*Blank spreadsheet*).
3. Klik menu **File** > **Import** > tab **Upload**.
4. Pilih file **`astronauts_qa_assessment.xlsx`** dari direktori `d:\Test Astro\`.
5. Pilih opsi **"Replace spreadsheet"** lalu klik **"Import data"**.
6. Semua 4 tab akan otomatis terisi rapi dengan styling dan kolom yang pas:
   - `Test Plan (Web)`
   - `Test Cases (Web)`
   - `API Test Cases`
   - `Automation Summary`
7. Klik tombol **Share** di pojok kanan atas Google Sheets.
8. Pada bagian *General access*, ubah menjadi:
   **"Anyone with the link"** dengan role **"Viewer"**.
9. Klik **Copy link** dan cantumkan link tersebut beserta file **`reqres-postman-automation.zip`** (atau link repo GitHub) ke form submission TA.
