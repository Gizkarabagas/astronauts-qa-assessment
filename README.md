# Astronauts QA Technical Assessment - Web Testing & API Automation

Repository ini disusun untuk memenuhi instruksi teknis pengujian **Astronauts QA Technical Assessment** (Task 1 & Task 2) oleh **Bagas Gizkara**.

Framework utama yang digunakan untuk automasi API pada repository ini adalah **Playwright Test dengan TypeScript (TS)**.

---

## 🔗 Link Google Sheets Resmi (View Access)

Dokumen lengkap rencana pengujian (Test Plan) dan rancangan test case (Web & API) telah disusun dalam 4 tab di Google Sheets:

👉 **[Buka Google Sheets: Astronauts QA Assessment](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing)**  
*(Akses telah diset ke: **"Anyone with the link can view"** sesuai instruksi tim TA).*

---

## 📌 Kesesuaian Requirement Soal (Checklist)

| No | Poin Instruksi Soal | Status | Bukti Implementasi di Repository & Google Sheet |
| :---: | :--- | :---: | :--- |
| **1-4** | **Task 1 – Web Testing:** Test Plan & Test Cases untuk Astronauts web ([astronauts.id](https://www.astronauts.id/)) | **SELESAI** | Tersedia di **Tab 1 (`Test Plan (Web)`)** dan **Tab 2 (`Test Cases (Web)`)** pada [Google Sheets](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing) (25 Test Cases mencakup Cart Page & Homepage). |
| **1-4** | **Task 2 – API Test Cases:** Desain minimal 3 API dengan method berbeda (GET, POST, PUT, DELETE) pada ReqRes | **SELESAI** | Tersedia di **Tab 3 (`API Test Cases`)** pada [Google Sheets](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing) (11 Test Cases lengkap dengan Positive, Negative, & Edge scenarios). |
| **5** | **API Automation Test (Playwright TypeScript):** Buat automasi untuk API test cases, sertakan petunjuk setup & command | **SELESAI** | Diimplementasikan menggunakan **Playwright Test + TypeScript** di folder [`tests/reqres-api.spec.ts`](./tests/reqres-api.spec.ts) (`npm test`). |
| **6** | **Tab Automation Summary di Google Sheets:** Memuat Tool(s) used, Coverage summary, How to execute tests | **SELESAI** | Tersedia di **Tab 4 (`Automation Summary`)** pada [Google Sheets](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing) serta rangkuman di bawah. |
| **7** | **Share Google Sheet Link & GitHub/Zip Link ke Tim TA** | **SELESAI** | Google Sheet link publik aktif dan repositori GitHub ini siap diserahkan ke tim TA. |

---

## 📁 Struktur Berkas Repository

```text
.
├── README.md                       # Dokumentasi teknis lengkap & link Google Sheets
├── package.json                    # Konfigurasi dependensi Playwright Test & TypeScript
├── tsconfig.json                   # Konfigurasi compiler TypeScript
├── playwright.config.ts            # Konfigurasi Playwright (BaseURL, Reporters, Headers)
├── generate_excel.js               # Skrip generator workbook Excel
├── astronauts_qa_assessment.xlsx   # File Excel 4 tab offline backup
│
├── tests/                          # 🎭 Playwright API Automation Suite (TypeScript)
│   └── reqres-api.spec.ts          # Skrip 11 test case API Playwright TypeScript
│
├── playwright-report/              # Laporan HTML interaktif Playwright
│
└── sheets_csv/                     # Backup export CSV untuk masing-masing tab
    ├── Test_Plan_Web.csv
    ├── Test_Cases_Web.csv
    ├── API_Test_Cases.csv
    └── Automation_Summary.csv
```

> **Catatan:** Koleksi versi Postman & Newman juga telah diarsipkan secara terpisah di folder `postman test astro` jika diperlukan pembanding.

---

## ⚙️ Petunjuk Eksekusi Automasi API (Requirement Poin 5: Setup & Command)

### 1. Persyaratan Awal (Setup Environment)
- Pastikan komputer telah terpasang **Node.js** (v18 ke atas disarankan).
- Clone repository ini:
  ```bash
  git clone https://github.com/Gizkarabagas/astronauts-qa-assessment.git
  cd astronauts-qa-assessment
  ```
- Pasang seluruh dependensi:
  ```bash
  npm install
  ```

---

### 2. Menjalankan Pengujian (Execution Commands)

#### A. Menjalankan Semua Test via Terminal:
```bash
npm test
```
*Atau:* `npx playwright test`

#### B. Menjalankan dengan Mode Interaktif (Playwright UI Mode):
```bash
npm run test:ui
```
*Playwright UI Mode memungkinkan inspeksi request, response payload, headers, timing, dan step debugging secara visual.*

#### C. Melihat Laporan Hasil Uji (HTML Report):
```bash
npm run test:report
```
*Membuka browser otomatis menampilkan dashboard laporan HTML Playwright.*

---

### 💡 Catatan Mengenai Rate Limit ReqRes (HTTP 429)
ReqRes.in memberlakukan limit kuota publik sebesar **40 request/hari per IP anonim**.
- Jika IP Anda terkena batas kuota (*429 Too Many Requests*), Anda dapat:
  1. Mengganti jaringan sementara (misalnya menggunakan tethering hotspot seluler) agar IP publik ter-reset.
  2. Atau mendaftar akun gratis di [app.reqres.in](https://app.reqres.in/) untuk mendapatkan API Key, lalu menjalankannya dengan:
     ```bash
     $env:REQRES_API_KEY="api-key-anda"; npm test
     ```

---

## 📊 Ringkasan Automasi (Requirement Poin 6: Automation Summary)

Rincian lengkap dapat dilihat langsung di Google Sheets pada **Tab 4 (`Automation Summary`)**:

### 1. Tool(s) Used
- **Playwright Test (`@playwright/test`)**: Headless API testing & automation framework modern dengan performa tinggi.
- **TypeScript (`typescript`, `@types/node`)**: Strongly typed testing untuk validasi payload request & response schema.
- **Playwright HTML Reporter**: Dashboard interaktif built-in untuk analisis status, error context, dan network traces.
- **Node.js**: Runtime environment.

### 2. Coverage Summary
- **Target Host**: `https://reqres.in`
- **Metode HTTP**: 4 Metode Lengkap (**GET**, **POST**, **PUT**, **DELETE**).
- **Jumlah Endpoint**: 5 Endpoint utama (`/api/users/{id}`, `/api/users`, `/api/register`, dll.).
- **Jumlah Test Scenarios**: 11 Skenario (6 Positif, 5 Negatif & Boundary/Edge).

### 3. Matriks 11 API Test Cases (Playwright TS)

| ID | Method | Endpoint | Deskripsi Skenario | Tipe Uji | Expected Status |
| :---: | :---: | :--- | :--- | :---: | :---: |
| **TC-API-001** | `GET` | `/api/users/2` | Get Single User by Valid ID | Positif | `200 OK` |
| **TC-API-002** | `GET` | `/api/users/23` | Get Single User Not Found | Negatif | `404 Not Found` |
| **TC-API-003** | `GET` | `/api/users?page=1` | Get User List with Pagination | Positif | `200 OK` |
| **TC-API-004** | `POST` | `/api/users` | Create New User dengan Name & Job | Positif | `201 Created` |
| **TC-API-005** | `POST` | `/api/users` | Create User with Empty Payload `{}` | Edge / Boundary | `201 Created` |
| **TC-API-006** | `POST` | `/api/register` | Register User Berhasil dengan Password | Positif | `200 OK` |
| **TC-API-007** | `POST` | `/api/register` | Register User Missing Password | Negatif | `400 Bad Request` |
| **TC-API-008** | `POST` | `/api/register` | Register User Missing Email | Negatif | `400 Bad Request` |
| **TC-API-009** | `PUT` | `/api/users/2` | Update User Details (Name & Job) | Positif | `200 OK` |
| **TC-API-010** | `PUT` | `/api/users/2` | Update User Partial Field (Job Only) | Positif / Edge | `200 OK` |
| **TC-API-011** | `DELETE`| `/api/users/2` | Delete User by Valid ID | Positif | `204 No Content` |

---

## 📤 Submission Details (Requirement Poin 7)

- **Google Sheet URL (Viewer Access):**  
  [https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing)
- **GitHub Repository:**  
  [https://github.com/Gizkarabagas/astronauts-qa-assessment](https://github.com/Gizkarabagas/astronauts-qa-assessment)
- **Candidate Name:** Bagas Gizkara
- **Target Role:** QA Engineer - Astronauts
