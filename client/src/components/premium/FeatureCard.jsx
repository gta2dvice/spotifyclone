import { motion } from 'framer-motion'
import BenefitIcon from './BenefitIcon.jsx'

function FeatureCard({ title, description, icon, index = 0 }) {
  return (
    <motion.article
      className="feature-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className="feature-card-icon">
        <BenefitIcon name={icon} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.article>
  )
}

export default FeatureCard
