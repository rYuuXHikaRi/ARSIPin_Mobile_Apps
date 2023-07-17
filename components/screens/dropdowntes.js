import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={{ marginTop: 100, alignItems: 'center' }}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text style={{ padding: 10, backgroundColor: 'lightgray' }}>
          {selectedOption !== '' ? selectedOption : 'Select an option'}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={{ marginTop: 10 }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleSelectOption(option)}
            >
              <Text style={{ padding: 10, backgroundColor: 'lightgray' }}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
