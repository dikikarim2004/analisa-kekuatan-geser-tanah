# Analisis Kekuatan Geser Tanah - Web Aplikasi

Aplikasi web interaktif untuk analisis kekuatan geser tanah menggunakan React.js dengan fitur kalkulator, visualisasi grafik, dan simulator uji tanah.

## 🚀 Fitur Utama

### 1. Kalkulator Kekuatan Geser Tanah
- **Input Parameter:**
  - Kadar air tanah (%)
  - Kepadatan tanah (g/cm³)
  - Sudut geser dalam (φ) - derajat
  - Kohesi (c) - kPa
  - Tekanan efektif (σ') - kPa

- **Output:**
  - Kekuatan geser tanah (kPa)
  - Faktor keamanan
  - Grafik hubungan parameter

### 2. Visualisasi Grafik dan Diagram
- **Grafik Mohr-Coulomb:** Lingkaran Mohr dan garis kegagalan
- **Grafik Triaksial:** Deformasi vs tegangan deviator
- **Grafik Konsolidasi:** Derajat konsolidasi vs waktu (skala log)
- **Grafik Pemadatan Proctor:** Kadar air vs kepadatan kering

### 3. Simulator Uji Tanah
- **Uji Geser Langsung:** Simulasi pengujian geser langsung
- **Uji Triaksial:** Simulasi pengujian triaksial
- **Uji Konsolidasi:** Simulasi pengujian konsolidasi
- **Uji Pemadatan Proctor:** Simulasi pengujian pemadatan

## 🛠️ Teknologi yang Digunakan

- **Frontend:** React.js 18
- **UI Framework:** Material-UI (MUI) v5
- **Charts:** Chart.js dengan react-chartjs-2
- **Styling:** CSS3 dengan Material Design
- **State Management:** React Hooks (useState, useEffect)

## 📦 Instalasi dan Setup

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd geser-tanah-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan aplikasi**
   ```bash
   npm start
   ```

4. **Buka browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Struktur Proyek

```
src/
├── components/
│   ├── KalkulatorGeser.js      # Kalkulator kekuatan geser
│   ├── VisualisasiGrafik.js    # Komponen grafik dan diagram
│   └── SimulatorUji.js         # Simulator uji tanah
├── App.js                       # Komponen utama aplikasi
├── index.js                     # Entry point
└── index.css                    # Styling global
```

## 📊 Penggunaan Aplikasi

### Kalkulator Geser
1. Masukkan parameter tanah pada form input
2. Klik tombol "Hitung Kekuatan Geser"
3. Lihat hasil perhitungan dan grafik parameter

### Visualisasi Grafik
1. Pilih jenis grafik dari tab yang tersedia
2. Analisis data yang ditampilkan
3. Gunakan untuk pembelajaran dan referensi

### Simulator Uji
1. Pilih jenis uji yang ingin disimulasikan
2. Atur parameter uji menggunakan slider
3. Klik tombol "Mulai Uji" untuk menjalankan simulasi
4. Lihat progress dan hasil uji

## 🧮 Rumus Perhitungan

### Kekuatan Geser Tanah (Mohr-Coulomb)
```
τ = c + σ' × tan(φ)

Dimana:
τ = Kekuatan geser tanah (kPa)
c = Kohesi (kPa)
σ' = Tekanan efektif (kPa)
φ = Sudut geser dalam (derajat)
```

### Faktor Keamanan
```
FS = τ / (σ' × 0.5)

Dimana:
FS = Faktor keamanan
τ = Kekuatan geser tanah (kPa)
σ' = Tekanan efektif (kPa)
```

## 🎯 Target Pengguna

- **Mahasiswa:** Pembelajaran geoteknik dan mekanika tanah
- **Dosen:** Media pengajaran dan demonstrasi
- **Engineer:** Analisis cepat dan referensi
- **Peneliti:** Simulasi dan analisis data
- **Konsultan:** Laporan dan presentasi klien

## 🔮 Fitur Masa Depan

- [ ] Integrasi dengan backend Node.js
- [ ] Database parameter tanah
- [ ] Export hasil ke PDF/Excel
- [ ] Analisis stabilitas lereng
- [ ] 3D visualization
- [ ] Mobile application
- [ ] Real-time data monitoring
- [ ] Machine learning untuk prediksi

## 📝 Lisensi

Proyek ini dibuat untuk tujuan pendidikan dan penelitian dalam bidang geoteknik.

## 👥 Kontribusi

Kontribusi untuk pengembangan aplikasi sangat dihargai. Silakan buat pull request atau laporkan issue yang ditemukan.

## 📞 Kontak

Untuk pertanyaan atau saran, silakan hubungi tim pengembang.

---

**Dibuat dengan ❤️ untuk kemajuan pendidikan geoteknik di Indonesia**
