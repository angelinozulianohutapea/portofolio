/* ==========================================================================
   content.js — SATU-SATUNYA file yang perlu kamu isi.
   Semua halaman dibuat otomatis dari data di sini.

   Isi di bawah diambil dari teks portofolio lamamu. Ubah sesukamu.
   Link GitHub / demo, foto, CV, tahun, dan detail studi kasus sengaja
   dikosongkan: isi sendiri, bagian yang kosong otomatis disembunyikan.

   ATURAN:
   - Field kosong ("" atau []) = bagian itu otomatis disembunyikan.
   - Teks di dalam situs sebaiknya bahasa Inggris.
   - Path gambar relatif terhadap folder utama, contoh: "assets/images/foto.jpg"
   - Buka console browser (F12) untuk melihat daftar field yang masih kosong.
   ========================================================================== */

window.CONTENT = {

  /* ---------- Data dasar ---------- */
  name: "Angeleno Hutapea",
  role: "Computer Vision Developer",
  email: "hutapeaangelino0@gmail.com",

  /* ---------- Beranda ---------- */
  tagline: "Object detection, tracking and 3D perception, built end to end from dataset to deployment.",
  location: "",           // Contoh: "City, Country". Kosong = disembunyikan.

  /* ---------- Tentang ---------- */
  photo: "",              // Contoh: "assets/images/portrait.jpg"
  bio: [
    "I’m a Computer Technology student who builds systems that understand images. I work on object detection, tracking and 3D perception, and I pair it with the engineering to ship it: edge devices, APIs and containers."
  ],
  cv: "",                 // Contoh: "assets/cv/cv.pdf"

  /* ---------- Tautan sosial ----------
     Contoh: { label: "GitHub", url: "https://github.com/usernamekamu" } */
  social: [],

  /* ---------- Form kontak ----------
     URL endpoint Formspree (https://formspree.io/f/xxxxxxx). Kosong = mailto. */
  formEndpoint: "",

  /* ---------- Proyek ----------
     Field opsional: id, year, role, problem, approach, result, images, links.
     images: ["assets/images/p1.jpg", { src: "...", alt: "...", caption: "..." }]
     links:  [{ label: "GitHub", url: "https://..." }] */
  projects: [
    {
      id: "3d-car-classification-counting",
      title: "3D Car Classification & Counting",
      summary: "3D bounding boxes, tracking, car classification and counting on highway scenes using CARLA and DLR data.",
      stack: ["Python", "OpenCV", "CARLA", "3D BBox"],
      year: "", role: "", problem: "", approach: "", result: "", images: [], links: []
    },
    {
      id: "edge-traffic-monitoring",
      title: "Edge Traffic Monitoring",
      summary: "Raspberry Pi edge capture with computer vision inference on a server for traffic monitoring.",
      stack: ["Python", "OpenCV", "Raspberry Pi"],
      year: "", role: "", problem: "", approach: "", result: "", images: [], links: []
    },
    {
      id: "restaurant-microservices-platform",
      title: "Restaurant Microservices Platform",
      summary: "A restaurant ordering platform split into independent services for a distributed systems course.",
      stack: ["Microservices", "Distributed Systems"],
      year: "", role: "", problem: "", approach: "", result: "", images: [], links: []
    },
    {
      id: "bananadryer-system",
      title: "BananaDryer System",
      summary: "Full-stack system for automated banana slicing and drying, with firmware and a monitoring dashboard.",
      stack: ["IoT", "Firmware", "Dashboard"],
      year: "", role: "", problem: "", approach: "", result: "", images: [], links: []
    }
  ],

  /* ---------- Skill ---------- */
  skills: [
    { group: "Computer Vision", items: ["OpenCV", "Object detection", "Tracking", "3D bounding box", "Classification", "Counting"] },
    { group: "Machine Learning", items: ["Python", "Model training", "Dataset preparation", "Evaluation"] },
    { group: "Backend & Deployment", items: ["Docker", "REST API", "Microservices"] },
    { group: "Tools & Hardware", items: ["Raspberry Pi", "CARLA", "Firmware"] }
  ],

  /* ---------- Cara kerja (timeline di beranda) ----------
     { title: "", text: "" } */
  process: [
    { title: "Collect data", text: "Gather and clean footage or simulation data." },
    { title: "Annotate", text: "Label objects and check label quality." },
    { title: "Train", text: "Fit and tune the model on the dataset." },
    { title: "Evaluate", text: "Measure accuracy on unseen scenes." },
    { title: "Optimize", text: "Make it fast enough for the target device." },
    { title: "Deploy", text: "Ship it behind an API or on the edge." }
  ],

  /* ---------- Pengalaman & pendidikan ----------
     { period: "", title: "", org: "", description: "" } */
  experience: [],
  education: []
};