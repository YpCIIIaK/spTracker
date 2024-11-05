import { createContext, useContext, useReducer } from 'react'

const ExpenseContext = createContext()

const initialState = {
  expenses: [],
  categories: [
    { id: 1, name: 'Продукты', color: '#EF4444' },
    { id: 2, name: 'Транспорт', color: '#3B82F6' },
    { id: 3, name: 'Развлечения', color: '#10B981' },
    { id: 4, name: 'Счета', color: '#F59E0B' },
  ]
}

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload, id: Date.now() }]
      }
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      }
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, { ...action.payload, id: Date.now() }]
      }
    default:
      return state
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState)

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export function useExpense() {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider')
  }
  return context
}