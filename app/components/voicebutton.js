'use client';
import { useState, useEffect } from 'react';

export default function VoiceButton({ onCommand }) { // Accept prop
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported,ZS] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const speak =wf => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleVoiceSearch = () => {
    if (!isSupported) return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
        setIsListening(true);
        setTranscript("Listening... 👂");
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(`You said: "${command}"`);
      setIsListening(false);

      // 1. Handle Navigation Logic Locally
      if (command.includes('menu') || command.includes('food')) {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        speak("Here is our menu.");
      } 
      else if (command.includes('hours')) {
        document.getElementById('hours').scrollIntoView({ behavior: 'smooth' });
        speak("We are open 7 to 7.");
      }
      // 2. Pass complex commands (like "Order") up to parent
      else if (onCommand) {
        onCommand(command, speak);
      }
    };

    recognition.onerror = () => {
        setTranscript("Try again.");
        setIsListening(false);
    };
    
    recognition.start();
  };

  if (!isSupported) return null;

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