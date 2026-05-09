# Page Design Spec — District Season Calculation

## Global Styles (Desktop-first)
- Color tokens:
  - Primary background: #FFFFFF
  - Surface/card: #FFFFFF (border tipis abu)
  - Secondary/Accent (merah): #D32F2F (hover: #B71C1C)
  - Text utama: #111827
  - Text sekunder: #6B7280
  - Border: #E5E7EB
  - Focus ring: merah 30% opacity
- Typography:
  - Base: 16px; Heading scale: 28/22/18
  - Font: system-ui / Inter-like
- Buttons:
  - Primary button: background merah, teks putih, radius 10–12px
  - Secondary button: outline border abu/merah, background putih
  - Hover: gelap 8–12%, active: scale ringan
- Links:
  - Merah, underline saat hover
- Spacing:
  - 8px grid; container max-width ~ 1040–1200px (desktop)

## Page: Halaman Kalkulator

### Layout
- Desktop-first dengan CSS Grid + Flexbox.
- Struktur utama: container terpusat (max-width), dengan 2 kolom di desktop:
  - Kiri: Form Input (lebih lebar)
  - Kanan: Panel Hasil (sticky ringan opsional bila tinggi cukup)
- Breakpoints:
  - >=1024px: 2 kolom (mis. 7/5)
  - 640–1023px: 1 kolom, urutan Form lalu Hasil
  - <640px: 1 kolom, padding diperkecil, tombol full-width

### Meta Information
- Title: "District Season Calculation"
- Description: "Hitung district season dengan cepat dari parameter yang kamu masukkan."
- Open Graph:
  - og:title sama dengan title
  - og:description sama dengan description
  - og:type: website

### Page Structure
1. Top Bar / Header
2. Main Content (Grid)
3. Footer mini

### Sections & Components
1) Header
- Kiri: nama aplikasi.
- Kanan: anchor link ke “Bantuan” (scroll ke section bantuan di bawah form), dan toggle tema opsional bila memang ada.

2) Form Input Card
- Card putih dengan border #E5E7EB dan shadow halus.
- Elemen:
  - Judul: “Input Parameter”
  - Kumpulan field input (text/number/select sesuai kebutuhan kalkulasi)
  - Validasi inline per field (teks merah kecil, tidak mengganggu)
  - Aksi:
    - Primary: “Hitung”
    - Secondary: “Reset”
- States:
  - Disabled state saat input invalid
  - Focus state jelas (ring merah tipis)

3) Results Panel Card
- Menampilkan:
  - Ringkasan hasil (angka utama besar)
  - Detail hasil (tabel sederhana: label kiri, nilai kanan)
  - Empty state: instruksi singkat “Isi parameter lalu tekan Hitung.”
- Aksesibilitas:
  - Pastikan kontras teks mencukupi, angka utama mudah dibaca.

4) Bantuan Singkat (Inline / Collapsible)
- Section di bawah form (atau di bawah halaman pada mobile).
- Isi: cara mengisi input, arti hasil, dan catatan bila ada.

5) Footer
- Teks kecil: versi/credit (opsional), tidak menambah navigasi baru.
