import { useExpense } from '../context/ExpenseContext'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function ExpenseList() {
  const { state, dispatch } = useExpense()

  const getCategoryById = (id) => {
    return state.categories.find(cat => cat.id === id)
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Последние расходы</h2>
      <div className="space-y-4">
        {state.expenses.length === 0 ? (
          <p className="text-gray-500 text-center">Нет расходов</p>
        ) : (
          state.expenses.map(expense => {
            const category = getCategoryById(expense.category)
            return (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
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
  )
}