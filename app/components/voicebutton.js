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

// Process recognized voice command
// added more commands for better interaction Below and improved existing ones

  const processCommand = (command) => {
    const synth = window.speechSynthesis;
    
    if (command.includes('menu') || command.includes('food')) {
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      synth.speak(new SpeechSynthesisUtterance("Here is our menu."));
    } 
    else if (command.includes('hours') || command.includes('open') || command.includes('time')) {
      document.getElementById('hours').scrollIntoView({ behavior: 'smooth' });
      synth.speak(new SpeechSynthesisUtterance("We are open from 7 AM to 7 PM."));
    }
    else if (command.includes('vegan') || command.includes('milk')) {
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
        synth.speak(new SpeechSynthesisUtterance("Yes, we have oat, almond, and soy milk."));
    }

    else if (command.includes('price') || command.includes('cost') || command.includes('much')) {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });

        // Check if the user specifically asked for a latte
        if (command.includes('latte')) {
            synth.speak(new SpeechSynthesisUtterance("Our Classic Latte is four dollars and fifty cents."));
        } else {
            // Fallback for general queries like "How much does it cost?"
            synth.speak(new SpeechSynthesisUtterance("Here is our menu and prices."));
        }
    }

    else if (command.includes('make') || command.includes('latte') || command.includes('home')) {
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
        synth.speak(new SpeechSynthesisUtterance("To make a latte at home, simply heat your milk in the microwave and whisk it vigorously until it foams, then pour it over strong brewed coffee."));
    }

    else if (command.includes('contact') || command.includes('location') || command.includes('where')) {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        synth.speak(new SpeechSynthesisUtterance("We are located at 123 Demo Market Street."));
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