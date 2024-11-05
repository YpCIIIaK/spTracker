import { useExpense } from '../context/ExpenseContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function Analytics() {
  const { state } = useExpense()

  const currentMonth = new Date()
  const monthInterval = {
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  }

  const dailyExpenses = eachDayOfInterval(monthInterval).map(date => {
    const dayExpenses = state.expenses
      .filter(expense => new Date(expense.date).toDateString() === date.toDateString())
      .reduce((sum, expense) => sum + expense.amount, 0)

    return {
      date: format(date, 'dd MMM', { locale: ru }),
      amount: dayExpenses
    }
  })

  const categoryTotals = state.categories.map(category => ({
    name: category.name,
    amount: state.expenses
      .filter(expense => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0),
    color: category.color
  })).sort((a, b) => b.amount - a.amount)

  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Расходы по дням</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Расходы по категориям</h2>
        <div className="space-y-4">
          {categoryTotals.map(category => (
            <div key={category.name} className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full" style={{ backgroundColor: category.color, color: 'white' }}>
                    {category.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block">
                    {category.amount} ₽
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{
                    width: `${(category.amount / Math.max(...categoryTotals.map(c => c.amount))) * 100}%`,
                    backgroundColor: category.color
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}