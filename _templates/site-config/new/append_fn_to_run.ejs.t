---
inject: true
to: src/run.js
after: const\ run\ \=\ async\ function\ \(\)\ \{
skip_if: <%= Name %>Fn\(\)
---

  <%= Name %>Fn();
