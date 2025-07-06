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
        return "Wonderful! We can't wait to celebrate with you.";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white overflow-hidden">
      <FloatingHearts />
      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <div className="flex justify-center items-center mb-6">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 mr-3" />
            <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              Paul and Jazreel's Wedding
            </h1>
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 ml-3" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 mx-auto rounded-full"></div>
        </header>

        {/* Featured Wedding Photo with GridMotion - Much Larger on Mobile */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="relative group w-full max-w-6xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-gray-900 rounded-2xl p-2">
              <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl shadow-2xl overflow-hidden">
                <GridMotion items={gridItems} />
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Details */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 md:mb-12 border border-gray-700/50">
          <h2 className="text-xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-100">
            Join us for our special day
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center p-4 md:p-6 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-emerald-400/50 transition-all duration-300">
              <Calendar className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 mb-3" />
              <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-200">Date</h3>
              <p className="text-sm md:text-base text-gray-300">27 September 2025</p>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-emerald-400/50 transition-all duration-300">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 mb-3" />
              <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-200">Venue</h3>
              <p className="text-sm md:text-base text-gray-300">Parkroyal Collection Marina Bay</p>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 bg-gray-700/40 rounded-xl border border-gray-600/30 hover:border-emerald-400/50 transition-all duration-300">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 mb-3" />
              <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-200">Time</h3>
              <p className="text-sm md:text-base text-gray-300">6:30 PM</p>
            </div>
          </div>
        </div>

        {/* RSVP Section */}
        {!isSubmitted ? (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50">
            <h2 className="text-xl md:text-3xl font-semibold text-center mb-6 md:mb-8 text-gray-100">
              Will you be joining us?
            </h2>
            
            {!showForm ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => handleRsvpClick('yes')}
                  className={`flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    rsvpStatus === 'yes' 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-gray-700 text-gray-200 hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/25'
                  }`}
                >
                  <Check className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Yes
                </button>
                
                <button
                  onClick={() => handleRsvpClick('no')}
                  className={`flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    rsvpStatus === 'no' 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                      : 'bg-gray-700 text-gray-200 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/25'
                  }`}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  No
                </button>
                
                <button
                  onClick={() => handleRsvpClick('maybe')}
                  className={`flex items-center px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    rsvpStatus === 'maybe' 
                      ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/25' 
                      : 'bg-gray-700 text-gray-200 hover:bg-yellow-500 hover:text-white hover:shadow-lg hover:shadow-yellow-500/25'
                  }`}
                >
                  <HelpCircle className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Maybe
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                <div className="text-center mb-6">
                  <p className={`font-semibold text-lg ${
                    rsvpStatus === 'yes' ? 'text-green-400' : 
                    rsvpStatus === 'no' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {getFormTitle()}
                  </p>
                  <p className="text-gray-300 mt-2">{getFormSubtitle()}</p>
                </div>

                {submitError && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
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
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>

                {rsvpStatus === 'yes' && (
                  <>
                    <div>
                      <label htmlFor="telegramUsername" className="block text-sm font-medium text-gray-300 mb-2">
                        Telegram Username
                      </label>
                      <input
                        type="text"
                        id="telegramUsername"
                        name="telegramUsername"
                        value={formData.telegramUsername}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="@username"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
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
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="91234567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-300 mb-2">
                        Dietary Restrictions
                      </label>
                      <textarea
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleInputChange}
                        rows={3}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Please let us know about any dietary restrictions or allergies"
                      />
                    </div>
                  </>
                )}

                {(rsvpStatus === 'no' || rsvpStatus === 'maybe') && (
                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">
                      {rsvpStatus === 'no' ? 'Message (Optional)' : 'Note (Optional)'}
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={3}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:via-cyan-600 hover:to-violet-600 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              rsvpStatus === 'yes' ? 'bg-green-500' :
              rsvpStatus === 'no' ? 'bg-red-500' : 'bg-yellow-500'
            }`}>
              {rsvpStatus === 'yes' && <Check className="w-8 h-8 text-white" />}
              {rsvpStatus === 'no' && <X className="w-8 h-8 text-white" />}
              {rsvpStatus === 'maybe' && <HelpCircle className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-xl md:text-3xl font-semibold mb-4 text-gray-100">
              Thank you for your RSVP!
            </h2>
            <p className="text-gray-300 mb-6">
              {rsvpStatus === 'yes' && "We're so excited to celebrate with you on our special day!"}
              {rsvpStatus === 'no' && "We understand and appreciate you letting us know. You'll be missed!"}
              {rsvpStatus === 'maybe' && "We hope you'll be able to join us! Please let us know as soon as you can."}
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:via-cyan-600 hover:to-violet-600 transition-all duration-200 transform hover:scale-105"
            >
              Update RSVP
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-8 md:mt-12 text-gray-400">
          <p className="text-sm">
            Can't wait to celebrate with you! 💕
          </p>
        </footer>
      </div>
    </div>
  );
}

export default WeddingRSVP;