import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function AddExpense() {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('عام')
  const navigate = useNavigate()

  const handleSave = async (e) => {
    e.preventDefault()
    
    // الحصول على بيانات المستخدم الحالي
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("يجب تسجيل الدخول أولاً")
      return
    }

    // إرسال البيانات لجدول expenses في Supabase
    const { error } = await supabase.from('expenses').insert({
      user_id: user.id,
      amount: parseFloat(amount),
      description: description,
      category: category,
      expense_date: new Date().toISOString()
    })

    if (!error) {
      navigate('/') // العودة للرئيسية بعد الحفظ
    } else {
      console.error(error)
      alert("فشل الحفظ: " + error.message)
    }
  }

  return (
    <div dir="rtl" className="p-6 max-w-md mx-auto min-h-screen bg-white">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/')} className="text-blue-600 ml-4">رجوع</button>
        <h2 className="text-xl font-bold">إضافة مصروف</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-600 mb-2">المبلغ (ريال)</label>
          <input 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl text-2xl font-bold focus:ring-2 focus:ring-blue-500" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={amount} 
            onChange={e => setAmount(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">الوصف</label>
          <input 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl" 
            type="text" 
            placeholder="مثلاً: غداء عمل، بنزين.." 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">التصنيف</label>
          <select 
            className="w-full p-4 bg-gray-50 border-none rounded-2xl appearance-none" 
            value={category} 
            onChange={e => setCategory(e.target.value)}
          >
            <option>طعام</option>
            <option>مواصلات</option>
            <option>تسوق</option>
            <option>فواتير</option>
            <option>عام</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
          حفظ العملية
        </button>
      </form>
    </div>
  )
}