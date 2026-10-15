# Astronauts QA Technical Assessment - Web Testing & API Automation

Repository ini disusun untuk memenuhi instruksi teknis pengujian **Astronauts QA Technical Assessment** (Task 1 & Task 2).

---

## 📌 Kesesuaian Requirement Soal (Checklist)

| No | Poin Instruksi Soal (Gambar) | Status | Bukti Implementasi di Repository Ini |
| :---: | :--- | :---: | :--- |
| **1-4** | **Task 1 – Web Testing:** Test Plan & Test Cases untuk Astronauts web ([astronauts.id](https://www.astronauts.id/)) | **SELESAI** | Ada di Tab 1 (`Test Plan (Web)`) & Tab 2 (`Test Cases (Web)`) pada file [`astronauts_qa_assessment.xlsx`](./astronauts_qa_assessment.xlsx) (25 Test Cases mencakup Cart Page & Homepage). |
| **1-4** | **Task 2 – API Test Cases:** Desain minimal 3 API dengan method berbeda (GET, POST, PUT, DELETE) pada ReqRes | **SELESAI** | Ada di Tab 3 (`API Test Cases`) pada file [`astronauts_qa_assessment.xlsx`](./astronauts_qa_assessment.xlsx) (11 Test Cases lengkap dengan Positive, Negative, & Edge scenarios). |
| **5** | **API Automation Test (Postman):** Buat automasi untuk API test cases, sertakan petunjuk setup & command | **SELESAI** | Postman Collection v2.1.0 di folder [`postman/`](./postman/), Newman runner [`runner.js`](./runner.js), dan skrip perintah `npm test`. |
| **6** | **Tab Automation Summary di Spreadsheet:** Memuat Tool(s) used, Coverage summary, How to execute tests | **SELESAI** | Ada di Tab 4 (`Automation Summary`) pada file [`astronauts_qa_assessment.xlsx`](./astronauts_qa_assessment.xlsx) serta rangkuman di README ini. |
| **7** | **Share Google Sheet Link & GitHub/Zip Link ke Tim TA** | **SELESAI** | File spreadsheet siap di-import ke Google Sheets dengan view access, dan repositori GitHub ini siap diserahkan. |

---

## 📁 Struktur Berkas Repository

```text
.
├── astronauts_qa_assessment.xlsx   # Spreadsheet 4 tab lengkap siap di-import ke Google Sheets
├── package.json                    # Konfigurasi dependensi Newman, reporter, dan npm scripts
├── runner.js                       # Skrip Node.js Newman runner (CLI & HTML extra report)
├── build_postman.js                # Skrip generator Postman Collection & Environment JSON
├── generate_excel.js               # Skrip generator file Excel (xlsx) 4 sheets
├── export_csv.js                   # Skrip konversi sheet ke file CSV individual
├── reqres-postman-automation.zip   # Paket arsip ZIP siap submit
├── README.md                       # Dokumentasi teknis lengkap
│
├── postman/                        # File Postman Collection & Environment
│   ├── astronauts-reqres-collection.json
│   └── astronauts-reqres-environment.json
│
├── reports/                        # Laporan hasil eksekusi automasi
│   └── reqres-api-report.html      # Laporan visual HTML interaktif (100% Pass)
│
└── sheets_csv/                     # Export CSV individual untuk setiap tab
    ├── Test_Plan_Web.csv
    ├── Test_Cases_Web.csv
    ├── API_Test_Cases.csv
    └── Automation_Summary.csv
```

---

## ⚙️ Petunjuk Eksekusi Automasi API (Requirement Poin 5: Setup & Command)

### Persyaratan Awal (Setup Environment)
- Pastikan komputer memiliki **Node.js** (versi 18 ke atas disarankan).
- Clone atau download repositori ini:
  ```bash
  git clone https://github.com/Gizkarabagas/astronauts-qa-assessment.git
  cd astronauts-qa-assessment
  ```
- Pasang dependensi yang dibutuhkan:
  ```bash
  npm install
  ```

### Menjalankan Pengujian (Command Execution)

#### Opsi A: Lewat Command Line / Terminal (Paling Direkomendasikan)
Cukup jalankan satu perintah:
```bash
npm test
```
*Atau:*
```bash
node runner.js
```
**Output yang dihasilkan:**
- Newman akan mengeksekusi ke-11 request API ReqRes secara berurutan.
- Hasil pengujian langsung dicetak di console/terminal dengan rincian status code, response time SLA, dan assertions pass.
- Laporan visual HTML otomatis dibuat di: [`reports/reqres-api-report.html`](./reports/reqres-api-report.html).

#### Opsi B: Lewat Postman Desktop Application (GUI)
1. Buka aplikasi **Postman**.
2. Klik tombol **Import** (atau tekan `Ctrl + O`).
3. Pilih berkas dari folder `postman/`:
   - `astronauts-reqres-collection.json`
   - `astronauts-reqres-environment.json`
4. Di bagian kanan atas, aktifkan Environment: **`ReqRes - Astronauts QA Environment`**.
5. Buka tab Collections > pilih **`Astronauts QA Assessment - ReqRes API Automation`**.
6. Klik tombol **`Run`** > lalu klik **`Run Astronauts QA Assessment`**.

---

## 📊 Ringkasan Automasi (Requirement Poin 6: Automation Summary)

Rangkuman ini juga terdapat di dalam file [`astronauts_qa_assessment.xlsx`](./astronauts_qa_assessment.xlsx) pada Tab ke-4 (**`Automation Summary`**):

### 1. Tool(s) Used
- **Postman Desktop (v11+)**: Perancangan request, pre-request dynamic data, dan assertion test scripts.
- **Newman CLI (v6.2.1)**: Headless test runner collection Postman untuk eksekusi otomatis.
- **newman-reporter-htmlextra (v1.23.1)**: Dashboard reporting HTML interaktif dengan visualisasi metrik performa.
- **Node.js (v24.x)**: Runtime JavaScript untuk orchestrasi runner.
- **xlsx (SheetJS)**: Generator spreadsheet 4 tab untuk Google Sheets.

### 2. Coverage Summary
- **Target Host**: `https://reqres.in`
- **Metode HTTP**: 4 Metode Lengkap (**GET**, **POST**, **PUT**, **DELETE**).
- **Jumlah Endpoint**: 5 Endpoint utama (`/api/users/{id}`, `/api/users`, `/api/register`, dll.).
- **Jumlah Test Scenarios**: 11 Skenario (6 Positif, 5 Negatif & Boundary/Edge).
- **Total Test Assertions**: **29 Assertions**
  - Status Code Verification (200, 201, 204, 400, 404)
  - SLA Response Time Threshold (< 1500 ms)
  - Content-Type Header Verification (`application/json`)
  - Schema & Data Type Verification (ID types, timestamps, email formats)
  - Negative Error Messages Matching (`Missing password`, `Missing email or username`)
- **Tingkat Kelulusan (Pass Rate)**: **100% PASS (29 Passed, 0 Failed, 0 Skipped)**.
- **Rata-rata Waktu Respon**: **~242 ms**.

### 3. How to Execute Tests
Lihat bagian **Petunjuk Eksekusi Automasi API (Requirement Poin 5)** di atas.

---

## 📤 Panduan Upload ke Google Sheets (Requirement Poin 7)

Sesuai instruksi:
> *"Make sure your Google Sheet is accessible to anyone with the link (View access) before submitting."*

1. Buka [Google Sheets](https://sheets.google.com).
2. Buat spreadsheet baru.
3. Klik menu **File** > **Import** > pilih tab **Upload**.
4. Upload file **[`astronauts_qa_assessment.xlsx`](./astronauts_qa_assessment.xlsx)** dari repository ini.
5. Pilih **"Replace spreadsheet"** lalu klik **"Import data"**. Keempat tab akan langsung rapi:
   - `Test Plan (Web)`
   - `Test Cases (Web)`
   - `API Test Cases`
   - `Automation Summary`
6. Klik tombol **Share** di pojok kanan atas > ubah *General access* menjadi **"Anyone with the link"** dengan role **"Viewer"**.
7. Salin link Google Sheet tersebut dan kumpulkan bersama link GitHub ini ke formulir tim TA.
