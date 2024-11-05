import { useExpense } from '../context/ExpenseContext'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

export default function Dashboard() {
  const { state } = useExpense()

  const expensesByCategory = state.categories.map(category => ({
    name: category.name,
    value: state.expenses
      .filter(expense => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
    color: category.color
  })).filter(item => item.value > 0)

  const totalExpenses = expensesByCategory.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <ExpenseForm />
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Общая статистика</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Всего расходов</p>
                <p className="text-2xl font-bold">{totalExpenses} ₽</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Количество транзакций</p>
                <p className="text-2xl font-bold">{state.expenses.length}</p>
              </div>
            </div>
            {expensesByCategory.length > 0 && (
              <div className="mt-8 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => 
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
      <ExpenseList />
    </div>
  )
}