import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAuth = async (type) => {
    const { error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    
    if (error) alert(error.message)
    else if (type === 'signup') alert("تم إنشاء الحساب! تفقد بريدك للتأكيد.")
  }

  return (
    <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">مدير المصاريف</h1>
        <input className="w-full p-4 border rounded-xl mb-3" type="email" placeholder="البريد الإلكتروني" onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-4 border rounded-xl mb-6" type="password" placeholder="كلمة المرور" onChange={e => setPassword(e.target.value)} />
        <button onClick={() => handleAuth('login')} className="w-full bg-blue-600 text-white p-4 rounded-xl mb-3 font-bold">دخول</button>
        <button onClick={() => handleAuth('signup')} className="w-full border border-blue-600 text-blue-600 p-4 rounded-xl font-bold">إنشاء حساب جديد</button>
      </div>
    </div>
  )
}