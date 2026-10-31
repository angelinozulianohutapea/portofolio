# Portfolio — Angeleno Hutapea

Portofolio pribadi Computer Vision Developer. Situs statis (HTML + CSS + JavaScript biasa), tanpa framework, tanpa build step, tanpa loading screen.

Semua isi situs (bio, proyek, skill, tautan) dibaca dari **satu file**: `js/content.js`. Bagian yang dikosongkan otomatis disembunyikan, jadi tidak ada kotak kosong atau tulisan "undefined".

## Fitur

- 5 halaman: beranda, daftar proyek, detail proyek, tentang, kontak
- Halaman detail proyek dibuat otomatis dari data (`project.html?id=...`)
- Overlay "detection": kotak dan label mengikuti kursor, dibuat dari ukuran elemen halaman yang sebenarnya (tekan **D** untuk mematikan atau menyalakan)
- Mode gelap dan terang (tombol di pojok kanan atas, tersimpan di browser)
- Transisi tirai saat pindah halaman, marquee, timeline proses yang terisi saat di-scroll
- Form kontak dengan validasi (Formspree, atau membuka aplikasi email sebagai cadangan)
- Responsif, mendukung `prefers-reduced-motion`, HTML semantik, meta SEO dasar

## Struktur folder

```
portfolio/
├── index.html        Beranda
├── projects.html     Daftar proyek
├── project.html      Template detail proyek (?id=...)
├── about.html        Tentang
├── contact.html      Kontak
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css     Semua gaya dan warna
├── js/
│   ├── content.js    <- SATU-SATUNYA file yang biasa kamu edit
│   └── main.js       Logika halaman dan efek (tidak perlu diubah)
└── assets/
    ├── images/       Foto diri dan gambar proyek
    └── cv/           cv.pdf
```

## Mengisi konten

Buka `js/content.js` dan ubah nilainya. Semua field punya komentar penjelasan di dalam file.

| Field | Fungsi | Jika dikosongkan |
|---|---|---|
| `tagline` | Kalimat di bawah nama | Disembunyikan |
| `location` | Lokasi | Disembunyikan |
| `photo` | Path foto, contoh `assets/images/portrait.jpg` | Disembunyikan |
| `bio` | Daftar paragraf | Bagian About di beranda mengecil |
| `cv` | Path PDF, contoh `assets/cv/cv.pdf` | Tombol CV hilang |
| `social` | `[{ label: "GitHub", url: "https://..." }]` | Disembunyikan |
| `projects` | Daftar proyek (lihat di bawah) | Menu Work dan section proyek hilang |
| `skills` | Kelompok skill | Section Skills dan marquee hilang |
| `process` | Tahap kerja untuk timeline | Section hilang |
| `experience`, `education` | Riwayat di halaman About | Disembunyikan |
| `formEndpoint` | URL Formspree | Tombol kirim membuka aplikasi email |

Contoh satu proyek lengkap:

```js
{
  id: "nama-unik-tanpa-spasi",
  title: "Judul Proyek",
  year: "2025",
  role: "Peranmu",
  summary: "Ringkasan 1-2 kalimat.",
  problem: "Masalah yang diselesaikan.",
  approach: "Pendekatan yang dipakai.",
  result: "Hasil yang dicapai.",
  stack: ["Python", "OpenCV"],
  images: ["assets/images/proyek-1.jpg"],
  links: [{ label: "GitHub", url: "https://github.com/..." }]
}
```

Hanya `title` yang wajib. Buka console browser (F12) untuk melihat daftar field yang masih kosong.

Ukuran gambar yang disarankan: foto diri 1200x1500 px, gambar proyek lebar 1600 px. Format JPG atau WebP, usahakan di bawah 500 KB per gambar.

## Menjalankan di komputer sendiri

Butuh Python 3 (sudah ada di Ubuntu). Dari folder proyek:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`. Setiap kali mengubah file, cukup refresh browser (Ctrl+Shift+R jika masih tampil versi lama).

Font dimuat dari Google Fonts, jadi perlu internet agar tampilannya sesuai desain.

## Mengirim ke GitHub

```bash
git add .
git commit -m "Update content"
git push
```

## Deploy gratis

**GitHub Pages**
1. Buka repo di GitHub, lalu Settings, Pages.
2. Source: Deploy from a branch. Branch: `main`, folder: `/ (root)`. Klik Save.
3. Situs aktif dalam 1-2 menit di `https://USERNAME.github.io/NAMA-REPO/`.

**Netlify atau Vercel**: seret folder proyek ke dashboard, atau hubungkan ke repo GitHub. Tidak perlu pengaturan build.

Setelah punya alamat situs, ganti `YOUR-DOMAIN` di `sitemap.xml` dan `robots.txt` dengan alamat tersebut.

## Form kontak

1. Daftar di [formspree.io](https://formspree.io) dan buat form dengan email tujuan sendiri.
2. Salin URL form (bentuknya `https://formspree.io/f/xxxxxxx`).
3. Tempel ke `formEndpoint` di `js/content.js`.

Tanpa `formEndpoint`, tombol kirim membuka aplikasi email dengan pesan yang sudah terisi.

## Mengubah tampilan

Warna ada di bagian atas `css/style.css`:

```css
:root{
  --bg:#0d0d0c;   /* latar */
  --fg:#ece8df;   /* teks */
  --ac:#ff9a3d;   /* aksen oranye */
}
```

Versi terang ada di blok `:root[data-theme="light"]` tepat di bawahnya. Aksen sengaja dipakai hemat: hover judul proyek, kotak detection, dan garis timeline.

## Kontrol

| Aksi | Hasil |
|---|---|
| Tombol Light/Dark | Ganti tema (tersimpan) |
| Tombol **D** (desktop) | Matikan atau nyalakan overlay detection |

## Pemecahan masalah

- **Halaman kosong atau hanya terlihat header:** pastikan `js/content.js` dan `js/main.js` ada di folder `js/`, dan `style.css` ada di folder `css/`.
- **Gambar tidak muncul:** periksa path di `content.js` (huruf besar dan kecil dibedakan) dan pastikan file ada di `assets/images/`. Gambar yang gagal dimuat ditampilkan sebagai kotak "Image not found".
- **Halaman proyek bertuliskan "Project not found":** nilai `id` di URL harus sama dengan `id` proyek di `content.js`.
- **Perubahan tidak terlihat setelah deploy:** tunggu 1-2 menit lalu refresh dengan Ctrl+Shift+R.

## Kontak

hutapeaangelino0@gmail.com