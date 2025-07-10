import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingHearts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // const hearts = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '❤️', '💜'];
    const hearts = ['💍', '🥂', '💍', '🥂' ];
    
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.className = 'floating-heart';
      
      // Random starting position
      const startX = Math.random() * window.innerWidth;
      heart.style.left = `${startX}px`;
      heart.style.bottom = '-50px';
      heart.style.fontSize = `${Math.random() * 20 + 15}px`;
      heart.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      
      container.appendChild(heart);
      console.log('creating heart');

      // Animate upward with slight horizontal drift
      gsap.to(heart, {
        y: -(window.innerHeight + 100),
        x: `+=${(Math.random() - 0.5) * 200}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 6,
        ease: "none",
        onComplete: () => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }
      });

      // Fade out near the top
      gsap.to(heart, {
        opacity: 0,
        duration: 2,
        delay: Math.random() * 6 + 4,
        ease: "power2.out"
      });

      // Add gentle pulsing
      gsap.to(heart, {
        scale: 1.2,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    };

    // Create hearts at intervals
    const interval = setInterval(createHeart, 800);

    return () => {
      clearInterval(interval);
      // Clean up any remaining hearts
      const remainingHearts = container.querySelectorAll('.floating-heart');
      remainingHearts.forEach(heart => heart.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ zIndex: 5 }}
    />
  );
};

export default FloatingHearts; 