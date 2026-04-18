import { useEffect, useState } from 'react';

// ─── Shared: proper 5-pointed pixel star ──────────────────────────────────
// cx/cy = top-left of bounding box, s = px per pixel-cell, c = fill color
function Star({ cx, cy, s, c }: { cx: number; cy: number; s: number; c: string }) {
  const r = (x: number, y: number, w = 1, h = 1) => (
    <rect key={`${x}${y}`} x={cx + x * s} y={cy + y * s} width={w * s} height={h * s} fill={c} />
  );
  return (
    <g>
      {r(3, 0, 1)}         {/* top point */}
      {r(2, 1, 3)}         {/* upper spread */}
      {r(0, 2, 7)}         {/* widest row */}
      {r(1, 3, 5)}         {/* lower spread */}
      {r(1, 4, 1)}{r(5, 4, 1)} {/* lower left/right arms */}
      {r(0, 5, 1)}{r(6, 5, 1)} {/* bottom tips */}
    </g>
  );
}

// ─── Scene 1: US Embassy Helicopter Evacuation ──────────────────────────────
function SceneEmbassy() {
  const skinColors  = ['#d4a574','#c49060','#e4b580','#a47840'];
  const clothColors = ['#334499','#993322','#449933','#886622'];
  const rooftopXs   = [112,119,126,133,140,147,154,161,168,175,182,189,196,203];

  return (
    <svg viewBox="0 0 320 180" className="w-full h-full pixel-art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="e-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0520" />
          <stop offset="45%" stopColor="#3d1040" />
          <stop offset="100%" stopColor="#c04010" />
        </linearGradient>
        <linearGradient id="e-fire" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#660000" />
          <stop offset="25%"  stopColor="#cc2200" />
          <stop offset="55%"  stopColor="#ff6600" />
          <stop offset="80%"  stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#ffee44" stopOpacity="0.3" />
        </linearGradient>
        <style>{`
          @keyframes e-rotor { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes e-hover { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
          @keyframes e-flicker-a { 0%,100%{opacity:.6} 50%{opacity:1} }
          @keyframes e-flicker-b { 0%,100%{opacity:1} 50%{opacity:.5} }
          @keyframes e-smoke { 0%{opacity:.35;transform:translateY(0) translateX(0)} 100%{opacity:0;transform:translateY(-22px) translateX(5px)} }
          @keyframes e-jump { 0%,45%,100%{transform:translateY(0)} 18%{transform:translateY(-9px)} 30%{transform:translateY(-3px)} 38%{transform:translateY(-7px)} }
          @keyframes e-wave { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
          .e-rotor { animation:e-rotor .25s linear infinite; transform-origin:160px 30px; }
          .e-hover { animation:e-hover 2.4s ease-in-out infinite; }
          .e-fl-a { animation:e-flicker-a .55s ease-in-out infinite; }
          .e-fl-b { animation:e-flicker-b .55s ease-in-out infinite; }
          .e-smoke-a { animation:e-smoke 2.5s ease-out infinite; }
          .e-smoke-b { animation:e-smoke 2.5s ease-out infinite; animation-delay:.9s; }
          .e-j0{animation:e-jump 1.40s ease-in-out infinite;}
          .e-j1{animation:e-jump 1.75s ease-in-out infinite;}
          .e-j2{animation:e-jump 2.10s ease-in-out infinite;}
          .e-j3{animation:e-jump 2.45s ease-in-out infinite;}
          .e-w0{animation:e-wave 0.90s ease-in-out infinite;}
          .e-w1{animation:e-wave 1.10s ease-in-out infinite;}
          .e-w2{animation:e-wave 1.30s ease-in-out infinite;}
        `}</style>
      </defs>

      <rect width="320" height="180" fill="url(#e-sky)" />

      {/* Flames drawn FIRST so buildings render on top and mask the bases */}
      {/* Left fire — two groups alternating so only tips flicker above rooftops */}
      <g className="e-fl-a">
        <rect x="10" y="80" width="6"  height="100" fill="url(#e-fire)" />
        <rect x="14" y="74" width="4"  height="106" fill="url(#e-fire)" />
        <rect x="17" y="80" width="5"  height="100" fill="url(#e-fire)" />
        <rect x="21" y="87" width="4"  height="93"  fill="url(#e-fire)" />
      </g>
      <g className="e-fl-b">
        <rect x="11" y="83" width="5"  height="97"  fill="url(#e-fire)" />
        <rect x="16" y="77" width="4"  height="103" fill="url(#e-fire)" />
        <rect x="20" y="84" width="4"  height="96"  fill="url(#e-fire)" />
      </g>
      {/* Right fire */}
      <g className="e-fl-a">
        <rect x="264" y="83" width="6"  height="97"  fill="url(#e-fire)" />
        <rect x="269" y="77" width="4"  height="103" fill="url(#e-fire)" />
        <rect x="273" y="83" width="5"  height="97"  fill="url(#e-fire)" />
        <rect x="277" y="90" width="4"  height="90"  fill="url(#e-fire)" />
      </g>
      <g className="e-fl-b">
        <rect x="265" y="86" width="5"  height="94"  fill="url(#e-fire)" />
        <rect x="270" y="80" width="4"  height="100" fill="url(#e-fire)" />
        <rect x="274" y="87" width="4"  height="93"  fill="url(#e-fire)" />
      </g>

      {/* Distant city silhouette — renders ON TOP of flames, masking their bases */}
      <rect x="0"   y="120" width="55"  height="60" fill="#1a0828" />
      <rect x="8"   y="105" width="28"  height="18" fill="#1a0828" />
      <rect x="260" y="110" width="60"  height="70" fill="#1a0828" />
      <rect x="275" y="95"  width="22"  height="18" fill="#1a0828" />
      <rect x="60"  y="130" width="35"  height="50" fill="#220c32" />
      <rect x="240" y="125" width="30"  height="55" fill="#220c32" />

      {/* Smoke above flames */}
      <g className="e-smoke-a"><rect x="16"  y="77" width="12" height="8" fill="#443322" opacity=".55" /></g>
      <g className="e-smoke-b"><rect x="268" y="80" width="12" height="8" fill="#443322" opacity=".55" /></g>

      {/* Embassy building */}
      <rect x="108" y="78"  width="104" height="102" fill="#ccc09a" />
      <rect x="104" y="74"  width="112" height="7"   fill="#b8a880" />
      <rect x="108" y="73"  width="104" height="5"   fill="#a89870" />
      {[115,127,139,151,163,175,187,199].map(x => (
        <rect key={x} x={x} y="74" width="5" height="106" fill="#bfb38a" />
      ))}
      {[118,134,150,166,182].map(x => (
        <g key={x}>
          <rect x={x} y="86"  width="9" height="11" fill="#1a3a6a" />
          <rect x={x} y="104" width="9" height="11" fill="#ffcc44" opacity=".85" />
          <rect x={x} y="122" width="9" height="11" fill="#1a3a6a" />
        </g>
      ))}

      {/* Rooftop crowd — each person staggered independently, standing on rooftop (y=64 → feet at y=73) */}
      {rooftopXs.map((x, i) => {
        const isJumper = i % 3 !== 1;
        const animClass = isJumper ? `e-j${i % 4}` : `e-w${i % 3}`;
        const delay = `${(i * 0.21) % 2.1}s`;
        return (
          <g key={x} transform={`translate(${x}, 70)`}>
            <g className={animClass} style={{ animationDelay: delay }}>
              {/* Head */}
              <rect x="1" y="-9" width="4" height="4" fill={skinColors[i % 4]} />
              {/* Body */}
              <rect x="0" y="-5" width="6" height="5" fill={clothColors[i % 4]} />
              {/* Arms raised up from shoulders */}
              <rect x="-1" y="-10" width="2" height="5" fill={skinColors[i % 4]} />
              <rect x="5"  y="-10" width="2" height="5" fill={skinColors[i % 4]} />
              {/* Legs */}
              <rect x="1"  y="0"   width="2" height="3" fill={clothColors[i % 4]} />
              <rect x="3"  y="0"   width="2" height="3" fill={clothColors[i % 4]} />
            </g>
          </g>
        );
      })}

      {/* Gate crowd — animated: jumpers + wavers at varied delays */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x = 92 + i * 6 + (i % 2) * 2;
        const y = 165 + (i % 3) * 1;
        const animClass = i % 3 !== 1 ? `e-j${i % 4}` : `e-w${i % 3}`;
        const delay = `${(i * 0.17) % 2}s`;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <g className={animClass} style={{ animationDelay: delay }}>
              <rect x="1" y="-9" width="3"  height="3" fill={skinColors[i % 4]} />
              <rect x="0" y="-6" width="5"  height="4" fill={clothColors[i % 4]} />
              <rect x="0" y="-2" width="2"  height="3" fill={clothColors[i % 4]} />
              <rect x="3" y="-2" width="2"  height="3" fill={clothColors[i % 4]} />
            </g>
          </g>
        );
      })}

      {/* Embassy fence */}
      {[93,100,107,114,121,128,135,142,149,156,163,170,177,184,191,198,205,212,219].map(x => (
        <rect key={x} x={x} y="155" width="2" height="13" fill="#8a7a44" />
      ))}
      <rect x="93" y="155" width="130" height="3" fill="#9a8a54" />

      {/* Helicopter — hovering */}
      <g className="e-hover">
        <rect x="159" y="22" width="2"  height="8"  fill="#556655" />
        <g className="e-rotor">
          <rect x="126" y="29" width="68" height="2" fill="#334433" />
          <rect x="159" y="10" width="2"  height="40" fill="#334433" />
        </g>
        <rect x="142" y="32" width="36" height="16" fill="#6a8a68" />
        <rect x="135" y="35" width="10" height="10" fill="#7a9a78" />
        <rect x="136" y="36" width="8"  height="7"  fill="#88bbee" opacity=".75" />
        <rect x="146" y="34" width="14" height="9"  fill="#88bbee" opacity=".5"  />
        <rect x="178" y="38" width="20" height="5"  fill="#5a7a58" />
        <rect x="196" y="33" width="3"  height="10" fill="#5a7a58" />
        <rect x="147" y="48" width="2"  height="5"  fill="#445544" />
        <rect x="169" y="48" width="2"  height="5"  fill="#445544" />
        <rect x="142" y="53" width="12" height="2"  fill="#445544" />
        <rect x="163" y="53" width="12" height="2"  fill="#445544" />
        {/* Rope */}
        <rect x="160" y="55" width="1" height="22" fill="#aa8844" />
      </g>

      {/* Ground */}
      <rect x="0" y="168" width="320" height="12" fill="#1a0f0a" />
    </svg>
  );
}

// ─── Scene 2: Viet Cong March Through Burning Saigon ────────────────────────
function SceneVCMarch() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full pixel-art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="v-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0500" />
          <stop offset="50%" stopColor="#7a1800" />
          <stop offset="100%" stopColor="#cc4400" />
        </linearGradient>
        <linearGradient id="v-fire" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%"   stopColor="#660000" />
          <stop offset="25%"  stopColor="#cc2200" />
          <stop offset="55%"  stopColor="#ff6600" />
          <stop offset="80%"  stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#ffee44" stopOpacity="0.3" />
        </linearGradient>
        <style>{`
          @keyframes v-march { from{transform:translateX(0)} to{transform:translateX(-320px)} }
          @keyframes v-fl-a { 0%,100%{opacity:.6} 50%{opacity:1} }
          @keyframes v-fl-b { 0%,100%{opacity:1} 50%{opacity:.5} }
          @keyframes v-flag { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(0.82)} }
          @keyframes v-smoke { 0%{opacity:.4;transform:translateY(0)} 100%{opacity:0;transform:translateY(-28px)} }
          .v-march { animation:v-march 11s linear infinite; }
          .v-flag { animation:v-flag 1s ease-in-out infinite; transform-box:fill-box; transform-origin:left center; }
          .v-fl-a { animation:v-fl-a .6s ease-in-out infinite; }
          .v-fl-b { animation:v-fl-b .6s ease-in-out infinite; }
          .v-smoke-a { animation:v-smoke 2.2s ease-out infinite; }
          .v-smoke-b { animation:v-smoke 2.2s ease-out infinite; animation-delay:.7s; }
          .v-smoke-c { animation:v-smoke 2.2s ease-out infinite; animation-delay:1.4s; }
        `}</style>
      </defs>

      <rect width="320" height="180" fill="url(#v-sky)" />
      <rect x="0" y="100" width="320" height="30" fill="url(#v-fire)" opacity=".07" />

      {/* Flames drawn FIRST — buildings render on top and mask the bases */}
      {/* Left building fire */}
      <g className="v-fl-a">
        <rect x="10" y="52" width="7"  height="128" fill="url(#v-fire)" />
        <rect x="15" y="46" width="5"  height="134" fill="url(#v-fire)" />
        <rect x="19" y="54" width="5"  height="126" fill="url(#v-fire)" />
        <rect x="23" y="60" width="4"  height="120" fill="url(#v-fire)" />
      </g>
      <g className="v-fl-b">
        <rect x="11" y="56" width="6"  height="124" fill="url(#v-fire)" />
        <rect x="16" y="50" width="5"  height="130" fill="url(#v-fire)" />
        <rect x="21" y="57" width="4"  height="123" fill="url(#v-fire)" />
      </g>
      {/* Mid building fire */}
      <g className="v-fl-b">
        <rect x="108" y="62" width="7"  height="118" fill="url(#v-fire)" />
        <rect x="113" y="56" width="5"  height="124" fill="url(#v-fire)" />
        <rect x="117" y="63" width="5"  height="117" fill="url(#v-fire)" />
      </g>
      <g className="v-fl-a">
        <rect x="109" y="66" width="6"  height="114" fill="url(#v-fire)" />
        <rect x="114" y="60" width="5"  height="120" fill="url(#v-fire)" />
      </g>
      {/* Right building fire */}
      <g className="v-fl-a">
        <rect x="268" y="70" width="7"  height="110" fill="url(#v-fire)" />
        <rect x="273" y="64" width="5"  height="116" fill="url(#v-fire)" />
        <rect x="277" y="71" width="5"  height="109" fill="url(#v-fire)" />
        <rect x="281" y="77" width="4"  height="103" fill="url(#v-fire)" />
      </g>
      <g className="v-fl-b">
        <rect x="269" y="74" width="6"  height="106" fill="url(#v-fire)" />
        <rect x="274" y="68" width="5"  height="112" fill="url(#v-fire)" />
      </g>

      {/* Buildings — render ON TOP of flames */}
      <rect x="0"   y="85"  width="50"  height="95" fill="#2a0800" />
      <rect x="10"  y="70"  width="25"  height="20" fill="#2a0800" />
      <rect x="55"  y="95"  width="40"  height="85" fill="#330a00" />
      <rect x="100" y="80"  width="50"  height="100" fill="#2a0800" />
      <rect x="155" y="90"  width="45"  height="90" fill="#330a00" />
      <rect x="205" y="75"  width="55"  height="105" fill="#2a0800" />
      <rect x="268" y="88"  width="52"  height="92" fill="#330a00" />

      {/* Smoke */}
      <g className="v-smoke-a"><rect x="16"  y="58" width="14" height="10" fill="#553322" opacity=".5" /></g>
      <g className="v-smoke-b"><rect x="113" y="66" width="14" height="10" fill="#553322" opacity=".5" /></g>
      <g className="v-smoke-c"><rect x="273" y="73" width="14" height="10" fill="#553322" opacity=".5" /></g>

      {/* Ground */}
      <rect x="0" y="148" width="320" height="32" fill="#1a0a04" />
      <rect x="0" y="146" width="320" height="4"  fill="#2a1208" />

      {/* Looping march: two copies, each 320px wide, scroll left by 320px for seamless loop */}
      <g className="v-march">
        <MarchingGroup offsetX={0} />
        <MarchingGroup offsetX={320} />
      </g>
    </svg>
  );
}

function MarchingGroup({ offsetX }: { offsetX: number }) {
  const soldierBody   = ['#3a5a2a', '#445a30', '#304a22'];
  const helmetColor   = '#2a4018';
  const skinColor     = '#c49060';
  // Ground is at y=148. Soldiers anchored at y=148 (feet on ground).
  // Figure height ~26px: helmet top -26, feet 0.
  return (
    <g transform={`translate(${offsetX}, 0)`}>
      {/* Tank — base at y=148, drawn upward */}
      <g transform="translate(8, 148)">
        {/* Tracks */}
        <rect x="0"  y="-6"  width="60" height="6"  fill="#1a2810" />
        {/* Road wheels */}
        {[4,14,24,34,44,52].map(wx => (
          <rect key={wx} x={wx} y="-8" width="7" height="7" fill="#243018" />
        ))}
        {/* Hull lower */}
        <rect x="2"  y="-16" width="56" height="12" fill="#2a3a18" />
        {/* Hull upper */}
        <rect x="8"  y="-24" width="42" height="10" fill="#344420" />
        {/* Turret */}
        <rect x="18" y="-32" width="26" height="10" fill="#3a4c24" />
        {/* Barrel */}
        <rect x="36" y="-29" width="20" height="4"  fill="#2a3a18" />
      </g>

      {/* NVA Flag */}
      <g transform="translate(74, 148)">
        <rect x="0" y="-42" width="2" height="42" fill="#556655" />
        <g className="v-flag">
          <rect x="2" y="-42" width="20" height="13" fill="#cc1111" />
          {/* Proper 5-pointed star: 7-wide, 6-tall, centered on 20x13 flag */}
          {/* flag center x=12, y=-35.5. Star top-left: x=12-3=9, y=-42+3=-39 */}
          <Star cx={9} cy={-39} s={1.4} c="#ffdd00" />
        </g>
      </g>

      {/* Soldiers — feet anchored at y=148 */}
      {Array.from({ length: 13 }).map((_, i) => {
        const sx = 100 + i * 17;
        const c  = soldierBody[i % 3];
        const legL = i % 2 === 0 ? -8 : -4;
        const legR = i % 2 === 0 ? -4 : -8;
        return (
          <g key={i} transform={`translate(${sx}, 148)`}>
            {/* Helmet */}
            <rect x="1" y="-26" width="9"  height="3"  fill={helmetColor} />
            <rect x="2" y="-23" width="7"  height="3"  fill={helmetColor} />
            {/* Head */}
            <rect x="3" y="-20" width="5"  height="5"  fill={skinColor} />
            {/* Body */}
            <rect x="2" y="-15" width="7"  height="9"  fill={c} />
            {/* Left arm */}
            <rect x="0" y={-15 + (i % 2) * 2} width="2" height="5" fill={c} />
            {/* Right arm */}
            <rect x="9" y={-13 + (i % 2) * 2} width="2" height="5" fill={c} />
            {/* Rifle */}
            <rect x="11" y="-22" width="1" height="17" fill="#445544" />
            {/* Legs — alternating stride */}
            <rect x="3" y="-6" width="2" height={8 + legL} fill={c} />
            <rect x="6" y="-6" width="2" height={8 + legR} fill={c} />
          </g>
        );
      })}
    </g>
  );
}

// ─── Scene 3: People Fleeing Saigon ─────────────────────────────────────────
function SceneFlight() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full pixel-art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="f-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5588cc" />
          <stop offset="65%" stopColor="#aaccee" />
          <stop offset="100%" stopColor="#ddeeff" />
        </linearGradient>
        <style>{`
          @keyframes f-run  { from{transform:translateX(340px)} to{transform:translateX(-200px)} }
          @keyframes f-runB { from{transform:translateX(340px)} to{transform:translateX(-200px)} }
          .f-run1 { animation:f-run  9s linear infinite; }
          .f-run2 { animation:f-run  9s linear infinite; animation-delay:-4.5s; }
          .f-run3 { animation:f-runB 12s linear infinite; animation-delay:-2s; }
          .f-run4 { animation:f-runB 12s linear infinite; animation-delay:-8s; }
        `}</style>
      </defs>

      <rect width="320" height="180" fill="url(#f-sky)" />

      {/* Clouds */}
      <rect x="20"  y="18" width="44" height="10" fill="white" opacity=".6" />
      <rect x="32"  y="12" width="26" height="10" fill="white" opacity=".5" />
      <rect x="180" y="22" width="52" height="10" fill="white" opacity=".6" />
      <rect x="196" y="16" width="30" height="10" fill="white" opacity=".5" />
      <rect x="260" y="14" width="36" height="10" fill="white" opacity=".5" />

      {/* Buildings */}
      <rect x="0"   y="60"  width="45"  height="120" fill="#b8a888" />
      <rect x="48"  y="75"  width="35"  height="105" fill="#c4b494" />
      <rect x="88"  y="55"  width="50"  height="125" fill="#b0a080" />
      <rect x="143" y="65"  width="40"  height="115" fill="#c8b898" />
      <rect x="188" y="50"  width="55"  height="130" fill="#b4a484" />
      <rect x="248" y="70"  width="72"  height="110" fill="#bfaf8f" />
      {[[10,70],[18,70],[10,85],[18,85],[55,85],[63,85],[55,100],[63,100]].map(([wx,wy],i) => (
        <rect key={i} x={wx} y={wy} width="6" height="8" fill="#88aacc" opacity=".6" />
      ))}

      {/* Street — top at y=152 */}
      <rect x="0" y="152" width="320" height="28" fill="#7a6a50" />
      <rect x="0" y="150" width="320" height="4"  fill="#6a5a40" />
      {[0,40,80,120,160,200,240,280].map(x => (
        <rect key={x} x={x+8} y="162" width="24" height="3" fill="#8a7a60" opacity=".5" />
      ))}

      {/* Abandoned motorbike at street level */}
      <g transform="translate(148, 140)">
        <rect x="0"  y="10" width="26" height="4"  fill="#445566" />
        <rect x="1"  y="4"  width="7"  height="8"  fill="#334455" />
        <rect x="17" y="5"  width="6"  height="7"  fill="#334455" />
        <rect x="3"  y="12" width="6"  height="6"  fill="#223344" />
        <rect x="18" y="12" width="6"  height="6"  fill="#223344" />
      </g>

      {/* Foreground runners — feet at y=0 in local space, group anchored at y=152 (street) */}
      <g className="f-run1"><RunGroup /></g>
      <g className="f-run2"><RunGroup offsetX={170} /></g>

      {/* Background runners — slightly smaller, same street anchor */}
      <g className="f-run3" style={{ opacity: 0.7 }}>
        <RunGroupSmall />
      </g>
      <g className="f-run4" style={{ opacity: 0.7 }}>
        <RunGroupSmall offsetX={170} />
      </g>
    </svg>
  );
}

// Figures have feet at local y=0, anchored to street y=152
function RunGroup({ offsetX = 0 }: { offsetX?: number }) {
  const people = [
    { skin:'#d4a574', cloth:'#cc4422', bag:'#886633', dx:0   },
    { skin:'#c49060', cloth:'#224499', bag:'#aa7744', dx:22  },
    { skin:'#e4b580', cloth:'#228833', bag:'#557733', dx:44  },
    { skin:'#a47840', cloth:'#884422', bag:'#aa6633', dx:68  },
    { skin:'#d4a574', cloth:'#555599', bag:'#776644', dx:90  },
    { skin:'#c49060', cloth:'#993344', bag:'#886633', dx:112 },
    { skin:'#b48050', cloth:'#336644', bag:'#aa7744', dx:134 },
  ];
  return (
    <g transform={`translate(${offsetX}, 152)`}>
      {people.map(({ skin, cloth, bag, dx }, i) => (
        <g key={i} transform={`translate(${dx}, 0)`}>
          <rect x="2"  y="-18" width="5" height="5"  fill={skin}  />   {/* head */}
          <rect x="1"  y="-13" width="7" height="7"  fill={cloth} />   {/* body */}
          <rect x="8"  y="-15" width="5" height="5"  fill={bag}   />   {/* bundle */}
          <rect x="-1" y={i%2===0?-11:-9}  width="2" height="4" fill={skin} />  {/* left arm */}
          <rect x="8"  y={i%2===0?-9 :-11} width="2" height="4" fill={skin} />  {/* right arm */}
          <rect x="2"  y="-6"  width="2" height={i%2===0?6:4}   fill={cloth} /> {/* left leg */}
          <rect x="5"  y="-6"  width="2" height={i%2===0?4:6}   fill={cloth} /> {/* right leg */}
        </g>
      ))}
    </g>
  );
}

function RunGroupSmall({ offsetX = 0 }: { offsetX?: number }) {
  return (
    <g transform={`translate(${offsetX}, 152)`}>
      {[0,18,36,56,74,95,112,130,148].map((dx, i) => (
        <g key={i} transform={`translate(${dx}, 0)`}>
          <rect x="2" y="-12" width="4" height="4" fill={['#c49060','#d4a574','#b48050'][i%3]} />
          <rect x="1" y="-8"  width="6" height="6" fill={['#334499','#993322','#449933'][i%3]} />
          <rect x="2" y="-2"  width="2" height={i%2===0?2:3} fill={['#334499','#993322','#449933'][i%3]} />
          <rect x="4" y="-2"  width="2" height={i%2===0?3:2} fill={['#334499','#993322','#449933'][i%3]} />
        </g>
      ))}
    </g>
  );
}

// ─── Scene 4: Reeducation Camp ───────────────────────────────────────────────
function SceneCamp() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full pixel-art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="c-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4a3a" />
          <stop offset="100%" stopColor="#6a7a5a" />
        </linearGradient>
        <style>{`
          @keyframes c-guard { 0%,100%{transform:translateX(0)} 50%{transform:translateX(8px)} }
          @keyframes c-flag  { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(0.8)} }
          @keyframes c-sway  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
          .c-guard  { animation:c-guard 3s ease-in-out infinite; }
          .c-flag   { animation:c-flag 1.4s ease-in-out infinite; transform-box:fill-box; transform-origin:left center; }
          .c-sway   { animation:c-sway 2s ease-in-out infinite; }
          .c-sway2  { animation:c-sway 2s ease-in-out infinite; animation-delay:1s; }
        `}</style>
      </defs>

      <rect width="320" height="180" fill="url(#c-sky)" />

      {/* Jungle treeline */}
      {[0,18,36,52,68,84,100,118,134,150,168,184,200,218,234,252,268,284,300].map((x, i) => (
        <g key={x} transform={`translate(${x}, ${55 + (i%3)*5})`}>
          <rect x="0"  y="0"  width="18" height="40" fill={['#1a3a18','#1e4420','#224818'][i%3]} />
          <rect x="-4" y="-8" width="26" height="18" fill={['#2a4a22','#2e5428','#264820'][i%3]} />
          <rect x="-2" y="-4" width="22" height="8"  fill={['#305430','#2a4e28','#345838'][i%3]} />
        </g>
      ))}

      {/* Ground */}
      <rect x="0" y="148" width="320" height="32" fill="#4a4030" />
      <rect x="0" y="146" width="320" height="4"  fill="#3a3020" />

      {/* Left guard tower */}
      <g transform="translate(20, 80)">
        <rect x="0"   y="0"   width="28" height="68" fill="#5a5040" />
        <rect x="-4"  y="0"   width="36" height="8"  fill="#6a6050" />
        <rect x="-2"  y="-12" width="32" height="14" fill="#4a4030" />
        <rect x="4"   y="4"   width="6"  height="8"  fill="#2a2820" />
        <rect x="16"  y="4"   width="6"  height="8"  fill="#2a2820" />
        <rect x="2"   y="20"  width="4"  height="48" fill="#3a3020" />
        <rect x="22"  y="20"  width="4"  height="48" fill="#3a3020" />
        <g className="c-guard" transform="translate(5, -10)">
          <rect x="2"  y="-14" width="9" height="4"  fill="#2a4018" /> {/* helmet */}
          <rect x="3"  y="-10" width="5" height="5"  fill="#c49060" /> {/* head */}
          <rect x="2"  y="-5"  width="7" height="8"  fill="#3a5a28" /> {/* body */}
          <rect x="10" y="-12" width="1" height="12" fill="#445544" /> {/* rifle */}
        </g>
      </g>

      {/* Right guard tower */}
      <g transform="translate(272, 80)">
        <rect x="0"   y="0"   width="28" height="68" fill="#5a5040" />
        <rect x="-4"  y="0"   width="36" height="8"  fill="#6a6050" />
        <rect x="-2"  y="-12" width="32" height="14" fill="#4a4030" />
        <rect x="4"   y="4"   width="6"  height="8"  fill="#2a2820" />
        <rect x="16"  y="4"   width="6"  height="8"  fill="#2a2820" />
        <rect x="2"   y="20"  width="4"  height="48" fill="#3a3020" />
        <rect x="22"  y="20"  width="4"  height="48" fill="#3a3020" />
        <g className="c-guard" transform="translate(5, -10)">
          <rect x="2"  y="-14" width="9" height="4"  fill="#2a4018" />
          <rect x="3"  y="-10" width="5" height="5"  fill="#c49060" />
          <rect x="2"  y="-5"  width="7" height="8"  fill="#3a5a28" />
          <rect x="10" y="-12" width="1" height="12" fill="#445544" />
        </g>
      </g>

      {/* Barbed wire fence */}
      <rect x="52" y="110" width="216" height="2" fill="#999989" />
      <rect x="52" y="118" width="216" height="2" fill="#888878" />
      {[52,68,84,100,116,132,148,164,180,196,212,228,244,260].map(x => (
        <g key={x}>
          <rect x={x}   y="106" width="3" height="44" fill="#777767" />
          <rect x={x-3} y="110" width="9" height="1"  fill="#aaaaaa" />
          <rect x={x-3} y="116" width="9" height="1"  fill="#aaaaaa" />
          <rect x={x-3} y="122" width="9" height="1"  fill="#aaaaaa" />
        </g>
      ))}

      {/* Prisoners — static, feet at ground y=148 (py+4=148 → py=144 front row) */}
      {[0,1,2].map(row =>
        Array.from({ length: 11 }).map((_, col) => {
          const px = 70 + col * 18;
          const py = 144;
          return (
            <g key={`${row}-${col}`} transform={`translate(${px}, ${py})`}>
              <rect x="1" y="-10" width="4" height="4" fill="#c49060" />
              <rect x="0" y="-6"  width="6" height="6" fill={['#888880','#7a7a72','#909088'][row]} />
              <rect x="1" y="0"   width="2" height="4" fill={['#888880','#7a7a72','#909088'][row]} />
              <rect x="3" y="0"   width="2" height="4" fill={['#888880','#7a7a72','#909088'][row]} />
            </g>
          );
        })
      )}

      {/* Vietnamese flag on left tower — proper 5-pointed star */}
      <g transform="translate(24, 68)">
        <rect x="0" y="0" width="2" height="22" fill="#556655" />
        <g className="c-flag">
          <rect x="2" y="0" width="16" height="10" fill="#da251d" />
          {/* 5-pointed star: 7-wide x 6-tall, centered on 16x10 flag (center x=10, y=5) */}
          {/* top-left of star bounding box: cx=10-3.5≈7, cy=5-3=2 → use cx=7, cy=1 with s=1 */}
          <Star cx={7} cy={1} s={1} c="#ffff00" />
        </g>
      </g>
    </svg>
  );
}

// ─── Scene 5: Boat People on the Ocean ──────────────────────────────────────
function SceneBoats() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full pixel-art" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020810" />
          <stop offset="55%" stopColor="#091538" />
          <stop offset="100%" stopColor="#0c1e4a" />
        </linearGradient>
        <linearGradient id="b-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c1e4a" />
          <stop offset="100%" stopColor="#050c20" />
        </linearGradient>
        <style>{`
          @keyframes b-wave  { 0%,100%{transform:translateX(0)} 50%{transform:translateX(9px)} }
          @keyframes b-rock  { 0%,100%{transform:rotate(-1.2deg)} 50%{transform:rotate(1.2deg)} }
          @keyframes b-twink { 0%,100%{opacity:.15} 50%{opacity:1} }
          @keyframes b-moon  { 0%,100%{opacity:.82} 50%{opacity:1} }
          @keyframes b-glow  { 0%,100%{opacity:.15} 50%{opacity:.3} }
          .b-wave1 { animation:b-wave 2.2s ease-in-out infinite; }
          .b-wave2 { animation:b-wave 2.2s ease-in-out infinite; animation-delay:-1.1s; }
          .b-wave3 { animation:b-wave 2.8s ease-in-out infinite; animation-delay:-.6s; }
          .b-rock  { animation:b-rock 3.6s ease-in-out infinite; transform-box:fill-box; transform-origin:center bottom; }
          .b-moon  { animation:b-moon 4s ease-in-out infinite; }
          .b-glow  { animation:b-glow 2.2s ease-in-out infinite; }
        `}</style>
      </defs>

      <rect width="320" height="180" fill="url(#b-sky)" />

      {/* Stars */}
      {([
        [20,10,.9],[44,6,.6],[68,14,.8],[94,8,.5],[118,5,.9],[144,12,.7],
        [170,7,.8],[194,16,.6],[220,9,.9],[244,6,.5],[270,13,.8],[294,8,.7],
        [30,28,.7],[56,22,.9],[80,30,.5],[106,20,.8],[132,26,.6],[158,18,.9],
        [182,24,.7],[206,30,.8],[228,20,.5],[254,28,.9],[278,22,.6],[304,16,.8],
        [14,42,.6],[50,36,.8],[84,44,.7],[114,38,.9],[160,40,.5],[196,34,.8],
        [228,43,.7],[262,36,.6],[298,40,.9],
      ] as [number,number,number][]).map(([x,y,op], i) => (
        <rect
          key={i} x={x} y={y} width="1" height="1" fill="white" opacity={op}
          style={{ animation:`b-twink ${1.4+(i%4)*.5}s ease-in-out infinite`, animationDelay:`${(i*.37)%2}s` }}
        />
      ))}

      {/* Moon */}
      <g className="b-moon">
        <rect x="262" y="12" width="24" height="24" fill="#e8ddb8" />
        <rect x="260" y="14" width="2"  height="20" fill="#e8ddb8" />
        <rect x="286" y="14" width="2"  height="20" fill="#e8ddb8" />
        <rect x="264" y="10" width="20" height="2"  fill="#e8ddb8" />
        <rect x="264" y="36" width="20" height="2"  fill="#e8ddb8" />
        <rect x="268" y="18" width="4"  height="4"  fill="#d8cd98" />
        <rect x="278" y="26" width="3"  height="3"  fill="#d8cd98" />
      </g>

      {/* Moon reflection */}
      <g className="b-glow">
        <rect x="268" y="112" width="20" height="2" fill="#c8bb90" />
        <rect x="265" y="115" width="24" height="2" fill="#c8bb90" />
        <rect x="268" y="118" width="18" height="2" fill="#c8bb90" />
        <rect x="272" y="121" width="12" height="2" fill="#c8bb90" />
        <rect x="274" y="124" width="8"  height="2" fill="#c8bb90" />
      </g>

      {/* Ocean */}
      <rect x="0" y="108" width="320" height="72" fill="url(#b-sea)" />

      {/* Waves */}
      <g className="b-wave1">
        {[0,32,64,96,128,160,192,224,256,288].map(x => (
          <g key={x}>
            <rect x={x}   y="112" width="22" height="3" fill="#1a3870" opacity=".8" />
            <rect x={x+5} y="110" width="12" height="2" fill="#2a4888" opacity=".5" />
          </g>
        ))}
      </g>
      <g className="b-wave2">
        {[16,48,80,112,144,176,208,240,272,304].map(x => (
          <g key={x}>
            <rect x={x}   y="124" width="24" height="3" fill="#152e60" opacity=".9" />
            <rect x={x+6} y="122" width="12" height="2" fill="#1e3c78" opacity=".6" />
          </g>
        ))}
      </g>
      <g className="b-wave3">
        {[8,40,72,104,136,168,200,232,264,296].map(x => (
          <g key={x}>
            <rect x={x}   y="136" width="20" height="3" fill="#102050" opacity=".9" />
            <rect x={x+5} y="134" width="10" height="2" fill="#1a3060" opacity=".6" />
          </g>
        ))}
      </g>

      {/* Main boat — polygon hull gives proper tapered bow/stern shape */}
      <g className="b-rock">
        {/* Hull — hexagonal polygon: tapers at bow (left) and stern (right) */}
        <polygon
          points="86,152 96,164 224,164 234,152 224,144 96,144"
          fill="#6b3e1a"
        />
        {/* Hull planks (horizontal detail lines) */}
        <rect x="97"  y="148" width="126" height="2" fill="#4a2a0e" />
        <rect x="97"  y="154" width="126" height="2" fill="#4a2a0e" />
        <rect x="97"  y="160" width="126" height="2" fill="#4a2a0e" />
        {/* Waterline stripe */}
        <rect x="90"  y="152" width="140" height="3" fill="#3e200a" />
        {/* Cabin / small shelter amidships */}
        <rect x="148" y="130" width="36"  height="16" fill="#5a3515" />
        <rect x="144" y="127" width="44"  height="5"  fill="#6e4220" />
        {/* Cabin window */}
        <rect x="157" y="133" width="6"   height="6"  fill="#1a2840" />
        <rect x="167" y="133" width="6"   height="6"  fill="#1a2840" />

        {/* Mast */}
        <rect x="158" y="86" width="4" height="60" fill="#3a2810" />
        {/* Crossbar */}
        <rect x="120" y="94" width="80" height="3" fill="#4a3818" />
        {/* Sail — billowing shape */}
        <polygon
          points="124,97 162,90 162,128 124,132"
          fill="#c8b880" opacity=".88"
        />
        {/* Sail shadow/detail */}
        <polygon
          points="144,97 162,90 162,128 144,130"
          fill="#b8a870" opacity=".4"
        />

        {/* People packed on deck — two rows */}
        {Array.from({ length: 17 }).map((_, i) => {
          const px = 98 + i * 8;
          const py = i % 2 === 0 ? 143 : 140;
          return (
            <g key={i} transform={`translate(${px}, ${py})`}>
              <rect x="1" y="-8" width="4" height="4" fill={['#d4a574','#c49060','#e4b580','#a47840','#b48050'][i%5]} />
              <rect x="0" y="-4" width="6" height="5" fill={['#334499','#993322','#449933','#886622','#995511'][i%5]} />
            </g>
          );
        })}

        {/* Lantern at mast top */}
        <rect x="156" y="82" width="8" height="6" fill="#ffdd44" opacity=".9" />
        <rect x="154" y="80" width="12" height="10" fill="#ffdd44" opacity=".15" />
      </g>

      {/* Distant boat silhouette 1 */}
      <g opacity=".7">
        <polygon points="38,107 44,112 72,112 76,107 72,104 44,104" fill="#080f22" />
        <rect x="54" y="96" width="2" height="10" fill="#080f22" />
      </g>
      {/* Distant boat silhouette 2 */}
      <g opacity=".5">
        <polygon points="198,108 202,112 226,112 230,108 226,106 202,106" fill="#080f22" />
        <rect x="212" y="101" width="2" height="8" fill="#080f22" />
      </g>
    </svg>
  );
}

// ─── Rotator ─────────────────────────────────────────────────────────────────
const SCENES = [SceneEmbassy, SceneVCMarch, SceneFlight, SceneCamp, SceneBoats] as const;
const SCENE_MS = 9000;
const FADE_MS  = 900;

export function CinematicBackground() {
  const [idx,     setIdx]     = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), SCENE_MS - FADE_MS);
    const advance = setTimeout(() => { setIdx(i => (i + 1) % SCENES.length); setVisible(true); }, SCENE_MS);
    return () => { clearTimeout(fadeOut); clearTimeout(advance); };
  }, [idx]);

  const Scene = SCENES[idx];
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ transition: `opacity ${FADE_MS}ms ease-in-out`, opacity: visible ? 1 : 0 }}
    >
      <Scene />
    </div>
  );
}
