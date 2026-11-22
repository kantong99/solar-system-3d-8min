FOLDER public/ — FILE AUDIO

File ini dibuat otomatis oleh GitHub Actions. Tidak perlu diupload manual dan tidak perlu API key.

1. voiceover.mp3  dibuat oleh scripts/make-voice.py memakai gTTS (suara Google, gratis).
   Untuk ganti aksen, ubah VOICE_TLD di workflow: com (US), co.uk (UK), com.au (Australia).

2. music.mp3  dibuat oleh scripts/make-music.sh (pad drone sederhana, bebas hak cipta).
   Jika ingin musik lain, upload file lisensi Anda ke public/music.mp3 dan hapus langkah
   "Buat musik latar" dari render.yml.
