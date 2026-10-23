import type { ComponentProps } from "react";
import { cx } from "../../utils/cx";
import { Badge } from "../Badge/Badge";
import { Avatar, type AvatarSize, type Person } from "./Avatar";
import styles from "./Avatar.module.css";

export type AvatarGroupProps = ComponentProps<"div"> & {
  people: Person[];
  max?: number;
  size?: AvatarSize;
};

export function AvatarGroup({ people, max = 3, size = "md", className, ...rest }: AvatarGroupProps) {
  const visible = people.slice(0, max);
  const extra = people.length - visible.length;

  return (
    <div {...rest} data-size={size} className={cx(styles.group, className)}>
      {visible.map((person, index) => (
        <Avatar key={`${person.name}-${index}`} person={person} size={size} />
      ))}
      {extra > 0 && (
        <Badge
          tone="mint"
          className={styles.more}
          role="img"
          aria-label={extra === 1 ? "mais 1 pessoa" : `mais ${extra} pessoas`}
        >
          +{extra}
        </Badge>
      )}
    </div>
  );
}
