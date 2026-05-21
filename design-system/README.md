# Kajabi Design System

A token-based, vanilla CSS design system for building Kajabi admin interface prototypes. No build tools, no framework dependencies — import one CSS file and start building.

---

## Quick start

```html
<link rel="stylesheet" href="../design-system/index.css">
```

That single import loads all tokens, the reset, and every component. To start from a working prototype, copy any file from `/prototypes/` and modify it.

---

## Token naming convention

Every token follows a **semantic + category** pattern — names describe *what the token is for*, never *what it looks like*.

### Pattern

```
--{category}-{role}[-{variant}]
```

| Category | Examples |
|---|---|
| `color-` | `--color-brand`, `--color-success`, `--color-text-secondary` |
| `font-size-` | `--font-size-body`, `--font-size-h1`, `--font-size-micro` |
| `font-weight-` | `--font-weight-medium`, `--font-weight-semibold` |
| `space-` | `--space-4`, `--space-8` |
| `radius-` | `--radius`, `--radius-md`, `--radius-full` |
| `shadow-` | `--shadow-sm`, `--shadow-focus`, `--shadow-focus-error` |
| `z-` | `--z-dropdown`, `--z-modal`, `--z-toast` |

### Rules

**Use semantic names, never value names.**

```css
/* ✓ correct */
color: var(--color-success);

/* ✗ wrong */
color: var(--color-green);
```

**Use status tokens for status meaning only.** `--color-success` means active, published, completed, or paid — not "decorative green."

**Every status color must be paired with text.** Never use color as the sole signal — apply status color to a `.pill` that contains a visible text label.

---

## Typography scale

| Token | Size | Weight | Use for |
|---|---|---|---|
| `--font-size-display` | 32px | 600 | Page titles, empty state headings |
| `--font-size-h1` | 24px | 600 | Section headings, dashboard modules |
| `--font-size-h2` | 18px | 500 | Card headings, drawer/modal titles |
| `--font-size-body` | 14px | 400 | Default body, form labels, table content |
| `--font-size-small` | 12px | 400 | Metadata, captions, helper text |
| `--font-size-micro` | 11px | 500 | Uppercase labels, status pills, table headers |

---

## Creating a new component

### 1. Create the CSS file

Add `design-system/components/my-component.css`. Follow this structure:

```css
/* ─── Base ───────────────────────────── */
.my-component {
  /* Only use var(--token) references — no hardcoded values */
  font-family: var(--font-family-ui);
  font-size: var(--font-size-body);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--card-padding);
}

/* ─── Variants ───────────────────────── */
.my-component--highlighted {
  border-color: var(--color-brand);
  background: var(--color-brand-muted);
}

/* ─── States ─────────────────────────── */
.my-component:hover { background: var(--color-surface-card-hover); }
.my-component:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
```

**Class naming:** use BEM-ish flat naming — `.component`, `.component-element`, `.component--modifier`.

### 2. Register the import

Add the import to `design-system/index.css` under the `/* ─── Components ─── */` block:

```css
@import './components/my-component.css';
```

### 3. Accessibility checklist

Before shipping any interactive component:

- [ ] Keyboard-operable (focusable with Tab, actionable with Enter/Space)
- [ ] Visible focus ring (use `var(--shadow-focus)` via `box-shadow` to preserve border-radius)
- [ ] Color is never the sole signal — pair with text or icons
- [ ] Icon-only controls have `aria-label`
- [ ] Form inputs have associated `<label>` and `aria-describedby` pointing to error messages
- [ ] Modals trap focus and return it to the trigger on close
- [ ] Live regions use `role="status"` (polite) for informational updates, `role="alert"` (assertive) for errors
- [ ] Loading states set `aria-busy="true"` on the affected region

### 4. Add to the component gallery

Drop a `<section>` block into `prototype-shell/index.html` showing every variant and state. The gallery is your smoke test.

---

## Starting a new prototype

### From the shell

1. Copy `prototype-shell/index.html` to `prototypes/my-page.html`
2. Change the `<title>` tag
3. Update the active nav item: find `is-active` and `aria-current="page"` and move them to the correct `<a>`
4. Replace the `<main>` content with your prototype

### From a starter template

The `/prototypes/` directory contains three ready-made starting points:

| File | Use for |
|---|---|
| `dashboard.html` | Home / analytics pages with metric cards and a data table |
| `course-builder.html` | Two-column creation forms with upload empty states |
| `email-campaign.html` | List views with all status pill variants and row actions |

### Adjusting paths

The CSS `href` assumes the prototype lives one level below the design system root:

```
project/
  design-system/index.css   ← the system
  prototypes/my-page.html   ← one level down → "../design-system/index.css"
  prototype-shell/index.html ← same depth
```

If you nest deeper, adjust the relative path accordingly.

---

## Spacing scale

| Token | Value | Common use |
|---|---|---|
| `--space-1` | 4px | Tight gaps, pill padding |
| `--space-2` | 8px | Button padding, small gaps |
| `--space-3` | 12px | List item padding |
| `--space-4` | 16px | Standard gutter |
| `--space-5` | 20px | Section padding |
| `--space-6` | 24px | Card padding (`--card-padding`) |
| `--space-8` | 32px | Page gutter (`--page-gutter`) |
| `--space-12` | 48px | Large section gap |

**Do not use arbitrary pixel values.** Always reference a spacing token. If none fits, add one to `tokens/spacing.css` before using it.

---

## Accessibility contract

These rules are non-negotiable per `design.md`:

1. **All visible informational text must meet WCAG AA contrast** (4.5:1 for normal text, 3:1 for large text and UI components). The `--color-text-muted` token is calibrated to 5.25:1 on white. Do not lighten it.

2. **Status pills always carry a text label.** The color dot is decorative reinforcement only.

3. **Toasts**: errors → `role="alert"`, everything else → `role="status"`. Never `role="alert"` for success messages — it interrupts the user.

4. **Modals**: use `<dialog>` + `showModal()`. Focus on the cancel button (not the destructive action). Return focus to the trigger element when closed.

5. **Row menus**: trigger shows on hover *and* focus. Arrow keys navigate items. Escape closes and returns focus to trigger.

6. **Form errors**: always `aria-describedby` linking the input to its error element. Validate on blur, not on keystroke. Error messages are specific — "Email address is required" not "Invalid input."
