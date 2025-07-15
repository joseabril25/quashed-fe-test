import { useState } from 'react'
import './App.css'
import { Input } from './components/ui/Input'
import { Button } from './components/ui/Button'

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
            
            <div>
              <p className="text-sm text-gray-600 mt-2">
                Hover over buttons to see hover state, click to see pressed state
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
