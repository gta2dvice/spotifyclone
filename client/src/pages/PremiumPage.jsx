import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FeatureCard from '../components/premium/FeatureCard.jsx'
import PricingCard from '../components/premium/PricingCard.jsx'
import TestimonialCard from '../components/premium/TestimonialCard.jsx'
import FaqAccordion from '../components/premium/FaqAccordion.jsx'
import PremiumHeroGraphic from '../components/premium/PremiumHeroGraphic.jsx'
import {
  benefits,
  plans,
  comparisonRows,
  testimonials,
  faqs,
} from '../data/premiumData.js'
import './PremiumPage.css'

function CheckMark({ premium }) {
  if (premium === true) {
    return <span className="cmp-check cmp-check--yes" aria-label="Included">✓</span>
  }
  if (premium === false) {
    return <span className="cmp-check cmp-check--no" aria-label="Not included">—</span>
  }
  return <span className="cmp-text">{premium}</span>
}

function PremiumPage() {
  const plansRef = useRef(null)

  const scrollToPlans = () => {
    plansRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handlePlanSelect = () => {
    scrollToPlans()
  }

  return (
    <div className="premium-page">
      {/* Hero */}
      <section className="premium-hero">
        <div className="premium-hero-bg" aria-hidden="true" />
        <motion.div
          className="premium-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="premium-hero-copy">
            <span className="premium-pill">Spotify Premium</span>
            <h1>Get Premium. Listen without limits.</h1>
            <p className="premium-hero-sub">
              Ad-free music, offline downloads, and high-quality audio.
            </p>
            <div className="premium-hero-actions">
              <motion.button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={scrollToPlans}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Get Premium
              </motion.button>
              <motion.button
                type="button"
                className="btn btn-ghost btn-lg"
                onClick={scrollToPlans}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Plans
              </motion.button>
            </div>
          </div>
          <PremiumHeroGraphic />
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="premium-section" id="benefits">
        <motion.header
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Why go Premium?</h2>
          <p>Everything you need for the ultimate listening experience.</p>
        </motion.header>
        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="premium-section premium-section--dark" id="plans" ref={plansRef}>
        <motion.header
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Pick your plan</h2>
          <p>Flexible options for every listener. Cancel anytime.</p>
        </motion.header>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              popular={plan.popular}
              index={index}
              onSelect={() => handlePlanSelect(plan.name)}
            />
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="premium-section" id="compare">
        <motion.header
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Free vs Premium</h2>
          <p>See what you unlock with a Premium subscription.</p>
        </motion.header>
        <motion.div
          className="comparison-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Free</th>
                <th scope="col" className="col-premium">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>
                    {typeof row.free === 'string' ? (
                      <span className="cmp-text">{row.free}</span>
                    ) : (
                      <CheckMark premium={row.free} />
                    )}
                  </td>
                  <td className="col-premium">
                    {typeof row.premium === 'string' ? (
                      <span className="cmp-text cmp-text--premium">{row.premium}</span>
                    ) : (
                      <CheckMark premium={row.premium} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="premium-section premium-section--dark" id="reviews">
        <motion.header
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Loved by listeners</h2>
          <p>Join millions who upgraded their music experience.</p>
        </motion.header>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <TestimonialCard key={item.id} {...item} index={index} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="premium-section" id="faq">
        <motion.header
          className="section-header section-header--narrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Frequently asked questions</h2>
        </motion.header>
        <FaqAccordion items={faqs} />
      </section>

      {/* Footer CTA */}
      <section className="premium-cta">
        <motion.div
          className="premium-cta-inner"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to upgrade your music experience?</h2>
          <p>Start listening without limits today.</p>
          <motion.button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={scrollToPlans}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Premium
          </motion.button>
          <Link to="/" className="premium-cta-link">
            Continue with Free
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default PremiumPage
