---
inject: true
to: src/site_configs.js
after: module\.exports\ \= \{
skip_if: <%= h.changeCase.lower(name) %>
---

  <%= h.changeCase.lower(name) %>: new SiteConfig(
    'url',
    '#other',
    'itemName',
    {
      stockAvailabilityContainer:
        '.selector',
    },
    'outOfStockString'
  ),