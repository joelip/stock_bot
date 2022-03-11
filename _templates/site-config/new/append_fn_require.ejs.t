---
inject: true
to: main.js
after: const\ cron\ \=\ require\(\'node\-cron\'\)\;
---

const <%= Name %>Fn = require('src/<%= h.inflection.underscore(h.changeCase.lower(name)) %>.js')