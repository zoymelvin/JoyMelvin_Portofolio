"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Wrench,
  Tv,
  ChevronLeft,
  ChevronRight,
  FolderTree,
  Folder,
  File,
  Moon,
  SunMedium,
  Send,
} from "lucide-react";

// ==========================================
// Data untuk Halaman Ini (DOKIDOKI tetap)
// ==========================================
const projectData = {
  title: "DOKIDOKI – Anime Explorer",
  shortDescription:
    "Aplikasi mobile berbasis Flutter yang dirancang untuk para penggemar anime. Menyediakan cara intuitif untuk menemukan anime baru, melacak daftar tonton, dan mendapatkan informasi detail menggunakan Jikan API.",
  githubUrl: "https://github.com/zoymelvin/DokiDoki",
  gallery: [
    "/projects/dokidoki/dokidoki1.png",
    "/projects/dokidoki/dokidoki2.png",
    "/projects/dokidoki/dokidoki3.png",
    "/projects/dokidoki/dokidoki4.png",
  ],
  galleryCaptions: [
    "Layar Utama menampilkan daftar anime populer dan rekomendasi.",
    "Halaman Detail menunjukkan sinopsis, skor, dan informasi karakter.",
    "Eksplorasi Genre menampilkan kategori genre yang bisa dipilih.",
    "Halaman Watchlist menampilkan daftar anime yang disimpan pengguna.",
  ],
  goal:
    "Menyediakan platform terpusat yang cepat dan ringan di ponsel untuk mencari, menyimpan, dan melacak anime, sebagai solusi mobile-first yang fokus pada pengalaman pengguna.",
  keyFeatures: [
    "Menampilkan daftar anime terpopuler, yang akan datang, dan berdasarkan musim.",
    "Pencarian anime berdasarkan judul dan memfilter berdasarkan genre.",
    "Halaman detail yang komprehensif untuk setiap anime.",
    "Fitur untuk menyimpan anime favorit ke dalam daftar tonton (watchlist).",
  ],
  challenge: {
    title: "Mengelola State Watchlist Secara Efisien",
    problem:
      "Status watchlist harus konsisten di seluruh aplikasi (halaman utama, detail, dan watchlist) secara real-time tanpa delay.",
    solution:
      "Menggunakan Provider sebagai state management. Dengan ChangeNotifierProvider, state watchlist menjadi global. Setiap perubahan akan memanggil notifyListeners() yang secara reaktif memperbarui semua widget yang relevan.",
  },
  techStack: [
    "Flutter",
    "Dart",
    "Provider",
    "Go Router",
    "Jikan API",
    "HTTP",
    "Shared Prefs",
  ],
  prevProject: { name: "BookEat", slug: "bookeat" },
  nextProject: { name: "RasAi", slug: "rasai" },
};

// ==========================================
// Arsitektur (ASCII) → diparse seperti di RasAi
// ==========================================
const projectArchitectureString = `
DokiDoki-AnimeExplorer/
├── lib/
│   ├── core/
│   │   └── anime_api.dart
│   ├── features/
│   │   ├── detail/
│   │   │   └── anime_detail_page.dart
│   │   ├── genre/
│   │   │   └── genre_list_page.dart
│   │   ├── home/
│   │   │   ├── widgets/
│   │   │   └── home_page.dart
│   │   ├── search/
│   │   │   └── search_page.dart
│   │   ├── settings/
│   │   │   ├── settings_page.dart
│   │   │   └── settings_provider.dart
│   │   └── watchlist/
│   │       ├── watchlist_page.dart
│   │       └── watchlist_provider.dart
│   ├── models/
│   │   └── anime.dart
│   ├── providers/
│   │   └── anime_provider.dart
│   └── main.dart
├── assets/
│   └── icons/
└── pubspec.yaml
`;

// ==========================================
// Tipe Data & Parser (disamakan dengan RasAi)
// ==========================================
interface TreeNode {
  name: string;
  children: TreeNode[];
  level: number;
}

// Parser ASCII tree → struktur TreeNode
function parseArchitecture(text: string): TreeNode {
  const lines = text.trim().split("\n");
  const rootName = lines.shift()?.trim().replace(/\/$/, "") || "Project Root";
  const root: TreeNode = { name: rootName, children: [], level: 0 };
  const stack: { node: TreeNode; indent: number }[] = [
    { node: root, indent: -1 },
  ];

  lines.forEach((line) => {
    if (!line.trim()) return;

    // hitung "indent" berbasis jumlah karakter garis & spasi
    const indent = (line.match(/│| /g) || []).join("").length;
    const name = line.replace(/.*[├──└──]\s*/, "").trim();

    const newNode: TreeNode = { name, children: [], level: stack.length };

    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    stack[stack.length - 1].node.children.push(newNode);
    stack.push({ node: newNode, indent });
  });

  return root;
}

const architectureData = parseArchitecture(projectArchitectureString);

// ==========================================
// Komponen UI (Shared)
// ==========================================
function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  return { theme, setTheme };
}

const Navbar: React.FC<{
  onToggleTheme: (theme: string) => void;
  theme: string;
}> = ({ onToggleTheme, theme }) => (
  <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 backdrop-blur bg-zinc-950/60">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Link href="/" className="font-semibold tracking-tight text-white">
        zoymelvin
      </Link>
      <div className="hidden gap-6 md:flex">
        {["tentang", "pendidikan", "skill", "proyek", "sertifikat", "kontak"].map(
          (id) => (
            <Link
              key={id}
              href={`/#${id}`}
              className="text-sm capitalize text-zinc-300 hover:text-indigo-400 transition-colors"
            >
              {id}
            </Link>
          )
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label="Toggle theme"
          onClick={() => onToggleTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl border border-zinc-800 p-2 hover:bg-zinc-800 transition-colors"
        >
          {theme === "dark" ? <SunMedium size={16} /> : <Moon size={16} />}
        </button>
        <Link
          href="/#kontak"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Send size={16} /> Hubungi
        </Link>
      </div>
    </nav>
  </header>
);

// ==========================================
// Carousel (disamakan dengan RasAi)
// - Gambar tengah fade+scale, gambar samping blur kecil
// - Navigasi prev/next sederhana (tanpa drag page/direction)
// ==========================================
const ImageCarousel = ({
  images,
  captions,
}: {
  images: string[];
  captions: string[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute left-0 top-0 w-[20%] h-full bg-gradient-to-r from-zinc-950 z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-[20%] h-full bg-gradient-to-l from-zinc-950 z-20 pointer-events-none"></div>

        <AnimatePresence>
          {/* Gambar Tengah */}
          <motion.div
            key={currentIndex}
            className="absolute z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <img
              src={images[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              className="w-[250px] h-auto object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Gambar Samping */}
          {images.length > 1 && (
            <>
              <motion.div
                key={`${currentIndex}-prev`}
                className="absolute z-0"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: "-120%",
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 0.4,
                  scale: 0.7,
                  x: "-120%",
                  filter: "blur(4px)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <img
                  src={
                    images[(currentIndex - 1 + images.length) % images.length]
                  }
                  className="w-[250px] h-auto object-contain rounded-2xl"
                />
              </motion.div>
              <motion.div
                key={`${currentIndex}-next`}
                className="absolute z-0"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  x: "120%",
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 0.4,
                  scale: 0.7,
                  x: "120%",
                  filter: "blur(4px)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <img
                  src={images[(currentIndex + 1) % images.length]}
                  className="w-[250px] h-auto object-contain rounded-2xl"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="text-center mt-4 w-full px-8 h-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-zinc-400 font-semibold"
          >
            {captions[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ==========================================
// Pohon Arsitektur (disamakan dengan RasAi)
// - TreeNodeComponent dengan garis vertikal/horizontal
// ==========================================
const TreeNodeComponent: React.FC<{ node: TreeNode; isLast: boolean }> = ({
  node,
  isLast,
}) => {
  const isFolder =
    node.children.length > 0 || !node.name.includes(".") || node.name.endsWith("/");

  return (
    <div className="relative pl-8">
      {/* garis vertikal di sisi kiri */}
      <div
        className={`absolute left-[9px] top-0 w-[2px] bg-indigo-900/60 ${
          isLast ? "h-[18px]" : "h-full"
        }`}
      ></div>
      {/* garis horizontal untuk node */}
      <div className="absolute left-[11px] top-[17px] h-[2px] w-4 bg-indigo-900/60"></div>

      <div className="relative flex items-center gap-2 mb-2 pt-1">
        <div className="text-indigo-400">
          {isFolder ? <Folder size={16} /> : <File size={16} />}
        </div>
        <span className="text-zinc-300">{node.name}</span>
      </div>

      {isFolder && (
        <div className="pl-6">
          {node.children.map((child, index) => (
            <TreeNodeComponent
              key={index}
              node={child}
              isLast={index === node.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ArchitectureTree: React.FC<{ data: TreeNode }> = ({ data }) => (
  <div className="font-mono text-sm">
    <div className="flex items-center gap-2 mb-2 text-zinc-300">
      <FolderTree className="text-indigo-400" />
      <span className="font-semibold">{data.name}</span>
    </div>
    <div className="pl-6">
      {data.children.map((child, index) => (
        <TreeNodeComponent
          key={index}
          node={child}
          isLast={index === data.children.length - 1}
        />
      ))}
    </div>
  </div>
);

// --- Komponen Utama Halaman ---
export default function ProjectDetailPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-indigo-400/30">
      <Navbar onToggleTheme={setTheme} theme={theme} />
      <main className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            {projectData.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-zinc-400">
            {projectData.shortDescription}
          </p>
          <a
            href={projectData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-transform hover:scale-105 shadow"
          >
            <Github size={20} /> Lihat Kode di GitHub
          </a>
        </motion.header>

        <div className="mt-16 md:mt-24">
          <h2 className="text-3xl font-bold text-center mb-4">Galeri Proyek</h2>
          <ImageCarousel
            images={projectData.gallery}
            captions={projectData.galleryCaptions}
          />
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold flex items-center gap-3 mb-3">
                <Tv className="text-indigo-400" /> Tujuan Proyek
              </h3>
              <p className="text-zinc-400">{projectData.goal}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold flex items-center gap-3 mb-3">
                <Lightbulb className="text-indigo-400" /> Tantangan & Solusi
              </h3>
              <p className="font-semibold text-zinc-200">
                {projectData.challenge.title}
              </p>
              <p className="text-zinc-400 mt-1">{projectData.challenge.problem}</p>
              <p className="text-zinc-400 mt-2">
                <strong className="text-indigo-400">Solusi:</strong>{" "}
                {projectData.challenge.solution}
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-zinc-800 p-6 bg-zinc-900">
            <h3 className="text-2xl font-semibold flex items-center gap-3 mb-4">
              <CheckCircle className="text-indigo-400" /> Fitur Utama
            </h3>
            <ul className="space-y-3">
              {projectData.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">&#10003;</span>
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h3 className="text-3xl font-bold text-center flex items-center justify-center gap-3 mb-8">
            <FolderTree className="text-indigo-400" /> Arsitektur Proyek
          </h3>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <ArchitectureTree data={architectureData} />
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h3 className="text-3xl font-bold text-center flex items-center justify-center gap-3 mb-8">
            <Wrench className="text-indigo-400" /> Teknologi yang Digunakan
          </h3>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="flex flex-wrap justify-center gap-3">
              {projectData.techStack.map((tech) => (
                <div
                  key={tech}
                  className="rounded-lg bg-indigo-900/50 text-indigo-300 px-4 py-2 text-sm font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-zinc-800 flex justify-between items-center">
          <Link
            href={`/proyek/${projectData.prevProject.slug}`}
            className="flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft size={18} />
            <div>
              <p className="text-xs">Proyek Sebelumnya</p>
              <p className="font-medium">{projectData.prevProject.name}</p>
            </div>
          </Link>
          <Link
            href={`/proyek/${projectData.nextProject.slug}`}
            className="flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors text-right"
          >
            <div>
              <p className="text-xs">Proyek Selanjutnya</p>
              <p className="font-medium">{projectData.nextProject.name}</p>
            </div>
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    </div>
  );
}
