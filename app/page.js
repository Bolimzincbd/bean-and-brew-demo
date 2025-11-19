'use client';
import { useState } from 'react';
import VoiceButton from './components/voicebutton';

export default function Home() {
  // 1. Define Menu Data
  const menuItems = [
    { id: 'latte', name: 'Classic Latte', price: 4.50 },
    { id: 'coldbrew', name: 'Cold Brew', price: 5.00 },
    { id: 'toast', name: 'Avocado Toast', price: 8.00 },
  ];

  // 2. Add Cart State
  const [cart,ZS] = useState([]);

  const addToCart = (itemName) => {
    const item = menuItems.find(i => i.name.toLowerCase().includes(itemName.toLowerCase()));
    if (item) {
      setCart([...cart, item]);
      return true; // Item found
    }
    return false; // Item not found
  };

  // 3. Handle Voice Commands from Child
  const handleVoiceCommand = (command, speak) => {
    if (command.includes('order') || command.includes('buy')) {
      // specific logic for ordering
      let found = false;
      menuItems.forEach(item => {
        if (command.includes(item.name.toLowerCase())) {
          addToCart(item.name);
          speak(`Added ${item.name} to your order.`);
          found = true;
        }
      });
      if (!found) speak("Sorry, I don't have that item on the menu.");
    } 
    // ... keep existing scrolling logic here or in the component
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": "Bean & Brew Demo Café",
    "priceRange": "$$",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "07:00", "closes": "19:00" }
    ]
  };

  return (
    <main className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="hero">
        <h1>Bean & Brew ☕</h1>
        <p>The best organic coffee in Tech City.</p>
        {/* Pass the handler to the button */}
        <VoiceButton onCommand={handleVoiceCommand} />
      </header>

      {/* NEW: Shopping Cart Display */}
      {cart.length > 0 && (
        <section className="cart-display">
          <h3>Your Order ({cart.length})</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
          <p><strong>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</strong></p>
        </section>
      )}

      <section id="menu" className="section">
        <h2>Our Menu</h2>
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.id} className="menu-item">
              <strong>{item.name}</strong>
              <span>${item.price.toFixed(2)}</span>
              <button onClick={() => addToCart(item.name)} className="add-btn">Add</button>
            </li>
          ))}
        </ul>
      </section>

      <section id="hours" className="section">
        <h2>Opening Hours</h2>
        <p>We are open Mon-Fri from 7:00 AM to 7:00 PM.</p>
      </section>

      <section id="faq" className="section">
        <h2>FAQ</h2>
        <article>
          <h3>Vegan Options?</h3>
          <p>Yes, we offer oat, almond, and soy milk.</p>
        </article>
      </section>
      
      <footer id="contact">
        <p>📍 123 Demo Market Street, Tech City</p>
      </footer>
    </main>
  )
}