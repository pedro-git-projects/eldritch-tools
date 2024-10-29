export default function TopMenu() {
  const navigation = [
    { name: 'Info', href: '#', current: true },
    { name: 'Characteristics', href: '#', current: false },
    { name: 'Skills', href: '#', current: false },
    { name: 'Weapons', href: '#', current: false },
    { name: 'Background', href: '#', current: false },
  ]

  return (
    <header className="border-b border-white/5">
      <nav className="flex overflow-x-auto py-4">
        <ul
          role="list"
          className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
        >
          {navigation.map((item) => (
            <li key={item.name}>
              <a href={item.href} className={item.current ? 'text-indigo-400' : ''}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
