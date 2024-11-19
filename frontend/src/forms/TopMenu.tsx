import { Link, useLocation } from "react-router-dom";

export default function TopMenu() {
  const navigation = [
    { name: "Info", href: "/" },
    { name: "Characteristics", href: "/characteristics" },
    { name: "Skills", href: "/skills" },
    { name: "Weapons", href: "/weapons" },
    { name: "Possessions", href: "/possessions" },
    { name: "Background", href: "/background" },
    { name: "Save", href: "/save" },
  ];

  const location = useLocation();

  return (
    <header className="border-b border-white/5">
      <nav className="flex overflow-x-auto py-4">
        <ul
          role="list"
          className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold sm:px-6 lg:px-8"
        >
          {navigation.map(item => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={
                  location.pathname === item.href
                    ? "text-cthulhu-highlight"
                    : "hover:text-cthulhu-highlight"
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
