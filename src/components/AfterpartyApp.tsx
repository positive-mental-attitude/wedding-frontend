import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BalatroBackground from './BalatroBackground';
import PartyForm from './PartyForm';

function AfterpartyApp() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleJoinParty = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BalatroBackground
        color1="#FF8936"
        color2="#1F2347"
        color3="#251E3E"
        pixelFilter={900}
        isRotate={false}
        mouseInteraction={true}
      />
      
      {/* Navigation */}
      <nav className="absolute top-4 left-4 z-30">
        <Link
          to="/"
          className="flex items-center px-3 py-2 bg-[#1F2347]/90 backdrop-blur-sm border-2 border-[#FF8936] rounded-lg text-[#FFD9B3] hover:text-[#FF8936] hover:bg-[#251E3E]/90 transition-all duration-300 transform hover:scale-105 pixel-text pixel-text-xs"
        >
          <ArrowLeft className="w-3 h-3 mr-2" />
          Back to Wedding
        </Link>
      </nav>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Main Image */}
          <div
            className="border-4 border-[#FF8936] rounded-lg overflow-hidden shadow-2xl bg-[#1F2347] p-2"
            style={{ boxShadow: '8px 8px 0 #1F2347' }}
          >
            <img
              src="/osg_pixel.jpeg"
              alt="OSG Afterparty"
              className="max-w-full h-auto pixel-image rounded"
              style={{ 
                imageRendering: 'pixelated',
                maxHeight: '50vh',
                width: 'auto'
              }}
            />
          </div>
          
          {/* Event Date and Time */}
          <div className="flex justify-center mb-6">
            <div
              className="bg-[#1F2347] border-4 border-[#FF8936] rounded-2xl p-2 pixel-border w-full max-w-lg"
              style={{ boxShadow: '8px 8px 0 #1F2347' }}
            >
              <div className="bg-[#1F2347] border-4 border-[#1F2347] rounded-xl p-4">
                <div className="text-[#FF8936] pixel-text pixel-text-medium mb-1">
                  27 September 2025
                </div>
                <div className="text-[#FFD9B3] pixel-text pixel-text-small">
                  11pm till late
                </div>
                <br></br>
                <div className="text-[#FFD9B3] pixel-text pixel-text-small" >
                  3 Temasek Boulevard Tower 1 #01-510, 3 Temasek Blvd, #510-511 Suntec City, 038983
                </div>
              </div>
            </div>
          </div>
          
          {/* Join Party Button */}
          <button
            onClick={handleJoinParty}
            className="bg-[#FF8936] hover:bg-[#FFD9B3] text-[#1F2347] py-4 px-12 rounded-lg pixel-text pixel-text-medium transition-all duration-200 transform hover:scale-105 pixel-button border-2 border-[#1F2347] w-full max-w-md mx-auto"
            style={{ boxShadow: '8px 8px 0 #1F2347' }}
            aria-label="Join the afterparty"
          >
            Join the party
          </button>
        </div>
      </div>
      
      <PartyForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
}

export default AfterpartyApp;