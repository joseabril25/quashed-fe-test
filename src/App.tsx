import { useState } from 'react'
import './App.css'
import { Input } from './components/ui/Input'
import { Button } from './components/ui/Button'
import { Chip } from './components/ui/Chip'

function App() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Components</h1>
        
        {/* Input Component Examples */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Input Component</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Input</label>
              <Input placeholder="Enter value" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Input with Value</label>
              <Input 
                placeholder="Enter value" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Error State</label>
              <Input 
                placeholder="Enter value" 
                error
                errorMessage="This field is required"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Disabled Input</label>
              <Input placeholder="Enter value" disabled />
            </div>
          </div>
        </div>

        {/* Button Component Examples */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Button Component</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <Button>Primary</Button>
              <Button disabled>Disabled</Button>
            </div>

            <div className='flex gap-4 items-center'>
              <Button variant="tertiary">Tertiary</Button>
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
