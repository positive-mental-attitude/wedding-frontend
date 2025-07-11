import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface PartyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  telegram: string;
  phoneNumber: string;
}

const PartyForm: React.FC<PartyFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    telegram: '',
    phoneNumber: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Transform camelCase to snake_case for API compatibility
      const apiData = {
        name: formData.name,
        telegram: formData.telegram,
        phone_number: formData.phoneNumber
      };

      console.log('Sending Afterparty RSVP data:', apiData);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Afterparty RSVP submitted successfully:', result);
      
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          name: '',
          telegram: '',
          phoneNumber: ''
        });
        setSubmitError(null);
      }, 2000);
    } catch (error) {
      console.error('Error submitting Afterparty RSVP:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1F2347] border-4 border-[#FF8936] rounded-lg p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto pixel-border relative">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-[#FF8936] pixel-text pixel-text-medium leading-tight">
            Join the<br />Afterparty!
          </h2>
          <button
            onClick={onClose}
            className="text-[#FF8936] hover:text-[#FFD9B3] transition-colors absolute top-4 right-4"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-[#FFD9B3] pixel-text pixel-text-small mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-[#251E3E] border-2 border-[#FF8936] rounded text-[#FFD9B3] pixel-form-input focus:outline-none focus:border-[#FFD9B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Full name"
              />
            </div>

            <div>
              <label htmlFor="telegram" className="block text-[#FFD9B3] pixel-text pixel-text-small mb-2">
                Telegram
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                value={formData.telegram}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-[#251E3E] border-2 border-[#FF8936] rounded text-[#FFD9B3] pixel-form-input focus:outline-none focus:border-[#FFD9B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="@username"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-[#FFD9B3] pixel-text pixel-text-small mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 bg-[#251E3E] border-2 border-[#FF8936] rounded text-[#FFD9B3] pixel-form-input focus:outline-none focus:border-[#FFD9B3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="91234567"
              />
            </div>

            {submitError && (
              <p className="text-red-500 text-sm text-center">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-4 py-3 bg-[#FF8936] hover:bg-[#FFD9B3] text-[#1F2347] rounded pixel-text pixel-text-small transition-all duration-200 transform hover:scale-105 border-2 border-[#1F2347] mt-6"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-[#FF8936] rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-6 h-6 text-[#1F2347]" />
            </div>
            <h3 className="text-[#FF8936] pixel-text pixel-text-medium mb-3 leading-tight">
              You're In!
            </h3>
            <p className="text-[#FFD9B3] pixel-text pixel-text-small leading-relaxed">
              BU ZUI BU GUI
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartyForm;