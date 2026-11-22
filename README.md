# Solar System 3D: How Far Is Far?

Video 16:9, 1920×1080, 30 fps, durasi 8:08 (14640 frame). Komposisi: `SolarSystem`.
Narasi bahasa Inggris dari ElevenLabs, musik latar, subtitle, dan scene 3D (React Three Fiber).

> **Status:** kode belum dijalankan di GitHub. Jalankan dulu satu kali dan kirim log jika ada error.

## Isi video (10 scene)

1. Pembuka (0:00–0:35)
2. Skala Matahari dibanding Bumi (0:35–1:20)
3. Bulan naik sepeda 20 km/jam (1:20–2:10)
4. Matahari naik sepeda, pesawat, dan cahaya (2:10–3:00)
5. Orbit planet dari atas (3:00–3:50)
6. Kecepatan orbit Bumi (3:50–4:40)
7. Waktu tempuh cahaya (4:40–5:30)
8. Ukuran planet sesuai skala (5:30–6:25)
9. Voyager 1 menuju Matahari (6:25–7:20)
10. Penutup (7:20–8:08)

## Yang sesuai skala dan yang tidak

- **Sesuai skala:** ukuran planet satu sama lain (scene 8), dan perbandingan ukuran Matahari dengan Bumi (scene 2).
- **Tidak sesuai skala:** jarak orbit planet (scene 5 dan 7) dan posisi Voyager (scene 9). Angka di teks selalu jarak asli.

## Narasi

Narasi memakai gTTS (Google TTS), gratis, tanpa API key. Aksen bisa diubah lewat `VOICE_TLD` di `make-voice.py` atau di env workflow (com, co.uk, com.au, ca).

## Menjalankan

Tab **Actions → Render Solar System 3D → Run workflow**. Hasilnya ada di bagian Artifacts sebagai `SolarSystem-3D-1080p`.

Urutan langkah di workflow: buat narasi → buat musik → install → render → upload.

## Data dan sumber

- Jarak dan diameter planet: NASA Planetary Fact Sheet (rata-rata, dibulatkan).
- Kecepatan sepeda 20 km/jam dan jet 900 km/jam adalah asumsi untuk perbandingan.
- Kecepatan cahaya sekitar 300.000 km/s. Waktu tempuh dihitung dari jarak rata-rata.
- Kecepatan Voyager 1 sekitar 17 km/s, dibulatkan.

## Subtitle

- `src/subtitles.json` dipakai komponen `Captions`.
- Jalankan `npm run subtitles` setiap kali naskah di `src/data/voiceover.json` diubah.

## Catatan jeda narasi

Setiap kalimat dipisah dengan jeda 0,6 detik. Jika narasi satu scene lebih panjang dari durasi scene, kecepatannya dinaikkan maksimal 1,08×. Jika masih lebih panjang, log akan menampilkan `PERINGATAN` dan naskah perlu dipendekkan.
