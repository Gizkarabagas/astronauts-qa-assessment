# Astronauts QA Technical Assessment - Web Testing & API Automation

Repository ini disusun untuk memenuhi instruksi teknis pengujian **Astronauts QA Technical Assessment** (Task 1 & Task 2) oleh **Bagas Gizkara**.

---

## 🔗 Link Google Sheets Resmi (View Access)

Dokumen lengkap rencana pengujian (Test Plan) dan rancangan test case (Web & API) telah disusun dalam 4 tab di Google Sheets:

👉 **[Buka Google Sheets: Astronauts QA Assessment](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing)**  
*(Akses telah diset ke: **"Anyone with the link can view"** sesuai instruksi tim TA).*

---

## 📌 Kesesuaian Requirement Soal (Checklist)

| No | Poin Instruksi Soal (Gambar) | Status | Bukti Implementasi di Repository & Google Sheet |
| :---: | :--- | :---: | :--- |
| **1-4** | **Task 1 – Web Testing:** Test Plan & Test Cases untuk Astronauts web ([astronauts.id](https://www.astronauts.id/)) | **SELESAI** | Tersedia di **Tab 1 (`Test Plan (Web)`)** dan **Tab 2 (`Test Cases (Web)`)** pada [Google Sheets](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing) (25 Test Cases mencakup Cart Page & Homepage). |
| **1-4** | **Task 2 – API Test Cases:** Desain minimal 3 API dengan method berbeda (GET, POST, PUT, DELETE) pada ReqRes | **SELESAI** | Tersedia di **Tab 3 (`API Test Cases`)** pada [Google Sheets](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing) (11 Test Cases lengkap dengan Positive, Negative, & Edge scenarios). |
| **5** | **API Automation Test (Postman / Playwright):** Buat automasi untuk API test cases, sertakan petunjuk setup & command | **SELESAI** | Tersedia **2 Pilihan Framework Automasi:**<br>1. **Postman & Newman CLI** di folder [`postman/`](./postman/) (`npm test`)<br>2. **Playwright API Test Suite** di folder [`tests/`](./tests/) (`npm run test:playwright`) |
| **6** | **Tab Automation Summary di Google Sheets:** Memuat Tool(s) used, Coverage summary, How to execute tests | **SELESAI** | Tersedia di **Tab 4 (`Automation Summary`)** pada [Google Sheets](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing) serta rangkuman di bawah. |
| **7** | **Share Google Sheet Link & GitHub/Zip Link ke Tim TA** | **SELESAI** | Google Sheet link publik aktif dan repositori GitHub ini siap diserahkan ke tim TA. |

---

## 📁 Struktur Berkas Repository

```text
.
├── README.md                       # Dokumentasi teknis lengkap & link Google Sheets
├── package.json                    # Konfigurasi dependensi Postman, Newman & Playwright
├── runner.js                       # Skrip Node.js Newman runner (CLI & HTML extra report)
├── playwright.config.js            # Konfigurasi Playwright API Test Framework
├── reqres-postman-automation.zip   # Paket arsip ZIP siap submit untuk tim TA
│
├── tests/                          # 🎭 Playwright API Automation Suite
│   └── reqres-api.spec.js          # Skrip 11 test case API Playwright
│
├── postman/                        # 🚀 Postman Collection & Environment
│   ├── astronauts-reqres-collection.json
│   └── astronauts-reqres-environment.json
│
├── reports/                        # Laporan hasil eksekusi Newman
│   └── reqres-api-report.html      # Laporan visual HTML interaktif (100% Pass)
│
└── sheets_csv/                     # Backup export CSV untuk masing-masing tab
    ├── Test_Plan_Web.csv
    ├── Test_Cases_Web.csv
    ├── API_Test_Cases.csv
    └── Automation_Summary.csv
```

---

## ⚙️ Petunjuk Eksekusi Automasi API (Requirement Poin 5: Setup & Command)

### Persyaratan Awal (Setup Environment)
1. Pastikan komputer telah terpasang **Node.js** (versi 18 ke atas disarankan).
2. Clone repository ini:
   ```bash
   git clone https://github.com/Gizkarabagas/astronauts-qa-assessment.git
   cd astronauts-qa-assessment
   ```
3. Pasang seluruh dependensi:
   ```bash
   npm install
   ```

---

### PILIHAN 1: Menjalankan via Postman & Newman (Opsi Standar)

```bash
npm test
```
*Atau jalankan:* `node runner.js`

- Mengeksekusi seluruh 11 request API via command-line.
- Laporan HTML visual otomatis dibuat di: [`reports/reqres-api-report.html`](./reports/reqres-api-report.html).
- Bisa juga di-import ke aplikasi **Postman Desktop** via file [`postman/astronauts-reqres-collection.json`](./postman/astronauts-reqres-collection.json).

---

### PILIHAN 2: Menjalankan via Playwright (Opsi Code-Based)

```bash
npm run test:playwright
```

- Mengeksekusi file pengujian [`tests/reqres-api.spec.js`](./tests/reqres-api.spec.js) menggunakan test runner bawaan Playwright.
- Untuk melihat laporan interaktif Playwright:
  ```bash
  npm run test:playwright:report
  ```

---

## 📊 Ringkasan Automasi (Requirement Poin 6: Automation Summary)

Rincian lengkap juga dapat dilihat langsung di Google Sheets pada **Tab 4 (`Automation Summary`)**:

### 1. Tool(s) Used
- **Postman Desktop (v11+)** & **Newman CLI (v6.2.1)**: Collection runner untuk API testing otomatis.
- **Playwright Test (@playwright/test)**: Modern headless automation framework untuk REST API.
- **newman-reporter-htmlextra (v1.23.1)**: Dashboard reporting HTML interaktif dengan visualisasi metrik performa.
- **Node.js**: Runtime JavaScript untuk menjalankan runner automasi.

### 2. Coverage Summary
- **Target Host**: `https://reqres.in`
- **Metode HTTP**: 4 Metode Lengkap (**GET**, **POST**, **PUT**, **DELETE**).
- **Jumlah Endpoint**: 5 Endpoint utama (`/api/users/{id}`, `/api/users`, `/api/register`, dll.).
- **Jumlah Test Scenarios**: 11 Skenario (6 Positif, 5 Negatif & Boundary/Edge).
- **Tingkat Kelulusan (Pass Rate)**: **100% PASS**.

---

## 📤 Submission Details (Requirement Poin 7)

- **Google Sheet URL (Viewer Access):**  
  [https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1sDNtUrvxzJyZjmBazw0MHY1wmn4Ls6rQvxWLrN7jURo/edit?usp=sharing)
- **GitHub Repository:**  
  [https://github.com/Gizkarabagas/astronauts-qa-assessment](https://github.com/Gizkarabagas/astronauts-qa-assessment)
