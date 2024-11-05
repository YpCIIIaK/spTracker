import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'

export default function ExpenseForm() {
  const { state, dispatch } = useExpense()
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: state.categories[0].id,
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_EXPENSE',
      payload: {
        ...formData,
        amount: Number(formData.amount)
      }
    })
    setFormData({
      title: '',
      amount: '',
      category: state.categories[0].id,
      date: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-xl font-semibold mb-4">Добавить расход</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название
          </label>
          <input
            type="text"
            required
            className="input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Сумма
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="input"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <select
            className="input"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: Number(e.target.value) })}
          >
            {state.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Дата
          </label>
          <input
            type="date"
            required
            className="input"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Добавить
        </button>
      </div>
    </form>
  )
}