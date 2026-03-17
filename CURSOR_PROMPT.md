# Cursor Instructions

## What you have
1. **ONBOARDING_SPEC.md** — Detailed UX behavior spec for the new onboarding flow
2. **src/App.jsx** — Working React prototype with all animations, logic, and state machines. This is the reference implementation.

## What to do

**Replace the existing LinkedIn onboarding flow** (LinkedIn URL input → "Doing my homework" loading → Profile confirmation card) **with the Orbit setup screen** from the prototype.

### Steps:
1. Read `ONBOARDING_SPEC.md` for the full flow description and behavior
2. Read `src/App.jsx` for the actual implementation code — keyframes, state logic, animation sequences, component structure
3. Extract the relevant pieces (SetupScreen, ChatScreen phases, Activity/Settings tabs) and adapt them to this app's existing codebase

### Critical rules:
- ⚠️ **Do NOT change the app's existing UI/design system.** Keep all existing colors, typography, spacing, and component library intact.
- **Only implement the new flow, screens, and interactions** using the app's current design language
- The prototype uses inline React styles — translate these to whatever styling approach this app uses (CSS modules, Tailwind, styled-components, etc.)
- The prototype is a single-file React app — break it into proper components following this project's file structure
- All `fontWeight` should be 400 (regular) — no bold text anywhere

### Key code to extract from App.jsx:
- **SetupScreen** (~line 292): Orbit setup with 4 nodes, gating logic, panels, launch animation
- **Keyframes** (~line 263): `setupKeyframes` string with all orbit animations (twinkle, breathe, spinCW/CCW, orbitSpin/Counter, mergeIn, sparkGlow, sparkRing)
- **Star generation** (~line 278): Random twinkling stars background
- **Node positioning math** (~line 437): Circular layout using angle → radians → x/y
- **Launch sequence** (~line 301): 6-phase timed animation (spin fast → merge → spark → fade → loading → transition)
- **Chat phase machine** (~line 718+): 8-phase state machine with message queue, typing indicators
- **Swipe card** (~line 865+): Touch handlers with direction lock, drag threshold, auto-demo animation
- **Lock screen mockup** (~line 1067+): Fake iOS notification in chat
- **Activity/Settings** (~line 1547+): Tab navigation, bottom sheets, toggle switches
