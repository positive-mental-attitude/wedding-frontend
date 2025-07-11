import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Clock, Check, X, HelpCircle, Send, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import GridMotion from './GridMotion';
import FloatingHearts from './FloatingHearts';

interface FormData {
  fullName: string;
  telegramUsername: string;
  phoneNumber: string;
  dietaryRestrictions: string;
  note: string;
}

function WeddingRSVP() {
  const [rsvpStatus, setRsvpStatus] = useState<'yes' | 'no' | 'maybe' | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    telegramUsername: '',
    phoneNumber: '',
    dietaryRestrictions: '',
    note: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Create items array with the couple's uploaded photos
  const gridItems = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
    '/photo4.jpg',
    '/photo5.jpg',
    '/photo6.jpg',
    '/photo7.jpg',
    '/photo8.jpg',
    '/photo9.jpg',
    '/photo10.jpg',
    '/photo11.jpg',
    '/photo12.jpg',
    '/photo13.jpg',
    '/photo14.jpg',
    '/photo15.jpg',
    '/photo16.jpg',
    '/photo17.jpg',
    '/photo18.jpg',
    '/photo19.jpg',
    '/photo20.jpg',
    '/photo21.jpg',
    '/photo22.jpg',
    '/photo23.jpg',
    '/photo24.jpg',
    '/photo25.jpg',
    '/photo26.jpg',
    '/photo27.jpg',
    '/photo28.jpg',
    '/photo29.jpg',
    '/photo30.jpg',
    '/photo31.jpg',
    '/photo32.jpg',
    '/photo33.jpg',
    '/photo34.jpg',
    '/photo35.jpg',
    '/photo36.jpg'
  ];

  const handleRsvpClick = (status: 'yes' | 'no' | 'maybe') => {
    setRsvpStatus(status);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare the data based on response type
      const requestData: any = {
        response_type: rsvpStatus,
        full_name: formData.fullName
      };

      if (rsvpStatus === 'yes') {
        requestData.telegram_username = formData.telegramUsername;
        requestData.phone_number = formData.phoneNumber;
        if (formData.dietaryRestrictions.trim()) {
          requestData.dietary_restrictions = formData.dietaryRestrictions;
        }
      } else if (rsvpStatus === 'no') {
        if (formData.note.trim()) {
          requestData.message = formData.note;
        }
      } else if (rsvpStatus === 'maybe') {
        if (formData.note.trim()) {
          requestData.note = formData.note;
        }
      }

      console.log('Sending RSVP data:', requestData);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/wedding-rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('RSVP submitted successfully:', result);
      
      setIsSubmitted(true);
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRsvpStatus(null);
    setShowForm(false);
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      fullName: '',
      telegramUsername: '',
      phoneNumber: '',
      dietaryRestrictions: '',
      note: ''
    });
  };

  const getFormTitle = () => {
    switch (rsvpStatus) {
      case 'yes':
        return "Yay! We can't wait to celebrate with you.";
      case 'no':
        return "We understand and appreciate you letting us know.";
      case 'maybe':
        return "We hope you'll be able to join us!";
      default:
        return "";
    }
  };

  const getFormSubtitle = () => {
    switch (rsvpStatus) {
      case 'yes':
        return "Please fill in your details below:";
      case 'no':
        return "Please let us know your name and any message you'd like to share:";
      case 'maybe':
        return "Please share your details and let us know your thoughts:";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6E3BA] via-[#FFEFCB] to-[#FFFCC7] text-white overflow-hidden">
      <FloatingHearts />
      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
        <br></br>
        <h5
          className="md:text-xl text-black/80"
          style={{ fontFamily: '"Arial", serif' }}
        >
          THE WEDDING OF
        </h5>
        <br />
        <h1
          className="text-6xl md:text-8xl font-bold text-black/80"
          style={{ fontFamily: '"Boston Angel", serif' }}
        >
          PAUL & JAZREEL
        </h1>
        {/* <div className="w-24 h-1 bg-gradient-to-r from-[#CFB284] via-[#DFCAA0] to-[#F6E3BA] mx-auto rounded-full"></div> */}
        </header>

        {/* Featured Wedding Photo with GridMotion - Much Larger on Mobile */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="relative group w-full max-w-6xl">
          <div className="absolute"></div>            
            <div className="relative rounded-2xl p-1 border-4" style={{ borderColor: '#772f1a', backgroundColor: '#fff8e1' }}>
              <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
                <GridMotion items={gridItems} />
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Details */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 md:mb-12 border"
          style={{
            background: 'rgb(101, 36, 10)', // Gold
            
            boxShadow: '0 6px 24px 0 rgba(242,166,90,0.10)', // Orange shadow
            opacity: 0.85
          }}
        >
          <h2
            className="text-2xl md:text-5xl font-semibold text-center mb-8 md:mb-12"
            style={{ color: '', fontFamily: '"Boston Angel", serif' }}
          >
            JOIN US FOR OUR SPECIAL DAY
          </h2>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-center">
            {/* Card */}
            <div
              className="flex flex-col items-center p-4 md:p-6 rounded-xl border transition-all duration-300"
              style={{
                background: '#fff8e1', // Very light gold
                
              }}
            >
              <Calendar className="w-6 h-6 md:w-8 md:h-8 mb-3" style={{ color: 'rgb(101, 36, 10)' }} />
              <h3
                className="text-lg md:text-3xl font-semibold mb-4"
                style={{ color: '#772f1a', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}
              >
                Date
              </h3>
              <p
                className="text-base md:text-xl"
                style={{ color: '#585123', fontFamily: '"Boston Angel", serif' }}
              >
                27 September 2025
              </p>
            </div>
            <div
              className="flex flex-col items-center p-4 md:p-6 rounded-xl border transition-all duration-300"
              style={{
                background: '#fff8e1',
              }}
            >
              <MapPin className="w-6 h-6 md:w-8 md:h-8 mb-3" style={{ color: 'rgb(101, 36, 10)' }} />
              <h3
                className="text-lg md:text-3xl font-semibold mb-4"
                style={{ color: '#772f1a', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}
              >
                Venue
              </h3>
              <p
                className="text-base md:text-xl"
                style={{ color: '#585123', fontFamily: '"Boston Angel", serif' }}
              >
                Parkroyal Collection Marina Bay
                <br></br>
                Atrium Ballroom Level 5
              </p>
            </div>
            <div
              className="flex flex-col items-center p-4 md:p-6 rounded-xl border transition-all duration-300"
              style={{
                background: '#fff8e1',
              }}
            >
              <Clock className="w-6 h-6 md:w-8 md:h-8 mb-3" style={{ color: 'rgb(101, 36, 10)' }} />
              <h3
                className="text-lg md:text-3xl font-semibold mb-4"
                style={{ color: '#772f1a', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}
              >
                Time
              </h3>
              <p
                className="text-base md:text-xl"
                style={{ color: '#585123', fontFamily: '"Boston Angel", serif' }}
              >
                Reception starts at 6:30 PM<br />Please be seated by 7.15 PM
              </p>
            </div>
          </div>
        </div>

        {/* RSVP Section */}
        {!isSubmitted ? (
          <div
            className="rounded-2xl p-6 md:p-8 border"
            style={{
              background: 'rgb(101, 36, 10)',
              boxShadow: '0 6px 24px 0 rgba(242,166,90,0.10)',
              opacity: 0.85
            }}
          >
            <h2 className="text-2xl md:text-5xl text-center mb-8 md:mb-12" style={{ color: '#fff', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}>
              Will you be joining us?
            </h2>
            {!showForm ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* Yes Button */}
                <button
                  onClick={() => handleRsvpClick('yes')}
                  className={`flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    rsvpStatus === 'yes' 
                      ? 'bg-[#f2a65a] text-white shadow-lg' 
                      : 'bg-[#f58549] text-white border border-[#f2a65a] hover:bg-[#f2a65a] hover:text-white hover:shadow-lg'
                  }`}
                  style={{ fontFamily: '"Boston Angel", serif', fontWeight: 'bold', background: rsvpStatus === 'yes' ? 'linear-gradient(90deg, #f2a65a 0%, #f58549 100%)' : undefined }}
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6 mr-2" style={{ color: '#fff' }} />
                  Yes
                </button>
                {/* No Button */}
                <button
                  onClick={() => handleRsvpClick('no')}
                  className={`flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    rsvpStatus === 'no' 
                      ? 'bg-[#772f1a] text-white shadow-lg' 
                      : 'bg-[#f58549] text-white border border-[#f2a65a] hover:bg-[#772f1a] hover:text-white hover:shadow-lg'
                  }`}
                  style={{ fontFamily: '"Boston Angel", serif', fontWeight: 'bold', background: rsvpStatus === 'no' ? 'linear-gradient(90deg, #772f1a 0%, #f58549 100%)' : undefined }}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 mr-2" style={{ color: '#fff' }} />
                  No
                </button>
                {/* Maybe Button */}
                <button
                  onClick={() => handleRsvpClick('maybe')}
                  className={`flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    rsvpStatus === 'maybe' 
                      ? 'bg-[#eec170] text-white shadow-lg' 
                      : 'bg-[#f58549] text-white border border-[#f2a65a] hover:bg-[#eec170] hover:text-white hover:shadow-lg'
                  }`}
                  style={{ fontFamily: '"Boston Angel", serif', fontWeight: 'bold', background: rsvpStatus === 'maybe' ? 'linear-gradient(90deg, #eec170 0%, #f2a65a 100%)' : undefined }}
                >
                  <HelpCircle className="w-5 h-5 md:w-6 md:h-6 mr-2" style={{ color: '#fff' }} />
                  Maybe
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                <div className="text-center mb-6">
                  <p className="font-semibold text-lg md:text-3xl" style={{ fontFamily: '"Boston Angel", serif' }}>
                    {getFormTitle()}
                  </p>
                  <p className="mt-2 text-base md:text-2xl" style={{ color: '#fff', fontFamily: '"Boston Angel", serif' }}>
                    {getFormSubtitle()}
                  </p>
                </div>
                {submitError && (
                  <div className="bg-red-400/10 border border-red-400/50 rounded-lg p-4 mb-6">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}
                {/* Form Fields - use light backgrounds and soft borders */}
                <div>
                  <label htmlFor="fullName" className="block text-lg md:text-2xl font-medium mb-2" style={{ color: 'rgb(255, 255, 255)', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border text-lg md:text-2xl"
                    style={{
                      background: '#FFEFCB',
                      borderColor: '#E5DED4',
                      color: '#222',
                      fontFamily: '"Boston Angel", serif',
                      fontWeight: 'bold'
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
                {rsvpStatus === 'yes' && (
                  <>
                    <div>
                      <label htmlFor="telegramUsername" className="block text-lg md:text-2xl font-medium mb-2" style={{ color: '#fff', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}>
                        Telegram Username
                      </label>
                      <input
                        type="text"
                        id="telegramUsername"
                        name="telegramUsername"
                        value={formData.telegramUsername}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border text-lg md:text-2xl"
                        style={{
                          background: '#FFEFCB',
                          borderColor: '#E5DED4',
                          color: '#222',
                          fontFamily: '"Boston Angel", serif',
                          fontWeight: 'bold'
                        }}
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-lg md:text-2xl font-medium mb-2" style={{ color: '#fff', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border text-lg md:text-2xl"
                        style={{
                          background: '#FFEFCB',
                          borderColor: '#E5DED4',
                          color: '#222',
                          fontFamily: '"Boston Angel", serif',
                          fontWeight: 'bold'
                        }}
                        placeholder="91234567"
                      />
                    </div>
                    <div>
                      <label htmlFor="dietaryRestrictions" className="block text-lg md:text-2xl font-medium mb-2" style={{ color: '#fff', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}>
                        Dietary Restrictions
                      </label>
                      <textarea
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleInputChange}
                        rows={3}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border resize-none text-lg md:text-2xl"
                        style={{
                          background: '#FFEFCB',
                          borderColor: '#E5DED4',
                          color: '#222',
                          fontFamily: '"Boston Angel", serif',
                          fontWeight: 'bold'
                        }}
                        placeholder="Please let us know about any dietary restrictions or allergies"
                      />
                    </div>
                  </>
                )}
                {(rsvpStatus === 'no' || rsvpStatus === 'maybe') && (
                  <div>
                    <label htmlFor="note" className="block text-lg md:text-2xl font-medium mb-2" style={{ color: '#fff', fontFamily: '"Boston Angel", serif', fontWeight: 'bold' }}>
                      {rsvpStatus === 'no' ? 'Message (Optional)' : 'Note (Optional)'}
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={3}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border resize-none text-lg md:text-2xl"
                      style={{
                        background: '#FFEFCB',
                        borderColor: '#E5DED4',
                        color: '#222',
                        fontFamily: '"Boston Angel", serif',
                        fontWeight: 'bold'
                      }}
                      placeholder={
                        rsvpStatus === 'no' 
                          ? "We'd love to hear from you! Share any thoughts or well wishes..."
                          : "Let us know your thoughts or any updates about your attendance..."
                      }
                    />
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 rounded-lg font-semibold text-base md:text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: '#E5DED4',
                      color: '#7C6F57',
                      fontFamily: '"Boston Angel", serif',
                      fontSize: '1.25rem'
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base md:text-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    style={{
                      background: '#f58549',
                      color: 'rgb(255, 255, 255)',
                      fontFamily: '"Boston Angel", serif',
                      fontSize: '1.25rem'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-[#C9B18F] border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit RSVP
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div
            className="rounded-2xl p-6 md:p-8 border text-center"
            style={{
              background: '#eec170',
              borderColor: '#f2a65a',
              boxShadow: '0 6px 24px 0 rgba(242,166,90,0.10)',
              opacity: 0.85
            }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              rsvpStatus === 'yes' ? 'bg-[#f2a65a]' :
              rsvpStatus === 'no' ? 'bg-[#772f1a]' : 'bg-[#f58549]'
            }`}>
              {rsvpStatus === 'yes' && <Check className="w-8 h-8 text-white" />}
              {rsvpStatus === 'no' && <X className="w-8 h-8 text-white" />}
              {rsvpStatus === 'maybe' && <HelpCircle className="w-8 h-8 text-white" />}
            </div>
            <h2
              className="text-xl md:text-3xl font-semibold mb-4"
              style={{
                color: '#585123',
                fontFamily: '"Cormorant Garamond", serif'
              }}
            >
              Thank you for your RSVP!
            </h2>
            <p
              className="mb-6"
              style={{
                color: '#772f1a',
                fontFamily: '"Nunito", sans-serif'
              }}
            >
              {rsvpStatus === 'yes' && "We're so excited to celebrate with you on our special day!"}
              {rsvpStatus === 'no' && "We understand and appreciate you letting us know. You'll be missed!"}
              {rsvpStatus === 'maybe' && "We hope you'll be able to join us! Please let us know as soon as you can."}
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #f2a65a 0%, #f58549 100%)',
                color: '#fff',
                fontFamily: '"Nunito", sans-serif'
              }}
            >
              Update RSVP
            </button>
          </div>
        )}


        {/* Footer */}
        <footer className="text-center mt-8 md:mt-12 text-gray-400">
          <p 
            className="text-1xl md:text-2xl xl:text-3xl text-center mb-8 md:mb-12"
            style={{
              color: 'black',
              fontFamily: '"Boston Angel", serif'
            }}
          >
            Can't wait to celebrate with you! 💕
          </p>
        </footer>
      </div>
    </div>
  );
}

export default WeddingRSVP;