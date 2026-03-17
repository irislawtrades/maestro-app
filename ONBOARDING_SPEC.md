# Onboarding Flow Spec — Replace LinkedIn Screens with Orbit

> ⚠️ **IMPORTANT: This is a UX/behavior spec only. Do NOT replace the app's existing UI, design system, components, or styling. Keep all existing visual design — colors, typography, spacing, component library, etc. Only implement the new flow logic, screens, and interactions described below using the app's current design language.**

## Overview
Replace the current LinkedIn onboarding flow (LinkedIn URL input → "Doing my homework" loading → Profile confirmation card) with a new **Orbit setup screen**. The orbit is a single screen where 4 setup steps orbit a central avatar. After all steps complete, it launches into the chat.

## Flow Change
```
OLD:  Sign up → LinkedIn input → Loading → Profile card → Chat
NEW:  Sign up → Orbit setup (4 steps) → Launch animation → Chat
```

## Orbit Setup Screen

### Layout
- **Dark universe theme** — deep dark background (near black/dark brown)
- **Center:** A glowing circular ring ("crown") with the user's selected avatar emoji inside. The avatar updates live as they pick one in step 3.
- **4 orbiting nodes** arranged in a ring around the center, slowly spinning (one full rotation every ~25 seconds). Each node is an emoji in a small circle:
  1. 🔗 LinkedIn (must complete first)
  2. ✏️ Name
  3. 🤓 Avatar
  4. 💬 Tone
- **Twinkling stars** scattered in the background (subtle, animated opacity)
- **Breathing animation** on the center ring (gentle scale pulse)
- **Counter-rotating nodes**: The ring of nodes spins clockwise, but each individual node counter-rotates so the emoji always faces upright

### Gating Logic
- **LinkedIn (🔗) must be completed first** — the other 3 nodes are visually locked (dimmed/grayed, no tap response) until LinkedIn is done
- After LinkedIn completes, all 3 remaining nodes unlock simultaneously
- Nodes can be completed in any order after LinkedIn
- Completed nodes get a subtle green checkmark or visual indicator
- Progress counter: "1 of 4", "2 of 4", etc. shown near bottom

### Step 1: LinkedIn (🔗)
Tap the 🔗 node → **Panel slides up** from bottom (bottom sheet style):
- LinkedIn URL text input with placeholder `linkedin.com/in/yourname`
- "Public profile only. We never post." trust note
- Continue button (activates when URL entered)
- This replaces the old full-screen LinkedIn input

### Step 2: Name (✏️)
Tap the ✏️ node → Panel slides up:
- "What should I call you?" heading
- Quick-pick chips with common names/nicknames (pre-populated from LinkedIn if available)
- Custom text input option
- Timezone dropdown selector
- Done button

### Step 3: Avatar (🤓)
Tap the 🤓 node → Panel slides up:
- "Pick your avatar" heading
- Grid of emoji options (👑🦊🐻🌟🔥🎨💎🚀 etc.)
- Option to open full emoji picker
- Option to upload a photo
- **When an emoji is selected, the center orbit avatar updates immediately** (live preview)

### Step 4: Tone (💬)
Tap the 💬 node → Panel slides up:
- "How should I write?" heading
- Tone options as selectable cards/chips: Casual, Professional, Friendly, Direct, etc.
- Live preview showing how a sample message would sound in the selected tone
- Done button

### Completion
When all 4 nodes are done:
- "All set." text appears (italic, coral/accent color)
- "Launch [Name] →" button appears with coral/accent background
- Tapping it triggers the **launch animation**

### Launch Animation Sequence
1. **Orbit speeds up** — ring rotation goes from 25s to ~3s
2. **Nodes converge** — one by one (staggered ~0.12s apart), each node flies toward the center and fades out
3. **Subtle warm glow** appears at center (warm amber, not blinding white — keep it within ~1.5x the center ring size)
4. **"Getting everything ready..."** text appears in the lower portion of the screen
5. **Crossfade** to the chat screen

## Chat Flow Updates

After the orbit, the chat opens. The chat is a **phase-based state machine** (phases 1–8). Here's the full sequence:

### Phase 1: Introduction
- AI sends intro message personalized with context from LinkedIn
- Suggestion chips appear at bottom: topics like "Design feedback loops", "Stakeholder reviews", etc.
- Text input available below chips

### Phase 2: Feature pitch
- User selects a chip → AI responds with capabilities relevant to that topic
- CTA button: "Yes, let's connect my apps →"

### Phase 3: App connection carousel
- Horizontal swipeable carousel of 3 app cards: Gmail, Figma, Slack
- Each card has Connect button that opens a bottom sheet (OAuth-style for Gmail/Slack, API key for Figma)
- Connected cards show green border + "✓ Connected" badge
- "Skip for now" option (shows nudge modal if skipping all)
- "Continue →" button when done

### Phase 4: Decision card demo
- Swipeable email draft card (swipe right = approve, swipe left = skip)
- Card has: email subject, recipient, draft text with Edit option
- Also has tap buttons: ← Skip, ↓ Later, Approve →
- Auto-demo animation on first view: card sways left/right with finger emoji
- After approve: in-place "✓ Approved · Reply sent" confirmation
- Preview banner: "This is just a test — nothing is actually sent."

### Phase 5: Post-demo
- AI message: "Exactly like that. Every task that comes through works the same way — swipe to approve, skip, or save."

### Phase 6: Morning brief pitch
- AI describes the morning brief feature (weather, emails, Figma, calendar, LinkedIn trends, launches)
- CTA: "Set up my brief →"
- Time picker chips: 6:00 AM through 9:00 AM

### Phase 7: Brief preview
- After picking a time, AI says "Here's what a typical brief looks like:"
- **iOS lock screen notification mockup** appears as a card in the chat:
  - Dark gradient background with lock icon, large time display, date
  - Frosted glass notification card fades in (0.6s ease-out, 1.5s delay):
    - App avatar + "NOVA" header + "now" timestamp
    - "🌧️ It's going to rain today — remember your umbrella!"
    - "6 emails waiting, 3 Figma comments, 2 meetings today. Tap to review your brief."
  - This mockup stays in chat history when scrolling back
- "Continue" button below the mockup

### Phase 8: Final setup
- "Almost there — putting everything together now." system divider
- AI: "Setting you up..."
- AI: "You're all set, [Name]! I'm already scanning your tools. Here's what I can do for you — just tap a prompt to try:"
- Push notification banner slides down from top (auto-hides after 5s)
- 4 prompt chips appear:
  - 📬 What's in my inbox?
  - 📅 What's on my calendar today?
  - ⚡ What needs my attention right now?
  - 📝 Draft a reply to my last email
- "Message [Name]..." input bar
- Header subtitle changes from "Getting to know you" → "I'm ready to help"

## Tab Navigation

Bottom tab bar with 3 tabs: **Chat** | **Activity** | **Settings**

### Activity Tab (Empty State)
- "Activity" title + subtitle
- Empty state: 📋 "Nothing here yet" + description
- 3 app connection rows (Gmail, Calendar, Slack) with gold "Connect →"
- "WHAT YOU'LL SEE HERE" section:
  - ✅ Approved items — Emails sent, meetings rescheduled, replies posted
  - ⏳ Pending items — Tasks saved for later
  - ✕ Skipped items — Dismissed items

### Settings Tab
- Header with 🔔 notification bell
- **This Week card:** "4.2h saved", "↑ 12% from last week", bar chart (M-T-W-T-F-S-S), "See All Activity ›"
- **Your Apps:** Gmail, Calendar rows with "Tap to connect →"
- **Add App** button (dashed border)

### Settings → Notifications (bottom sheet)
- Morning Brief — Daily summary at 8:00 AM (toggle ON)
- Decision Cards — When [Name] needs your approval (toggle ON)
- Urgent Only — Time-sensitive items only (toggle OFF)
- Quiet Hours — Silence from 10 PM – 8 AM (toggle OFF)

### Settings → All Activity (sub-screen)
- Filter pills: All | ✓ Done | ⏳ Saved | ✕ Skipped
- Activity list with status icons, app source dots, timestamps
- Sample items: Reply sent to Raad Ahmed (Gmail, 2h), Marketing Sync rescheduled (Calendar, 3h), etc.

### Settings → Add App (bottom sheet)
- Slack (#️⃣ Messages & @mentions) — Login
- GitHub (🐙 PRs, issues & code reviews) — API key
- Notion (📝 Docs, tasks & wikis) — API key
- Linear (💎 Issues & project tracking) — API key
- Figma (🎨 Design comments & handoffs) — API key
- Apollo (🚀 CRM & sales sequences) — API key
- Google Docs (📄 Documents & comments) — API key

### Connect Gmail (bottom sheet, from Activity or Settings)
- "Connect Gmail" + "Login required" + Cancel
- "[Name] WILL BE ABLE TO" section:
  - ✓ Read & send emails on your behalf
  - ✓ Detect emails needing replies
  - ✓ Mark emails as read
- Trust note: "🔒 [Name] never sends anything without your approval. You can disconnect anytime in Settings."
- "Sign in with Google" button

## Design Notes
- All font weights should be 400 (regular) — no bold anywhere
- This spec describes UX flow and behavior, not final visual design — use the app's existing design system for UI
- The orbit is a replacement for the old LinkedIn input → loading → profile card flow
- The chat phases are a scripted onboarding experience, not a real AI conversation
- Everything inside the phone mockup frame

---

## Code Reference — Animation & Logic

The prototype's full source is at `src/App.jsx` in the repo. Below are the key code blocks for animations and logic that Cursor should use as reference. **Adapt these to your app's framework/styling — don't copy inline styles.**

### Orbit Keyframes

```css
@keyframes twinkle { 0%,100%{opacity:0.1} 50%{opacity:0.6} }
@keyframes breathe { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.3} 50%{transform:translate(-50%,-50%) scale(1.1);opacity:0.7} }
@keyframes spinCW { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes spinCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes orbitSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes orbitCounter { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
@keyframes mergeIn { to{width:0;height:0;opacity:0} }
@keyframes sparkGlow { 0%{box-shadow:0 0 0 rgba(200,130,70,0)} 50%{box-shadow:0 0 30px 15px rgba(200,130,70,0.35), 0 0 60px 30px rgba(200,120,60,0.15)} 100%{box-shadow:0 0 40px 20px rgba(200,130,70,0.25), 0 0 70px 35px rgba(200,120,60,0.08)} }
@keyframes sparkRing { from{width:0;height:0;opacity:0.6;border-width:2px} to{width:140px;height:140px;opacity:0;border-width:1px} }
@keyframes setupSlideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
```

### Orbit Node Positioning (circular layout)

```js
// 4 nodes positioned on a circle of radius `nodeRadius`
const nodeRadius = 130
const setupNodes = [
  { emoji:'🔗', label:'LinkedIn', angle:270 },  // top
  { emoji:'✏️', label:'Name', angle:0 },         // right
  { emoji:'🤓', label:'Avatar', angle:90 },      // bottom
  { emoji:'💬', label:'Tone', angle:180 },        // left
]

// For each node, calculate position on the orbit ring:
const rad = (node.angle * Math.PI) / 180
const x = Math.cos(rad) * nodeRadius + nodeRadius
const y = Math.sin(rad) * nodeRadius + nodeRadius
```

### Orbit Container Spin + Counter-rotation

```js
// The node container spins as a group (clockwise, 25s normal, 3s when fast)
// Each individual node counter-rotates so emoji stays upright

// Container:
animation: spinFast ? 'orbitSpin 3s linear infinite' : 'orbitSpin 25s linear infinite'

// Each node inside:
animation: spinFast ? 'orbitCounter 3s linear infinite' : 'orbitCounter 25s linear infinite'
```

### Node Merge Animation (converge to center)

```js
// When merging, each node transitions to the center point with staggered delay
// `merging` state = true triggers this

// Each node's style when merging:
left: merging ? centerX : x - 24,
top: merging ? centerY : y - 24,
opacity: merging ? 0 : 1,
transition: merging
  ? `left 0.6s cubic-bezier(0.4,0,0.2,1) ${idx*0.12}s,
     top 0.6s cubic-bezier(0.4,0,0.2,1) ${idx*0.12}s,
     opacity 0.4s ease ${idx*0.12}s`
  : undefined
```

### Launch Animation Sequence (handleLaunch)

```js
const handleLaunch = () => {
  // Phase 1: Speed up spin (0ms)
  setSpinFast(true)

  // Phase 2: Nodes converge to center one-by-one (800ms)
  setTimeout(() => setMerging(true), 800)

  // Phase 3: Warm amber glow on center ring (1600ms)
  setTimeout(() => setSparking(true), 1600)

  // Phase 4: Fade out the orbit view (2400ms)
  setTimeout(() => setExiting(true), 2400)

  // Phase 5: Show "Getting everything ready..." (3000ms)
  setTimeout(() => setLoadingScreen(true), 3000)

  // Phase 6: Fade loading and transition to chat (5400ms → 6000ms)
  setTimeout(() => setLoadingFade(true), 5400)
  setTimeout(() => onComplete(selectedAvatar, displayName), 6000)
}
```

### Gating Logic

```js
// LinkedIn (index 0) must be completed first
const handleNodeTap = (idx) => {
  if (idx !== 0 && !completedSteps.has(0)) return  // locked
  setActiveStep(idx)
  setOpenPanel(idx)
}

// Visual: locked nodes have opacity 0.15, inactive 0.25, active 1.0
// Completed nodes get green border + green checkmark badge
```

### Twinkling Stars (background)

```js
// Generate 50 random stars with varied size, speed, delay
const stars = Array.from({length: 50}, () => ({
  left: Math.random() * 100,   // % position
  top: Math.random() * 100,
  size: 1.5 + Math.random() * 0.5,  // px
  duration: 2 + Math.random() * 2.8, // seconds
  delay: Math.random() * 3,
}))
// Each star uses: animation: twinkle ${duration}s ease-in-out ${delay}s infinite
```

### Swipe Card (Phase 4 — email approval demo)

```js
// Drag detection with direction lock (horizontal vs vertical)
// Touch handlers with threshold of 40px to trigger action

const onTouchStart = (e) => {
  sx = e.touches[0].clientX; sy = e.touches[0].clientY
  locked = null; dragging = false
}
const onTouchMove = (e) => {
  const dx = touch.clientX - sx
  const dy = touch.clientY - sy
  // Lock direction on first significant move
  if (locked === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
    locked = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v'
  }
  if (locked === 'h') {
    e.preventDefault()  // prevent scroll
    setCardDragX(dx)
  }
}
const onTouchEnd = () => {
  if (dx > 40) handleCardAction('approve')
  else if (dx < -40) handleCardAction('skip')
  else setCardDragX(0)  // snap back
}

// Card transform follows drag:
transform: `translateX(${cardDragX}px) rotate(${cardDragX * 0.05}deg)`
transition: dragging ? 'none' : 'transform 0.3s ease'
```

### Auto-demo Animation (swipe hint)

```css
@keyframes cardDemo {
  0% { transform:translateX(0) rotate(0deg) }
  20% { transform:translateX(60px) rotate(3deg) }
  40% { transform:translateX(60px) rotate(3deg) }
  55% { transform:translateX(0) rotate(0deg) }
  65% { transform:translateX(-60px) rotate(-3deg) }
  80% { transform:translateX(-60px) rotate(-3deg) }
  100% { transform:translateX(0) rotate(0deg) }
}
@keyframes fingerDemo {
  0% { opacity:0; transform:translate(0,0) }
  10% { opacity:1; transform:translate(0,0) }
  20% { opacity:1; transform:translateX(60px) }
  40% { opacity:1; transform:translateX(60px) }
  55% { opacity:1; transform:translateX(0) }
  65% { opacity:1; transform:translateX(-60px) }
  80% { opacity:1; transform:translateX(-60px) }
  90% { opacity:1; transform:translateX(0) }
  100% { opacity:0; transform:translateX(0) }
}
```

### Lock Screen Notification (Phase 7)

```css
@keyframes lockNotifIn {
  0% { transform:translateY(10px); opacity:0 }
  100% { transform:translateY(0); opacity:1 }
}
/* Usage: animation: lockNotifIn 0.6s ease-out 1.5s both */
```

### Chat Phase State Machine

```js
// Phases 1-8, driven by `phase` state
// Each phase transition queues messages with typing indicators
// Message types: 'ai', 'user', 'system', 'approved', 'lockscreen', 'checklist'
// 'typing' messages show bouncing dots, 'wait' pauses for user interaction
// waitingForUser state controls when interactive elements (chips, buttons) appear

const queueMessages = (msgs) => {
  // Process one at a time:
  // - 'typing': show dots for duration, then remove
  // - 'wait': set waitingForUser=true, stop processing
  // - anything else: add to messages array, continue after 300ms
}
```

## Reference
- Working prototype: https://github.com/irislawtrades/maestro-app
- Full source: `src/App.jsx` (single file, ~1900 lines)
- Run locally: `npm install && npm run dev`
