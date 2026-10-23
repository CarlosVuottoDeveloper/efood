type Link = { href: string; label: string };

const links: Link[] = [
  { href: "#home", label: "eFood" },
  { href: "#about-us", label: "Sobre Nós" },
  { href: "#eco-restaurants", label: "Restaurantes Ecológicos" },
  { href: "#partners", label: "Parceiros" },
];

export default function TopNav() {
  return (
    <nav className="topnav">
      {links.map((link, i) => (
        <a key={link.href} href={link.href} className={i === 0 ? "active" : undefined}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
