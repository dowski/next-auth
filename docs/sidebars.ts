import {
  PropSidebarItemHtml,
  SidebarsConfig,
} from "@docusaurus/plugin-content-docs"
import manifest from "./manifest.mjs"

const clerk = {
  type: "html",
  value: `
  <a href="https://clerk.com?utm_source=sponsorship&utm_medium=docs&utm_campaign=authjs&utm_content=callout">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="/img/clerk-sidebar-light.png">
      <source media="(prefers-color-scheme: light)" srcset="/img/clerk-sidebar-dark.png">
      <img alt="Clerk – Authentication & User Management" src="/img/clerk-sidebar-dark.png">
    </picture>
  </a>`,
  defaultStyle: true,
} satisfies PropSidebarItemHtml

export default {
  gettingStartedSidebar: [
    { type: "autogenerated", dirName: "getting-started" },
    clerk,
  ],
  guidesSidebar: [{ type: "autogenerated", dirName: "guides" }, clerk],
  referenceSidebar: [
    "reference/index",
    ...manifest.frameworks.map((framework) => ({
      type: "category",
      label: framework.packageName,
      link: { type: "doc", id: `reference/${framework.id}/index` },
      items: require(`./docs/reference/${framework.id}/typedoc-sidebar.cjs`),
    })),
    ...(process.env.TYPEDOC_SKIP_ADAPTERS
      ? []
      : [
          {
            type: "category",
            label: "Database Adapters",
            collapsed: false,
            items: manifest.adapters.map((adapter) => ({
              type: "doc",
              id: `reference/adapter/${adapter.id}/index`,
            })),
          },
        ]),
    "reference/warnings",
    clerk,
  ],
  conceptsSidebar: [{ type: "autogenerated", dirName: "concepts" }, clerk],
} as SidebarsConfig