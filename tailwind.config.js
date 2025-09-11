/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'dark': '#111111',
        'charcoal': '#222222',
        'accent': '#D4AF37',
        'muted-gold': '#B8860B',
        'neutral-light': '#F5F5F5',
        'neutral-dark': '#333333',
        'glass': {
          'white': 'rgba(255, 255, 255, 0.1)',
          'white-hover': 'rgba(255, 255, 255, 0.15)',
          'white-strong': 'rgba(255, 255, 255, 0.2)',
          'black': 'rgba(0, 0, 0, 0.3)',
          'border': 'rgba(255, 255, 255, 0.2)',
          'border-hover': 'rgba(255, 255, 255, 0.3)',
        },
        'overlay': {
          'dark': 'rgba(0, 0, 0, 0.6)',
          'light': 'rgba(0, 0, 0, 0.3)',
          'strong': 'rgba(0, 0, 0, 0.8)',
        },
        'form': {
          'bg': 'rgba(255, 255, 255, 0.1)',
          'bg-focus': 'rgba(255, 255, 255, 0.15)',
          'border': 'rgba(255, 255, 255, 0.2)',
          'placeholder': '#d1d5db',
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'zoom-in': 'zoomIn 1.2s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(1.1)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const colors = theme('colors');

      const newUtilities = {
        // Glass Effects
        '.glass': {
          background: colors.glass.white,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${colors.glass.border}`,
        },
        '.glass-dark': {
          background: colors.glass.black,
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          border: `1px solid ${colors.glass.border}`,
        },
        '.glass-card': {
          background: colors.glass.white,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${colors.glass.border}`,
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: `0 8px 32px ${colors.overlay.light}, 0 4px 16px ${colors.glass.white} inset`,
          transition: 'all 0.3s ease',
        },
        '.glass-form': {
          background: colors.glass.white,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${colors.glass.border}`,
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: `0 8px 32px ${colors.overlay.light}, 0 4px 16px ${colors.glass.white} inset`,
        },

        // Button Utilities
        '.btn-glass': {
          background: `${colors.glass.white} !important`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${colors.glass.border} !important`,
          color: 'white !important',
          fontWeight: '600',
          padding: '0.75rem 2rem',
          borderRadius: '0.75rem',
          transition: 'all 0.3s ease',
          boxShadow: `0 8px 32px ${colors.overlay.light}, 0 4px 16px ${colors.glass.white} inset`,
          textTransform: 'none !important',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          '&:hover': {
            background: `${colors.glass['white-hover']} !important`,
            border: `1px solid ${colors.glass['border-hover']} !important`,
            transform: 'translateY(-2px)',
            boxShadow: `0 12px 40px ${colors.overlay.dark}, 0 6px 20px ${colors.glass['white-hover']} inset`,
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: `0 4px 16px ${colors.overlay.light}, 0 2px 8px ${colors.glass.white} inset`,
          },
        },

        // Gradient Utilities
        '.gradient-dark': {
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.charcoal} 100%)`,
        },
        '.gradient-accent': {
          background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors['muted-gold']} 100%)`,
        },
        '.text-gradient': {
          background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors['muted-gold']} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },

        // Overlay Utilities
        '.overlay-dark': {
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          backgroundColor: colors.overlay.dark,
        },
        '.overlay-gradient': {
          background: `linear-gradient(180deg, ${colors.overlay.light} 0%, ${colors.overlay.strong} 100%)`,
        },

        // Form Utilities
        '.form-input': {
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: colors.form.bg,
          border: `1px solid ${colors.form.border}`,
          borderRadius: '0.5rem',
          color: 'white',
          outline: 'none',
          transition: 'all 0.3s ease',
          '&::placeholder': {
            color: colors.form.placeholder,
          },
          '&:focus': {
            backgroundColor: colors.form['bg-focus'],
            borderColor: colors.accent,
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px ${colors.accent}26`, // 26 = 15% opacity in hex
          },
        },
        '.form-textarea': {
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: colors.form.bg,
          border: `1px solid ${colors.form.border}`,
          borderRadius: '0.5rem',
          color: 'white',
          outline: 'none',
          transition: 'all 0.3s ease',
          resize: 'vertical',
          minHeight: '120px',
          '&::placeholder': {
            color: colors.form.placeholder,
          },
          '&:focus': {
            backgroundColor: colors.form['bg-focus'],
            borderColor: colors.accent,
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px ${colors.accent}26`, // 26 = 15% opacity in hex
          },
        },
        '.form-select': {
          width: '100%',
          padding: '0.75rem 1rem',
          backgroundColor: colors.form.bg,
          border: `1px solid ${colors.form.border}`,
          borderRadius: '0.5rem',
          color: 'white',
          outline: 'none',
          transition: 'all 0.3s ease',
          '&:focus': {
            backgroundColor: colors.form['bg-focus'],
            borderColor: colors.accent,
          },
        },

        // Navigation Utilities
        '.nav-link': {
          color: 'white',
          fontWeight: '500',
          transition: 'color 0.3s ease',
          textDecoration: 'none',
          '&:hover': {
            color: colors.accent,
          },
        },
        '.nav-link-dark': {
          color: colors['neutral-dark'],
          fontWeight: '500',
          transition: 'color 0.3s ease',
          textDecoration: 'none',
          '&:hover': {
            color: colors.accent,
          },
        },

        // Animation Utilities
        '.animate-on-scroll': {
          opacity: '0',
          transform: 'translateY(30px)',
          transition: 'all 0.8s ease-out',
          '&.in-view': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        '.animate-fade-in': {
          opacity: '0',
          transition: 'opacity 0.8s ease-out',
          '&.in-view': {
            opacity: '1',
          },
        },
        '.animate-slide-in-left': {
          opacity: '0',
          transform: 'translateX(-50px)',
          transition: 'all 0.8s ease-out',
          '&.in-view': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        '.animate-slide-in-right': {
          opacity: '0',
          transform: 'translateX(50px)',
          transition: 'all 0.8s ease-out',
          '&.in-view': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        '.animate-scale-in': {
          opacity: '0',
          transform: 'scale(0.9)',
          transition: 'all 0.6s ease-out',
          '&.in-view': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        '.animate-stagger': {
          opacity: '0',
          transform: 'translateY(20px)',
          transition: 'all 0.6s ease-out',
          '&.in-view': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      }

      // Add responsive variants for glass button
      const responsiveUtilities = {
        '@media (max-width: 768px)': {
          '.btn-glass': {
            background: `${colors.glass['white-hover']} !important`,
            border: `1px solid ${colors.glass.border} !important`,
            boxShadow: `0 8px 32px ${colors.overlay.strong}, 0 4px 16px ${colors.glass['white-hover']} inset`,
            '&:hover': {
              background: `${colors.glass['white-strong']} !important`,
              border: `1px solid ${colors.glass['border-hover']} !important`,
            },
          },
        },
      }

      addUtilities(newUtilities)
      addUtilities(responsiveUtilities)
    }
  ],
}
