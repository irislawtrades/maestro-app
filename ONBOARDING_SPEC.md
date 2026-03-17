# Onboarding Flow Spec — Replace LinkedIn Screens with Orbit

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

## Reference
- Working prototype: https://github.com/irislawtrades/maestro-app
- Run locally: `npm install && npm run dev`
