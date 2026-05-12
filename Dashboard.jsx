import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import ExpenseList from '../components/ExpenseList'

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchExpenses = async () => {
      // جلب البيانات من جدول expenses في سوبابيس
      const { data } = await supabase
        .from('expenses')
        .select('*')
        .order('expense_date', { ascending: false })
      
      if (data) {
        setExpenses(data)
        // حساب المجموع الكلي
        const sum = data.reduce((acc, curr) => acc + curr.amount, 0)
        setTotal(sum)
      }
    }
    fetchExpenses()
  }, [])

  return (
    <div dir="rtl" className="p-4 max-w-md mx-auto min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">مصاريفي</h1>
        <button 
          onClick={() => supabase.auth.signOut()} 
          className="text-red-500 text-sm font-medium"
        >
          خروج
        </button>
      </div>

      {/* بطاقة الرصيد الإجمالي */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl mb-6 shadow-blue-200 shadow-lg text-center">
        <p className="text-blue-100 mb-1">إجمالي المصروفات</p>
        <h2 className="text-4xl font-bold">{total} <span className="text-lg font-normal">ريال</span></h2>
      </div>

      {/* زر الانتقال لصفحة الإضافة */}
      <Link 
        to="/add" 
        className="block text-center bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold mb-8 transition-colors shadow-md"
      >
        + إضافة عملية جديدة
      </Link>

      {/* عرض القائمة باستخدام المكون الذي أنشأناه سابقاً */}
      <ExpenseList expenses={expenses} />
    </div>
  )
}