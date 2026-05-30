import { motion } from 'framer-motion'

function TestimonialCard({ quote, author, role, rating, index = 0 }) {
  return (
    <motion.blockquote
      className="testimonial-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} aria-hidden="true">
            ★
          </span>
        ))}
      </div>
      <p className="testimonial-quote">&ldquo;{quote}&rdquo;</p>
      <footer>
        <cite>{author}</cite>
        <span>{role}</span>
      </footer>
    </motion.blockquote>
  )
}

export default TestimonialCard
