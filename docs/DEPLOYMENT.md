# GitHub upload and deployment

## 1. Add the supplied images

Copy the provided two PNGs into `assets/images/` as:

- `astro-mind-cover.png`
- `orbit-smiths-team.png`

The paths are referenced directly from `README.md` and `styles/main.css` and must match exactly.

## 2. Verify locally

From the unzipped root folder:

```bash
python -m unittest discover -s tests -v
python -m http.server 8000
```

Visit `http://localhost:8000`, open each mission, finish a quiz, test searching, and confirm the screenshots and team photo show up.

## 3. Push to the existing repository

**Please back up or pull the existing repository first.** Its current `main` branch contains earlier documentation and has its own commit history. Do not blindly force-push a replacement ZIP.

Recommended approach from a clone:

```bash
git clone https://github.com/kamrulpi2/Astromind_NASA-space-Apps-Challenge-2026.git
cd Astromind_NASA-space-Apps-Challenge-2026
# Copy the contents of this new starter folder here (not the outer ZIP folder).
git add .
git commit -m "Add AstroMind web companion, documentation and mission data"
git push origin main
```

**Important:** Review whether to keep, move, or delete the original `Data` file after the new `docs/VIDEO_OUTLINE.md` has been checked. For safety, keep your old content until a teammate confirms it can be reorganized.

If you do not have write access, ask the repository owner to grant appropriate access or submit a pull request from your own fork.

## 4. Enable GitHub Pages (optional)

1. Open repository **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Choose `main` and `/ (root)`; then save.
4. Wait for the deployment to show a live URL, and check whether the mission data loads. (Do not guess the deployment URL.)
5. Add the confirmed link to the README and repository About section.

This is a static site: no secrets, private API keys, build tools, or backend configuration are needed.

## 5. Before presenting to judges

- [ ] Confirm all six team member names and roles.
- [ ] Confirm rights to publish artwork, faces, logos, media and AI assets.
- [ ] Ensure all linked demos are accessible to viewers.
- [ ] Replace any planned-feature language with verified implementation language.
- [ ] Check NASA mission fact links and source-review date.
- [ ] Test both mobile and desktop views.
