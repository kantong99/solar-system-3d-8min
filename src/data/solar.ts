// Data planet (rata-rata, dibulatkan). Sumber: NASA Planetary Fact Sheet.
// au = jarak rata-rata dari Matahari (1 AU = 149,6 juta km). d = diameter (km).
export interface Planet {
  name: string;
  au: number;
  d: number;
  color: string;
}

export const PLANETS: Planet[] = [
  { name: 'Mercury', au: 0.387, d: 4879, color: '#A8A29E' },
  { name: 'Venus', au: 0.723, d: 12104, color: '#FDBA74' },
  { name: 'Earth', au: 1, d: 12742, color: '#38BDF8' },
  { name: 'Mars', au: 1.524, d: 6779, color: '#F87171' },
  { name: 'Jupiter', au: 5.203, d: 139820, color: '#FCD34D' },
  { name: 'Saturn', au: 9.537, d: 116460, color: '#FDE68A' },
  { name: 'Uranus', au: 19.19, d: 50724, color: '#67E8F9' },
  { name: 'Neptune', au: 30.07, d: 49244, color: '#60A5FA' },
];

// Jarak orbit yang diregangkan agar semua planet terlihat (BUKAN skala).
export const orbitR = (au: number): number => 2 + 4 * Math.sqrt(au);

// Ukuran sesuai skala relatif antar planet. Jupiter = 2.0 unit.
export const toScaleRadius = (d: number): number => (d / 139820) * 2.0;

// Ukuran diperbesar sedikit agar terlihat di layar (BUKAN skala).
export const stylizedRadius = (d: number): number => Math.max(0.3, toScaleRadius(d) * 1.5);
