import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GridMotionProps {
  items: (string | React.ReactElement)[];
}

const GridMotion: React.FC<GridMotionProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const rows = rowsRef.current;
    
    // Set initial positions and create animations
    rows.forEach((row, index) => {
      if (!row) return;
      
      // Set initial transform - smaller movement range to stay contained
      gsap.set(row, {
        x: index % 2 === 0 ? -50 : 50,
      });

      // Create infinite scroll animation with smaller range
      gsap.to(row, {
        x: index % 2 === 0 ? 50 : -50,
        duration: 15 + (index * 2),
        ease: "none",
        repeat: -1,
      });
    });

    // Mouse move parallax effect - reduced intensity
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      rows.forEach((row, index) => {
        if (!row) return;
        
        gsap.to(row, {
          rotationY: deltaX * (2 + index * 0.5),
          rotationX: deltaY * (1 + index * 0.3),
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Split items into rows
  const itemsPerRow = 7;
  const rows = [];
  for (let i = 0; i < 4; i++) {
    const rowItems = [];
    for (let j = 0; j < itemsPerRow; j++) {
      const itemIndex = (i * itemsPerRow + j) % items.length;
      rowItems.push(items[itemIndex]);
    }
    rows.push(rowItems);
  }

  return (
    <div className="gridMotion-container" ref={containerRef}>
      {rows.map((rowItems, rowIndex) => (
        <div
          key={rowIndex}
          className="row"
          ref={(el) => {
            if (el) rowsRef.current[rowIndex] = el;
          }}
        >
          {rowItems.map((item, itemIndex) => (
            <div key={`${rowIndex}-${itemIndex}`} className="row__item">
              <div className="row__item-inner">
                {typeof item === 'string' && item.startsWith('/') ? (
                  <img
                    src={item}
                    alt="Wedding photo"
                    className="row__item-img"
                  />
                ) : typeof item === 'string' ? (
                  <div className="row__item-content">{item}</div>
                ) : (
                  <div className="row__item-content">{item}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridMotion;