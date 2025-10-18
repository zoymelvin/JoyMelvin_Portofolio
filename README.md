# Portofolio Pribadi - Joy Melvin Ginting

Selamat datang di repositori kode sumber untuk portofolio web pribadi saya. Website ini dibangun menggunakan Next.js, TypeScript, dan Tailwind CSS untuk menampilkan profil, proyek-proyek, keahlian, dan pengalaman saya.

**Live Demo:** [Tautan ke website portofolio Anda] (Tambahkan tautan jika sudah di-deploy)

## Fitur Utama

Website portofolio ini mencakup beberapa bagian utama:

  * **Beranda (Home/Hero):** Bagian perkenalan singkat tentang diri saya.
  * **Tentang Saya (About Me):** Informasi lebih detail mengenai latar belakang, minat, dan tujuan saya.
  * **Proyek (Projects):** Galeri proyek-proyek yang pernah saya kerjakan, termasuk:
      * **GadjahDjaya:** Aplikasi POS Android.
      * **BookEat:** Aplikasi pemesanan makanan Android.
      * **RasAi:** Aplikasi resep masakan berbasis AI (Flutter).
      * **DokiDoki:** (Deskripsi singkat proyek DokiDoki).
  * **Keahlian (Skills):** Daftar teknologi dan keahlian yang saya kuasai.
  * **Sertifikat (Certificates):** Kumpulan sertifikat relevan yang saya miliki.
  * **Kontak (Contact):** Informasi kontak atau formulir untuk menghubungi saya.
  * **Unduh CV:** Tautan untuk mengunduh CV terbaru saya dalam format PDF.

## Teknologi yang Digunakan

Project ini dibangun menggunakan tumpukan teknologi web modern:

  * **Framework:** [Next.js](https://nextjs.org/) (React Framework for Production)
  * **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
  * **Animasi:** [Framer Motion](https://www.framer.com/motion/) (Kemungkinan digunakan untuk animasi, berdasarkan dependensi)
  * **Linting/Formatting:** ESLint, Prettier
  * **Ikon:** React Icons

## Prasyarat Instalasi

Sebelum Anda dapat menjalankan project ini secara lokal, pastikan Anda memiliki:

1.  **Node.js:** Versi 18.x atau yang lebih baru.
2.  **npm** atau **yarn** (Package Manager).

## Susunan Project

Struktur file utama dalam project Next.js ini diatur sebagai berikut:

```
Portofolio_JoyMelvin/
├── public/
│   ├── projects/       (Gambar-gambar untuk setiap proyek)
│   ├── sertifikat/     (File sertifikat dalam format PDF)
│   ├── cv-joy-melvin-ginting.pdf (File CV)
│   └── (File-file statis lainnya seperti SVG)
├── src/
│   ├── app/
│   │   ├── globals.css   (Style global Tailwind)
│   │   ├── layout.tsx    (Layout utama aplikasi)
│   │   ├── page.tsx      (Komponen utama halaman)
│   │   └── PortfolioJoy.tsx (Kemungkinan komponen utama portofolio)
│   └── (Komponen-komponen lain mungkin ada di sini)
├── next.config.ts        (Konfigurasi Next.js)
├── package.json          (Daftar dependensi dan script)
├── tailwind.config.ts    (Konfigurasi Tailwind CSS)
├── tsconfig.json         (Konfigurasi TypeScript)
└── README.md             (Dokumentasi project)
```
