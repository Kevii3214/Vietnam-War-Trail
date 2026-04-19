import { PixelPerson } from './PixelPeople';

/**
 * A Sick Passenger — interior of boat, a man lying ill with fever,
 * other passengers looking on fearfully, cramped conditions.
 */
export function SickPassengerScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1a1208] via-[#2a1a0a] to-[#0a0604]">
      <style>{`
        @keyframes sp-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%      { transform: translateY(-1px) rotate(0.8deg); }
        }
        @keyframes sp-chibi-scared {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.8px) rotate(-1deg); }
          75%      { transform: translateX(0.8px) rotate(1deg); }
        }
        .chibi-sway-idle   { animation: sp-chibi-idle 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: sp-chibi-scared 0.35s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes sp-shiver {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-1px); }
          75%      { transform: translateX(1px); }
        }
        @keyframes sp-lamp-flicker {
          0%, 100% { opacity: 0.8; }
          40%      { opacity: 0.55; }
          60%      { opacity: 0.9; }
          85%      { opacity: 0.65; }
        }
        @keyframes sp-boat-rock {
          0%, 100% { transform: rotate(-0.5deg); }
          50%      { transform: rotate(0.5deg); }
        }
        @keyframes sp-sweat-drop {
          0%   { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(6px); opacity: 0; }
        }

        .sp-shiver      { animation: sp-shiver 0.3s ease-in-out infinite; }
        .sp-lamp-flicker { animation: sp-lamp-flicker 2s ease-in-out infinite; }
        .sp-boat-rock    { animation: sp-boat-rock 4s ease-in-out infinite; transform-origin: center bottom; }
        .sp-sweat-drop   { animation: sp-sweat-drop 2s ease-in infinite; }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        <g className="sp-boat-rock">
          {/* Interior hull walls */}
          <rect x="0" y="0" width="500" height="280" fill="#2a1a0a" />
          {/* Wooden plank texture */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
            <g key={`plank-${i}`}>
              <rect x={0} y={i * 24} width={500} height={24} fill={i % 2 === 0 ? '#2a1a0a' : '#241808'} />
              <rect x={0} y={i * 24 + 23} width={500} height={1} fill="#140a04" opacity="0.6" />
            </g>
          ))}

          {/* Darkness overlay */}
          <rect x="0" y="0" width="500" height="280" fill="#000" opacity="0.4" />

          {/* Hanging lantern */}
          <g transform="translate(250, 20)">
            <rect x="-1" y="0" width="2" height="16" fill="#3a2a18" />
            <rect x="-6" y="16" width="12" height="14" fill="#6a4a2a" />
            <g className="sp-lamp-flicker">
              <rect x="-4" y="18" width="8" height="10" fill="#ffcc66" opacity="0.8" />
              <rect x="-2" y="14" width="4" height="6" fill="#ff9944" opacity="0.6" />
            </g>
            {/* Halo */}
            <circle cx="0" cy="24" r="60" fill="#ffaa44" opacity="0.08" className="sp-lamp-flicker" />
            <circle cx="0" cy="24" r="100" fill="#ffaa44" opacity="0.03" />
          </g>

          {/* The sick man — lying on the deck, shivering */}
          <g transform="translate(200, 170)" className="sp-shiver">
            {/* Body lying down (horizontal) */}
            <rect x="0" y="0" width="36" height="12" fill="#5a4a3a" /> {/* torso */}
            <rect x="36" y="2" width="16" height="10" fill="#2a2018" /> {/* legs */}
            {/* Head */}
            <rect x="-12" y="-2" width="14" height="14" fill="#c8906a" />
            <rect x="-10" y="0" width="3" height="2" fill="#1a0a04" /> {/* eye */}
            <rect x="-10" y="4" width="4" height="1" fill="#8a4a3a" /> {/* mouth */}
            {/* Hair */}
            <rect x="-12" y="-4" width="14" height="3" fill="#4a3a2a" />
            {/* Makeshift blanket */}
            <rect x="4" y="-2" width="44" height="16" fill="#3a4a5a" opacity="0.7" />
            <rect x="4" y="-2" width="44" height="2" fill="#4a5a6a" opacity="0.5" />
            {/* Cloth on forehead */}
            <rect x="-10" y="-2" width="10" height="3" fill="#6a8a9a" />
            {/* Sweat drops */}
            <rect x="-4" y="6" width="1.5" height="2" fill="#6aa0c0" opacity="0.7" className="sp-sweat-drop" />
            <rect x="2" y="4" width="1.5" height="2" fill="#6aa0c0" opacity="0.6" className="sp-sweat-drop" style={{ animationDelay: '0.7s' }} />
          </g>

          {/* Water bucket nearby */}
          <g transform="translate(170, 180)">
            <rect x="0" y="0" width="14" height="10" fill="#4a4a5a" />
            <rect x="0" y="0" width="14" height="2" fill="#5a5a6a" />
            <rect x="2" y="2" width="10" height="6" fill="#2a4a6a" />
          </g>

          {/* You — standing nearby, looking concerned */}
          <g transform="translate(150, 148)">
            <PixelPerson
              x={0} y={0} scale={1.5} variant="civilian"
              color="#c4956a" shirtColor="#5a6a7a" pantsColor="#2a2a38"
              hairColor="#1a0f08" accentColor="#8a7a5a"
              mood="sad" sway="idle"
            />
          </g>

          {/* Other passengers — keeping distance, fearful */}
          <g transform="translate(320, 152)">
            <PixelPerson
              x={0} y={0} scale={1.3} variant="civilian"
              color="#c4956a" shirtColor="#3a3a3a" pantsColor="#1a1a1a"
              hairColor="#1a0a04" accentColor="#5a5a5a"
              mood="scared" sway="scared" swayDelay={0.2}
              mirror
            />
          </g>
          <g transform="translate(350, 156)">
            <PixelPerson
              x={0} y={0} scale={1.1} variant="civilian"
              color="#c4956a" shirtColor="#4a3a2a" pantsColor="#2a2018"
              hairColor="#2a1810" accentColor="#8a8a8a"
              mood="weary" sway="idle" swayDelay={0.5}
              mirror
            />
          </g>
          <g transform="translate(380, 160)">
            <PixelPerson
              x={0} y={0} scale={0.95} variant="civilian"
              color="#c4956a" shirtColor="#5a4a3a" pantsColor="#1a1a1a"
              hairColor="#1a0a04" accentColor="#4a4a4a"
              mood="scared" sway="scared" swayDelay={0.8}
              mirror
            />
          </g>

          {/* Mother shielding child in corner */}
          <g transform="translate(80, 160)">
            <PixelPerson
              x={0} y={0} scale={1.2} variant="civilian"
              color="#c4956a" shirtColor="#5a3a2a" pantsColor="#2a1a18"
              hairColor="#2a1810" accentColor="#d0b080"
              mood="scared" sway="idle" swayDelay={0.3}
            />
            {/* Child behind */}
            <PixelPerson
              x={-12} y={6} scale={0.7} variant="civilian"
              color="#d8b090" shirtColor="#c9a24a" pantsColor="#3a2818"
              hairColor="#2a1810" accentColor="#ffffff"
              mood="scared" sway="scared" swayDelay={0.5}
            />
          </g>

          {/* Supplies scattered */}
          <g transform="translate(280, 186)">
            <rect x="0" y="0" width="10" height="7" fill="#6a4a28" />
            <rect x="0" y="0" width="10" height="2" fill="#8a6a40" />
          </g>
          <g transform="translate(310, 188)">
            <rect x="0" y="0" width="12" height="8" fill="#3a4a3a" />
            <rect x="2" y="2" width="8" height="4" fill="#4a5a4a" />
          </g>

          {/* Floor — bottom of hull */}
          <rect x="0" y="200" width="500" height="80" fill="#1a0a04" />
          <rect x="0" y="200" width="500" height="2" fill="#2a1808" />
          {/* Bilge water */}
          <rect x="0" y="240" width="500" height="40" fill="#0a1018" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
