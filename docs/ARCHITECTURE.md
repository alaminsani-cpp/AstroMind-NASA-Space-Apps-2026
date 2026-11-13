# Web companion architecture

## Overview

This is a static educational website, with no backend and no package manager.

```text
Browser
  ├── index.html                 semantic structure, navigation, accessible dialog
  ├── styles/main.css            responsive layout + original theme
  ├── scripts/main.js            state + search + cards + quiz + completion
  └── data/missions.json         locally fetched source-cited educational records

Browser localStorage               optional local completion state
NASA Science sites                  outgoing primary-source links only
```

## Execution

The browser fetches `data/missions.json` when the page loads. It then renders mission cards and quiz content. The filter/search inputs affect cards immediately. Choosing a mission opens an HTML `<dialog>` with the learning materials and one three-question quiz. Completing a quiz saves that mission's ID under the local storage key `astromind.completedMissions.v1`.

The site is **not** connected to a NASA API and **does not** contact a server with quiz answers. Google Fonts, badge services in the README, the Figma prototype, YouTube, and NASA source pages are external resources when the user chooses or opens them; the core website works without their JavaScript libraries.

## Data contract

Each mission entry needs: unique `id`, `name`, `destination` (`Moon`, `Mars` or `Deep Space`), `eyebrow`, `hardware`, `launchDate`, optional `endDate`, `statusLabel`, `statusKind`, `summary`, `story`, `discoveries`, `facts`, `quiz`, `source`. Each quiz question holds `question`, `options`, integer `correctIndex`, `explanation`. Tests enforce key invariants.

### Adding a mission

1. Verify mission claims against a NASA primary-source page.
2. Add a new record to `data/missions.json` with a unique lowercase-hyphenated ID.
3. Add three fair, factual questions and explanations.
4. Update `metadata.lastReviewed` and `docs/DATA_SOURCES.md`.
5. Run `python -m unittest discover -s tests -v`.

## Security and privacy

- No user data is uploaded or intentionally tracked.
- The educational strings are escaped before insertion as HTML.
- NASA links are restricted to a small allowlist of HTTPS NASA hosts.
- Browser storage is optional; website exploration remains available if it is disabled.
- User-supplied photographs should not be added without permission.

## Accessibility considerations

- Semantic headings, a skip link, keyboard-operable buttons, real `<dialog>`, and accessible form labels are present.
- Quiz explanations use an `aria-live` region.
- The site reduces motion when the operating system requests reduced animation.
- The team should still test with assistive technologies and touch devices before declaring full WCAG compliance.
