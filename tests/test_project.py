"""Standard-library checks for AstroMind's static educational website."""
import json
import re
import unittest
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "data" / "missions.json").read_text(encoding="utf-8"))


class MissionLibraryTests(unittest.TestCase):
    def test_metadata_is_versioned(self):
        metadata = DATA["metadata"]
        self.assertTrue(metadata["title"])
        date.fromisoformat(metadata["lastReviewed"])
        self.assertRegex(metadata["version"], r"^\d+\.\d+\.\d+$")

    def test_missions_are_unique_and_nonempty(self):
        missions = DATA["missions"]
        self.assertGreaterEqual(len(missions), 6)
        ids = [mission["id"] for mission in missions]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertTrue(all(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", i) for i in ids))

    def test_missions_have_valid_fields(self):
        required = {"id", "name", "destination", "eyebrow", "hardware", "launchDate", "endDate", "statusLabel", "statusKind", "summary", "story", "discoveries", "facts", "quiz", "source"}
        for mission in DATA["missions"]:
            with self.subTest(mission=mission["id"]):
                self.assertTrue(required.issubset(mission))
                self.assertIn(mission["destination"], {"Moon", "Mars", "Deep Space"})
                self.assertIn(mission["statusKind"], {"active", "retired"})
                date.fromisoformat(mission["launchDate"])
                if mission["endDate"]:
                    self.assertGreaterEqual(date.fromisoformat(mission["endDate"]), date.fromisoformat(mission["launchDate"]))
                self.assertGreater(len(mission["story"]), 100)
                self.assertGreaterEqual(len(mission["discoveries"]), 2)
                self.assertGreaterEqual(len(mission["facts"]), 2)
                for fact in mission["facts"]:
                    self.assertTrue(fact["label"] and fact["value"])

    def test_official_source_links(self):
        for mission in DATA["missions"]:
            with self.subTest(mission=mission["id"]):
                u = urlparse(mission["source"])
                self.assertEqual(u.scheme, "https")
                self.assertIn(u.hostname, {"www.nasa.gov", "nasa.gov", "science.nasa.gov", "www.jpl.nasa.gov"})

    def test_quizzes_have_good_answers(self):
        for mission in DATA["missions"]:
            with self.subTest(mission=mission["id"]):
                self.assertEqual(len(mission["quiz"]), 3)
                for question in mission["quiz"]:
                    self.assertTrue(question["question"] and question["explanation"])
                    self.assertEqual(len(question["options"]), 4)
                    self.assertEqual(len(set(question["options"])), 4)
                    self.assertIs(type(question["correctIndex"]), int)
                    self.assertGreaterEqual(question["correctIndex"], 0)
                    self.assertLess(question["correctIndex"], len(question["options"]))

    def test_active_contrast_is_not_mislabeled_as_abandoned(self):
        voyager = next(m for m in DATA["missions"] if m["id"] == "voyager-1")
        self.assertEqual(voyager["statusKind"], "active")
        self.assertIsNone(voyager["endDate"])
        self.assertIn("active", voyager["statusLabel"].lower())

    def test_static_paths_exist(self):
        for path in ("index.html", "styles/main.css", "scripts/main.js", "assets/icons/rocket.svg", "README.md", ".github/workflows/validate.yml"):
            with self.subTest(path=path):
                self.assertTrue((ROOT / path).is_file())
        # The two user-owned image files intentionally are added after unpacking.
        for path in ("astro-mind-cover.png", "orbit-smiths-team.png"):
            self.assertIn(path, (ROOT / "README.md").read_text(encoding="utf-8"))
            self.assertIn(path, (ROOT / "styles/main.css").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
