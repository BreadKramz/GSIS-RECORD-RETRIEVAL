import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { supabase } from './lib/supabaseClient.js'

async function testSupabaseConnection() {
  try {
    const { error } = await supabase.auth.getSession()

    if (error) {
      console.error('❌ Supabase connection failed:', error.message)
      return
    }

    console.log('✅ Supabase connection successful')
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
  }
}

testSupabaseConnection()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
