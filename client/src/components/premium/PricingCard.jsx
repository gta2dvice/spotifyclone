import { motion } from 'framer-motion'

function PricingCard({ name, price, period, features, popular, index = 0, onSelect }) {
  return (
    <motion.article
      className={`pricing-card ${popular ? 'pricing-card--popular' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: popular ? -8 : -6, transition: { duration: 0.25 } }}
    >
      {popular && <span className="pricing-badge">Most popular</span>}
      <h3 className="pricing-name">{name}</h3>
      <div className="pricing-price">
        <span className="pricing-amount">{price}</span>
        <span className="pricing-period">{period}</span>
      </div>
      <ul className="pricing-features">
        {features.map((feature) => (
          <li key={feature}>
            <span className="check" aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        type="button"
        className={popular ? 'btn btn-primary' : 'btn btn-secondary'}
        onClick={onSelect}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Get {name}
      </motion.button>
    </motion.article>
  )
}

export default PricingCard
