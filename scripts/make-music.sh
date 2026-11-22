#!/usr/bin/env bash
# Musik latar sederhana yang dibuat sendiri (pad drone), bebas hak cipta.
# Ganti dengan musik lisensi Anda jika mau: simpan sebagai public/music.mp3.
set -euo pipefail
mkdir -p public
DUR=488
ffmpeg -y \
  -f lavfi -i "sine=frequency=110:duration=${DUR}" \
  -f lavfi -i "sine=frequency=165:duration=${DUR}" \
  -f lavfi -i "sine=frequency=220:duration=${DUR}" \
  -filter_complex "[0][1][2]amix=inputs=3,lowpass=f=900,tremolo=f=0.1:d=0.4,afade=t=in:st=0:d=4,afade=t=out:st=$((DUR-6)):d=6,volume=0.5[a]" \
  -map "[a]" -c:a libmp3lame -b:a 128k public/music.mp3
echo "public/music.mp3 dibuat"
