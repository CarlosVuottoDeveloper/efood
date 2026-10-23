import type { Preview } from "@storybook/nextjs-vite";
import "../design-system/tokens/tokens.css";
import "../design-system/tokens/base.css";
import { urbanist } from "../design-system/fonts";

const preview: Preview = {
  tags: ["autodocs"],
  initialGlobals: {
    backgrounds: { value: "canvas" },
  },
  parameters: {
    options: {
      storySort: { order: ["Introdução", "Fundações", "Componentes", "Exemplos"] },
    },
    a11y: { test: "error" },
    backgrounds: {
      options: {
        canvas: { name: "canvas", value: "#FFFFFF" },
        page: { name: "page", value: "#CCE1C3" },
      },
    },
    viewport: {
      options: {
        mobile320: {
          name: "Mobile 320",
          styles: { width: "320px", height: "640px" },
          type: "mobile",
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${urbanist.variable} ${urbanist.className}`} lang="pt-BR">
        <Story />
      </div>
    ),
  ],
};

export default preview;
