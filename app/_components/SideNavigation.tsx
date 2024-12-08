import { ArrowUpCircleIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/solid";

const navLinks = [
  {
    name: "Upload",
    href: "/account/upload",
    icon: <ArrowUpCircleIcon className="h-5 w-5 text-primary-900" />,
  },
  {
    name: "My News",
    href: "/account/news",
    icon: <EnvelopeIcon className="h-5 w-5 text-primary-900" />,
  },
  {
    name: "User profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-900" />,
  },
];

function SideNavigation() {
  return (
    <nav className="border-r border-primary-400">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              className={`py-3 px-5 hover:bg-primary-400 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-900`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNavigation;
