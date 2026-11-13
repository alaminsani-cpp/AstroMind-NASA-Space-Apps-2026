# Contributing to AstroMind

Thanks for helping make space science more accessible.

## Before you make a change

1. Coordinate with the Team Orbit_Smiths repository maintainer.
2. Prefer small commits and describe what changed.
3. For NASA facts, verify the source before editing the mission data.
4. For added screenshots or media, confirm consent and licensing.
5. Avoid publishing personal data, API keys, or unpublished submission materials.

## How to check changes

```bash
python -m unittest discover -s tests -v
python -m http.server 8000
```

Test the web UI on desktop and mobile, including keyboard navigation and quiz flow. For new JSON records, update `docs/DATA_SOURCES.md` and the review date.

## Pull request checklist

- [ ] Description explains the change and any affected screens.
- [ ] Tests pass.
- [ ] Scientific statements cite reliable NASA sources.
- [ ] New images and fonts have documented usage rights.
- [ ] Documentation accurately distinguishes implemented and proposed functionality.
