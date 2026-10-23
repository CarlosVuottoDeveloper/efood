import Image from "next/image";
import logo from "@/public/img/logo.svg";
import { ButtonLink, NavPills, SiteHeader } from "@/design-system";

export function LandingHeader() {
  return (
    <SiteHeader.Root>
      <SiteHeader.Brand href="/">
        <Image src={logo} alt="" width={32} height={32} unoptimized priority />
        eFood
      </SiteHeader.Brand>
      <NavPills.Root label="Principal">
        <NavPills.Item href="#main" current>
          Início
        </NavPills.Item>
        <NavPills.Item href="#about-us">Sobre nós</NavPills.Item>
        <NavPills.Item href="#eco-restaurants">Restaurantes</NavPills.Item>
        <NavPills.Item href="#how-it-works">Como funciona</NavPills.Item>
      </NavPills.Root>
      <SiteHeader.Actions>
        <ButtonLink href="#partners" variant="dark">
          Quero ser parceiro
        </ButtonLink>
      </SiteHeader.Actions>
    </SiteHeader.Root>
  );
}
