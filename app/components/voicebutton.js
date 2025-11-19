'use client'; // Essential for Next.js Client Components

import { useState, useEffect } from 'react';

export default function VoiceButton() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const handleVoiceSearch = () => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);
    setTranscript("Listening... 👂");

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(`You said: "${command}"`);
      setIsListening(false);
      processCommand(command);
    };

    recognition.onerror = (event) => {
      setTranscript("Error/Timeout. Try again.");
      setIsListening(false);
    };
    
    recognition.onend = () => {
        setIsListening(false);
    };
  };

  const processCommand = (command) => {
    const synth = window.speechSynthesis;
    
    if (command.includes('menu') || command.includes('food')) {
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      synth.speak(new SpeechSynthesisUtterance("Here is our menu. Classic Latte: $4.50, Cold Brew: $5.00, Avocado Toast: $8.00"));
    } 
    else if (command.includes('hours') || command.includes('open') || command.includes('time')) {
      document.getElementById('hours').scrollIntoView({ behavior: 'smooth' });
      synth.speak(new SpeechSynthesisUtterance("We are open from 7 AM to 7 PM."));
    }
    else if (command.includes('vegan') || command.includes('milk')) {
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
        synth.speak(new SpeechSynthesisUtterance("Yes, we have oat, almond, and soy milk."));
    }
    else if (command.includes('contact') || command.includes('location') || command.includes('where')) 
    {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    
    synth.speak(new SpeechSynthesisUtterance("We are located at 123 Demo Market Street."));
    }

    else if (command.includes('price') && command.includes('latte')) {
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      synth.speak(new SpeechSynthesisUtterance("Our Classic Latte is four dollars and fifty cents."));
    }

    else if (command.includes('about') || command.includes('story')) {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
      synth.speak(new SpeechSynthesisUtterance("Here is our story."));
    }

    else {
        synth.speak(new SpeechSynthesisUtterance("Sorry, I didn't catch that."));
    }
  };

  if (!isSupported) return null; // Don't show button if browser doesn't support it

  return (
    <div className="voice-controls">
      <button 
        onClick={handleVoiceSearch} 
        className={`mic-button ${isListening ? 'active' : ''}`}
      >
        {isListening ? '🔴 Listening...' : '🎤 Speak to Search'}
      </button>
      <p className="transcript-text">{transcript}</p>
    </div>
  );
}