import { useState } from 'react'

import { Input } from './components/ui/Input'
import { Button } from './components/ui/Button'
import { Chip } from './components/ui/Chip'
import { Dropdown } from './components/ui/Dropdown'
import { TexAarea } from './components/ui/TextArea'
import { DatePicker } from './components/ui/DatePicker'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [dropdownValue, setDropdownValue] = useState('')
  const [dateValue, setDateValue] = useState<Date | null>(null)
  
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Components</h1>
        
        {/* Form Component Examples */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Form Components</h2>
          <div className="grid grid-cols-4 gap-6">
            {/* Input Examples */}
            <div>
              <h3 className="text-lg font-medium mb-4">Input Component</h3>
              <div className="space-y-4">
                <div>
                  <Input label="Default Input" placeholder="Enter value" />
                </div>
                
                <div>
                  <Input 
                    label="Input with Value"
                    placeholder="Enter value" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                
                <div>
                  <Input 
                    label="Error Input"
                    placeholder="Enter value" 
                    error
                    errorMessage="This field is required"
                  />
                </div>
                
                <div>
                  <Input label="Disabled Input" placeholder="Enter value" disabled />
                </div>
              </div>
            </div>

            {/* Textarea Examples */}
            <div>
              <h3 className="text-lg font-medium mb-4">Textarea Component</h3>
              <div className="space-y-4">
                <div>
                  <TexAarea label="Default Textarea" placeholder="Enter your message..." />
                </div>
                
                <div>
                  <TexAarea 
                    label="Textarea with Value"
                    placeholder="Enter your message..." 
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                </div>
                
                <div>
                  <TexAarea 
                    label="Error Textarea"
                    placeholder="Enter your message..." 
                    error
                    errorMessage="This field is required"
                  />
                </div>
                
                <div>
                  <TexAarea label="Disabled Textarea" placeholder="Enter your message..." disabled />
                </div>
              </div>
            </div>
            
            {/* Dropdown Examples */}
            <div>
              <h3 className="text-lg font-medium mb-4">Dropdown Component</h3>
              <div className="space-y-4">
                <div>
                  <Dropdown 
                    label="Default Dropdown"
                    options={dropdownOptions}
                    value={dropdownValue}
                    onChange={setDropdownValue}
                    placeholder="Select an option"
                  />
                </div>
                
                <div>
                  <Dropdown 
                    label="Error Dropdown"
                    options={dropdownOptions}
                    error
                    errorMessage="Please select an option"
                    placeholder="Select an option"
                  />
                </div>
                
                <div>
                  <Dropdown 
                    label="Disabled Dropdown"
                    options={dropdownOptions}
                    disabled
                    placeholder="Select an option"
                  />
                </div>
              </div>
            </div>
            
            {/* DatePicker Examples */}
            <div>
              <h3 className="text-lg font-medium mb-4">DatePicker Component</h3>
              <div className="space-y-4">
                <div>
                  <DatePicker 
                    label="Default DatePicker"
                    value={dateValue}
                    onChange={setDateValue}
                    placeholder="Select a date"
                  />
                </div>
                
                <div>
                  <DatePicker 
                    label="Error DatePicker"
                    error
                    errorMessage="Please select a date"
                    placeholder="Select a date"
                  />
                </div>
                
                <div>
                  <DatePicker 
                    label="Disabled DatePicker"
                    disabled
                    placeholder="Select a date"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Component Examples */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Button Component</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Button Sizes</h3>
              <div className="flex gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Button Variants</h3>
              <div className="flex gap-4 items-center">
                <Button>Primary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mt-2">
                Hover over buttons to see hover state, click to see pressed state
              </p>
            </div>
          </div>
        </div>

        {/* Chip Component Examples */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Chip Component</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Small Chips</h3>
              <div className="flex gap-2 items-center flex-wrap">
                <Chip label="Default" size="sm" />
                <Chip label="Selected" size="sm" variant="selected" />
                <Chip label="Warning" size="sm" variant="warning" />
                <Chip label="Disabled" size="sm" variant="disabled" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Large Chips</h3>
              <div className="flex gap-2 items-center flex-wrap">
                <Chip label="Default" size="lg" />
                <Chip label="Selected" size="lg" variant="selected" />
                <Chip label="Warning" size="lg" variant="warning" />
                <Chip label="Disabled" size="lg" variant="disabled" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
