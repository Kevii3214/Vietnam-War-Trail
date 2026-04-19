import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { GameMenuBar } from '../GameMenuBar';
import { DialogueBox, DialogueTypewriter } from '../DialogueBox';
import { PixelPerson } from './PixelPeople';
import { PixelBoat } from './PixelBoat';
import {
  PROTAGONIST, MOTHER, FATHER, CAPTAIN, FELLOW_PASSENGERS,
} from './characterPalettes';

interface CinematicProps {
  onComplete: () => void;
  onNarrate?: (text: string) => void;
}

// ===========================================================================
// SCENE 1 — GOING TO THE BOAT
// A moonlit pier crowded with families, swinging lanterns, a distant Huey
// searchlight combing the coast, and the boat waiting at the end of the
// pier with its cabin light on. Canonical palettes — warm skin tones read
// in low light so the characters look human, not like blue cut-outs.
// ===========================================================================
function Scene1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#050514] via-[#080d1e] to-[#0a1828]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* === Night sky === */}
        <rect x="0" y="0" width="500" height="280" fill="#06081c" />
        {/* Milky way band */}
        <rect x="0" y="18" width="500" height="48" fill="#1a1a3a" opacity="0.18" />
        <rect x="0" y="30" width="500" height="22" fill="#2a2a48" opacity="0.12" />

        {/* Stars — dense field */}
        {[
          [40, 10], [90, 26], [140, 6], [200, 22], [250, 14], [300, 4], [340, 30],
          [380, 12], [420, 22], [460, 8], [60, 40], [170, 36], [280, 42], [430, 38],
          [120, 50], [320, 48], [475, 52], [20, 55], [220, 58], [360, 62], [100, 68],
          [240, 72], [400, 74], [70, 80], [310, 84], [12, 18], [158, 18], [268, 32],
          [398, 48], [448, 74], [184, 84], [354, 82], [86, 90], [276, 98], [450, 94],
        ].map(([x, y], i) => (
          <rect
            key={`star-${i}`}
            x={x} y={y}
            width={i % 7 === 0 ? 2 : 1.5} height={i % 7 === 0 ? 2 : 1.5}
            fill="#f0e8d0"
            opacity={0.35 + (i % 3) * 0.2}
            className="cinematic-twinkle-star"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* Moon — low crescent */}
        <circle cx="410" cy="46" r="16" fill="#d8d0a0" opacity="0.28" />
        <circle cx="410" cy="46" r="12" fill="#e8e0c0" opacity="0.55" />
        <circle cx="404" cy="42" r="12" fill="#06081c" />
        {/* Moon glow */}
        <circle cx="410" cy="46" r="32" fill="#d8d0a0" opacity="0.08" />

        {/* Moonlight shaft rippling down onto the water */}
        {[...Array(12)].map((_, i) => (
          <rect
            key={`moonref-${i}`}
            x={396 + Math.sin(i * 1.2) * 8}
            y={136 + i * 9}
            width={18 - i}
            height="2"
            fill="#d8d0a0"
            opacity={0.15 - i * 0.01}
            className="p2-wave-drift"
            style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${3 + (i % 3) * 0.5}s` }}
          />
        ))}

        {/* === Distant Huey searchlight combing the coast (very cinematic) === */}
        {/* Chopper silhouette */}
        <g className="p2-lighthouse-sweep" style={{ transformOrigin: '110px 40px' }}>
          <g transform="translate(110, 40)">
            {/* Body */}
            <rect x="-6" y="-2" width="14" height="4" fill="#0a0a14" />
            <rect x="-2" y="-4" width="6" height="2" fill="#0a0a14" />
            {/* Tail boom */}
            <rect x="-16" y="-1" width="10" height="1.5" fill="#0a0a14" />
            {/* Skids */}
            <line x1="-5" y1="3" x2="7" y2="3" stroke="#0a0a14" strokeWidth="0.8" />
            {/* Blur of rotor */}
            <ellipse cx="0" cy="-4" rx="16" ry="1" fill="#1a1a28" opacity="0.4" />
            {/* Blinking red tail light */}
            <rect x="-16" y="-2" width="1.5" height="1.5" fill="#ff2a2a" opacity="0.9"
              className="cinematic-lamp-flicker" style={{ animationDelay: '0.3s' }} />
            {/* Downward searchlight cone */}
            <polygon points="0,4 -90,160 90,160" fill="#ffeeaa" opacity="0.06" />
            <polygon points="0,4 -40,110 40,110" fill="#ffeeaa" opacity="0.05" />
          </g>
        </g>

        {/* Distant lighthouse on far shore (subtle secondary light) */}
        <rect x="36" y="108" width="4" height="14" fill="#2a2a36" />
        <rect x="34" y="106" width="8" height="4" fill="#3a3a46" />
        <rect x="37" y="112" width="2" height="3" fill="#ffe488" opacity="0.9"
          className="cinematic-lamp-flicker" />

        {/* === Distant shoreline (homeland) behind === */}
        <polygon
          points="0,120 30,114 70,118 120,110 170,116 220,108 280,114 340,106 400,112 450,104 500,110 500,128 0,128"
          fill="#0a0f18"
          className="p2-shore-recede"
        />
        {/* Far-shore skyline silhouettes (Saigon skyline receding) */}
        {[
          [15, 6], [50, 10], [80, 4], [110, 12], [150, 6], [200, 10], [250, 4],
          [310, 8], [360, 6], [410, 10], [455, 4], [485, 8],
        ].map(([bx, bh], i) => (
          <rect key={`sky-${i}`} x={bx} y={120 - bh} width={8 + (i % 3) * 2} height={bh}
            fill="#070a12" />
        ))}
        {/* Tiny city lights on shore */}
        {[20, 55, 90, 130, 180, 230, 290, 350, 410, 460].map((lx, li) => (
          <rect
            key={`shorelight-${li}`}
            x={lx} y={114 + (li % 3) * 2}
            width="1.5" height="1.5"
            fill="#ffcc66"
            opacity={0.4 + (li % 2) * 0.15}
            className="cinematic-lamp-flicker"
            style={{ animationDelay: `${li * 0.4}s` }}
          />
        ))}
        {/* Orange glow on horizon — distant fires from the fallen city */}
        <rect x="200" y="116" width="140" height="10" fill="#aa3014" opacity="0.22" />
        <rect x="230" y="118" width="80" height="6" fill="#c04820" opacity="0.3" />

        {/* === Water === */}
        <rect x="0" y="128" width="500" height="152" fill="#0a1828" />
        {[134, 148, 162, 176, 190, 204, 218, 232, 246, 260, 270].map((y, i) => (
          <line
            key={`rip-${y}`}
            x1={-10} y1={y}
            x2={510} y2={y}
            stroke="#1a2838"
            strokeWidth="1"
            opacity={0.3}
            className="p2-wave-drift"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
        {/* Foam flecks */}
        {[40, 110, 200, 310, 420, 70, 380].map((fx, fi) => (
          <rect key={`foam-${fi}`} x={fx} y={160 + (fi % 3) * 16} width={10} height={1}
            fill="#3a5a7a" opacity="0.5"
            className="p2-wave-drift" style={{ animationDelay: `${fi * 0.9}s` }}
          />
        ))}

        {/* === Foreground framing: dock shed on the left, fishing shack on the right === */}
        {/* Left shed (silhouette) */}
        <polygon points="0,280 0,180 50,180 60,168 90,168 90,280" fill="#05080f" />
        <rect x="0" y="180" width="90" height="100" fill="#070b14" />
        {/* Roof tile lines */}
        {[172, 175, 178].map((y, i) => (
          <line key={`tileL-${i}`} x1={50} y1={y} x2={90} y2={y}
            stroke="#1a1a24" strokeWidth="0.5" opacity="0.6" />
        ))}
        {/* Glowing window on shed */}
        <rect x="24" y="208" width="12" height="10" fill="#0a0a18" />
        <rect x="24" y="208" width="12" height="10" fill="#c08440" opacity="0.55"
          className="cinematic-lamp-flicker" />
        <rect x="26" y="210" width="8" height="6" fill="#f0b060" opacity="0.7"
          className="cinematic-lamp-flicker" style={{ animationDelay: '0.6s' }} />
        {/* Smoke from shed chimney */}
        <rect x="72" y="160" width="4" height="12" fill="#05080f" />
        <g className="cinematic-smoke-rise">
          <ellipse cx="74" cy="152" rx="3" ry="2.5" fill="#3a3a4a" opacity="0.5" />
        </g>
        <g className="cinematic-smoke-rise" style={{ animationDelay: '1s' }}>
          <ellipse cx="75" cy="144" rx="3.5" ry="2.5" fill="#2a2a3a" opacity="0.4" />
        </g>

        {/* Right fishing shack + stacked crates */}
        <polygon points="420,280 420,188 438,176 470,176 478,188 500,188 500,280" fill="#05080f" />
        <rect x="420" y="188" width="80" height="92" fill="#070b14" />
        {/* Tiny lit window */}
        <rect x="448" y="204" width="8" height="8" fill="#0a0a18" />
        <rect x="448" y="204" width="8" height="8" fill="#a07030" opacity="0.5"
          className="cinematic-lamp-flicker" style={{ animationDelay: '1.4s' }} />
        {/* Crates stacked outside */}
        <rect x="402" y="216" width="14" height="12" fill="#2a1a0a" />
        <rect x="402" y="216" width="14" height="2" fill="#4a2a14" />
        <rect x="408" y="204" width="10" height="12" fill="#2a1a0a" />
        <rect x="408" y="204" width="10" height="2" fill="#4a2a14" />

        {/* === Wooden pier / dock — receding perspective ===
            Extended down to y=275 (near the bottom of the SVG viewBox) so
            the planks read all the way to the dialogue / text box area.
            The side edges follow the same vanishing-point lines as before:
            at y=275, interpolating from (210,128)-(180,230) and
            (290,128)-(320,230) gives outer edges at x≈167 and x≈333. */}
        <polygon points="167,275 333,275 290,128 210,128" fill="#3a2a18" />
        <polygon points="167,275 333,275 290,128 210,128" fill="none" stroke="#2a1a0a" strokeWidth="1" />
        {/* Plank grain lines (receding). Extended so each line runs from
            the same start x at y=130 down to the new pier bottom at y=275
            following the same perspective divergence. */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const t = i / 7;
          const topX = 215 + t * 70;
          const botX = 175 + t * 150;
          return (
            <line key={`grain-${i}`} x1={topX} y1={130} x2={botX} y2={275}
              stroke="#2a1a0a" strokeWidth="0.5" opacity="0.5" />
          );
        })}
        {/* Cross planks — additional rungs at y=230, 245, 260, 275 keep the
            plank pattern consistent across the extended foreground. */}
        {[140, 155, 170, 185, 200, 215, 230, 245, 260, 275].map((y, i) => {
          const t = (y - 128) / 102;
          const lx = 210 - t * 30;
          const rx = 290 + t * 30;
          return (
            <line key={`cross-${i}`} x1={lx} y1={y} x2={rx} y2={y}
              stroke="#4a3a24" strokeWidth={1 + t} opacity={0.7} />
          );
        })}
        {/* Warm lantern light spill on pier planks (from dock lamps). Two
            more shallower pools further down light the extended foreground. */}
        <polygon points="210,128 290,128 300,148 200,148" fill="#c48030" opacity="0.12" />
        <polygon points="205,148 295,148 310,172 190,172" fill="#b0702a" opacity="0.07" />
        <polygon points="195,172 305,172 320,208 180,208" fill="#a06a24" opacity="0.06" />
        <polygon points="180,208 320,208 333,275 167,275" fill="#8a5a20" opacity="0.05" />

        {/* Pilings + fishing nets draped. Added piles at the widened
            foreground so the extended pier reads as supported. */}
        {[140, 170, 200, 235, 265].map((y, i) => {
          const t = (y - 128) / 102;
          const lx = 210 - t * 30 - 3;
          const rx = 290 + t * 30 + 3;
          return (
            <g key={`piling-${i}`}>
              <rect x={lx - 2} y={y} width={4} height={16 + i * 4} fill="#2a1a0a" />
              <rect x={rx - 2} y={y} width={4} height={16 + i * 4} fill="#2a1a0a" />
              {i === 2 && (
                <g>
                  <line x1={rx + 2} y1={y + 4} x2={rx + 18} y2={y + 22}
                    stroke="#6a5a3a" strokeWidth="0.5" opacity="0.7" />
                  <line x1={rx + 2} y1={y + 10} x2={rx + 16} y2={y + 28}
                    stroke="#6a5a3a" strokeWidth="0.5" opacity="0.7" />
                  <line x1={rx + 2} y1={y + 4} x2={rx + 16} y2={y + 28}
                    stroke="#6a5a3a" strokeWidth="0.4" opacity="0.5" />
                </g>
              )}
            </g>
          );
        })}

        {/* Lantern posts standing on the pier flanks.
            Post base sits on the pier surface, lantern hangs from top of post. */}
        {[
          { ox: 200, baseY: 140, postH: 18 },
          { ox: 302, baseY: 140, postH: 18 },
          { ox: 195, baseY: 168, postH: 22 },
          { ox: 308, baseY: 168, postH: 22 },
          { ox: 186, baseY: 205, postH: 28 },
          { ox: 315, baseY: 205, postH: 28 },
        ].map((p, i) => (
          <g key={`dp-${i}`}>
            {/* Post */}
            <rect x={p.ox} y={p.baseY - p.postH} width={1.5} height={p.postH} fill="#2a1a0a" />
            {/* Bracket */}
            <rect x={p.ox - 3} y={p.baseY - p.postH} width={8} height={1.5} fill="#2a1a0a" />
            {/* Hanging lantern — fixed rigidly to the post (no swing).
                Only the inner flame still flickers; the housing stays put. */}
            <g>
              <line x1={p.ox + 2} y1={p.baseY - p.postH} x2={p.ox + 2} y2={p.baseY - p.postH + 4}
                stroke="#1a0a04" strokeWidth="0.5" />
              <rect x={p.ox} y={p.baseY - p.postH + 4} width="6" height="6" fill="#4a3618" />
              <rect x={p.ox + 0.5} y={p.baseY - p.postH + 5} width="5" height="4" fill="#ffcc44"
                className="cinematic-lamp-flicker"
                style={{ animationDelay: `${i * 0.5}s` }} />
              <circle cx={p.ox + 3} cy={p.baseY - p.postH + 7} r="9" fill="#ffaa44" opacity="0.14" />
              <circle cx={p.ox + 3} cy={p.baseY - p.postH + 7} r="16" fill="#ffaa44" opacity="0.06" />
            </g>
          </g>
        ))}

        {/* === Water lotuses floating in the bay ===
            Replaces the moored fishing-boat silhouettes. Each lotus is a
            small green lily pad with soft pink petals on top, gently
            bobbing with the water. Scattered on both sides of the pier
            so the bay reads as calm tropical water — a visual nod to
            Vietnam without breaking the nighttime palette. */}
        {[
          { x: 120, y: 164, s: 1.0, d: 0 },
          { x: 382, y: 172, s: 1.1, d: 1.2 },
          { x: 150, y: 202, s: 1.2, d: 0.6 },
          { x: 360, y: 210, s: 1.0, d: 0.9 },
          { x: 110, y: 222, s: 1.15, d: 1.8 },
          { x: 400, y: 236, s: 1.1, d: 0.3 },
          { x: 132, y: 250, s: 1.25, d: 1.5 },
          { x: 380, y: 258, s: 1.2, d: 0.7 },
        ].map((p, i) => (
          <g key={`lotus-${i}`} transform={`translate(${p.x}, ${p.y}) scale(${p.s})`}>
            <g className="p2-boat-wait" style={{ animationDelay: `${p.d}s` }}>
              {/* Lily pad — flat oval with a subtle highlight on top */}
              <ellipse cx="0" cy="0" rx="7" ry="2.2" fill="#24402a" />
              <ellipse cx="-0.5" cy="-0.5" rx="5.5" ry="1.4" fill="#3a6a38" />
              {/* Pad veins (thin radiating lines) */}
              <line x1="0" y1="-0.4" x2="5" y2="1.2" stroke="#14281a" strokeWidth="0.35" />
              <line x1="0" y1="-0.4" x2="-5" y2="1.2" stroke="#14281a" strokeWidth="0.35" />
              <line x1="0" y1="-0.4" x2="0" y2="1.4" stroke="#14281a" strokeWidth="0.3" opacity="0.7" />
              {/* Lotus flower — pink petals with a yellow core */}
              <rect x="-2.5" y="-3" width="1.3" height="2" fill="#c25a7a" />
              <rect x="1.2" y="-3" width="1.3" height="2" fill="#c25a7a" />
              <rect x="-0.8" y="-4" width="1.6" height="2" fill="#ef8fa8" />
              <rect x="-0.4" y="-3" width="0.8" height="1" fill="#ffcf5c" />
              {/* Faint reflection / ripple under the pad */}
              <ellipse cx="0" cy="2.2" rx="6" ry="0.6" fill="#1a2a20" opacity="0.6" />
            </g>
          </g>
        ))}

        {/* === Target fishing boat at the end of the pier ===
            Uses the canonical PixelBoat sprite so the silhouette matches
            every other boat scene. Scaled down because it's in the distance. */}
        <g transform="translate(250, 116)">
          <g className="p2-boat-wait">
            <PixelBoat x={0} y={0} scale={0.45} lantern engine />
            {/* Captain standing on deck, holding up a lantern to guide them aboard */}
            <g transform="translate(-6, -2)">
              <PixelPerson x={0} y={0} scale={0.32} variant="civilian" {...CAPTAIN}
                mood="determined" sway="idle" />
              {/* Lantern held high */}
              <rect x="-4" y="-7" width="2.5" height="2" fill="#ffcc44"
                className="cinematic-lamp-flicker" />
              <circle cx="-2.8" cy="-6" r="4" fill="#ffaa44" opacity="0.35" />
              <circle cx="-2.8" cy="-6" r="8" fill="#ffaa44" opacity="0.12" />
            </g>
            {/* A couple of refugees already climbing aboard */}
            <PixelPerson x={6} y={0} scale={0.28} variant="civilian"
              {...FELLOW_PASSENGERS[0]} mood="weary" sway="idle" swayDelay={0.2} />
            <PixelPerson x={10} y={1} scale={0.26} variant="civilian"
              {...FELLOW_PASSENGERS[3]} mood="scared" sway="idle" swayDelay={0.5} />
          </g>
        </g>

        {/* === A family further up the pier (ahead of the protagonist) ===
            Placed high up the pier so they're clearly ahead of the
            walking family in the perspective and don't overlap. */}
        <g transform="translate(234, 148)">
          <PixelPerson x={0} y={0} scale={0.7} variant="civilian"
            {...FATHER} mood="determined" sway="idle" swayDelay={0.2} />
          <PixelPerson x={9} y={2} scale={0.65} variant="civilian"
            {...FELLOW_PASSENGERS[2]} mood="scared" sway="idle" swayDelay={0.4} />
          <PixelPerson x={17} y={4} scale={0.6} variant="civilian"
            {...FELLOW_PASSENGERS[4]} mood="weary" sway="idle" swayDelay={0.6} />
          {/* Child holding their mother's hand */}
          <PixelPerson x={24} y={6} scale={0.4} variant="civilian"
            {...FELLOW_PASSENGERS[0]} mood="scared" sway="idle" swayDelay={0.8} />
        </g>

        {/* Reeds at waterline (foreground) */}
        {[100, 140, 360, 400].map((rx, ri) => (
          <g key={`reed-${ri}`} transform={`translate(${rx}, 228)`}>
            <line x1="0" y1="0" x2="-1" y2="-16" stroke="#2a3a1a" strokeWidth="0.8" />
            <line x1="2" y1="0" x2="4" y2="-18" stroke="#2a3a1a" strokeWidth="0.8" />
            <line x1="4" y1="0" x2="2" y2="-14" stroke="#1a2a10" strokeWidth="0.8" />
          </g>
        ))}

        {/* === Your family + other refugees lined up on the pier ===
            Single-file queue running up the pier toward the boat. Each
            figure is placed along the pier centerline (x≈250) with a
            slight left/right stagger so the line reads as individuals
            rather than a stack of sprites. Scales shrink with distance
            to match the receding perspective.

            Draw-order note: drawn FAR→NEAR so closer (larger) figures
            render on top of the people queued behind them — otherwise
            the mother's body would be clipped by the protagonist drawn
            on top of her. In this pier, lower-y = farther from camera,
            higher-y = closer to camera. */}

        {/* 5 (farthest). Fellow refugee almost at the boat */}
        <g transform="translate(246, 162)">
          <PixelPerson x={0} y={0} scale={0.8} variant="civilian"
            {...FELLOW_PASSENGERS[5]} mood="scared" sway="idle" swayDelay={0.7} />
        </g>

        {/* 4. Fellow refugee further up the line */}
        <g transform="translate(256, 178)">
          <PixelPerson x={0} y={0} scale={0.95} variant="civilian"
            {...FELLOW_PASSENGERS[1]} mood="weary" sway="idle" swayDelay={0.5} />
          {/* Small bundle at their feet */}
          <rect x={-6} y={18} width={7} height={5} fill="#2a1a0a" />
          <rect x={-6} y={18} width={7} height={1} fill="#4a2a14" />
        </g>

        {/* 3. Father — ahead of the protagonist, carrying the family bundle */}
        <g transform="translate(240, 198)">
          <PixelPerson x={0} y={0} scale={1.2} variant="civilian"
            {...FATHER} mood="determined" sway="idle" />
          {/* Bundle slung over shoulder */}
          <rect x={-8} y={-5} width={8} height={7} fill="#4a3624" />
          <rect x={-8} y={-5} width={8} height={1.5} fill="#6a4e30" />
          <line x1={-8} y1={-5} x2={-2} y2={-9} stroke="#2a1a0a" strokeWidth="0.8" />
        </g>

        {/* 2. Protagonist ("you") — one step ahead of the mother */}
        <g transform="translate(254, 220)">
          <PixelPerson x={0} y={0} scale={1.5} variant="civilian"
            {...PROTAGONIST} mood="determined" sway="idle" swayDelay={0.3} />
        </g>

        {/* 1 (closest). Mother at the back of the line. Scale 1.9 →
            sprite cell size s=3.8, sprite size 34.2 × 49.4; y=226 places
            feet at y=275, exactly on the extended pier bottom.

            NOTE on the bag coordinates: they're in absolute SVG units
            relative to this <g>, not in sprite-scale units. At s=3.8 the
            sprite's right edge is x≈34 and the hip row is y≈34, so the
            bag must be placed well outside the face. A previous bag at
            x=18, y=10 landed directly on the right eye and cheek (the
            "brown box over her eye" the user saw). */}
        <g transform="translate(234, 226)">
          <PixelPerson x={0} y={0} scale={1.9} variant="civilian"
            {...MOTHER} mood="sad" sway="idle" swayDelay={0.6} />
          {/* Shoulder bag hanging at her right hip, clearly outside the
              sprite body. Strap runs up from the bag over the shoulder. */}
          <rect x={34} y={32} width={10} height={10} fill="#4a3624" />
          <rect x={34} y={32} width={10} height={2} fill="#6a4e30" />
          <line x1={34} y1={32} x2={26} y2={16} stroke="#2a1a0a" strokeWidth="0.8" />
        </g>

        {/* NOTE: three full-width mist rects used to drift across the
            waterline here (at y=124, 136, 180). Because they spanned the
            entire SVG width at fixed y values, they read as three solid
            blue horizontal streaks slicing across the pier instead of
            atmospheric haze. Removed. The night-exposure overlay and
            vignette below provide enough nighttime mood without them. */}

        {/* Night exposure overlay — pulls colors down slightly so skin
            tones don't look daylit while still reading as human */}
        <rect x="0" y="0" width="500" height="280" fill="#0a1830" opacity="0.18" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="50" fill="#000" opacity="0.55" />
        <rect x="0" y="250" width="500" height="30" fill="#000" opacity="0.6" />
        <rect x="0" y="0" width="60" height="280" fill="#000" opacity="0.35" />
        <rect x="440" y="0" width="60" height="280" fill="#000" opacity="0.35" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 2 — GETTING ON THE BOAT
// Father across, you on the plank, mother next, strangers on deck.
// Canonical palettes so faces match every other scene.
// ===========================================================================
function Scene2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#060612] via-[#0a1020] to-[#0a1828]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Night sky */}
        <rect x="0" y="0" width="500" height="130" fill="#06081c" />

        {/* Stars */}
        {[30, 80, 140, 210, 270, 330, 390, 450, 60, 170, 230, 320, 420, 110, 380].map((x, i) => (
          <rect key={`s-${i}`} x={x} y={8 + (i % 4) * 14} width="1.5" height="1.5" fill="#e0d8c0"
            opacity={0.3 + (i % 3) * 0.2}
            className="cinematic-twinkle-star" style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Moon and distant moonlit haze */}
        <circle cx="430" cy="40" r="14" fill="#d8d0a0" opacity="0.28" />
        <circle cx="430" cy="40" r="10" fill="#e8e0c0" opacity="0.55" />
        <circle cx="425" cy="37" r="10" fill="#06081c" />
        <circle cx="430" cy="40" r="28" fill="#d8d0a0" opacity="0.08" />
        <rect x="0" y="110" width="500" height="20" fill="#1a2038" opacity="0.3" />

        {/* Moonlight shaft rippling on water (right-side reflection) */}
        {[...Array(10)].map((_, i) => (
          <rect key={`moon-${i}`}
            x={418 + Math.sin(i * 1.2) * 7}
            y={136 + i * 10}
            width={18 - i}
            height="2"
            fill="#d8d0a0"
            opacity={0.15 - i * 0.012}
            className="p2-wave-drift"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Water */}
        <rect x="0" y="130" width="500" height="150" fill="#0a1828" />
        {[140, 155, 170, 185, 200, 215, 230, 245, 260].map((y, i) => (
          <line key={`wr-${y}`} x1={-10} y1={y} x2={510} y2={y} stroke="#1a2a3a" strokeWidth="1" opacity="0.25"
            className="p2-wave-drift" style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* === RAISED DOCK on the left ===
            The dock now sits elevated ABOVE the water surface so the
            plank can descend from it DOWN onto the boat floating below.
            Composition: dock-top ≈ y=160, boat-deck ≈ y=170-175,
            water-surface ≈ y=180. Plank slopes down-right from dock
            to boat deck. */}

        {/* Clear waterline shimmer at y=180 (explicit water surface) */}
        <rect x="0" y="180" width="500" height="1.5" fill="#3a5a7a" opacity="0.45" />
        {[40, 130, 240, 360, 430].map((fx, fi) => (
          <rect key={`wl-${fi}`} x={fx} y={181} width="14" height="1"
            fill="#4a6a8a" opacity="0.5"
            className="p2-wave-drift"
            style={{ animationDelay: `${fi * 0.7}s` }} />
        ))}

        {/* Dock top surface (horizontal plank deck) */}
        <rect x="0" y="160" width="130" height="5" fill="#5a4a30" />
        <rect x="0" y="160" width="130" height="1.5" fill="#7a6448" />
        {/* Dock plank divisions (top-down lines) */}
        {[16, 34, 52, 70, 88, 106, 124].map((dx, i) => (
          <line key={`dk-plank-${i}`} x1={dx} y1={160} x2={dx} y2={165}
            stroke="#2a1a08" strokeWidth="0.4" opacity="0.8" />
        ))}
        {/* Dock side/edge (visible depth of the platform) */}
        <rect x="0" y="165" width="130" height="4" fill="#3a2a14" />
        <rect x="0" y="165" width="130" height="0.8" fill="#4a3620" />
        {/* Shadow cast under the dock onto the water below */}
        <rect x="0" y="169" width="130" height="12" fill="#020408" opacity="0.55" />

        {/* Pilings — posts holding the dock up, extending down into water */}
        {[16, 58, 100, 124].map((px, i) => (
          <g key={`pile-${i}`}>
            <rect x={px} y={168} width="5" height="52" fill="#2a1a08" />
            <rect x={px} y={168} width="5" height="1.5" fill="#4a3020" />
            {/* Waterline wet-ring on each piling */}
            <rect x={px - 0.5} y={179} width="6" height="2" fill="#0a1422" opacity="0.85" />
            {/* Piling reflection on water */}
            <rect x={px + 0.5} y={181} width="3" height="8" fill="#1a2838" opacity="0.45" />
          </g>
        ))}

        {/* === Dock detail (sits ON the raised dock top at y=160) === */}
        {/* Barrel stack */}
        <g transform="translate(14, 144)">
          <rect x="0" y="0" width="14" height="16" fill="#5a3a1a" />
          <rect x="0" y="0" width="14" height="2"  fill="#7a5228" />
          <rect x="0" y="7" width="14" height="1" fill="#2a1810" />
          <rect x="0" y="14" width="14" height="2" fill="#2a1810" />
          <rect x="14" y="4" width="12" height="12" fill="#4a2a10" />
          <rect x="14" y="4" width="12" height="1" fill="#6a4218" />
        </g>
        {/* Coiled rope */}
        <g transform="translate(50, 156)">
          <ellipse cx="0" cy="0" rx="9" ry="3" fill="#6a5a3a" />
          <ellipse cx="0" cy="-1.5" rx="7" ry="2.2" fill="#8a7a50" />
          <ellipse cx="0" cy="-3" rx="5" ry="1.6" fill="#6a5a3a" />
        </g>
        {/* Fishing crate */}
        <g transform="translate(56, 150)">
          <rect x="0" y="0" width="14" height="10" fill="#3a4a3a" />
          <rect x="2" y="2" width="10" height="6" fill="#4a5a4a" />
          <line x1="0" y1="5" x2="14" y2="5" stroke="#2a3a2a" strokeWidth="0.5" />
        </g>
        {/* Tall dock lamp post — stands on the raised dock surface (y=160) */}
        <rect x="86" y="130" width="2.5" height="30" fill="#2a1a0a" />
        <rect x="86" y="130" width="2.5" height="2" fill="#4a2a18" />
        <rect x="83" y="158" width="8" height="3" fill="#2a1a0a" />
        <rect x="87" y="130" width="8" height="1.5" fill="#2a1a0a" />
        <line x1="94" y1="131" x2="94" y2="135" stroke="#1a0a04" strokeWidth="0.5" />
        {/* Lantern fixed to the post (no swing) — only the inner flame flickers. */}
        <g>
          <rect x="90" y="135" width="8" height="8" fill="#4a3618" />
          <rect x="90" y="135" width="8" height="1" fill="#6a4e28" />
          <rect x="91" y="136" width="6" height="6" fill="#ffcc44" opacity="0.95"
            className="cinematic-lamp-flicker" />
          <circle cx="94" cy="139" r="14" fill="#ffaa44" opacity="0.18" />
          <circle cx="94" cy="139" r="24" fill="#ffaa44" opacity="0.07" />
        </g>
        {/* Warm lantern pool on dock surface below the post */}
        <ellipse cx="94" cy="161" rx="30" ry="3" fill="#ffaa44" opacity="0.12" />
        {/* Lantern reflection on water below dock */}
        <ellipse cx="94" cy="184" rx="14" ry="1.5" fill="#ffaa44" opacity="0.2"
          className="cinematic-lamp-flicker" style={{ animationDelay: '0.4s' }} />

        {/* Dock cleat (where mooring rope is tied) */}
        <rect x="113" y="158" width="5" height="3" fill="#2a1a0a" />
        <rect x="113" y="158" width="5" height="1" fill="#4a2a14" />

        {/* Mooring rope — runs from dock cleat DOWN to boat bow.
            Passes behind the plank for depth. */}
        <path d="M 115 160 Q 160 170, 196 174" fill="none"
          stroke="#6a5a3a" strokeWidth="1.2" opacity="0.85" />
        <path d="M 115 161 Q 160 171, 196 175" fill="none"
          stroke="#4a3820" strokeWidth="0.6" opacity="0.6" />

        {/* === GANGPLANK — descends from dock DOWN to boat deck === */}
        {/* The plank rotates +9° (clockwise) around its dock-end pivot
            at (122, 162) so its right end drops ~12px toward the
            boat's deck. Characters walking the plank travel downhill. */}
        <g transform="rotate(9 122 162)">
          {/* Plank shadow on water below (hint of where it lands) */}
          <ellipse cx="195" cy="173" rx="14" ry="2" fill="#000" opacity="0.4" />
          {/* Plank body */}
          <rect x="118" y="160" width="80" height="4.5" fill="#6a5a3a" />
          <rect x="118" y="160" width="80" height="1.2" fill="#9a8458" />
          <rect x="118" y="163.3" width="80" height="1.2" fill="#3a2810" />
          {/* Subtle worn grain */}
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <line key={`pg-${i}`} x1={124 + i * 11} y1={160} x2={123 + i * 11} y2={164.5}
              stroke="#3a2810" strokeWidth="0.4" opacity="0.6" />
          ))}
          {/* Simple rope railing tied between posts on either end of plank */}
          <circle cx="120" cy="160" r="0.8" fill="#2a1810" />
          <circle cx="198" cy="160" r="0.8" fill="#2a1810" />
        </g>

        {/* === The fishing boat ===
            Sits floating IN the ocean, centered horizontally (hull
            x=190–300, center ≈ 245) and positioned vertically so the
            deck (SVG y≈172) is clearly BELOW the raised dock top
            (y=160) — the plank descends onto it. Waterline of the
            hull (local y=32 → SVG 190) sits at/below the scene's
            waterline at y=180, making it read as a boat afloat on
            the sea just off the end of the plank. */}
        <g transform="translate(240, 158)">
        <g className="p2-boat-gentle-rock">
          {/* Wide water shadow beneath hull */}
          <ellipse cx="0" cy="36" rx="66" ry="5" fill="#02040a" opacity="0.6" />

          {/* Soft warm pool of light on the water around the cabin (lamp spill) */}
          <ellipse cx="-20" cy="22" rx="42" ry="10" fill="#ffaa44" opacity="0.09" />

          {/* Hull — lighter brown so it pops against navy water */}
          <polygon points="-50,18 -40,34 50,34 60,18" fill="#5a3a1e" />
          <polygon points="-50,18 -40,34 50,34 60,18" fill="none" stroke="#1a0a04" strokeWidth="1.2" />
          {/* Plank lines on hull */}
          <line x1="-42" y1="26" x2="52" y2="26" stroke="#1a0a04" strokeWidth="0.8" />
          <line x1="-44" y1="22" x2="54" y2="22" stroke="#2a1810" strokeWidth="0.5" opacity="0.7" />
          {/* Plank vertical grain */}
          <line x1="-32" y1="18" x2="-30" y2="34" stroke="#2a1810" strokeWidth="0.4" opacity="0.6" />
          <line x1="-10" y1="18" x2="-9"  y2="34" stroke="#2a1810" strokeWidth="0.4" opacity="0.6" />
          <line x1="12"  y1="18" x2="13"  y2="34" stroke="#2a1810" strokeWidth="0.4" opacity="0.6" />
          <line x1="32"  y1="18" x2="34"  y2="34" stroke="#2a1810" strokeWidth="0.4" opacity="0.6" />
          {/* Top-edge moonlight rim on hull */}
          <line x1="-50" y1="18" x2="60" y2="18" stroke="#a08060" strokeWidth="0.8" opacity="0.7" />
          {/* Waterline foam highlight */}
          <rect x="-46" y="32" width="92" height="1" fill="#6a8aaa" opacity="0.5" />

          {/* Deck — warmer, catches cabin lantern light */}
          <rect x="-42" y="14" width="94" height="6" fill="#7a5228" />
          <rect x="-42" y="14" width="94" height="1.5" fill="#a07040" />
          <rect x="-42" y="19" width="94" height="1" fill="#3a2414" opacity="0.6" />
          {/* Deck plank divisions */}
          {[-28, -14, 0, 14, 28, 42].map((dx, di) => (
            <line key={`dp-${di}`} x1={dx} y1={14} x2={dx} y2={20}
              stroke="#3a2414" strokeWidth="0.4" opacity="0.5" />
          ))}

          {/* Cabin / pilothouse */}
          <rect x="-36" y="0" width="30" height="14" fill="#4a2e18" />
          <rect x="-36" y="0" width="30" height="1.5" fill="#6a4028" />
          <rect x="-36" y="0" width="30" height="14" fill="none" stroke="#1a0a04" strokeWidth="0.8" />
          {/* Cabin windows — dark frames */}
          <rect x="-32" y="2" width="8" height="8" fill="#0a0a18" />
          <rect x="-32" y="2" width="8" height="8" fill="none" stroke="#1a0a04" strokeWidth="0.5" />
          <rect x="-20" y="2" width="8" height="8" fill="#0a0a18" />
          <rect x="-20" y="2" width="8" height="8" fill="none" stroke="#1a0a04" strokeWidth="0.5" />
          {/* Warm light leaking through windows */}
          <rect x="-32" y="2" width="8" height="6" fill="#f0b060" opacity="0.55"
            className="cinematic-lamp-flicker" />
          <rect x="-20" y="2" width="8" height="6" fill="#f0b060" opacity="0.55"
            className="cinematic-lamp-flicker" style={{ animationDelay: '0.8s' }} />
          {/* Window cross-bars */}
          <line x1="-32" y1="6" x2="-24" y2="6" stroke="#2a1810" strokeWidth="0.4" />
          <line x1="-28" y1="2" x2="-28" y2="10" stroke="#2a1810" strokeWidth="0.4" />
          <line x1="-20" y1="6" x2="-12" y2="6" stroke="#2a1810" strokeWidth="0.4" />
          <line x1="-16" y1="2" x2="-16" y2="10" stroke="#2a1810" strokeWidth="0.4" />
          {/* Cabin door */}
          <rect x="-8" y="3" width="2.5" height="10" fill="#1a0a04" />

          {/* Mast */}
          <rect x="20" y="-32" width="3" height="46" fill="#3a2a18" />
          <rect x="14" y="-26" width="14" height="1.5" fill="#3a2a18" />
          {/* Furled sail */}
          <rect x="16" y="-28" width="12" height="5" fill="#c0b890" />
          <rect x="16" y="-23" width="12" height="3" fill="#a09870" />
          {/* Rigging */}
          <line x1="21" y1="-32" x2="14" y2="-24" stroke="#2a1a10" strokeWidth="0.5" />
          <line x1="21" y1="-32" x2="28" y2="-24" stroke="#2a1a10" strokeWidth="0.5" />
          {/* Lantern on mast */}
          <g>
            <rect x="15" y="-38" width="9" height="6" fill="#4a3618" />
            <rect x="15" y="-38" width="9" height="1" fill="#6a4e28" />
            <rect x="16.5" y="-37" width="6" height="4" fill="#ffcc44" opacity="0.95"
              className="cinematic-lamp-flicker" />
            <circle cx="19.5" cy="-35" r="14" fill="#ffaa44" opacity="0.2" />
            <circle cx="19.5" cy="-35" r="24" fill="#ffaa44" opacity="0.08" />
          </g>

          {/* Engine at stern */}
          <rect x="34" y="4" width="16" height="10" fill="#2a2a2a" />
          <rect x="34" y="4" width="16" height="1.5" fill="#4a4a4a" />
          <rect x="38" y="0" width="4" height="6" fill="#1a1a1a" />
          {/* Rudder */}
          <rect x="50" y="20" width="4" height="10" fill="#2a1a0a" />
          {/* Exhaust wisps */}
          <g className="cinematic-smoke-rise">
            <ellipse cx="40" cy="-4" rx="2.5" ry="2" fill="#4a4a5a" opacity="0.55" />
          </g>
          <g className="cinematic-smoke-rise" style={{ animationDelay: '1.2s' }}>
            <ellipse cx="41" cy="-10" rx="2.5" ry="2" fill="#3a3a4a" opacity="0.45" />
          </g>
          <g className="cinematic-smoke-rise" style={{ animationDelay: '2.4s' }}>
            <ellipse cx="39" cy="-16" rx="2" ry="1.5" fill="#2a2a3a" opacity="0.35" />
          </g>

          {/* Strangers already on boat — canonical palettes */}
          <PixelPerson x={-30} y={6} scale={0.7} variant="civilian" {...FELLOW_PASSENGERS[0]}
            mood="scared" sway="idle" swayDelay={0.1} />
          <PixelPerson x={-18} y={8} scale={0.65} variant="civilian" {...FELLOW_PASSENGERS[3]}
            mood="sad" sway="idle" swayDelay={0.3} />
          <PixelPerson x={-8} y={6} scale={0.7} variant="civilian" {...FELLOW_PASSENGERS[1]}
            mood="weary" sway="idle" swayDelay={0.5} />
          <PixelPerson x={2} y={8} scale={0.6} variant="civilian" {...FELLOW_PASSENGERS[4]}
            mood="scared" sway="idle" swayDelay={0.7} />
          <PixelPerson x={12} y={6} scale={0.7} variant="civilian" {...FELLOW_PASSENGERS[2]}
            mood="sad" sway="idle" swayDelay={0.9} />
          <PixelPerson x={28} y={8} scale={0.65} variant="civilian" {...FELLOW_PASSENGERS[5]}
            mood="weary" sway="idle" swayDelay={1.1} />
          <PixelPerson x={40} y={6} scale={0.6} variant="civilian" {...FELLOW_PASSENGERS[0]}
            mood="scared" sway="idle" swayDelay={1.3} mirror />

          {/* Captain leaning out of the cabin door */}
          <PixelPerson x={-6} y={2} scale={0.5} variant="civilian" {...CAPTAIN}
            mood="determined" sway="idle" />
        </g>
        </g>

        {/* Father — already on the boat deck, reaching back toward the plank
            to help the next person aboard. Feet land on the deck at SVG y≈172-178. */}
        <g transform="translate(208, 154)">
          <g className="p2-boat-gentle-rock">
            <PixelPerson x={0} y={0} scale={0.9} variant="civilian" {...FATHER}
              mood="determined" sway="idle" />
            {/* Outstretched hand reaching back toward the plank */}
            <rect x={16} y={6} width={8} height={1.8} fill={FATHER.color} />
            <rect x={22} y={5} width={2} height={3} fill={FATHER.color} />
          </g>
        </g>

        {/* You — crossing DOWN the plank from the dock to the boat.
            The plank is rotated 9° around (122, 162), so its top edge
            runs from ≈(122, 160) at the dock end to ≈(197, 172) at the
            boat end. At scale 1.0 the sprite is 26 units tall, so for
            the feet to sit on the plank the translate-y must equal
            plank_y − 26 at every keyframe (see keyframes in <style>). */}
        <g className="p2-cross-plank">
          <PixelPerson x={0} y={0} scale={1.0} variant="civilian" {...PROTAGONIST}
            mood="scared" sway="idle" swayDelay={0.2} />
          {/* NOTE: previously two skin-colored rects at y=-2 sat above
              the sprite as "outstretched arms for balance", but because
              they were drawn above the hair they read as two floating
              beige rectangles above the character's head. Removed —
              the PixelPerson sprite already has arm geometry in its
              shoulder row. */}
        </g>

        {/* Mother — first in line on the raised dock, ready to step onto the plank */}
        <g transform="translate(100, 138)">
          <PixelPerson x={0} y={0} scale={1.1} variant="civilian" {...MOTHER}
            mood="scared" sway="scared" swayDelay={0.4} />
          {/* Clutching a bag */}
          <rect x={-4} y={6} width={6} height={5} fill="#4a3a20" />
          <rect x={-4} y={6} width={6} height={1.5} fill="#6a5230" />
        </g>

        {/* Other refugees queued behind Mother on the dock, waiting their turn */}
        <PixelPerson x={72} y={140} scale={0.9} variant="civilian" {...FELLOW_PASSENGERS[2]}
          mood="weary" sway="idle" swayDelay={0.5} />
        <PixelPerson x={48} y={142} scale={0.85} variant="civilian" {...FELLOW_PASSENGERS[4]}
          mood="weary" sway="idle" swayDelay={0.8} />
        <PixelPerson x={26} y={144} scale={0.8} variant="civilian" {...FELLOW_PASSENGERS[1]}
          mood="sad" sway="idle" swayDelay={1.1} />
        {/* A small child clinging to the queue */}
        <PixelPerson x={60} y={150} scale={0.55} variant="civilian" {...FELLOW_PASSENGERS[3]}
          mood="sad" sway="scared" swayDelay={0.6} />

        {/* Water splashing against the hull (waterline now at y≈190) */}
        {[192, 210, 282, 300, 244, 220].map((sx, si) => (
          <rect key={`splash-${si}`}
            x={sx} y={189 + si % 3}
            width="3" height="2"
            fill="#6aa0c0" opacity="0.55"
            className="cinematic-splash"
            style={{ animationDelay: `${si * 0.3}s` }}
          />
        ))}
        {/* Foam ripples wrapping around the hull bottom */}
        <ellipse cx="245" cy="195" rx="58" ry="1.8" fill="#4a6a8a" opacity="0.55"
          className="p2-wave-drift" />
        <ellipse cx="245" cy="197" rx="50" ry="1.2" fill="#3a5a7a" opacity="0.4"
          className="p2-wave-drift" style={{ animationDelay: '0.6s' }} />

        {/* Boat reflection smeared on the water surface below hull */}
        <ellipse cx="245" cy="200" rx="55" ry="3" fill="#1a2838" opacity="0.55" />
        <ellipse cx="245" cy="204" rx="35" ry="1.5" fill="#2a3848" opacity="0.35"
          className="p2-wave-drift" style={{ animationDelay: '0.9s' }} />
        {/* Warm lantern reflection in the water directly under cabin */}
        <ellipse cx="220" cy="198" rx="18" ry="1.5" fill="#ffaa44" opacity="0.22"
          className="cinematic-lamp-flicker" style={{ animationDelay: '0.3s' }} />

        {/* NOTE: a second small moored boat used to sit out on the open
            water at translate(420, 178). It wasn't tied to the dock and
            had no narrative role — it just bobbed out on the ocean as a
            loose "fleet reference" silhouette, which read as a stray
            boat with no moor. Removed. */}

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="35" fill="#000" opacity="0.5" />
        <rect x="0" y="250" width="500" height="30" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENE 3 — THE BOAT
// Boat moves away, shore recedes, protagonist dares to glance back.
// ===========================================================================
function Scene3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#04041a] via-[#08101e] to-[#0a1830]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Deep night sky */}
        <rect x="0" y="0" width="500" height="280" fill="#05071e" />
        {/* Faint milky way band */}
        <rect x="0" y="20" width="500" height="50" fill="#1a1a3a" opacity="0.14" />

        {/* Many stars */}
        {[
          [18, 8], [55, 22], [90, 12], [130, 32], [165, 6], [200, 26], [235, 14],
          [270, 36], [305, 10], [340, 28], [375, 18], [410, 38], [445, 8], [480, 24],
          [35, 44], [105, 48], [180, 42], [250, 50], [320, 46], [400, 54], [460, 40],
          [70, 56], [150, 60], [295, 58], [370, 52], [430, 62], [45, 78], [180, 80],
          [290, 76], [420, 82],
        ].map(([x, y], i) => (
          <rect key={`star-${i}`} x={x} y={y} width="1.5" height="1.5" fill="#e8e0c0"
            opacity={0.3 + (i % 4) * 0.15}
            className="cinematic-twinkle-star" style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* Shooting star across background (a small grace note) */}
        <g className="p2-shoot-star">
          <line x1="120" y1="38" x2="100" y2="34" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
          <rect x="120" y="38" width="2" height="2" fill="#ffffff" />
        </g>

        {/* Receding shoreline — fading away */}
        <g className="p2-shore-vanish">
          <polygon
            points="0,94 40,88 90,92 150,84 220,90 300,82 380,88 440,80 500,86 500,100 0,100"
            fill="#0a0f14"
          />
          {/* City silhouette on shore, tiny */}
          {[30, 80, 140, 200, 280, 340, 420, 470].map((bx, bi) => (
            <rect key={`bld-${bi}`} x={bx} y={80 + (bi % 3) * 2} width={8}
              height={14 - (bi % 4) * 2} fill="#0a0a10" />
          ))}
          {/* Fading lights */}
          {[40, 100, 160, 230, 300, 380, 450].map((lx, li) => (
            <rect key={`fl-${li}`} x={lx} y={84 + li % 3} width="1.5" height="1.5"
              fill="#ffcc66" opacity="0.25"
              className="cinematic-lamp-flicker" style={{ animationDelay: `${li * 0.4}s` }} />
          ))}
        </g>

        {/* Water — flat navy fill. Previously rendered 11 full-width
            horizontal <line> elements here at y=110, 125, 140, ..., 260
            with stroke="#1a2a3a" to suggest surface ripples, but because
            each spanned x=-10 to x=510 at a fixed y they read as a
            ladder of solid horizontal stripes cutting the ocean into
            bands. Removed — the wake V-shape below already gives the
            water direction/motion without stripes. */}
        <rect x="0" y="100" width="500" height="180" fill="#0a1828" />

        {/* === Dock on the left edge — empty after boarding ===
            Same dock used in Scene 2 (GETTING ON THE BOAT), but now
            deserted: all the refugees have boarded the boat and the
            deck is bare. Acts as a visual anchor showing where the
            boat just departed FROM, while the boat animates to the
            right of the frame. */}
        <rect x="0" y="160" width="130" height="5" fill="#5a4a30" />
        <rect x="0" y="160" width="130" height="1.5" fill="#7a6448" />
        {[16, 34, 52, 70, 88, 106, 124].map((dx, i) => (
          <line key={`s3dk-plank-${i}`} x1={dx} y1={160} x2={dx} y2={165}
            stroke="#2a1a08" strokeWidth="0.4" opacity="0.8" />
        ))}
        <rect x="0" y="165" width="130" height="4" fill="#3a2a14" />
        <rect x="0" y="165" width="130" height="0.8" fill="#4a3620" />
        <rect x="0" y="169" width="130" height="12" fill="#020408" opacity="0.55" />
        {[16, 58, 100, 124].map((px, i) => (
          <g key={`s3pile-${i}`}>
            <rect x={px} y={168} width="5" height="52" fill="#2a1a08" />
            <rect x={px} y={168} width="5" height="1.5" fill="#4a3020" />
            <rect x={px - 0.5} y={179} width="6" height="2" fill="#0a1422" opacity="0.85" />
            <rect x={px + 0.5} y={181} width="3" height="8" fill="#1a2838" opacity="0.45" />
          </g>
        ))}
        {/* NOTE: barrel stack, coiled rope, and fishing crate that
            Scene 2 shows on this dock have been removed here — the
            refugees have taken their belongings onto the boat, so
            the deck reads as stripped/empty after the departure. */}
        {/* Lamp post + fixed lantern (only the flame flickers) */}
        <rect x="86" y="130" width="2.5" height="30" fill="#2a1a0a" />
        <rect x="86" y="130" width="2.5" height="2" fill="#4a2a18" />
        <rect x="83" y="158" width="8" height="3" fill="#2a1a0a" />
        <rect x="87" y="130" width="8" height="1.5" fill="#2a1a0a" />
        <line x1="94" y1="131" x2="94" y2="135" stroke="#1a0a04" strokeWidth="0.5" />
        <g>
          <rect x="90" y="135" width="8" height="8" fill="#4a3618" />
          <rect x="90" y="135" width="8" height="1" fill="#6a4e28" />
          <rect x="91" y="136" width="6" height="6" fill="#ffcc44" opacity="0.95"
            className="cinematic-lamp-flicker" />
          <circle cx="94" cy="139" r="14" fill="#ffaa44" opacity="0.18" />
          <circle cx="94" cy="139" r="24" fill="#ffaa44" opacity="0.07" />
        </g>
        <ellipse cx="94" cy="161" rx="30" ry="3" fill="#ffaa44" opacity="0.12" />
        <ellipse cx="94" cy="184" rx="14" ry="1.5" fill="#ffaa44" opacity="0.2"
          className="cinematic-lamp-flicker" style={{ animationDelay: '0.4s' }} />
        {/* Dock cleat + the cut/dangling mooring rope the boat left behind */}
        <rect x="113" y="158" width="5" height="3" fill="#2a1a0a" />
        <rect x="113" y="158" width="5" height="1" fill="#4a2a14" />
        <path d="M 115 161 Q 120 170, 122 176" fill="none"
          stroke="#6a5a3a" strokeWidth="1" opacity="0.75" />

        {/* === The boat — slowly gliding rightward, away from the dock ===
            The `p2-boat-depart` animation translates this whole group
            horizontally (see keyframes below). The wake ellipses are
            placed INSIDE this group (with negative cx values) so they
            trail immediately behind the stern and move with the boat,
            rather than being anchored to one spot on the ocean. */}
        <g transform="translate(210, 154)" className="p2-boat-depart">
          {/* Trailing wake — short foam fan behind the hull */}
          <ellipse cx="-60"  cy="30" rx="26" ry="2"   fill="#3a5a7a" opacity="0.45"
            className="p2-wave-drift" />
          <ellipse cx="-88"  cy="32" rx="22" ry="1.6" fill="#2a4a6a" opacity="0.32"
            className="p2-wave-drift" style={{ animationDelay: '0.6s' }} />
          <ellipse cx="-116" cy="34" rx="18" ry="1.2" fill="#1a3a5a" opacity="0.22"
            className="p2-wave-drift" style={{ animationDelay: '1.2s' }} />
          <ellipse cx="-142" cy="36" rx="14" ry="1"   fill="#1a2a4a" opacity="0.15"
            className="p2-wave-drift" style={{ animationDelay: '1.8s' }} />
          {/* Water shadow */}
          <ellipse cx="0" cy="28" rx="52" ry="3.5" fill="#02040a" opacity="0.55" />
          {/* Hull */}
          <polygon points="-40,14 -34,26 40,26 46,14" fill="#3a2a14" />
          <polygon points="-40,14 -34,26 40,26 46,14" fill="none" stroke="#2a1a0a" strokeWidth="1" />
          <line x1="-36" y1="20" x2="42" y2="20" stroke="#2a1a0a" strokeWidth="0.8" />
          {/* Deck */}
          <rect x="-34" y="10" width="76" height="6" fill="#4a3a20" />
          <rect x="-34" y="10" width="76" height="1" fill="#6a5230" />
          {/* Cabin */}
          <rect x="-28" y="-2" width="24" height="12" fill="#3a2a14" />
          <rect x="-24" y="0" width="6" height="6" fill="#0a0a18" />
          <rect x="-14" y="0" width="6" height="6" fill="#0a0a18" />
          {/* Warm cabin light */}
          <rect x="-24" y="0" width="6" height="2.5" fill="#8a6a3a" opacity="0.3" />
          <rect x="-14" y="0" width="6" height="2.5" fill="#8a6a3a" opacity="0.3" />
          {/* Mast */}
          <rect x="16" y="-26" width="2" height="36" fill="#3a2a18" />
          <rect x="12" y="-24" width="10" height="4" fill="#b0a880" />
          {/* NOTE: a small red flag (a 1.2×4 pole plus a #c02020 polygon
              pennant) used to fly from the mast top at y=-30. Removed
              at the user's request — the boat now shows only the
              neutral mast and furled sail. */}
          {/* Lantern */}
          <rect x="13" y="-30" width="6" height="4" fill="#ffcc44" opacity="0.7"
            className="cinematic-lamp-flicker" />
          <circle cx="16" cy="-28" r="12" fill="#ffaa44" opacity="0.15" />

          {/* Engine with smoke */}
          <rect x="32" y="0" width="12" height="10" fill="#2a2a2a" />
          <rect x="35" y="-4" width="4" height="5" fill="#1a1a1a" />
          <g className="cinematic-smoke-rise" style={{ animationDuration: '2s' }}>
            <ellipse cx="37" cy="-8" rx="3" ry="2.5" fill="#3a3a4a" opacity="0.55" />
          </g>
          <g className="cinematic-smoke-rise" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
            <ellipse cx="39" cy="-12" rx="2.5" ry="2" fill="#2a2a3a" opacity="0.45" />
          </g>
          <g className="cinematic-smoke-rise" style={{ animationDuration: '3s', animationDelay: '1s' }}>
            <ellipse cx="36" cy="-16" rx="2" ry="1.8" fill="#1a1a28" opacity="0.4" />
          </g>

          {/* Canonical passengers on deck */}
          <PixelPerson x={-24} y={2} scale={0.65} variant="civilian" {...FELLOW_PASSENGERS[2]}
            mood="weary" sway="idle" swayDelay={0.1} />
          <PixelPerson x={-14} y={4} scale={0.7} variant="civilian" {...MOTHER}
            mood="sad" sway="idle" swayDelay={0.3} />
          <PixelPerson x={4} y={4} scale={0.65} variant="civilian" {...FATHER}
            mood="determined" sway="idle" swayDelay={0.5} />
          <PixelPerson x={16} y={2} scale={0.6} variant="civilian" {...FELLOW_PASSENGERS[4]}
            mood="scared" sway="idle" swayDelay={0.7} />
          <PixelPerson x={28} y={4} scale={0.6} variant="civilian" {...FELLOW_PASSENGERS[1]}
            mood="weary" sway="idle" swayDelay={0.9} />

          {/* Protagonist at the stern, facing back toward the shore */}
          <g>
            <PixelPerson x={-6} y={0} scale={0.8} variant="civilian" {...PROTAGONIST}
              mood="sad" sway="idle" mirror />
          </g>
        </g>

        {/* Distant birds (leaving the shore too) */}
        {[120, 160, 200, 260, 340].map((bx, bi) => (
          <g key={`bird-${bi}`}
            transform={`translate(${bx}, ${70 + bi * 3})`}
            className="p2-birds-fly"
            style={{ animationDelay: `${bi * 1.5}s` }}
          >
            <line x1="0" y1="0" x2="-3" y2="-2" stroke="#3a3a4a" strokeWidth="1" />
            <line x1="0" y1="0" x2="3" y2="-2" stroke="#3a3a4a" strokeWidth="1" />
          </g>
        ))}

        {/* Very subtle fog layer at waterline */}
        <rect x="0" y="96" width="500" height="10" fill="#1a2030" opacity="0.4"
          className="p2-mist-drift" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="35" fill="#000" opacity="0.4" />
        <rect x="0" y="250" width="500" height="30" fill="#000" opacity="0.5" />
      </svg>
    </div>
  );
}

// ===========================================================================
// SCENES ARRAY & MAIN EXPORT
// ===========================================================================
const SCENES = [
  {
    label: 'GOING TO THE BOAT',
    badge: 'THE PIER · NIGHT',
    text: 'As you approach the boat, you do not look back at your homeland. You are afraid that if you look, you will stop.',
    Component: Scene1,
  },
  {
    label: 'GETTING ON THE BOAT',
    badge: 'THE PIER · NIGHT',
    text: 'One at a time across a plank of wood. Nobody speaks above a whisper. Your father goes first. You follow. Your mother last. You look onward and realize you do not know many of these people. However, they are the only people in your world until who knows when.',
    Component: Scene2,
  },
  {
    label: 'THE BOAT',
    badge: 'THE RIVER · NIGHT',
    text: 'Finally, the boat moves. The bank falls away. The city disappears around a bend in the river. This is the part that cannot be undone.',
    Component: Scene3,
  },
];

export function TravelingByBoatCinematic({ onComplete, onNarrate }: CinematicProps) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [, setTextDone] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    const scene = SCENES[sceneIndex];
    if (scene && onNarrate) onNarrate(scene.text);
  }, [sceneIndex, onNarrate]);

  const handleTextDone = useCallback(() => {
    setTextDone(true);
    setTimeout(() => setArrowVisible(true), 500);
  }, []);

  const handleNext = useCallback(() => {
    if (!arrowVisible) return;
    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex(s => s + 1);
      setTextDone(false);
      setArrowVisible(false);
    } else {
      onComplete();
    }
  }, [sceneIndex, arrowVisible, onComplete]);

  const scene = SCENES[sceneIndex];

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Scene-local keyframes */}
      <style>{`
        /* Base chibi-sway classes (imported by PixelPerson, needed standalone) */
        @keyframes p2-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes p2-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: p2-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: p2-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        /* Star twinkling */
        @keyframes p2-twinkle-star {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .cinematic-twinkle-star { animation: p2-twinkle-star 2.2s ease-in-out infinite; }

        /* Lamp flicker */
        @keyframes p2-lamp-flicker {
          0%, 100% { opacity: 0.8; }
          40%      { opacity: 0.5; }
          60%      { opacity: 1; }
          85%      { opacity: 0.7; }
        }
        .cinematic-lamp-flicker { animation: p2-lamp-flicker 2s ease-in-out infinite; }

        /* Smoke rise (reused by engine exhaust) */
        @keyframes p2-smoke-rise {
          0%   { opacity: 0.55; transform: translate(0, 0) scale(0.6); }
          100% { opacity: 0;    transform: translate(-10px, -28px) scale(1.5); }
        }
        .cinematic-smoke-rise { animation: p2-smoke-rise 3s ease-out infinite; transform-box: fill-box; }

        /* Splash pulse */
        @keyframes p2-splash {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50%      { transform: scaleY(0.2); opacity: 0.2; }
        }
        .cinematic-splash { animation: p2-splash 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        /* Water ripple drift */
        @keyframes p2-wave-drift {
          0%   { transform: translateX(0); opacity: 0.2; }
          50%  { transform: translateX(8px); opacity: 0.35; }
          100% { transform: translateX(0); opacity: 0.2; }
        }
        .p2-wave-drift { animation: p2-wave-drift 3s ease-in-out infinite; }

        /* Scene 1: shore receding slightly */
        @keyframes p2-shore-recede {
          0%   { opacity: 0.9; }
          100% { opacity: 0.55; }
        }
        .p2-shore-recede { animation: p2-shore-recede 12s ease-out forwards; }

        /* Scene 1 + 2: gentle boat bob */
        @keyframes p2-boat-wait {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1px); }
        }
        .p2-boat-wait { animation: p2-boat-wait 3s ease-in-out infinite; }

        /* Scene 1: mist drifting across */
        @keyframes p2-mist-drift {
          0%   { transform: translateX(0); opacity: 0.4; }
          50%  { transform: translateX(20px); opacity: 0.55; }
          100% { transform: translateX(0); opacity: 0.4; }
        }
        .p2-mist-drift { animation: p2-mist-drift 12s ease-in-out infinite; }

        /* Scene 1: lighthouse beam sweep */
        @keyframes p2-lighthouse-sweep {
          0%   { transform: rotate(-12deg); }
          50%  { transform: rotate(22deg); }
          100% { transform: rotate(-12deg); }
        }
        .p2-lighthouse-sweep { animation: p2-lighthouse-sweep 9s ease-in-out infinite; transform-box: fill-box; }

        /* Scene 1/2: lanterns swinging */
        @keyframes p2-lantern-swing {
          0%, 100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        .p2-lantern-swing { animation: p2-lantern-swing 4s ease-in-out infinite; transform-box: fill-box; }

        /* Scene 1: family walking forward along pier — each member has
           their own start/end coords via CSS custom properties.
           End-Y values are kept below the mid-pier family (at y~148)
           so the walking family doesn't pass / clip them. */
        @keyframes p2-walk-forward {
          0%   { transform: translate(var(--wf-sx), var(--wf-sy)); }
          100% { transform: translate(var(--wf-ex), var(--wf-ey)); }
        }
        .p2-walk-forward-1 {
          --wf-sx: 244px; --wf-sy: 208px; --wf-ex: 250px; --wf-ey: 180px;
          animation: p2-walk-forward 10s ease-in-out infinite alternate;
        }
        .p2-walk-forward-2 {
          --wf-sx: 232px; --wf-sy: 220px; --wf-ex: 242px; --wf-ey: 192px;
          animation: p2-walk-forward 10s ease-in-out infinite alternate;
          animation-delay: 0.8s;
        }
        .p2-walk-forward-3 {
          --wf-sx: 218px; --wf-sy: 234px; --wf-ex: 232px; --wf-ey: 206px;
          animation: p2-walk-forward 10s ease-in-out infinite alternate;
          animation-delay: 1.6s;
        }

        /* Scene 2: boat gentle rock */
        @keyframes p2-boat-gentle-rock {
          0%, 100% { transform: rotate(-0.5deg) translateY(0); }
          50%      { transform: rotate(0.5deg) translateY(-2px); }
        }
        .p2-boat-gentle-rock { animation: p2-boat-gentle-rock 4s ease-in-out infinite; transform-origin: center bottom; }

        /* Scene 2: crossing the plank.
           Plank now spans x=110 to x=190 (rotated -8 around 120,182).
           Start on dock end, step along plank, land on boat deck. */
        /* Walks DOWN the plank from the raised dock (y≈148) onto the
           lower boat deck (y≈161). Y increases = moving down on screen. */
        /* Scene 2: the protagonist walks the gangplank from the dock
           down onto the boat. The plank is rotated 9 degrees around
           (122, 162) so its top edge runs from (122, 160) to (197, 172).
           The sprite is 26 units tall at scale 1.0, so translate_y =
           plank_y - 26 at every waypoint keeps the feet glued to the
           plank top.

             dock step-on  (x=122)  - plank_y=160   - top_y=134
             mid plank     (x=160)  - plank_y=166   - top_y=140
             boat step-off (x=195)  - plank_y=171.5 - top_y=145.5

           The motion is a one-way walk toward the boat, then a quick
           opacity reset so the character "comes back to the line" for
           the next cycle - always moving TOWARDS the boat during the
           visible portion of the loop (vs. the old alternate setup). */
        @keyframes p2-cross-plank {
          0%    { transform: translate(122px, 134px); }
          3%    { transform: translate(122px, 134px); }
          47%   { transform: translate(160px, 140px); }
          93%   { transform: translate(195px, 145.5px); opacity: 1; }
          95%   { transform: translate(195px, 145.5px); opacity: 0; }
          96%   { transform: translate(122px, 134px); opacity: 0; }
          100%  { transform: translate(122px, 134px); opacity: 1; }
        }
        .p2-cross-plank {
          animation: p2-cross-plank 6s linear infinite;
        }

        /* Scene 3: shore vanishing */
        @keyframes p2-shore-vanish {
          0%   { opacity: 0.75; transform: translateY(0) scaleY(1); }
          100% { opacity: 0.18; transform: translateY(4px) scaleY(0.55); }
        }
        .p2-shore-vanish { animation: p2-shore-vanish 14s ease-out forwards; transform-origin: center bottom; }

        /* Scene 3: boat departing (subtle shrink = moving away) */
        /* Slow, seamless horizontal drift. The boat starts just past
           the left-edge dock (x=210, clear of the dock's right edge
           at x=130) and eases rightward to a final x=320 — which
           stays safely under 2/3 of the 500-wide canvas (~333) so
           the boat never drifts past the 2/3 mark of the screen.
           The intermediate keyframes add a subtle up/down bob plus a
           gentle scale shrink so the motion feels like a boat
           floating on water rather than a rigid slide. The
           cubic-bezier timing easing prevents any abrupt start or
           stop — motion ramps in softly and decays smoothly. */
        @keyframes p2-boat-depart {
          0%   { transform: translate(210px, 154px) scale(1);    }
          20%  { transform: translate(235px, 152.4px) scale(0.98); }
          40%  { transform: translate(260px, 153.8px) scale(0.96); }
          60%  { transform: translate(283px, 151.8px) scale(0.94); }
          80%  { transform: translate(303px, 152.6px) scale(0.92); }
          100% { transform: translate(320px, 150.5px) scale(0.9);  }
        }
        .p2-boat-depart {
          animation: p2-boat-depart 26s cubic-bezier(0.22, 0.7, 0.3, 1) forwards;
          transform-origin: center center;
          will-change: transform;
        }

        /* Scene 3: wake growing */
        @keyframes p2-wake-grow {
          0%   { opacity: 0; transform: scaleY(0.3); }
          100% { opacity: 0.55; transform: scaleY(1); }
        }
        .p2-wake-grow { animation: p2-wake-grow 10s ease-out forwards; transform-origin: center top; }

        /* Scene 3: birds flying */
        @keyframes p2-birds-fly {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(-90px, -34px); }
        }
        .p2-birds-fly { animation: p2-birds-fly 14s linear infinite; }

        /* Scene 3: shooting star */
        @keyframes p2-shoot-star {
          0%, 20%, 100% { opacity: 0; transform: translate(0, 0); }
          22%           { opacity: 1; transform: translate(0, 0); }
          40%           { opacity: 1; transform: translate(220px, 80px); }
          42%           { opacity: 0; transform: translate(220px, 80px); }
        }
        .p2-shoot-star { animation: p2-shoot-star 12s ease-in-out infinite; }
      `}</style>

      {/* --- Scene region (top) --- */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        <div key={sceneIndex} className="absolute inset-0 animate-fade-in-up">
          <scene.Component />
        </div>

        {/* Progress dots */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex gap-1">
          {SCENES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 transition-colors duration-300 ${
                i === sceneIndex
                  ? 'bg-primary'
                  : i < sceneIndex
                  ? 'bg-primary/50'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Period badge */}
        {scene.badge && (
          <div
            key={`badge-${sceneIndex}`}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 animate-fade-in-up"
          >
            <div className="font-retro text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-primary bg-black/70 backdrop-blur-sm border border-white/70 px-3 py-1">
              {scene.badge}
            </div>
          </div>
        )}

        {/* NOTE: the global GameEngine wrapper already applies a
            .scanlines CRT overlay; a second local overlay here used to
            stack on top of it, creating visible bright horizontal
            bands across the cinematic. Left intentionally removed. */}
      </div>

      {/* --- Text panel (bottom) --- */}
      <div className="relative shrink-0 bg-black px-2 md:px-4 pt-1.5 pb-2 md:pb-3">
        <div className="relative flex bg-black border-2 border-white">
          <button
            type="button"
            onClick={handleNext}
            disabled={!arrowVisible}
            className="flex-1 text-left focus:outline-none disabled:cursor-default cursor-pointer"
          >
            <DialogueBox>
              <div className="flex flex-col gap-0.5">
                {scene.label && (
                  <p
                    key={`label-${sceneIndex}`}
                    className="font-retro text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-primary animate-fade-in-up"
                  >
                    [ {scene.label} ]
                  </p>
                )}
                <DialogueTypewriter
                  key={sceneIndex}
                  text={scene.text}
                  onComplete={handleTextDone}
                />
              </div>

              {arrowVisible && (
                <div className="absolute right-1.5 bottom-0.5 md:right-2 md:bottom-1 animate-fade-in-up">
                  <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white animate-pulse" />
                </div>
              )}
            </DialogueBox>
          </button>

          <div className="flex flex-col border-l-2 border-white bg-black">
            <GameMenuBar onSaveAndExit={onComplete} />
          </div>
        </div>
      </div>
    </div>
  );
}
