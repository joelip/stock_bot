---
inject: true
to: src/site_configs.js
after: module\.exports\ \= \{
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
