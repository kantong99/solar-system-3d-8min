"""Narasi gratis dengan gTTS (Google TTS), per kalimat, dengan jeda dan durasi pas per scene.

Tidak butuh API key. Suara yang dihasilkan adalah suara Google (wanita, aksen netral).
Aksen bisa diubah lewat VOICE_TLD: com (US), co.uk (UK), com.au (Australia), ca (Kanada), co.in (India).
"""
import json
import os
import re
import subprocess
import time

from gtts import gTTS

FPS = 30
GAP_SEC = 0.6        # jeda antar kalimat (detik)
MAX_SPEEDUP = 1.08   # batas percepatan; di atas ini suara jadi terdengar terburu-buru
VOICE_TLD = os.environ.get('VOICE_TLD', 'com')
OUT = 'out/voice'

os.makedirs(OUT, exist_ok=True)
os.makedirs('public', exist_ok=True)


def run(cmd):
    subprocess.run(cmd, check=True)


def duration(path):
    r = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path],
        capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def tts(text, path):
    gTTS(text=text, lang='en', tld=VOICE_TLD, slow=False).save(path)
    time.sleep(0.5)


gap = f'{OUT}/gap.wav'
run(['ffmpeg', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-t', str(GAP_SEC), gap])

with open('src/data/voiceover.json', encoding='utf-8') as f:
    data = json.load(f)

scene_wavs = []
for sc in data['scenes']:
    target = sc['dur'] / FPS
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', sc['text']) if s.strip()]

    parts = []
    for i, s in enumerate(sentences):
        mp3 = f"{OUT}/{sc['id']}_{i:03d}.mp3"
        wav = mp3[:-4] + '.wav'
        tts(s, mp3)
        run(['ffmpeg', '-y', '-i', mp3, '-ar', '44100', '-ac', '2', wav])
        parts.append(os.path.abspath(wav))
        parts.append(os.path.abspath(gap))

    listfile = f"{OUT}/{sc['id']}_list.txt"
    with open(listfile, 'w', encoding='utf-8') as f:
        for p in parts:
            f.write(f"file '{p}'\n")

    raw = f"{OUT}/{sc['id']}_raw.wav"
    run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', listfile, '-c', 'copy', raw])

    speech = duration(raw)
    ratio = speech / target
    filters = []
    if ratio > 1.0:
        filters.append(f'atempo={min(ratio, MAX_SPEEDUP):.4f}')
        if ratio > MAX_SPEEDUP:
            print(f"PERINGATAN {sc['id']}: narasi {speech:.1f}s, scene {target:.1f}s. Naskah perlu dipendekkan.")
    filters.append('apad')

    seg = f"{OUT}/{sc['id']}_seg.wav"
    run(['ffmpeg', '-y', '-i', raw, '-af', ','.join(filters), '-t', f'{target:.3f}',
         '-ar', '44100', '-ac', '2', seg])
    scene_wavs.append(os.path.abspath(seg))
    print(f"{sc['id']}: narasi {speech:.1f}s / scene {target:.1f}s, {len(sentences)} kalimat")

listall = f'{OUT}/all.txt'
with open(listall, 'w', encoding='utf-8') as f:
    for p in scene_wavs:
        f.write(f"file '{p}'\n")

run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', listall,
     '-c:a', 'libmp3lame', '-b:a', '192k', 'public/voiceover.mp3'])
print('public/voiceover.mp3 dibuat')
