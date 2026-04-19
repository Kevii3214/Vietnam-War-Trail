import { PixelPerson } from './PixelPeople';

export function InterviewDayScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#a09080] via-[#908070] to-[#706050]">
      <style>{`
        @keyframes id-chibi-idle {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-0.5px) rotate(0.5deg); }
        }
        @keyframes id-chibi-nervous {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-0.5px); }
          75%      { transform: translateX(0.5px); }
        }
        .chibi-sway-idle   { animation: id-chibi-idle 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .chibi-sway-scared { animation: id-chibi-nervous 0.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }

        @keyframes id-lamp-flicker {
          0%, 90%, 100% { opacity: 0.8; }
          95%            { opacity: 0.5; }
        }
        @keyframes id-pen-write {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(-3deg) translateX(-1px); }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 280"
        preserveAspectRatio="xMidYMax slice" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">

        {/* Room interior */}
        {/* Back wall */}
        <rect x="0" y="0" width="500" height="180" fill="#a09080" />
        {/* Wall texture / panels */}
        <line x1="125" y1="0" x2="125" y2="180" stroke="#908070" strokeWidth="1" opacity="0.4" />
        <line x1="250" y1="0" x2="250" y2="180" stroke="#908070" strokeWidth="1" opacity="0.4" />
        <line x1="375" y1="0" x2="375" y2="180" stroke="#908070" strokeWidth="1" opacity="0.4" />

        {/* UN poster/flag on wall */}
        <g transform="translate(250, 40)">
          <rect x="-20" y="-20" width="40" height="30" fill="#4a8ada" />
          {/* Simple globe icon */}
          <circle cx="0" cy="-5" r="8" fill="none" stroke="#fff" strokeWidth="1.5" />
          <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#fff" strokeWidth="0.8" />
          <ellipse cx="0" cy="-5" rx="4" ry="8" fill="none" stroke="#fff" strokeWidth="0.8" />
          {/* Olive branches */}
          <path d="M-6,4 Q-10,0 -12,4 Q-10,2 -6,4" fill="#fff" opacity="0.7" />
          <path d="M6,4 Q10,0 12,4 Q10,2 6,4" fill="#fff" opacity="0.7" />
        </g>

        {/* Window on left with light coming in */}
        <rect x="40" y="30" width="50" height="60" fill="#c0d0e0" />
        <rect x="40" y="30" width="50" height="60" fill="none" stroke="#706050" strokeWidth="2" />
        <line x1="65" y1="30" x2="65" y2="90" stroke="#706050" strokeWidth="1.5" />
        <line x1="40" y1="60" x2="90" y2="60" stroke="#706050" strokeWidth="1.5" />
        {/* Light beam from window */}
        <polygon points="90,30 90,90 200,180 140,180" fill="#e0d8c0" opacity="0.08" />

        {/* Floor */}
        <rect x="0" y="180" width="500" height="100" fill="#706050" />
        {/* Floor planks */}
        {[190, 210, 230, 250, 270].map((y, i) => (
          <line key={`fl-${y}`} x1={0} y1={y} x2={500} y2={y}
            stroke="#605040" strokeWidth="0.5" opacity="0.4" />
        ))}

        {/* Desk — large, center of room */}
        <g transform="translate(250, 160)">
          {/* Desktop */}
          <rect x="-60" y="0" width="120" height="8" fill="#5a4a30" />
          <rect x="-60" y="0" width="120" height="2" fill="#6a5a40" />
          {/* Front panel */}
          <rect x="-58" y="8" width="116" height="30" fill="#4a3a20" />
          {/* Legs */}
          <rect x="-56" y="38" width="4" height="18" fill="#3a2a14" />
          <rect x="52" y="38" width="4" height="18" fill="#3a2a14" />

          {/* Items on desk */}
          {/* Papers */}
          <rect x="-40" y="-6" width="24" height="6" fill="#e8e0d0" />
          <rect x="-38" y="-5" width="20" height="1" fill="#a0a090" opacity="0.3" />
          <rect x="-38" y="-3" width="16" height="1" fill="#a0a090" opacity="0.3" />
          {/* Pen */}
          <rect x="-10" y="-4" width="14" height="2" fill="#2a2a4a" transform="rotate(-10 -3 -3)"
            style={{ animation: 'id-pen-write 4s ease-in-out infinite', transformOrigin: '-10px -3px' }} />
          {/* Stamp */}
          <rect x="20" y="-6" width="8" height="6" fill="#3a3a3a" />
          <rect x="19" y="-7" width="10" height="2" fill="#4a4a4a" />
          {/* Folder */}
          <rect x="34" y="-5" width="16" height="5" fill="#b08040" />
          <rect x="34" y="-6" width="16" height="2" fill="#c09050" />

          {/* Desk lamp */}
          <g transform="translate(46, -20)">
            <rect x="-1" y="8" width="3" height="12" fill="#4a4a4a" />
            <rect x="-4" y="0" width="10" height="8" fill="#5a5a5a" />
            {/* Lamp glow */}
            <ellipse cx="1" cy="12" rx="10" ry="4" fill="#ffee88" opacity="0.15"
              style={{ animation: 'id-lamp-flicker 6s ease-in-out infinite' }} />
          </g>
        </g>

        {/* UN official — seated behind desk */}
        <g transform="translate(250, 128)">
          <PixelPerson
            x={0} y={0} scale={1.6} variant="civilian"
            color="#b08060" shirtColor="#2a4a6a" pantsColor="#1a2a3a"
            hairColor="#3a2a1a" accentColor="#8a8a9a"
            mood="neutral" sway="idle"
          />
          {/* Blue beret/cap hint */}
          <rect x="-4" y="-18" width="10" height="3" fill="#3a5a8a" />
        </g>

        {/* Chair behind desk (partial) */}
        <rect x="240" y="130" width="22" height="4" fill="#3a3a3a" />
        <rect x="238" y="110" width="26" height="20" fill="#3a3a3a" opacity="0.3" />

        {/* You — standing in front of desk, facing the official */}
        <g transform="translate(250, 195)">
          <PixelPerson
            x={0} y={0} scale={2.0} variant="civilian"
            color="#c4956a" shirtColor="#5a6a7a" pantsColor="#2a2a38"
            hairColor="#1a0f08" accentColor="#8a7a5a"
            mood="scared" sway="scared" swayDelay={0}
          />
        </g>

        {/* Simple chair in front of desk for you */}
        <rect x="242" y="216" width="18" height="3" fill="#5a4a30" />
        <rect x="242" y="219" width="3" height="10" fill="#4a3a20" />
        <rect x="257" y="219" width="3" height="10" fill="#4a3a20" />

        {/* Door on right wall */}
        <rect x="420" y="80" width="40" height="100" fill="#5a4a30" />
        <rect x="420" y="80" width="40" height="100" fill="none" stroke="#4a3a20" strokeWidth="1.5" />
        <rect x="452" y="126" width="3" height="6" fill="#b0a060" />

        {/* Vignette */}
        <rect x="0" y="0" width="500" height="15" fill="#000" opacity="0.2" />
        <rect x="0" y="265" width="500" height="15" fill="#000" opacity="0.25" />
      </svg>
    </div>
  );
}
