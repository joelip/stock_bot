---
inject: true
to: main.js
after: const\ run\ \=\ async\ function\ \(\)\ \{
skip_if: <%= Name %>Fn
---

  <%= Name %>Fn();