/* ==========================================================================
   content.js — SATU-SATUNYA file yang perlu kamu isi.
   Semua halaman dibuat otomatis dari data di sini.

   ATURAN:
   - Field kosong ("" atau []) = bagian itu otomatis disembunyikan. Tidak akan ada
     kotak kosong atau tulisan "undefined".
   - Teks di dalam situs sebaiknya bahasa Inggris (sesuai situsnya).
   - Path gambar relatif terhadap folder utama, contoh: "assets/images/foto.jpg"
   - Buka console browser (F12) untuk melihat daftar field yang masih kosong.
   ========================================================================== */

window.CONTENT = {

  /* ---------- Data dasar (sudah terisi) ---------- */
  name: "Angeleno Hutapea",
  role: "Computer Vision Developer",
  email: "hutapeaangelino0@gmail.com",

  /* ---------- Beranda ---------- */
  tagline: "",            // Satu kalimat singkat di bawah nama. Kosong = disembunyikan.
  location: "",           // Contoh: "City, Country". Kosong = disembunyikan.

  /* ---------- Tentang ---------- */
  photo: "",              // Contoh: "assets/images/portrait.jpg". Kosong = tidak tampil.
  bio: [],                // Daftar paragraf. Contoh: ["Paragraf 1.", "Paragraf 2."]
  cv: "",                 // Contoh: "assets/cv/cv.pdf". Kosong = tombol CV disembunyikan.

  /* ---------- Tautan sosial ---------- */
  // Contoh isi: { label: "GitHub", url: "https://github.com/usernamekamu" }
  social: [],

  /* ---------- Form kontak ---------- */
  // Isi dengan URL endpoint Formspree (https://formspree.io/f/xxxxxxx) agar pesan masuk
  // ke emailmu. Kosong = tombol kirim akan membuka aplikasi email (mailto).
  formEndpoint: "",

  /* ---------- Proyek ----------
     Salin blok di bawah, hapus tanda komentar, lalu isi. Semua field opsional
     kecuali "title". Urutan di sini = urutan tampil di situs.

     {
       id: "nama-unik-tanpa-spasi",   // dipakai di URL, opsional
       title: "",
       year: "",
       role: "",                      // peranmu di proyek ini
       summary: "",                   // 1-2 kalimat
       problem: "",
       approach: "",
       result: "",
       stack: [],                     // contoh: ["Python", "OpenCV"]
       images: [],                    // contoh: ["assets/images/p1-a.jpg", { src: "...", alt: "...", caption: "..." }]
       links: []                      // contoh: [{ label: "GitHub", url: "https://..." }]
     }
  ---------------------------------------------------------------------- */
  projects: [],

  /* ---------- Skill ----------
     Pilih salah satu bentuk:
       skills: ["Python", "OpenCV"]
       skills: [{ group: "Computer Vision", items: ["..."] }, { group: "Tools", items: ["..."] }]
  ---------------------------------------------------------------------- */
  skills: [],

  /* ---------- Pengalaman & pendidikan ----------
     { period: "", title: "", org: "", description: "" }
  ---------------------------------------------------------------------- */
  experience: [],
  education: []
};
