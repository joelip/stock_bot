---
inject: true
to: src/run.js
after: const\ cron\ \=\ require\(\'node\-cron\'\)\;
skip_if: <%= Name %>Fn
---

const <%= Name %>Fn = require('./<%= h.inflection.underscore(h.changeCase.lower(name)) %>.js')