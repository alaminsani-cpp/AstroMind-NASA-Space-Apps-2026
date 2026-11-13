<div align="center">

# 🚀 ASTROMIND

### Where missions end, discoveries begin.

**An interactive learning experience about the machines that explored our solar system — and the science they left behind.**

**Team Orbit_Smiths • NASA Space Apps Challenge 2026**

[![NASA Space Apps 2026](https://img.shields.io/badge/NASA_Space_Apps-2026-0B3D91?style=for-the-badge)](https://www.spaceappschallenge.org/2026/challenges/)
[![Project](https://img.shields.io/badge/Project-AstroMind-FFC83D?style=for-the-badge&labelColor=22283B)](#about-astromind)
[![Prototype](https://img.shields.io/badge/Prototype-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/proto/OkwNxRuUFlf88F82MKg0HP/Nasa-space-app-challenge-2026?node-id=48-3&t=hzxmppfxNdOJ6Eyk-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A6&show-proto-sidebar=1)
[![Demo](https://img.shields.io/badge/Project_Video-YouTube-FF0033?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=c4obotsspJE)

<!-- Put the first supplied image at assets/images/astro-mind-cover.png -->
<img src="assets/images/astro-mind-cover.png" width="920" alt="AstroMind game start screen featuring two astronauts and a rocket" />

*The original mobile game concept. The `index.html` web experience in this repository is an additional interactive companion demo, not an exact recreation of every Figma screen.*

**[Explore the web demo](#run-the-web-demo) · [Original Figma prototype](https://www.figma.com/proto/OkwNxRuUFlf88F82MKg0HP/Nasa-space-app-challenge-2026?node-id=48-3&t=hzxmppfxNdOJ6Eyk-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A6&show-proto-sidebar=1) · [Watch the video](https://www.youtube.com/watch?v=c4obotsspJE)**

</div>

---

## 🌌 About AstroMind

From the dusty plains of Mars to the silent valleys of the Moon, humans have left remarkable machines far from Earth. Some rovers completed their missions and never came home. Some spacecraft ended their journeys deliberately. Others, like Voyager 1, are **still exploring**.

**AstroMind** is Team Orbit_Smiths' response to the NASA Space Apps Challenge 2026 prompt **“Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars.”** We tell accessible, scientifically grounded stories about these explorers so younger learners can discover *what they did, why they mattered, and what came next*.

Our original vision is a visual, mission-based game. This repository also contains a runnable, lightweight **browser companion prototype** that demonstrates the educational content and quiz loop without requiring a framework, API key, or build step.

### The challenge we address

Science missions often end far from the public eye. Their spacecraft may become silent, but their discoveries remain foundational. How can students learn the human and scientific story behind the hardware rather than memorizing a list of mission names?

### Our approach

**Choose a destination → Explore the mission's story → Discover the scientific legacy → Answer a knowledge check.**

For the official challenge description, see the [NASA Space Apps Challenge site](https://www.spaceappschallenge.org/2026/challenges/).

---

## ✨ What you can explore

| Experience | In this repository | Notes |
|---|---|---|
| 🌙 Moon, 🔴 Mars, ✨ deep-space mission library | ✅ Working | Six curated stories in `data/missions.json` |
| 🔎 Destination filters and mission search | ✅ Working | Browser demo |
| 📖 Mission story, legacy, quick facts and NASA link | ✅ Working | NASA-sourced educational summaries |
| 🧠 Three-question quiz per mission | ✅ Working | Immediate explanations, replay supported |
| ⭐ Completion progress | ✅ Working | Saved only in the current browser via local storage |
| 📱 Responsive, keyboard-friendly web UI | ✅ Working | No framework or API key required |
| 🎨 Cinematic mobile game screens | 🔗 Original Figma prototype | Linked above; distinct from the browser demo |
| 🧑‍🚀 3D environments and animated gameplay | 🛠️ Design direction / future work | Not implemented by this repo's HTML demo |
| 🛰️ Live NASA API / telemetry | ❌ Not implemented | Mission information is curated and cited, not streamed live |

*Implementation labels describe the files in this ZIP, not unverified features of the separate mobile game.*

## 🪐 Featured mission stories

| Destination | Explorer | What makes its story matter? | NASA reference |
|---|---|---|---|
| Moon | **Apollo 17 lunar rover** | Hardware stayed behind; the crew's observations and samples returned. | [NASA](https://www.nasa.gov/mission/apollo-17/) |
| Moon | **Surveyor 3** | Its soil tests informed Apollo; Apollo 12 later returned some parts. | [NASA](https://science.nasa.gov/mission/surveyor-3/) |
| Mars | **Opportunity** | Lasted almost 15 years and revealed evidence of Mars's watery history. | [NASA](https://science.nasa.gov/mission/mer-opportunity/) |
| Mars | **Spirit** | Explored ancient wet conditions, then remained on Mars after contact ceased. | [NASA](https://science.nasa.gov/mission/mer-spirit/) |
| Saturn | **Cassini–Huygens** | Studied Saturn's moons; Cassini was intentionally destroyed to protect them. | [NASA](https://science.nasa.gov/mission/cassini/) |
| Interstellar space | **Voyager 1** | An *active*, non-abandoned contrast case that keeps the story open. | [NASA](https://science.nasa.gov/mission/voyager/voyager-1/) |

> **Scientific distinction:** Cassini was not abandoned intact on a surface, and Voyager 1 remains active. Both are included to compare different possible endings to spacecraft missions. NASA facts have a `lastReviewed` date; current spacecraft conditions should always be checked directly with NASA.

---

## 💻 Run the web demo

Requires **Python 3** (or another basic static file server). No installation of packages is necessary.

```bash
# From the repository root
python -m http.server 8000
```

Open **http://localhost:8000** in your browser. On Windows, if `python` is not on your PATH, try `py -m http.server 8000`.

For a quick check of the curated mission dataset:

```bash
python -m unittest discover -s tests -v
```

**Why use a server?** Browsers frequently block `fetch('data/missions.json')` when `index.html` is opened directly as a `file://` URL. A local static server resolves this.

### Add the two supplied images before publishing

The images are **intentionally not included** in this ZIP, so you can place the two originals yourself:

| Your uploaded image | Exact destination filename |
|---|---|
| AstroMind opening screen (rocket and two astronauts) | `assets/images/astro-mind-cover.png` |
| Team Orbit_Smiths group portrait | `assets/images/orbit-smiths-team.png` |

Use these **exact lowercase filenames**. They are referenced by both the README and website CSS. The website works without them, but the graphical placeholders will not show the actual artwork until the images are added. See [image instructions](assets/images/README.md).

---

## 🗂️ Repository layout

```text
AstroMind-NASA-Space-Apps-2026/
├── README.md                     # Project showcase + setup
├── index.html                    # Working responsive browser demo
├── styles/main.css               # Site styles
├── scripts/main.js               # Mission filters, dialogs, quiz, progress
├── data/missions.json            # Source-cited educational mission records
├── assets/
│   ├── icons/rocket.svg          # Original simple vector mark
│   └── images/
│       ├── astro-mind-cover.png   # ADD YOUR FIRST IMAGE HERE
│       └── orbit-smiths-team.png  # ADD YOUR SECOND IMAGE HERE
├── docs/                         # Architecture, sources, team, AI, deployment
├── tests/test_project.py         # Data and project integrity checks
├── .github/workflows/validate.yml
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

## 🛠️ Technologies

**This repository's companion demo:** HTML5, CSS3, vanilla JavaScript, JSON, Python standard-library tests, GitHub Actions.

**Project design / media tools acknowledged by the existing project documentation:** Figma for interaction design; Filmora for video editing; Google Flow for visual/video generation; ChatGPT for brainstorming and scripting assistance. They are **not** runtime dependencies of this web demo.

### Technical notes

- All mission data lives in [one readable JSON file](data/missions.json).
- Searches and destination filters run locally in the browser.
- Quiz progress is device-local and can be reset. No user account or external analytics are configured.
- External links point to original NASA mission pages for independent verification.
- The site does **not** claim live telemetry or a NASA API connection.

Read [Technical architecture](docs/ARCHITECTURE.md) and [Research and data provenance](docs/DATA_SOURCES.md).

---

## 👨‍🚀 Meet Team Orbit_Smiths

<!-- Put the second supplied image at assets/images/orbit-smiths-team.png -->
<div align="center">
  <img src="assets/images/orbit-smiths-team.png" width="940" alt="Meet Team Orbit_Smiths: six contributors to the AstroMind project" />
</div>

| # | Team member | Project role |
|---:|---|---|
| 01 | **Kamrul Islam** | Team Lead |
| 02 | **Sajjadul Islam** | Researcher |
| 03 | **Mithun Modak** | UI Designer |
| 04 | **Al Amin Sani** | Developer |
| 05 | **Shamim Pramanik** | Video Editor |
| 06 | **Keya Akter Soma** | Script Writer |

*Role labels are transcribed from the supplied team graphic. The numbering in this table runs 01–06 for clarity.*

---

## 🧭 Roadmap

- [x] Assemble NASA-sourced learning content for six example missions.
- [x] Build a standalone responsive web-based educational mission explorer.
- [x] Add filters, search, mission briefs, quizzes, and local completion tracking.
- [x] Add automated dataset validation and clear documentation.
- [ ] Add your two official project images to `assets/images/`.
- [ ] Review copy and mission selection with the whole team.
- [ ] Link the final public deployment once GitHub Pages is enabled.
- [ ] Integrate original interactive game assets/source **only when authorized and available**.
- [ ] Expand the mission library, accessibility testing, and classroom feedback.

See [Features and roadmap](docs/ROADMAP.md) and [Deployment guide](docs/DEPLOYMENT.md).

## 🧪 Research, sourcing, and responsible AI use

The stories are **educational summaries** derived from publicly available NASA materials, not an official dataset or a substitute for the primary sources. Each mission record includes a direct NASA source URL, and [the source ledger](docs/DATA_SOURCES.md) explains what was checked and when.

AI-assisted content drafting and prototyping are disclosed in [AI_USE.md](docs/AI_USE.md). Contributors should verify every scientific statement against the linked primary source before publishing new data. All project artwork and external media remain subject to their respective ownership and usage terms.

## 🌍 Credits and disclaimer

Made by **Team Orbit_Smiths** for the **2026 NASA Space Apps Challenge**. We thank NASA and JPL for their open educational mission information. This is an **independent student project**, not an official NASA product or an endorsement by NASA. The NASA name and NASA Space Apps Challenge name are used for attribution and context.

The **MIT license** applies to the original example website code and related materials authored for this repository; it does not automatically grant rights to the NASA name, third-party media, uploaded team photos, logos, or other externally owned artwork. See [LICENSE](LICENSE) and [asset notes](assets/images/README.md).

---

<div align="center"><strong>🚀 Spacecraft may stop speaking. Their discoveries never have to.</strong><br><sub>AstroMind • Team Orbit_Smiths • 2026</sub></div>
