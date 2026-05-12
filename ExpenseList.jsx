import React from 'react'

export default function ExpenseList({ expenses }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4 border-b pb-2">سجل العمليات</h3>
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center">لا توجد مصاريف مضافة بعد.</p>
        ) : (
          expenses.map((ex) => (
            <div key={ex.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border-r-4 border-blue-500">
              <div>
                <p className="font-bold text-gray-800">{ex.description || 'بدون وصف'}</p>
                <p className="text-[10px] text-gray-400">{new Date(ex.expense_date).toLocaleDateString('ar-SA')}</p>
              </div>
              <div className="text-left">
                <p className="text-red-600 font-bold">{ex.amount} ريال</p>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">{ex.category}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}