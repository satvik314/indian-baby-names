'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Baby, Sun, Moon, Heart } from 'lucide-react'

// Define a type for the preferences
type Preferences = {
  startingLetter: string;
  fatherName: string;
  motherName: string;
  motherTongue: string;
  gender: string;
  desiredMeaning: string;
}

type NameSuggestion = {
  name: string;
  meaning: string;
};

const generateNameSuggestions = async (preferences: Preferences, previousNames: NameSuggestion[] = [], feedback: string = '') => {
  const response = await fetch('/api/generate-names', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ preferences, previousNames, feedback }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate names');
  }

  const data = await response.json();
  console.log('Generated names:', data.names);
  return data.names as NameSuggestion[];
};

export function CreativeBabyNameFinderComponent() {
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState({
    startingLetter: '',
    fatherName: '',
    motherName: '',
    motherTongue: '',
    gender: '',
    desiredMeaning: ''
  })
  const [suggestedNames, setSuggestedNames] = useState<NameSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string, name: string) => {
    setPreferences({ ...preferences, [name]: value })
  }

  const nextStep = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      try {
        const names = await generateNameSuggestions(preferences);
        console.log('Received names:', names);
        if (names.length === 0) {
          throw new Error('No names were generated');
        }
        setSuggestedNames(names);
      } catch (error) {
        console.error('Error generating names:', error);
        alert('Sorry, we couldn\'t generate names at this time. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const generateMore = async () => {
    setIsLoading(true);
    try {
      const newNames = await generateNameSuggestions(preferences, suggestedNames, feedback);
      setSuggestedNames([...suggestedNames, ...newNames]);
      setFeedback(''); // Clear feedback after generating new names
    } catch (error) {
      console.error('Error generating more names:', error);
      alert('Sorry, we couldn\'t generate more names at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add this new function to determine the background color
  const getBackgroundColor = (value: string) => {
    if (preferences.gender === value) {
      return value === 'male' ? 'bg-blue-300' : 'bg-pink-300';
    }
    return value === 'male' ? 'bg-blue-100' : 'bg-pink-100';
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-4"
          >
            <Label htmlFor="gender" className="text-2xl font-bold text-purple-700">Is your little star a...</Label>
            <RadioGroup 
              onValueChange={(value) => handleSelectChange(value, 'gender')}
              className="flex space-x-4 justify-center"
            >
              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem value="male" id="male" className="sr-only" />
                <Label htmlFor="male" className="cursor-pointer flex flex-col items-center">
                  <div className={`${getBackgroundColor('male')} hover:bg-blue-200 text-blue-500 rounded-full p-4 transition-colors duration-200`}>
                    <Sun className="w-16 h-16" />
                  </div>
                  <span className="text-blue-600 font-medium mt-2">Little Prince</span>
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem value="female" id="female" className="sr-only" />
                <Label htmlFor="female" className="cursor-pointer flex flex-col items-center">
                  <div className={`${getBackgroundColor('female')} hover:bg-pink-200 text-pink-500 rounded-full p-4 transition-colors duration-200`}>
                    <Moon className="w-16 h-16" />
                  </div>
                  <span className="text-pink-600 font-medium mt-2">Little Princess</span>
                </Label>
              </div>
            </RadioGroup>
          </motion.div>
        )
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="space-y-4"
          >
            <Label htmlFor="startingLetter" className="text-2xl font-bold text-purple-700">
              Any special first letter in mind?
            </Label>
            <Input
              id="startingLetter"
              name="startingLetter"
              value={preferences.startingLetter}
              onChange={handleInputChange}
              maxLength={1}
              className="text-center text-4xl h-20 w-20 mx-auto border-4 border-purple-300 focus:border-purple-500 rounded-full"
            />
            <p className="text-center text-gray-600">Leave empty if you&apos;re open to any letter</p>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="space-y-4"
          >
            <Label htmlFor="motherTongue" className="text-2xl font-bold text-purple-700">
              Which language sings in your family?
            </Label>
            <Input
              id="motherTongue"
              name="motherTongue"
              value={preferences.motherTongue}
              onChange={handleInputChange}
              className="text-center text-xl max-w-xs mx-auto border-2 border-purple-300 focus:border-purple-500"
              placeholder="Enter your mother tongue"
            />
            <p className="text-center text-gray-600">E.g., Hindi, Tamil, Bengali, or any other language</p>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 10 }}
            className="space-y-4"
          >
            <Label htmlFor="fatherName" className="text-2xl font-bold text-purple-700">
              What&apos;s daddy&apos;s name?
            </Label>
            <Input
              id="fatherName"
              name="fatherName"
              value={preferences.fatherName}
              onChange={handleInputChange}
              className="text-center text-2xl max-w-xs mx-auto border-2 border-purple-300 focus:border-purple-500"
              placeholder="Enter father's name"
            />
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, rotate: 10 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -10 }}
            className="space-y-4"
          >
            <Label htmlFor="motherName" className="text-2xl font-bold text-purple-700">
              And mommy&apos;s name?
            </Label>
            <Input
              id="motherName"
              name="motherName"
              value={preferences.motherName}
              onChange={handleInputChange}
              className="text-center text-2xl max-w-xs mx-auto border-2 border-purple-300 focus:border-purple-500"
              placeholder="Enter mother's name"
            />
          </motion.div>
        )
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="space-y-4"
          >
            <Label htmlFor="desiredMeaning" className="text-2xl font-bold text-purple-700">
              Any special meaning you&apos;re looking for?
            </Label>
            <Input
              id="desiredMeaning"
              name="desiredMeaning"
              value={preferences.desiredMeaning}
              onChange={handleInputChange}
              className="text-center text-xl max-w-xs mx-auto border-2 border-purple-300 focus:border-purple-500"
              placeholder="e.g., strength, love, wisdom"
            />
            <p className="text-center text-gray-600">Optional, but might inspire some magical names!</p>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8">
        {suggestedNames.length === 0 ? (
          <>
            {renderStep()}
            <div className="flex justify-between mt-8">
              <Button onClick={prevStep} disabled={step === 0} variant="outline">
                Back
              </Button>
              <Button 
                onClick={nextStep} 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : (step === 5 ? "Find Magic Names" : "Next")}
              </Button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4">
              {suggestedNames.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg shadow-md flex items-center justify-between ${
                    preferences.gender === 'male' ? 'bg-blue-100' : 'bg-pink-100'
                  }`}
                >
                  <div>
                    <span className={`text-2xl font-medium ${
                      preferences.gender === 'male' ? 'text-blue-700' : 'text-pink-700'
                    }`}>
                      {suggestion.name}
                    </span>
                    <p className="text-sm text-gray-600">{suggestion.meaning}</p>
                  </div>
                  <Heart className={`w-6 h-6 ${
                    preferences.gender === 'male' ? 'text-blue-500' : 'text-pink-500'
                  }`} />
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              <Label htmlFor="feedback" className="text-lg font-medium text-purple-700">
                Any feedback on these names? (Optional)
              </Label>
              <Input
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="E.g., I like shorter names, or names starting with 'A'"
                className="w-full border-2 border-purple-300 focus:border-purple-500"
              />
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={generateMore} 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate More"}
              </Button>
              <Button 
                onClick={() => {setStep(0); setSuggestedNames([]); setFeedback('');}} 
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600"
              >
                Start Over
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}