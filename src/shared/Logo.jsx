/**
 * Job Tracker Logo Component
 * A clean, professional SVG logo representing job application tracking
 */
export default function Logo({ size = 40, showText = true, variant = 'full' }) {
  const iconSize = size;
  const textHeight = size * 0.6;

  // Color scheme matching the app's primary colors
  const primaryColor = '#3b82f6'; // Blue from theme
  const accentColor = '#60a5fa'; // Light blue

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: showText ? '12px' : '0',
      }}
    >
      {/* Logo Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Job Tracker Logo"
        role="img"
      >
        {/* Briefcase base */}
        <rect
          x="15"
          y="35"
          width="70"
          height="50"
          rx="6"
          fill={primaryColor}
          stroke={primaryColor}
          strokeWidth="2"
        />

        {/* Briefcase handle */}
        <path
          d="M 35 35 L 35 25 Q 35 20 40 20 L 60 20 Q 65 20 65 25 L 65 35"
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Briefcase lock/clasp */}
        <rect x="45" y="50" width="10" height="8" rx="2" fill={accentColor} />

        {/* Checkmark overlay (representing tracking/completion) */}
        <path
          d="M 30 60 L 42 72 L 70 44"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Accent lines (representing organization/lists) */}
        <line x1="25" y1="42" x2="45" y2="42" stroke={accentColor} strokeWidth="2" />
        <line x1="55" y1="42" x2="75" y2="42" stroke={accentColor} strokeWidth="2" />
      </svg>

      {/* Logo Text */}
      {showText && variant === 'full' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '1.2',
          }}
        >
          <span
            style={{
              fontSize: `${textHeight}px`,
              fontWeight: '700',
              color: primaryColor,
              letterSpacing: '-0.5px',
            }}
          >
            Job Tracker
          </span>
          <span
            style={{
              fontSize: `${textHeight * 0.5}px`,
              fontWeight: '500',
              color: '#64748b',
              letterSpacing: '0.5px',
            }}
          >
            Stay Organized
          </span>
        </div>
      )}

      {showText && variant === 'compact' && (
        <span
          style={{
            fontSize: `${textHeight}px`,
            fontWeight: '700',
            color: primaryColor,
            letterSpacing: '-0.5px',
          }}
        >
          Job Tracker
        </span>
      )}
    </div>
  );
}
