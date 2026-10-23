import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Image from "next/image";
import logo from "@/public/img/logo.png";
import vivendi from "@/public/img/vivendi.jpg";
import { AvatarGroup } from "../Avatar/AvatarGroup";
import { Badge } from "../Badge/Badge";
import { ButtonLink } from "../Button/Button";
import { IconButton } from "../Button/IconButton";
import { NavPills } from "./NavPills";
import { SiteHeader } from "./SiteHeader";

const people = [
  { name: "Ana", src: vivendi },
  { name: "Bruno", src: vivendi },
  { name: "Carla", src: vivendi },
];

function Globe() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z" />
    </svg>
  );
}

type Props = { items: string[] };

function Header({ items }: Props) {
  return (
    <SiteHeader.Root>
      <SiteHeader.Brand href="#home">
        <Image src={logo} alt="" width={32} height={32} />
        eFood
      </SiteHeader.Brand>
      <NavPills.Root label="Principal">
        {items.map((item, index) => (
          <NavPills.Item key={item} href={`#${index}`} current={index === 0}>
            {item}
          </NavPills.Item>
        ))}
      </NavPills.Root>
      <SiteHeader.Actions>
        <AvatarGroup people={people} size="sm" />
        <Badge tone="gray">+90 avaliações</Badge>
        <IconButton label="Mudar idioma">
          <Globe />
        </IconButton>
        <ButtonLink href="#contact" variant="dark">
          Fale com a gente
        </ButtonLink>
      </SiteHeader.Actions>
    </SiteHeader.Root>
  );
}

const meta = {
  title: "Componentes/Cabeçalho",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = ["Início", "Sobre nós", "Restaurantes", "Parceiros"];

export const Default: Story = { args: { items: defaultItems } };

export const Mobile: Story = {
  args: { items: defaultItems },
  globals: { viewport: { value: "mobile320", isRotated: false } },
};

export const TextoLongo: Story = {
  args: { items: ["Início", "Sobre nós", "Restaurantes ecológicos", "Seja um parceiro"] },
};
