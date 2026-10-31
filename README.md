# Portfolio — Angeleno Hutapea

Situs statis (HTML + CSS + JS biasa). Tanpa build, tanpa loading screen, tanpa data demo.

## Cara mengisi
Buka **js/content.js** lalu isi field-nya. Field kosong otomatis disembunyikan.
Buka console browser (F12) untuk melihat daftar field yang masih kosong.

## Folder aset
- assets/images/  → foto diri, gambar proyek (JPG/WebP, lebar 1600px untuk gambar proyek, 1200x1500 untuk foto)
- assets/cv/      → cv.pdf

## Jalankan lokal
Klik dua kali index.html, atau (disarankan):
    python3 -m http.server 8000
lalu buka http://localhost:8000

## Deploy gratis
Upload seluruh folder ke Netlify (drag & drop), Vercel, atau GitHub Pages.
Setelah punya domain, ganti YOUR-DOMAIN di sitemap.xml dan robots.txt.

## Form kontak
Daftar di formspree.io, buat form dengan email tujuan hutapeaangelino0@gmail.com,
lalu tempel URL-nya ke `formEndpoint` di content.js. Tanpa itu, tombol kirim membuka aplikasi email.

## Kontrol
- Tombol Light/Dark di pojok kanan atas (tersimpan).
- Tekan **D** (desktop) untuk mematikan/menyalakan overlay "detection".
