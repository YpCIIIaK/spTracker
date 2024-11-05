import { useState } from 'react'
import { useExpense } from '../context/ExpenseContext'
import ExpenseForm from '../components/ExpenseForm'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function Expenses() {
  const { state, dispatch } = useExpense()
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredExpenses = state.expenses
    .filter(expense => {
      const matchesCategory = filterCategory === 'all' || expense.category === parseInt(filterCategory)
      const matchesSearch = expense.title.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1
      if (sortBy === 'date') {
        return (new Date(b.date) - new Date(a.date)) * order
      } else if (sortBy === 'amount') {
        return (b.amount - a.amount) * order
      }
      return 0
    })

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const getCategoryById = (id) => {
    return state.categories.find(cat => cat.id === id)
  }

  return (
    <div className="space-y-8">
      <ExpenseForm />
      
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Список расходов</h2>
          <p className="text-lg font-medium text-primary">
            Итого: {totalAmount} ₽
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Поиск
            </label>
            <input
              type="text"
              className="input"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Категория
            </label>
            <select
              className="input"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Все категории</option>
              {state.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Сортировка
            </label>
            <div className="flex space-x-2">
              <select
                className="input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">По дате</option>
                <option value="amount">По сумме</option>
              </select>
              <button
                className="btn btn-secondary"
                onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Нет расходов</p>
          ) : (
            filteredExpenses.map(expense => {
              const category = getCategoryById(expense.category)
              return (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div>
                      <h3 className="font-medium">{expense.title}</h3>
                      <p className="text-sm text-gray-500">
                        {category.name} • {format(new Date(expense.date), 'dd MMMM yyyy', { locale: ru })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{expense.amount} ₽</span>
                    <button
                      onClick={() => dispatch({ type: 'DELETE_EXPENSE', payload: expense.id })}
                      className="text-red-500 hover:text-red-600"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}