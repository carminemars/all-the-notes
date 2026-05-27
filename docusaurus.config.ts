import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mars notes, all the notes',
  tagline: 'I\'m Mars and these are the notes I take on various things',
  favicon: 'img/me-nobg.ico',

  future: {
    v4: true,
  },

  url: 'https://carminemars.github.io',
  baseUrl: '/all-the-notes',

  organizationName: 'carminemars',
  projectName: 'all-the-notes',
  deploymentBranch: 'gh-pages', 
  onBrokenLinks: 'throw',
  trailingSlash: false,
  markdown: {
    hooks: {
      onBrokenMarkdownImages: 'ignore',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/mars-logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'All the notes',
      // logo: {
      //   alt: 'Mars notes',
      //   src: 'img/mars-logo.svg',
      // },
      items: [
        {to: '/docs/intro', label: 'Notes', position: 'right'},
        {to: '/blog', label: 'Blog', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} All the notes, built with <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a>`,
    },
    prism: {
      theme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
