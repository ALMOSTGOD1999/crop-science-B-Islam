import insecticide from "@/assets/product-insecticide.jpg";
import herbicide from "@/assets/product-herbicide.jpg";
import fungicide from "@/assets/product-fungicide.jpg";
import { Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Product = {
  name: string;
  category: string;
  crops: string;
  size: string;
  image: string;
  tone: "primary" | "accent";
};

export const insecticideProduct: Product = { name: "NexaShield 250 SC", category: "Insecticide", crops: "Paddy · Cotton", size: "100 ml", image: insecticide, tone: "primary" };
export const herbicideProduct: Product = { name: "VitaClear 480 SL", category: "Herbicide", crops: "Broadleaf · Maize", size: "1 L", image: herbicide, tone: "primary" };
export const fungicideProduct: Product = { name: "CropGuard 750 WP", category: "Fungicide", crops: "Fruit · Vegetables", size: "500 g", image: fungicide, tone: "accent" };
export const secondaryInsecticideProduct: Product = { name: "PestAway 20 EC", category: "Insecticide", crops: "Cereals · Pulses", size: "500 ml", image: insecticide, tone: "primary" };

const categories = ["Insecticide", "Herbicide", "Fungicide"] as const;
const cropOptions = ["Paddy · Cotton", "Broadleaf · Maize", "Fruit · Vegetables", "Cereals · Pulses"] as const;
const sizeOptions = ["100 ml", "250 ml", "500 ml", "1 L"] as const;

const generatedProducts: Product[] = Array.from({ length: 77 }, (_, i): Product => ({
  name: `Product ${i + 1}`,
  category: categories[i % 3]!,
  crops: cropOptions[i % 4]!,
  size: sizeOptions[i % 4]!,
  image: `/product-${i + 1}.jpeg`,
  tone: i % 3 === 2 ? "accent" : "primary",
}));

export const products: Product[] = [...generatedProducts];

export function ProductImage({ product, priority = false, className = "" }: { product: Product; priority?: boolean; className?: string }) {
  return (
    <img
      src={product.image}
      alt={`${product.category} product packaging for ${product.name}`}
      className={`product-image ${className}`}
      loading={priority ? "eager" : "lazy"}
      width={800}
      height={800}
    />
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <article className={`product-card reveal-up reveal-delay-${Math.min(index + 1, 4)}`}>
      <div className="product-card-media">
        <ProductImage product={product} />
        <span className={`product-badge product-badge-${product.tone}`}>{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p className="product-crops">{product.crops}</p>
        <div className="product-card-meta">
          <span>{product.size}</span>
          <span className="card-arrow">Enquire <span aria-hidden="true">→</span></span>
        </div>
      </div>
    </article>
  );
}

const GROWTH_MUSIC_DURATION = 34;

function scheduleNote(
  audioContext: AudioContext,
  destination: AudioNode,
  frequency: number,
  start: number,
  duration: number,
  peak: number,
  type: OscillatorType = "sine",
) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + Math.min(0.12, duration * 0.25));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}

function playGrowthSound(audioContext: AudioContext) {
  const now = audioContext.currentTime;
  const end = now + GROWTH_MUSIC_DURATION;
  const master = audioContext.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.3, now + 1.6);
  master.gain.setValueAtTime(0.3, end - 5);
  master.gain.exponentialRampToValueAtTime(0.0001, end);
  master.connect(audioContext.destination);

  // Gentle feedback delay for a spacious, cinematic feel.
  const delay = audioContext.createDelay(1);
  const delayFeedback = audioContext.createGain();
  const delayMix = audioContext.createGain();
  delay.delayTime.value = 0.42;
  delayFeedback.gain.value = 0.35;
  delayMix.gain.value = 0.3;
  master.connect(delay);
  delay.connect(delayFeedback).connect(delay);
  delay.connect(delayMix).connect(audioContext.destination);

  // Warm pad: slow D major chords that bloom and evolve across the piece.
  const padFilter = audioContext.createBiquadFilter();
  padFilter.type = "lowpass";
  padFilter.frequency.setValueAtTime(320, now);
  padFilter.frequency.exponentialRampToValueAtTime(2600, now + 12);
  padFilter.frequency.exponentialRampToValueAtTime(900, end - 4);
  padFilter.connect(master);

  const chordProgression: number[][] = [
    [146.83, 220, 293.66], // D3 A3 D4
    [123.47, 185, 246.94], // B2 F#3 B3
    [164.81, 246.94, 329.63], // E3 B3 E4
    [146.83, 220, 369.99], // D3 A3 F#4
    [110, 164.81, 220], // A2 E3 A3
    [146.83, 220, 293.66], // D3 A3 D4
  ];
  chordProgression.forEach((chord, chordIndex) => {
    const chordStart = now + chordIndex * 5.4;
    chord.forEach((frequency) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = "sawtooth";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, chordStart);
      gain.gain.exponentialRampToValueAtTime(0.05, chordStart + 1.8);
      gain.gain.setValueAtTime(0.05, chordStart + 4.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, chordStart + 6.2);
      oscillator.connect(gain).connect(padFilter);
      oscillator.start(chordStart);
      oscillator.stop(chordStart + 6.4);
    });
  });

  // Pulsing bass root that enters once the sprout appears.
  const bassRoots = [73.42, 61.74, 82.41, 73.42, 55, 73.42];
  bassRoots.forEach((frequency, bar) => {
    for (let beat = 0; beat < 6; beat += 1) {
      scheduleNote(audioContext, master, frequency, now + 4 + bar * 5 + beat * 0.82, 0.7, 0.14, "triangle");
    }
  });

  // Sprout motif: two soft rising tones for the two leaves.
  scheduleNote(audioContext, master, 293.66, now + 1.2, 1.6, 0.16);
  scheduleNote(audioContext, master, 369.99, now + 2.6, 1.8, 0.16);
  scheduleNote(audioContext, master, 440, now + 4.1, 2.2, 0.14);

  // Spray whoosh timed with the pesticide mist.
  const sprayLength = Math.floor(audioContext.sampleRate * 1.1);
  const buffer = audioContext.createBuffer(1, sprayLength, audioContext.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < sprayLength; index += 1) samples[index] = Math.random() * 2 - 1;
  const noise = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const sprayGain = audioContext.createGain();
  noise.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 4300;
  sprayGain.gain.setValueAtTime(0.0001, now + 8.2);
  sprayGain.gain.exponentialRampToValueAtTime(0.4, now + 8.35);
  sprayGain.gain.exponentialRampToValueAtTime(0.0001, now + 9.3);
  noise.connect(filter).connect(sprayGain).connect(master);
  noise.start(now + 8.2);

  // Sparkling arpeggio as the tree crowns — pentatonic shimmer.
  const arpNotes = [293.66, 369.99, 440, 493.88, 587.33, 739.99, 880];
  for (let step = 0; step < 42; step += 1) {
    const stepTime = now + 10.5 + step * 0.42;
    if (stepTime > end - 6) break;
    const frequency = arpNotes[(step * 3 + Math.floor(step / 7)) % arpNotes.length]!;
    scheduleNote(audioContext, master, frequency, stepTime, 0.55, 0.1, step % 4 === 0 ? "triangle" : "sine");
  }

  // Final bloom: bright chime run into the brand reveal.
  [587.33, 739.99, 880, 1174.66].forEach((frequency, index) => {
    scheduleNote(audioContext, master, frequency, end - 5.6 + index * 0.55, 3.2, 0.14, "triangle");
  });
}

export function WelcomeReveal({ onComplete }: { onComplete: () => void }) {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!started) return;
    const timer = window.setTimeout(onComplete, (GROWTH_MUSIC_DURATION - 2) * 1000);
    return () => window.clearTimeout(timer);
  }, [onComplete, started]);

  const begin = () => {
    if (started) return;
    setStarted(true);
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
    if (AudioContextClass) {
      const context = new AudioContextClass();
      audioRef.current = context;
      void context.resume().then(() => playGrowthSound(context));
    }
  };

  return (
    <div className={`welcome-reveal ${started ? "welcome-started" : ""}`} aria-label="Baharul Islam crop science introduction">
      <div className="welcome-grid" aria-hidden="true" />
      {!started ? (
        <button type="button" className="welcome-start" onClick={begin} aria-label="Start welcome animation with sound">
          <span className="welcome-start-pulse"><Volume2 size={20} /></span>
          <span>Begin the growing season</span>
        </button>
      ) : null}
      <div className="growth-story" aria-hidden="true">
        <div className="growth-ground" />
        <svg className="growth-plant" viewBox="0 0 360 480" role="presentation">
          <path className="tree-trunk" d="M180 448 C174 370 188 304 180 214 C176 158 180 113 180 78" />
          <path className="tree-branch branch-left-one" d="M180 313 C147 289 121 263 101 227" />
          <path className="tree-branch branch-right-one" d="M182 270 C218 246 241 216 257 181" />
          <path className="tree-branch branch-left-two" d="M180 210 C151 188 135 164 125 137" />
          <path className="tree-branch branch-right-two" d="M180 176 C204 155 217 132 225 107" />
          <ellipse className="sprout-leaf sprout-leaf-left" cx="151" cy="115" rx="34" ry="16" transform="rotate(28 151 115)" />
          <ellipse className="sprout-leaf sprout-leaf-right" cx="211" cy="111" rx="34" ry="16" transform="rotate(-30 211 111)" />
          <g className="tree-crown">
            <circle cx="112" cy="194" r="55" /><circle cx="168" cy="145" r="69" /><circle cx="235" cy="184" r="62" />
            <circle cx="95" cy="254" r="50" /><circle cx="174" cy="229" r="76" /><circle cx="251" cy="247" r="52" />
          </g>
        </svg>
        <div className="spray-product"><ProductImage product={insecticideProduct} priority /></div>
        <div className="spray-mist"><i /><i /><i /><i /><i /><i /><i /></div>
        <span className="growth-caption growth-caption-one">A new beginning</span>
        <span className="growth-caption growth-caption-two">Protected to thrive</span>
      </div>
      <div className="welcome-product welcome-product-left welcome-product-one"><ProductImage product={insecticideProduct} priority /></div>
      <div className="welcome-product welcome-product-left welcome-product-two"><ProductImage product={fungicideProduct} priority /></div>
      <div className="welcome-product welcome-product-right welcome-product-three"><ProductImage product={herbicideProduct} priority /></div>
      <div className="welcome-product welcome-product-right welcome-product-four"><ProductImage product={secondaryInsecticideProduct} priority /></div>
      <div className="welcome-copy">
        <span className="welcome-kicker">CROP PROTECTION · FIELD-TESTED</span>
        <div className="welcome-name font-display">BAHARUL ISLAM</div>
        <span className="welcome-rule" />
        <span className="welcome-subtitle">Precision for every growing season</span>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
