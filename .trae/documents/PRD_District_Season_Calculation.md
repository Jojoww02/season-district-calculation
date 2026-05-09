## 1. Product Overview
District Season Calculation adalah web app sederhana untuk menghitung hasil “district season” berdasarkan input yang kamu masukkan.
Fokusnya: cepat, akurat, dan nyaman dipakai di desktop maupun mobile dengan UI clean (utama putih, aksen merah).

## 2. Core Features

### 2.1 Feature Module
Aplikasi ini terdiri dari halaman utama berikut:
1. **Halaman Kalkulator**: navigasi/branding, form input parameter, tombol hitung/reset, tampilan hasil perhitungan.

### 2.3 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| Halaman Kalkulator | Header / Identitas | Menampilkan judul aplikasi dan area navigasi sederhana (mis. tautan ke bagian panduan di halaman yang sama). |
| Halaman Kalkulator | Form Input | Mengisi parameter perhitungan district season (field jelas, label ringkas, placeholder, satuan bila ada). |
| Halaman Kalkulator | Validasi | Memvalidasi input wajib dan format angka; menampilkan pesan error yang spesifik per field. |
| Halaman Kalkulator | Aksi Kalkulasi | Menjalankan perhitungan saat tombol “Hitung” ditekan; mencegah kalkulasi bila input tidak valid. |
| Halaman Kalkulator | Hasil Perhitungan | Menampilkan hasil dalam format ringkasan dan/atau tabel yang mudah dipindai; menonjolkan angka utama. |
| Halaman Kalkulator | Reset / Ulangi | Mengosongkan input dan hasil untuk memulai perhitungan baru. |
| Halaman Kalkulator | Bantuan Singkat | Menampilkan panduan singkat (inline section/collapse) tentang cara mengisi input dan membaca hasil. |

## 3. Core Process
Alur pengguna:
1. Kamu membuka Halaman Kalkulator.
2. Kamu mengisi semua parameter yang diperlukan pada Form Input.
3. Kamu menekan tombol “Hitung”. Sistem memvalidasi input, lalu menjalankan kalkulasi.
4. Kamu melihat hasil perhitungan pada bagian Hasil Perhitungan.
5. Kamu dapat mengubah input untuk mencoba skenario lain, atau menekan “Reset” untuk mengulang.

```mermaid
graph TD
  A["Halaman Kalkulator"]
```
