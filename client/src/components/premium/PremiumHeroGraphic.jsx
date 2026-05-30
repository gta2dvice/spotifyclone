import { motion } from 'framer-motion'

function PremiumHeroGraphic() {
  return (
    <div className="hero-graphic" aria-hidden="true">
      <motion.div
        className="hero-graphic-glow"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-vinyl"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <div className="hero-vinyl-inner">
          <div className="hero-vinyl-label" />
        </div>
      </motion.div>
      <div className="hero-wave hero-wave--1" />
      <div className="hero-wave hero-wave--2" />
      <div className="hero-wave hero-wave--3" />
      <motion.div
        className="hero-note hero-note--1"
        animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        ♪
      </motion.div>
      <motion.div
        className="hero-note hero-note--2"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        ♫
      </motion.div>
    </div>
  )
}

export default PremiumHeroGraphic
