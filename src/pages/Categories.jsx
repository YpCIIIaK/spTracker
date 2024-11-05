import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'

export default function Categories() {
  const { state, dispatch } = useExpense()
  const [newCategory, setNewCategory] = useState({ name: '', color: '#000000' })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'ADD_CATEGORY',
      payload: newCategory
    })
    setNewCategory({ name: '', color: '#000000' })
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Добавить категорию</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Название
            </label>
            <input
              type="text"
              required
              className="input"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Цвет
            </label>
            <input
              type="color"
              required
              className="h-10 w-full"
              value={newCategory.color}
              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Добавить категорию
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Категории расходов</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.categories.map(category => (
            <div
              key={category.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}