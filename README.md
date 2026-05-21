# Kajabi AI FieldFill Assistant — Concept Prototype

This is a quick, non-production HTML prototype to communicate the concept of a separate AI assistant/MCP/browser agent that can populate Kajabi admin fields that Kajabi Cofounder cannot directly edit.

## What it demonstrates

- A Kajabi-like admin/course lesson settings screen
- Fields for title, description, duration, lesson body, SEO title, and SEO description
- A right-side AI assistant panel
- A “Fill all visible fields” action that populates the form
- A human-approval save flow concept

## How to open

Open `index.html` in a browser:

```bash
xdg-open /root/kajabi-ai-fieldfill-prototype/index.html
```

Or serve it locally:

```bash
cd /root/kajabi-ai-fieldfill-prototype
python3 -m http.server 4173
```

Then visit:

```text
http://127.0.0.1:4173
```

## Prototype positioning

This is not meant to be a real Kajabi integration yet. It is meant to help explain the product idea:

> Cofounder can generate content, but a separate AI agent can operate the Kajabi admin interface, map generated content to visible fields, populate those fields, and pause before saving.

## Next prototype iteration

A stronger v2 could add:

- A fake browser-agent progress timeline
- Field-by-field approval
- Before/after diff view
- Support for Forms, Offers, Checkout, Course Lessons, and SEO screens
- More accurate visual matching to Kajabi after referencing screenshots
