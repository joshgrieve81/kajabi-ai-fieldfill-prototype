# Kajabi FieldFill Agent — Concept Prototype

This prototype has been rebuilt to match the populated `creator-platform-starter` repo more closely.

## Source reference used

Inspected repo:

```text
https://github.com/joshgrieve81/creator-platform-starter
```

The repo now contains:

- `design-system/` tokenized vanilla CSS system
- `design-system/shell.js` shared Kajabi-like app shell and dark AI drawer
- `prototypes/course-builder.html`
- `prototypes/dashboard.html`
- `prototypes/email-campaign.html`
- Screenshot references

This prototype now copies and uses that design system directly instead of approximating the styling from memory.

## What changed

- Uses the actual `design-system/index.css` and shell patterns from the populated repo
- Matches the light Kajabi-style sidebar and 48px global header
- Uses the same dark Cofounder-style AI drawer treatment
- Uses the course-builder card/form layout conventions
- Keeps the concept focused on FieldFill: detected fields, context intake, generate/fill actions, field readiness, and pause-before-save safety
- If the user clicks **Fill all fields** with no brief/context, FieldFill now asks for context instead of magically filling fields
- Includes a **Use sample creator brief** action so the demo still has a fast path

## Live concept

GitHub Pages:

```text
https://joshgrieve81.github.io/kajabi-ai-fieldfill-prototype/
```

## Concept positioning

> Cofounder can help generate and reason about content. FieldFill performs the operational step: identify fields in the Kajabi admin UI, use source context from a brief/outline/transcript/Cofounder draft, populate matching fields, and pause before Save for explicit human approval.
