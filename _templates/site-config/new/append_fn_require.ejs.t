---
inject: true
to: main.js
after: const\ cron\ \=\ require\(\'node\-cron\'\)\;
skip_if: <%= Name %>Fn
---

const <%= Name %>Fn = require('src/<%= h.inflection.underscore(h.changeCase.lower(name)) %>.js')