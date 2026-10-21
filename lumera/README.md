# Loomora — “Small actions. One living world.”

Loomora is an all-ages collaborative world web application where real-life actions, learning, creativity, and helping others contribute directly to a shared, evolving virtual planet.

## 🌟 Core Features

1. **The Interactive Living Isle (Centerpiece Attraction)**:
   - Illustrated miniature archipelago with animated floating rocks, cascading waters, and swaying canopies.
   - 5 Discoverable Biomes:
     - 🌲 **Knowledge Forest**: Learning, teaching, and wisdom archives.
     - 🎨 **Creative Isles**: Art, poetry, and design creations.
     - 🌸 **Kindness Garden**: Real-world empathy, neighborly care, and lotus springs.
     - ⛰️ **Discovery Mountains**: Curiosities, puzzles, and starlight observatories.
     - 🏛️ **Community City**: Communal solar pavilions and group milestones.
   - Dynamic Landmark Vitality: Click on any landmark (e.g. *The Great Archive Oak*, *Prism Sculpture Cliffs*, *Lotus Spring of Care*) to inspect growth stages and community caretakers.
   - Ambiance Mode: Toggle between **Day**, **Golden Sunset**, and **Bioluminescent Starlight Night**.

2. **Daily Spark Missions**:
   - 6 Core Categories: *Learn*, *Create*, *Help*, *Discover*, *Connect*, and *Community*.
   - Interactive submission modal with character guidance, visual reward previews, and celebratory confetti.
   - Real-time reactivity: Completing a mission awards Sparks and instantly grows the associated planet landmark.

3. **The Collaborative Idea Chain (Key Differentiator)**:
   - Branching Knowledge Trees where members extend existing ideas.
   - Contribution types: *Extensions*, *Practical Examples*, *Beginner Explanations*, *Translations*, and *Creative Spins*.
   - Anti-duplication validation to ensure original insights.
   - "Plant New Idea Seed" modal to start new trees.

4. **Community Activity & Explore Stream**:
   - Live stream of contributions, mission completions, and tree sproutings.
   - Search by keyword and filter by category or contribution type.
   - Non-monetary applauds (likes) and safe reporting modal for age-appropriate safety.

5. **My Sanctuary (User Profile & Progression)**:
   - Customizable avatar, display name, motto, and chosen interests.
   - Transparent, non-monetary Sparks tracking and achievement gallery (*Seed Sower*, *Knowledge Weaver*, *Heart of the Grove*, etc.).
   - Full local persistence via browser `localStorage`.
   - "Reset Demo Data" option to restart or test from scratch anytime.

---

## 🚀 How to Run and Preview

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```

2. **Open in Your Browser**:
   Navigate to:
   ```
   http://localhost:5173/
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```
   To preview the production bundle:
   ```bash
   npm run preview
   ```

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Icons**: Lucide React
- **Micro-Delight**: Canvas Confetti
- **Styling**: Tailored Design System in `src/index.css` (Warm cream palette, forest greens, coral, sky blue, lavender, and starlight bioluminescence)
- **Persistence**: LocalStorage service layer (`src/services/storageService.ts`)
