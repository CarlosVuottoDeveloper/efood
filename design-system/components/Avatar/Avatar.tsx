import Image, { type StaticImageData } from "next/image";
import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import styles from "./Avatar.module.css";

export type Person = { name: string; src?: string | StaticImageData };
export type AvatarSize = "sm" | "md";

export type AvatarProps = ComponentProps<"span"> & { person: Person; size?: AvatarSize };

const PIXELS: Record<AvatarSize, number> = { sm: 32, md: 40 };

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function Avatar({ person, size = "md", className, ...rest }: AvatarProps) {
  const px = PIXELS[size];
  const common = { ...rest, "data-size": size, className: cx(styles.avatar, className) };

  if (person.src) {
    return (
      <span {...common}>
        <Image className={styles.image} src={person.src} alt={person.name} width={px} height={px} />
      </span>
    );
  }

  return (
    <span {...common} role="img" aria-label={person.name}>
      <span aria-hidden="true">{getInitials(person.name)}</span>
    </span>
  );
}
