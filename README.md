# Kajabi FieldFill Agent — Concept Prototype

Live concept prototype for a separate AI/MCP/browser agent that can populate Kajabi admin fields that native Cofounder-style AI cannot directly edit.

## Current version

This version was restyled from the previously created Kajabi SaaS design system notes in `/tmp/kajabi/DESIGN.md`:

- Warm gray app canvas: `#F7F7F5`
- White cards and subtle borders
- Light persistent left sidebar
- Black primary CTAs
- Purple AI/co-pilot treatment
- Card-based SaaS settings layout
- Human-in-the-loop save safety

## Important inspection note

The referenced repo `joshgrieve81/creator-platform-starter` is currently public but appears empty on GitHub: no branches, no commits, and no files were available to clone at inspection time. Because of that, this prototype uses the locally available Kajabi-inspired design-system artifact from the earlier Cursor/Kajabi design work rather than copying code from that repo.

## What it demonstrates

- A Kajabi-inspired product/course lesson settings page
- A right-side AI assistant panel
- Field detection/readiness state
- Generate + fill interaction
- Section-specific fill actions
- A review-before-save flow

## How to view locally

```bash
cd /root/kajabi-ai-fieldfill-prototype
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

## Concept positioning

> Cofounder can help write content. FieldFill performs the operational step: it identifies fields in the Kajabi admin UI, maps generated content to each field, populates the page, and pauses before save for human approval.
