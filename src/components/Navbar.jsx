import { Link, useLocation } from 'react-router-dom'
import { RiDashboardLine, RiWalletLine, RiPieChartLine, RiPriceTag3Line } from 'react-icons/ri'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', name: 'Дашборд', icon: RiDashboardLine },
    { path: '/expenses', name: 'Расходы', icon: RiWalletLine },
    { path: '/categories', name: 'Категории', icon: RiPriceTag3Line },
    { path: '/analytics', name: 'Аналитика', icon: RiPieChartLine },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Трекер расходов
          </Link>
          <div className="flex space-x-4">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <link.icon className="mr-1.5" />
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}