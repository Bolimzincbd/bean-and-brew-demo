import VoiceButton from './components/voicebutton';

export default function Home() {
  // PASSIVE OPTIMIZATION: The JSON-LD Schema
  // This tells Google exactly who you are, where you are, and when you open.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "Bean & Brew Demo Café",
    "image": "https://your-domain.com/images/store.jpg",
    "telephone": "+1-555-0199",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Demo Market Street",
      "addressLocality": "Tech City",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "19:00"
      }
    ]
  };

  return (
    <main className="container">
      {/* Inject Schema for Robots */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="hero">
        <h1>Bean & Brew ☕</h1>
        <p>The best organic coffee in Tech City.</p>
        
        {/* ACTIVE INTEGRATION: The Voice Button */}
        <VoiceButton />
      </header>

      {/* ID tags used for voice navigation scrolling */}
      <section id="menu" className="section">
        <h2>Our Menu</h2>
        <ul>
          <li><strong>Classic Latte:</strong> $4.50</li>
          <li><strong>Cold Brew:</strong> $5.00</li>
          <li><strong>Avocado Toast:</strong> $8.00</li>
        </ul>
      </section>

      <section id="hours" className="section">
        <h2>Opening Hours</h2>
        <p>We are open Mon-Fri from 7:00 AM to 7:00 PM.</p>
      </section>

      <section id="faq" className="section">
        <h2>Frequently Asked Questions</h2>
        <p className="subtext">Optimized for "Long-Tail" Voice Queries</p>
        
        {/* Semantic HTML for Featured Snippets */}
        <article className="faq-item">
          <h3>Do you offer vegan milk options?</h3>
          <p>Yes, we offer oat milk, almond milk, and soy milk for all our drinks at no extra cost.</p>
        </article>

        <article className="faq-item">
          <h3>How do I make a latte at home without a machine?</h3>
          <p>To make a latte at home, simply heat your milk in the microwave and whisk it vigorously until it foams, then pour it over strong brewed coffee.</p>
        </article>
      </section>
      
      <footer id="contact">
        <h2>Contact Us</h2>
        <p>📞 168168167</p>
        <p>📍 123 Demo Market Street, Tech City</p>
      </footer>

      <section id="about" className="section">
        <h2>About Us</h2>
        <p>We started brewing coffee in 2010...</p>
      </section>

    </main>
  )
}