import Image from "next/image";
import logo from "@/public/img/logo.png";

export default function Header() {
  return (
    <header id="home">
      <div id="divMain">
        <h1>eFood</h1>
        <Image className="logo" src={logo} alt="Logo eFood" priority />
      </div>
    </header>
  );
}
