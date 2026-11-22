// Timing scene dalam frame (30 fps). Total = 14640 frame = 8:08.
export type SceneId =
  | 'S01' | 'S02' | 'S03' | 'S04' | 'S05'
  | 'S06' | 'S07' | 'S08' | 'S09' | 'S10';

export interface SceneSlot {
  id: SceneId;
  from: number;
  dur: number;
  label: string;
}

export const SCENES: SceneSlot[] = [
  { id: 'S01', from: 0, dur: 1050, label: '0:00–0:35 Intro' },
  { id: 'S02', from: 1050, dur: 1350, label: '0:35–1:20 Sun scale' },
  { id: 'S03', from: 2400, dur: 1500, label: '1:20–2:10 Moon by bicycle' },
  { id: 'S04', from: 3900, dur: 1500, label: '2:10–3:00 Sun by bicycle' },
  { id: 'S05', from: 5400, dur: 1500, label: '3:00–3:50 Planet orbits' },
  { id: 'S06', from: 6900, dur: 1500, label: '3:50–4:40 Orbit speed' },
  { id: 'S07', from: 8400, dur: 1500, label: '4:40–5:30 Light travel' },
  { id: 'S08', from: 9900, dur: 1650, label: '5:30–6:25 Sizes to scale' },
  { id: 'S09', from: 11550, dur: 1650, label: '6:25–7:20 Voyager 1' },
  { id: 'S10', from: 13200, dur: 1440, label: '7:20–8:08 Outro' },
];
