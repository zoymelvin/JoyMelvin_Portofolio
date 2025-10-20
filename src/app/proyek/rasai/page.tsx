"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

/* ==========================================
   Data Halaman
   ========================================== */
const projectData = {
  title: "RasAi – AI Recipe Assistant",
  shortDescription:
    "Aplikasi resep masakan cerdas berbasis Flutter. Pengguna dapat memasukkan bahan yang dimiliki, dan aplikasi akan menghasilkan resep relevan menggunakan AI generatif (Google Generative AI).",
  githubUrl: "https://github.com/zoymelvin/RasAi",
  gallery: ["/projects/rasai/rasai1.png", "/projects/rasai/rasai2.png"],
  galleryCaptions: [
    "Layar utama untuk input bahan melalui teks atau gambar.",
    "Contoh hasil resep yang dihasilkan oleh AI secara lengkap.",
  ],
  goal:
    "Menyediakan solusi praktis bagi pengguna yang bingung ingin memasak apa dengan bahan-bahan yang tersedia di rumah, dengan memanfaatkan kekuatan AI generatif untuk menciptakan resep secara dinamis.",
  keyFeatures: [
    "Input bahan masakan melalui input teks.",
    "Input bahan masakan melalui pengambilan gambar dari kamera atau galeri.",
    "Generasi resep lengkap (bahan, langkah-langkah, tips) berdasarkan input.",
    "Penyimpanan resep favorit secara lokal di perangkat menggunakan Hive.",
  ],
  challenge: {
    title: "Memberikan Feedback Responsif Selama Proses AI",
    problem:
      "Proses generasi resep oleh AI bisa memakan waktu beberapa detik. Tanpa feedback yang jelas, pengguna bisa menganggap aplikasi berhenti merespons atau error.",
    solution:
      "Saya mengimplementasikan state management sederhana untuk melacak status (idle, loading, success, error). Saat permintaan dikirim, UI akan menampilkan indikator loading yang jelas. Setelah AI selesai memproses, hasilnya akan ditampilkan dengan animasi, memberikan pengalaman pengguna yang mulus dan informatif.",
  },
  techStack: [
    "Flutter",
    "Dart",
    "Google AI",
    "Provider",
    "Hive",
    "Image Picker",
    "HTTP",
  ],
  prevProject: { name: "DOKIDOKI", slug: "dokidoki" },
  nextProject: { name: "GadjahDjaya POS", slug: "gadjahdjaya" },
};

const projectArchitectureString = `
RasAi/
├── android/
├── ios/
├── lib/
│   ├── db/
│   │   └── hive_boxes.dart
│   ├── models/
│   │   └── ai_recipe.dart
│   ├── screens/
│   │   ├── detail_screen.dart
│   │   ├── saved_screen.dart
│   │   └── search_screen.dart
│   ├── services/
│   │   └── ai_service.dart
│   ├── widgets/
│   │   └── recipe_card.dart
│   └── main.dart
├── assets/
│   └── images/
├── test/
│   └── widget_test.dart
├── pubspec.yaml
└── README.md
`;

/* ==========================================
   Tipe & Parser Arsitektur
   ========================================== */
interface TreeNode {
  name: string;
  children: TreeNode[];
  level: number;
}

function parseArchitecture(text: string): TreeNode {
  const lines = text.trim().split("\n");
  const rootName = lines.shift()?.trim().replace(/\/$/, "") || "Project Root";
  const root: TreeNode = { name: rootName, children: [], level: 0 };
  const stack: { node: TreeNode; indent: number }[] = [
    { node: root, indent: -1 },
  ];

  lines.forEach((line) => {
    if (!line.trim()) return;

    const indent = (line.match(/│| /g) || []).join("").length;
    // lebih aman: cari marker "├──" atau "└──"
    const name = line.replace(/^.*?(?:├──|└──)\s*/, "").trim();

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

/* ==========================================
   UI: Theme + Navbar
   ========================================== */
function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

const Navbar: React.FC<{
  onToggleTheme: (t: string) => void;
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

/* ==========================================
   Carousel (next/image + animasi)
   ========================================== */
const CarouselImageCenter: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div className="relative w-[250px] h-[500px]">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain rounded-2xl shadow-2xl"
      sizes="(max-width: 768px) 250px, 250px"
      priority={false}
    />
  </div>
);

const CarouselImageSide: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <div className="relative w-[250px] h-[500px]">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain rounded-2xl"
      sizes="(max-width: 768px) 250px, 250px"
      priority={false}
    />
  </div>
);

const ImageCarousel: React.FC<{
  images: string[];
  captions: string[];
}> = ({ images, captions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => setCurrentIndex((p) => (p + 1) % images.length);
  const handlePrev = () =>
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute left-0 top-0 w-[20%] h-full bg-gradient-to-r from-zinc-950 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-[20%] h-full bg-gradient-to-l from-zinc-950 z-20 pointer-events-none" />

        <AnimatePresence>
          <motion.div
            key={`center-${currentIndex}`}
            className="absolute z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <CarouselImageCenter
              src={images[currentIndex]}
              alt={`RasAi screenshot ${currentIndex + 1}`}
            />
          </motion.div>

          {images.length > 1 && (
            <>
              <motion.div
                key={`prev-${currentIndex}`}
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
                <CarouselImageSide
                  src={images[(currentIndex - 1 + images.length) % images.length]}
                  alt={`RasAi screenshot ${
                    ((currentIndex - 1 + images.length) % images.length) + 1
                  }`}
                />
              </motion.div>

              <motion.div
                key={`next-${currentIndex}`}
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
                <CarouselImageSide
                  src={images[(currentIndex + 1) % images.length]}
                  alt={`RasAi screenshot ${
                    ((currentIndex + 1) % images.length) + 1
                  }`}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <button
          onClick={handlePrev}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
          aria-label="Sebelumnya"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
          aria-label="Berikutnya"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="text-center mt-4 w-full px-8 h-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={`cap-${currentIndex}`}
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

/* ==========================================
   Arsitektur (visual)
   ========================================== */
const TreeNodeComponent: React.FC<{ node: TreeNode; isLast: boolean }> = ({
  node,
  isLast,
}) => {
  const isFolder =
    node.children.length > 0 || !node.name.includes(".") || node.name.endsWith("/");
  return (
    <div className="relative pl-8">
      <div
        className={`absolute left-[9px] top-0 w-[2px] bg-indigo-900/60 ${
          isLast ? "h-[18px]" : "h-full"
        }`}
      />
      <div className="absolute left-[11px] top-[17px] h-[2px] w-4 bg-indigo-900/60" />
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

/* ==========================================
   Halaman
   ========================================== */
export default function ProjectDetailPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-indigo-400/30">
      <Navbar onToggleTheme={setTheme} theme={theme} />

      <main className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
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

        {/* Galeri */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-3xl font-bold text-center mb-4">Galeri Proyek</h2>
          <ImageCarousel
            images={projectData.gallery}
            captions={projectData.galleryCaptions}
          />
        </div>

        {/* Tujuan, Tantangan & Solusi + Fitur + Teknologi */}
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
              <p className="text-zinc-400 mt-1">
                {projectData.challenge.problem}
              </p>
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

          {/* Teknologi yang Digunakan — Full Width & di tengah */}
          <div className="md:col-span-2 mt-12">
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
        </div>

        {/* Arsitektur */}
        <div className="mt-16 md:mt-24">
          <h3 className="text-3xl font-bold text-center flex items-center justify-center gap-3 mb-8">
            <FolderTree className="text-indigo-400" /> Arsitektur Proyek
          </h3>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <ArchitectureTree data={architectureData} />
          </div>
        </div>

        {/* Navigasi bawah */}
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
