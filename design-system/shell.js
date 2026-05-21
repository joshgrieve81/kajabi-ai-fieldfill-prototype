/**
 * Kajabi Design System — App Shell
 *
 * Injects the global header, left nav, AI drawer, toast region,
 * skip-nav link, and SVG icon sprite into any prototype page.
 *
 * Usage (at end of <body>, after all page markup):
 *   <script src="../design-system/shell.js"></script>
 *   <script>
 *     initShell({
 *       activeNav: 'dashboard',   // nav item id to highlight
 *       brandName: "Josh Grieve's First",
 *       rootPath:  './',          // path to /prototypes/ from this file
 *     });
 *   </script>
 *
 * Page HTML skeleton:
 *   <div class="app" id="app">
 *     <div class="app-main" id="app-main">
 *       <!-- header injected here -->
 *       <div class="app-body">
 *         <!-- nav injected here -->
 *         <main class="admin-content" id="main-content" tabindex="-1">
 *           <!-- your page content -->
 *         </main>
 *       </div>
 *     </div>
 *     <!-- ai-drawer injected here -->
 *   </div>
 */
(function (global) {
  'use strict';

  /* ── Shell CSS (AI drawer + overrides) ─────────────────────────── */
  var SHELL_CSS = [
    ':root{',
    '  --ai-bg:#1C1C1C; --ai-bg-input:#282828; --ai-border:#303030;',
    '  --ai-border-sub:#3C3C3C; --ai-text:#F0F0F0; --ai-text-body:#9A9A9A;',
    '  --ai-text-muted:#5A5A5A; --ai-icon:#6A6A6A; --ai-icon-hover:#C0C0C0;',
    '  --ai-width:360px;',
    '}',
    '.skip-nav{position:absolute;top:-100%;left:16px;padding:8px 16px;background:var(--color-brand);color:#fff;border-radius:var(--radius);font-size:var(--font-size-body);font-weight:500;text-decoration:none;z-index:9999;white-space:nowrap;font-family:var(--font-family-ui);}',
    '.skip-nav:focus{top:16px;outline:none;box-shadow:var(--shadow-focus);}',
    '.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}',
    /* AI toggle active state — background matches drawer exactly */
    '.app-ctrl-btn.ai-active{background:var(--ai-bg);color:#fff;border-radius:8px;}',
    '.app-ctrl-btn.ai-active:hover{background:#242424;}',
    /* Drawer — width transition creates the push effect */
    '.ai-drawer{flex-shrink:0;width:0;overflow:hidden;background:var(--ai-bg);display:flex;flex-direction:column;align-self:stretch;transition:width 300ms cubic-bezier(0.22,1,0.36,1);pointer-events:none;}',
    '.ai-drawer.is-open{width:var(--ai-width);border-left:1px solid var(--ai-border);pointer-events:auto;}',
    /* Inner wrapper keeps content at full width during animation clip */
    '.ai-inner{width:var(--ai-width);flex-shrink:0;height:100%;display:flex;flex-direction:column;}',
    '.ai-header{display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:48px;border-bottom:1px solid var(--ai-border);flex-shrink:0;}',
    '.ai-header-title{font-family:var(--font-family-ui);font-size:var(--font-size-body);font-weight:600;color:var(--ai-text);white-space:nowrap;}',
    '.ai-header-icons{display:flex;align-items:center;gap:2px;}',
    '.ai-btn{width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;cursor:pointer;color:var(--ai-icon);border-radius:6px;transition:background-color 80ms,color 80ms;flex-shrink:0;}',
    '.ai-btn:hover{background:#282828;color:var(--ai-icon-hover);}',
    '.ai-btn:focus-visible{outline:none;box-shadow:0 0 0 2px #5046E5;}',
    '.ai-btn svg{width:15px;height:15px;display:block;}',
    '.ai-body{flex:1;overflow-y:auto;padding:24px 20px;scrollbar-width:thin;scrollbar-color:#333 transparent;}',
    '.ai-msg-heading{font-family:var(--font-family-ui);font-size:var(--font-size-body);font-weight:600;color:var(--ai-text);line-height:1.55;margin:0 0 16px;}',
    '.ai-msg-body{font-family:var(--font-family-ui);font-size:var(--font-size-body);color:var(--ai-text-body);line-height:1.65;margin:0 0 16px;}',
    '.ai-inline-icon{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:#333;border-radius:5px;vertical-align:middle;margin:0 2px;}',
    '.ai-inline-icon svg{width:11px;height:11px;display:block;}',
    '.ai-divider{border:none;border-top:1px solid var(--ai-border);margin:20px 0;}',
    '.ai-suggestions-label{font-family:var(--font-family-ui);font-size:var(--font-size-body);color:var(--ai-text);margin:0 0 12px;}',
    '.ai-bullets{list-style:disc;padding-left:20px;display:flex;flex-direction:column;gap:8px;margin:0 0 20px;}',
    '.ai-bullets li{font-family:var(--font-family-ui);font-size:var(--font-size-body);color:var(--ai-text-body);line-height:1.5;cursor:pointer;transition:color 80ms;}',
    '.ai-bullets li:hover{color:var(--ai-text);}',
    '.ai-feedback{display:flex;align-items:center;gap:8px;}',
    '.ai-feedback-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;background:transparent;cursor:pointer;color:var(--ai-icon);border-radius:5px;transition:background-color 80ms,color 80ms;}',
    '.ai-feedback-btn:hover{background:#282828;color:var(--ai-icon-hover);}',
    '.ai-feedback-btn svg{width:15px;height:15px;display:block;}',
    '.ai-footer{flex-shrink:0;padding:12px 16px;border-top:1px solid var(--ai-border);}',
    '.ai-input-box{background:var(--ai-bg-input);border:1px solid var(--ai-border-sub);border-radius:12px;overflow:hidden;margin-bottom:8px;}',
    '.ai-textarea{display:block;width:100%;padding:12px 16px;background:transparent;border:none;font-family:var(--font-family-ui);font-size:var(--font-size-body);color:var(--ai-text);resize:none;min-height:44px;max-height:160px;outline:none;line-height:1.5;}',
    '.ai-textarea::placeholder{color:var(--ai-text-muted);}',
    '.ai-input-row{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-top:1px solid var(--ai-border);}',
    '.ai-plus-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;background:transparent;cursor:pointer;color:var(--ai-icon);border-radius:5px;font-size:20px;line-height:1;transition:background-color 80ms,color 80ms;}',
    '.ai-plus-btn:hover{background:#333;color:var(--ai-icon-hover);}',
    '.ai-send-btn{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;background:#3A3A3A;border-radius:50%;cursor:pointer;color:#8A8A8A;transition:background-color 80ms,color 80ms;}',
    '.ai-send-btn:hover{background:#4A4A4A;color:#D0D0D0;}',
    '.ai-send-btn svg{width:13px;height:13px;display:block;}',
    '.ai-disclaimer{font-family:var(--font-family-ui);font-size:11px;color:var(--ai-text-muted);text-align:center;}',
    '.ai-disclaimer a{color:var(--ai-text-muted);}',
    '.ai-disclaimer a:hover{color:var(--ai-icon-hover);}',
    '.ai-disclaimer svg{width:10px;height:10px;display:inline;vertical-align:middle;}',
  ].join('\n');

  /* ── SVG Sprite (all icons, prefixed sh-) ───────────────────────── */
  var SVG_SPRITE = '<svg id="sh-sprite" style="display:none" aria-hidden="true"><defs>' +
    /* navigation */
    '<symbol id="sh-chevron-right" viewBox="0 0 20 20" fill="none"><path d="M7.5 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-chevron-down" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    /* header */
    '<symbol id="sh-diamond" viewBox="0 0 20 20"><path d="M10 2L18 10L10 18L2 10Z" fill="currentColor"/></symbol>' +
    '<symbol id="sh-diamond-outline" viewBox="0 0 20 20" fill="none"><path d="M10 2L18 10L10 18L2 10Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-search" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M17 17l-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    /* actions */
    '<symbol id="sh-x" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-check" viewBox="0 0 20 20" fill="none"><path d="M4 10l4.5 4.5L16 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-plus" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-edit" viewBox="0 0 20 20" fill="none"><path d="M14 3l3 3L7 16H4v-3L14 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-copy" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M3 11H2.5A1.5 1.5 0 011 9.5V2.5A1.5 1.5 0 012.5 1h7A1.5 1.5 0 0111 2.5V3" stroke="currentColor" stroke-width="1.25"/></symbol>' +
    '<symbol id="sh-archive" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M3 7v9a1 1 0 001 1h12a1 1 0 001-1V7" stroke="currentColor" stroke-width="1.5"/><path d="M8 11h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-trash" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4h4v2M16 6l-1 11a1 1 0 01-1 1H6a1 1 0 01-1-1L4 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9v5M12 9v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-more" viewBox="0 0 20 20" fill="none"><circle cx="4.5" cy="10" r="1.25" fill="currentColor"/><circle cx="10" cy="10" r="1.25" fill="currentColor"/><circle cx="15.5" cy="10" r="1.25" fill="currentColor"/></symbol>' +
    /* status/feedback */
    '<symbol id="sh-error" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v5M10 13v.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-warning" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 17h16L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-info" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5M10 6v.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-eye" viewBox="0 0 20 20" fill="none"><path d="M2 10c0-1.5 3.5-6 8-6s8 4.5 8 6-3.5 6-8 6-8-4.5-8-6z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.5"/></symbol>' +
    '<symbol id="sh-thumb-up" viewBox="0 0 16 16" fill="none"><path d="M5 7l2-5a1 1 0 011 1V6h4a1 1 0 011 1l-1 5H5V7z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M3 7h2v6H3a1 1 0 01-1-1V8a1 1 0 011-1z" stroke="currentColor" stroke-width="1.25"/></symbol>' +
    '<symbol id="sh-thumb-down" viewBox="0 0 16 16" fill="none"><path d="M11 9l-2 5a1 1 0 01-1-1v-3H4a1 1 0 01-1-1l1-5h7v5z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M13 9h-2V3h2a1 1 0 011 1v4a1 1 0 01-1 1z" stroke="currentColor" stroke-width="1.25"/></symbol>' +
    /* AI drawer */
    '<symbol id="sh-swap" viewBox="0 0 16 16" fill="none"><path d="M2 5h10M9 2l3 3-3 3M14 11H4M7 8l-3 3 3 3" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-clock" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.25"/><path d="M8 5v3.5l2.5 1.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-compose" viewBox="0 0 16 16" fill="none"><path d="M8 13H3a1 1 0 01-1-1V4a1 1 0 011-1h5M11 2l3 3-6 6H5v-3l6-6z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-expand" viewBox="0 0 16 16" fill="none"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-send" viewBox="0 0 14 14" fill="none"><path d="M13 1L1 6l5 2 2 5 5-12z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-external" viewBox="0 0 16 16" fill="none"><path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5v5M14 2L8 8" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    /* misc / page icons */
    '<symbol id="sh-sliders" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="7" cy="6" r="1.75" fill="white" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="10" r="1.75" fill="white" stroke="currentColor" stroke-width="1.5"/><circle cx="7" cy="14" r="1.75" fill="white" stroke="currentColor" stroke-width="1.5"/></symbol>' +
    '<symbol id="sh-calendar" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M5 1v3M11 1v3M1.5 6.5h13" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-settings" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M16.4 8.6L18.3 8.2L18.3 11.8L16.4 11.4L15.6 13.3L14.4 14.8L15.7 16.3L12.6 18.1L12 16.2L10 16.5L8 16.2L7.4 18.1L4.3 16.3L5.7 14.8L4.4 13.3L3.6 11.4L1.7 11.8L1.7 8.2L3.6 8.6L4.4 6.8L5.7 5.2L4.3 3.7L7.4 1.9L8 3.8L10 3.5L12 3.8L12.6 1.9L15.7 3.7L14.4 5.2L15.6 6.8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-refresh" viewBox="0 0 20 20" fill="none"><path d="M4 10a6 6 0 1010.8-3.6M14 4l1 3-3 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-arrow-up" viewBox="0 0 14 14" fill="none"><path d="M7 10V4M4 7l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-arrow-down" viewBox="0 0 14 14" fill="none"><path d="M7 4v6M4 7l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-upload" viewBox="0 0 20 20" fill="none"><path d="M10 13V5M7 8l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-grip" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="6" r="1.25" fill="currentColor"/><circle cx="13" cy="6" r="1.25" fill="currentColor"/><circle cx="7" cy="10" r="1.25" fill="currentColor"/><circle cx="13" cy="10" r="1.25" fill="currentColor"/><circle cx="7" cy="14" r="1.25" fill="currentColor"/><circle cx="13" cy="14" r="1.25" fill="currentColor"/></symbol>' +
    '<symbol id="sh-user" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M4 18c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    /* promo card icons (white stroke on coloured bg) */
    '<symbol id="sh-people" viewBox="0 0 28 28" fill="none"><circle cx="10" cy="10" r="4" stroke="white" stroke-width="1.5"/><path d="M2 24c0-4.418 3.582-7 8-7s8 2.582 8 7" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="19" cy="9" r="3" stroke="white" stroke-width="1.5"/><path d="M22 23c0-3.314-1.343-5-4-6" stroke="white" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-grad" viewBox="0 0 28 28" fill="none"><path d="M4 12l10-5 10 5-10 5-10-5z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 14v5c0 2 3 3 6 3s6-1 6-3v-5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 12v5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-k" viewBox="0 0 28 28" fill="none"><path d="M9 7v14M9 14l9-7M9 14l9 7" stroke="white" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-eye-view" viewBox="0 0 20 20" fill="none"><path d="M2 10c0-1.5 3.5-6 8-6s8 4.5 8 6-3.5 6-8 6-8-4.5-8-6z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/></symbol>' +
    /* ── Nav item icons (match Kajabi sidebar screenshot) ── */
    '<symbol id="sh-nav-home" viewBox="0 0 20 20" fill="none"><path d="M3 8.5L10 2l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V8.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 18v-5h6v5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-nav-products" viewBox="0 0 20 20" fill="none"><path d="M3 9h14a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5"/><path d="M10 9V18M2 13h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 9C10 9 8.5 4 6 4S3 5.5 5 7c1.5 1 5 2 5 2s3.5-1 5-2c2-1.5 1-3-1.5-3S10 9 10 9z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-nav-sales" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 9h16" stroke="currentColor" stroke-width="1.5"/><path d="M5 13h4M14 13h1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-nav-website" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M7 18h6M10 14v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-nav-marketing" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M2 7l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-nav-contacts" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 17c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 4a3 3 0 010 6M16 17c0-2.4-1.2-4-3-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>' +
    '<symbol id="sh-nav-analytics" viewBox="0 0 20 20" fill="none"><path d="M2 16h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="3" y="9" width="3" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="8.5" y="5" width="3" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="11" width="3" height="5" rx="1" stroke="currentColor" stroke-width="1.5"/></symbol>' +
    '<symbol id="sh-nav-media" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.25"/><path d="M2 14l4.5-4 3.5 3 2.5-2 5 5" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-nav-partner" viewBox="0 0 20 20" fill="none"><circle cx="8.5" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M2 17c0-3.2 2.9-5 6.5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15 10.5l.8 2.2H18l-1.9 1.4.7 2.2-1.8-1.3-1.8 1.3.7-2.2-1.9-1.4h2.2L15 10.5z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/></symbol>' +
    '<symbol id="sh-nav-feedback" viewBox="0 0 20 20" fill="none"><path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H6l-4 3V4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></symbol>' +
    '</defs></svg>';

  /* ── Nav config ─────────────────────────────────────────────────── */
  var NAV_MAIN = [
    { id: 'dashboard',       label: 'Dashboard',       page: 'dashboard.html',      expandable: false },
    { id: 'products',        label: 'Products',        page: 'course-builder.html', expandable: true  },
    { id: 'sales',           label: 'Sales',           page: null,                  expandable: true  },
    { id: 'website',         label: 'Website',         page: null,                  expandable: true  },
    { id: 'marketing',       label: 'Marketing',       page: 'email-campaign.html', expandable: true  },
    { id: 'contacts',        label: 'Contacts',        page: null,                  expandable: true  },
    { id: 'analytics',       label: 'Analytics',       page: null,                  expandable: true  },
    { id: 'media-library',   label: 'Media Library',   page: null,                  expandable: false },
    { id: 'partner-program', label: 'Partner Program', page: null,                  expandable: false },
    { id: 'more',            label: 'More',            page: null,                  expandable: true  },
  ];
  var NAV_FOOTER = [
    { id: 'settings', label: 'Settings',      icon: 'sh-settings'    },
    { id: 'feedback', label: 'Give Feedback', icon: 'sh-nav-feedback' },
  ];

  /* Maps nav item id → icon symbol id */
  var NAV_ICONS = {
    'dashboard':       'sh-nav-home',
    'products':        'sh-nav-products',
    'sales':           'sh-nav-sales',
    'website':         'sh-nav-website',
    'marketing':       'sh-nav-marketing',
    'contacts':        'sh-nav-contacts',
    'analytics':       'sh-nav-analytics',
    'media-library':   'sh-nav-media',
    'partner-program': 'sh-nav-partner',
    'more':            'sh-more',
  };

  /* ── HTML builders ──────────────────────────────────────────────── */
  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function buildHeader(brandName) {
    return '<header class="app-header">' +
      '<a href="#" class="app-brand" aria-label="' + esc(brandName) + ' home">' +
        '<div class="app-brand-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 14 14" style="width:13px;height:13px;" aria-hidden="true">' +
            '<path d="M7 1L13 7L7 13L1 7Z" fill="white"/>' +
          '</svg>' +
        '</div>' +
        '<span class="app-brand-name">' + esc(brandName) + '</span>' +
      '</a>' +
      '<div class="app-controls">' +
        '<button class="app-ctrl-btn" id="ai-toggle-btn" aria-label="Toggle AI assistant" aria-expanded="false" aria-controls="ai-drawer" onclick="toggleAI()">' +
          '<svg id="ai-toggle-icon" style="width:18px;height:18px;" aria-hidden="true"><use href="#sh-diamond-outline"/></svg>' +
        '</button>' +
        '<button class="app-ctrl-btn" aria-label="Search">' +
          '<svg aria-hidden="true"><use href="#sh-search"/></svg>' +
        '</button>' +
        '<button class="app-user-btn" aria-label="Account menu for Josh Grieve">' +
          '<div class="app-user-avatar" aria-hidden="true">JG</div>' +
          '<span>Josh Grieve</span>' +
        '</button>' +
      '</div>' +
    '</header>';
  }

  function buildNav(activeId, rootPath) {
    var main = NAV_MAIN.map(function(item) {
      var href    = item.page ? rootPath + item.page : '#';
      var active  = item.id === activeId ? ' is-active" aria-current="page' : '';
      var iconId  = NAV_ICONS[item.id];
      var icon    = iconId
        ? '<svg class="nav-item-icon" aria-hidden="true"><use href="#' + iconId + '"/></svg>'
        : '';
      var label   = '<span class="nav-item-label">' + esc(item.label) + '</span>';
      var chevron = item.expandable
        ? '<svg class="nav-chevron" aria-hidden="true"><use href="#sh-chevron-down"/></svg>'
        : '';
      return '<a href="' + esc(href) + '" class="nav-item' + active + '">' +
        icon + label + chevron +
      '</a>';
    }).join('');

    var footer = NAV_FOOTER.map(function(item) {
      var active = item.id === activeId ? ' is-active" aria-current="page' : '';
      var icon   = item.icon
        ? '<svg class="nav-item-icon" aria-hidden="true"><use href="#' + item.icon + '"/></svg>'
        : '';
      var label  = '<span class="nav-item-label">' + esc(item.label) + '</span>';
      return '<a href="#" class="nav-item' + active + '">' + icon + label + '</a>';
    }).join('');

    return '<nav class="admin-nav" aria-label="Main navigation">' +
      '<div class="nav-body">' + main + '</div>' +
      '<div class="nav-footer">' + footer + '</div>' +
    '</nav>';
  }

  function buildAIDrawer() {
    return '<aside class="ai-drawer" id="ai-drawer" aria-label="Kajabi AI assistant">' +
      '<div class="ai-inner">' +
        '<div class="ai-header">' +
          '<span class="ai-header-title">New conversation</span>' +
          '<div class="ai-header-icons">' +
            '<button class="ai-btn" aria-label="Filter conversations"><svg aria-hidden="true"><use href="#sh-swap"/></svg></button>' +
            '<button class="ai-btn" aria-label="History"><svg aria-hidden="true"><use href="#sh-clock"/></svg></button>' +
            '<button class="ai-btn" aria-label="New conversation"><svg aria-hidden="true"><use href="#sh-compose"/></svg></button>' +
            '<button class="ai-btn" aria-label="Expand panel"><svg aria-hidden="true"><use href="#sh-expand"/></svg></button>' +
            '<button class="ai-btn" aria-label="Close AI assistant" onclick="toggleAI()"><svg aria-hidden="true"><use href="#sh-x"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="ai-body">' +
          '<p class="ai-msg-heading">Hey Josh! I\'m Co-founder, your AI business partner inside Kajabi.</p>' +
          '<p class="ai-msg-body">Whether you\'re ready to build or still figuring things out, I\'m here to help. I can interview you to clarify your vision, map out your first product, or jump straight into building if you already know what you want.</p>' +
          '<p class="ai-msg-body">If you want help again, click the ' +
            '<span class="ai-inline-icon" aria-label="diamond icon"><svg viewBox="0 0 14 14" style="width:11px;height:11px;" aria-hidden="true"><path d="M7 1L13 7L7 13L1 7Z" fill="white"/></svg></span>' +
            ' icon to bring me back.</p>' +
          '<hr class="ai-divider">' +
          '<p class="ai-suggestions-label">To get started, try one of these:</p>' +
          '<ul class="ai-bullets">' +
            '<li onclick="fillInput(\'I want to create a course about [topic]\')">I want to create a course about [topic]</li>' +
            '<li onclick="fillInput(\'I have an audience but I\'m not sure what to sell them\')">I have an audience but I\'m not sure what to sell them</li>' +
            '<li onclick="fillInput(\'I\'m starting from scratch—help me figure out my niche\')">I\'m starting from scratch—help me figure out my niche</li>' +
            '<li onclick="fillInput(\'Walk me through what I should do first\')">Walk me through what I should do first</li>' +
          '</ul>' +
          '<div class="ai-feedback" aria-label="Message feedback">' +
            '<button class="ai-feedback-btn" aria-label="Helpful"><svg aria-hidden="true"><use href="#sh-thumb-up"/></svg></button>' +
            '<button class="ai-feedback-btn" aria-label="Not helpful"><svg aria-hidden="true"><use href="#sh-thumb-down"/></svg></button>' +
            '<button class="ai-feedback-btn" aria-label="Copy message"><svg aria-hidden="true"><use href="#sh-copy"/></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="ai-footer">' +
          '<div class="ai-input-box">' +
            '<textarea class="ai-textarea" id="ai-input" rows="1" placeholder="Ask, search, or make anything..." aria-label="Message Kajabi AI" oninput="this.style.height=\'auto\';this.style.height=this.scrollHeight+\'px\'"></textarea>' +
            '<div class="ai-input-row">' +
              '<button class="ai-plus-btn" aria-label="Add attachment">+</button>' +
              '<button class="ai-send-btn" aria-label="Send message"><svg aria-hidden="true"><use href="#sh-send"/></svg></button>' +
            '</div>' +
          '</div>' +
          '<p class="ai-disclaimer">Cofounder can make mistakes. <a href="#">Policies <svg aria-hidden="true"><use href="#sh-external"/></svg></a> apply.</p>' +
        '</div>' +
      '</div>' +
    '</aside>';
  }

  /* ── Global functions (available to all pages) ──────────────────── */
  function wireShell() {
    global.toggleAI = function () {
      var drawer = document.getElementById('ai-drawer');
      var btn    = document.getElementById('ai-toggle-btn');
      var icon   = document.getElementById('ai-toggle-icon');
      var useEl  = icon && icon.querySelector('use');
      if (!drawer) return;
      var opening = !drawer.classList.contains('is-open');
      drawer.classList.toggle('is-open', opening);
      if (btn) {
        btn.classList.toggle('ai-active', opening);
        btn.setAttribute('aria-expanded', String(opening));
      }
      if (useEl) useEl.setAttribute('href', opening ? '#sh-diamond' : '#sh-diamond-outline');
      if (opening) setTimeout(function () {
        var inp = document.getElementById('ai-input');
        if (inp) inp.focus();
      }, 320);
    };

    global.fillInput = function (text) {
      var input = document.getElementById('ai-input');
      if (!input) return;
      input.value = text;
      input.focus();
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    };

    global.showToast = function (type, title, message, persistent) {
      var icons = { success: '#sh-check', error: '#sh-error', warning: '#sh-warning', info: '#sh-info' };
      var region = document.getElementById('toast-region');
      if (!region) return;
      var el = document.createElement('div');
      el.className = 'toast toast-' + type;
      el.setAttribute('role', type === 'error' ? 'alert' : 'status');
      el.innerHTML =
        '<svg class="toast-icon" aria-hidden="true"><use href="' + (icons[type] || icons.success) + '"/></svg>' +
        '<div class="toast-body"><p class="toast-title">' + esc(title) + '</p>' +
        (message ? '<p class="toast-message">' + esc(message) + '</p>' : '') + '</div>' +
        '<button class="toast-dismiss" aria-label="Dismiss notification">' +
          '<svg width="14" height="14" aria-hidden="true"><use href="#sh-x"/></svg>' +
        '</button>';
      el.querySelector('.toast-dismiss').addEventListener('click', function () {
        el.classList.add('toast-exit');
        el.addEventListener('animationend', function () { el.remove(); }, { once: true });
      });
      region.appendChild(el);
      if (!persistent) {
        setTimeout(function () {
          if (!el.isConnected) return;
          el.classList.add('toast-exit');
          el.addEventListener('animationend', function () { el.remove(); }, { once: true });
        }, 4000);
      }
    };
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  global.initShell = function (opts) {
    var o = opts || {};
    var activeNav = o.activeNav || '';
    var brandName = o.brandName || "Josh Grieve's First";
    var rootPath  = o.rootPath  || './';

    /* 1. Styles */
    if (!document.getElementById('kds-shell-css')) {
      var s = document.createElement('style');
      s.id = 'kds-shell-css';
      s.textContent = SHELL_CSS;
      document.head.appendChild(s);
    }

    /* 2. SVG sprite */
    if (!document.getElementById('sh-sprite')) {
      var tmp = document.createElement('div');
      tmp.innerHTML = SVG_SPRITE;
      document.body.insertBefore(tmp.firstChild, document.body.firstChild);
    }

    /* 3. Skip nav */
    if (!document.querySelector('.skip-nav')) {
      var a = document.createElement('a');
      a.href = '#main-content';
      a.className = 'skip-nav';
      a.textContent = 'Skip to main content';
      document.body.insertBefore(a, document.body.firstChild);
    }

    /* 4. Header → top of #app-main */
    var appMain = document.getElementById('app-main');
    if (appMain && !appMain.querySelector('.app-header')) {
      appMain.insertAdjacentHTML('afterbegin', buildHeader(brandName));
    }

    /* 5. Nav → start of .app-body (scoped to #app-main) */
    var appBody = appMain && appMain.querySelector('.app-body');
    if (appBody && !appBody.querySelector('.admin-nav')) {
      appBody.insertAdjacentHTML('afterbegin', buildNav(activeNav, rootPath));
    }

    /* 6. AI drawer → end of #app */
    var app = document.getElementById('app');
    if (app && !document.getElementById('ai-drawer')) {
      app.insertAdjacentHTML('beforeend', buildAIDrawer());
    }

    /* 7. Toast region */
    if (!document.getElementById('toast-region')) {
      var tr = document.createElement('div');
      tr.className = 'toast-region';
      tr.id = 'toast-region';
      tr.setAttribute('aria-label', 'Notifications');
      document.body.appendChild(tr);
    }

    /* 8. Wire up global functions */
    wireShell();
  };

}(window));
