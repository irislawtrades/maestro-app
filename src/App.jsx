import { useState, useRef, useEffect } from 'react'

function PhoneFrame({ children }) {
  return (
    <div style={{
      position: 'relative', width: 430, height: 960,
      transform: 'scale(0.807292)', transformOrigin: 'center center', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 58,
        background: 'linear-gradient(160deg, rgb(58,58,60) 0%, rgb(28,28,30) 40%, rgb(42,42,44) 100%)',
        boxShadow: 'rgb(74,74,76) 0 0 0 1px, rgb(85,85,85) 0 0 0 1px inset, rgba(0,0,0,0.7) 0 40px 100px, rgba(0,0,0,0.4) 0 0 60px',
      }} />
      <div style={{ position:'absolute', left:-4, top:160, width:4, height:38, background:'rgb(58,58,60)', borderRadius:'3px 0 0 3px', boxShadow:'rgb(85,85,85) -1px 0 0' }} />
      <div style={{ position:'absolute', left:-4, top:212, width:4, height:38, background:'rgb(58,58,60)', borderRadius:'3px 0 0 3px', boxShadow:'rgb(85,85,85) -1px 0 0' }} />
      <div style={{ position:'absolute', left:-4, top:110, width:4, height:28, background:'rgb(58,58,60)', borderRadius:'3px 0 0 3px', boxShadow:'rgb(85,85,85) -1px 0 0' }} />
      <div style={{ position:'absolute', right:-4, top:190, width:4, height:72, background:'rgb(58,58,60)', borderRadius:'0 3px 3px 0', boxShadow:'rgb(85,85,85) 1px 0 0' }} />
      <div style={{ position:'absolute', inset:12, borderRadius:48, overflow:'hidden', background:'rgb(250,248,245)' }}>
        <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', width:120, height:34, background:'#000', borderRadius:20, zIndex:100 }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', fontFamily:'-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>
          {children}
        </div>
      </div>
      <div style={{ position:'absolute', inset:12, borderRadius:48, pointerEvents:'none', background:'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)' }} />
    </div>
  )
}

/* ───── SPLASH ───── */
function SplashScreen({ onGetStarted, onSkip }) {
  return (
    <div style={{ flex:1, overflow:'hidden' }}>
      <div style={{ height:'100%', background:'rgb(245,235,228)', display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div style={{ flex:'0 0 44%', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop:50 }}>
          <video src="/splash.webm" autoPlay loop muted playsInline style={{ height:'80%', width:'80%', objectFit:'contain' }} />
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'24px 24px 40px' }}>
          <div style={{ fontSize:13, color:'rgb(138,122,106)', textAlign:'center', marginBottom:4, fontWeight:400 }}>Your first AI employee</div>
          <div style={{ fontFamily:'Georgia, serif', fontSize:40, color:'rgb(42,31,26)', textAlign:'center', lineHeight:1.1, marginBottom:10 }}>Meet Maestro</div>
          <div style={{ fontSize:14, color:'rgb(138,122,106)', textAlign:'center', lineHeight:1.55, marginBottom:'auto' }}>It thinks ahead, stays organized, and works like it's been here for years.</div>
          <button onClick={onGetStarted} style={{ width:'100%', height:56, borderRadius:28, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:17, fontWeight:400, fontFamily:'inherit', cursor:'pointer', letterSpacing:'-0.01em' }}>Get Started</button>
          <button onClick={onSkip} style={{ background:'none', border:'none', fontSize:13, color:'rgb(138,122,106)', fontFamily:'inherit', cursor:'pointer', marginTop:12, textAlign:'center', width:'100%' }}>Skip →</button>
        </div>
      </div>
    </div>
  )
}

/* ───── ONBOARDING CAROUSEL ───── */
const slides = [
  { image:'/illus-hands.png', title:'Your first AI employee.', desc:'An intelligent being that works beside you — handling context, drafting replies, and keeping your world organized.' },
  { image:'/illus-blocks.png', title:'Keeps things in motion.', desc:'A calm operator in the background — catching context, holding threads, and teeing up the next move before you ask.' },
  { image:'/illus-wand.png', title:'Learns your rhythm fast.', desc:'The more it works beside you, the more it picks up your pace, your people, and the kind of follow-through you actually want.' },
]

function OnboardingScreen({ onSignUp, onLogIn }) {
  const [cur, setCur] = useState(0)
  const startX = useRef(null)
  const swipe = (diff) => {
    if (Math.abs(diff) > 50) {
      if (diff > 0 && cur < slides.length - 1) setCur(cur + 1)
      if (diff < 0 && cur > 0) setCur(cur - 1)
    }
  }
  // Auto-scroll every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCur(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])
  const s = slides[cur]
  return (
    <div style={{ flex:1, overflow:'hidden' }}>
      <div style={{ height:'100%', background:'rgb(245,235,228)', display:'flex', flexDirection:'column', overflow:'hidden', userSelect:'none' }}>
        <div
          style={{ flex:'0 0 40%', overflow:'hidden', position:'relative', paddingTop:50, cursor:'grab' }}
          onTouchStart={e => startX.current = e.touches[0].clientX}
          onTouchEnd={e => { if(startX.current!==null){ swipe(startX.current - e.changedTouches[0].clientX); startX.current=null } }}
          onMouseDown={e => startX.current = e.clientX}
          onMouseUp={e => { if(startX.current!==null){ swipe(startX.current - e.clientX); startX.current=null } }}
        >
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img key={s.image} src={s.image} alt="" draggable={false} style={{ height:'90%', width:'90%', objectFit:'contain', mixBlendMode:'multiply', animation:'fadeIn 0.3s ease' }} />
          </div>
        </div>
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'28px 28px 32px' }}>
          <div key={cur} style={{ animation:'fadeInUp 0.3s ease' }}>
            <div style={{ fontFamily:'Georgia, serif', fontSize:36, color:'rgb(42,31,26)', lineHeight:1.1, marginBottom:12 }}>{s.title}</div>
            <div style={{ fontSize:14, color:'rgb(138,122,106)', lineHeight:1.6 }}>{s.desc}</div>
          </div>
          <div style={{ marginTop:20, display:'flex', gap:7, alignItems:'center', justifyContent:'center' }}>
            {slides.map((_,i) => (
              <div key={i} onClick={() => setCur(i)} style={{ width:i===cur?20:8, height:8, borderRadius:4, background:i===cur?'rgb(44,30,18)':'rgb(196,184,172)', transition:'0.3s', cursor:'pointer' }} />
            ))}
          </div>
          <div style={{ marginTop:20, display:'flex', gap:12 }}>
            <button onClick={onSignUp} style={{ flex:1, height:52, borderRadius:26, background:'rgb(44,30,18)', border:'none', fontSize:15, fontWeight:400, color:'#fff', fontFamily:'inherit', cursor:'pointer' }}>Sign up</button>
            <button onClick={onLogIn} style={{ flex:1, height:52, borderRadius:26, background:'none', border:'1.5px solid rgb(224,216,207)', fontSize:15, fontWeight:400, color:'rgb(42,31,26)', fontFamily:'inherit', cursor:'pointer' }}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───── GOOGLE ICON ───── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

/* ───── SIGN UP SCREEN ───── */
function SignUpScreen({ onLogIn, onNext }) {
  const [showGoogle, setShowGoogle] = useState(false)

  return (
    <div style={{ flex:1, overflow:'hidden' }}>
      <div style={{ height:'100%', background:'rgb(245,235,228)', display:'flex', flexDirection:'column', overflow:'hidden', position:'relative' }}>
        {/* Illustration */}
        <div style={{ flex:'0 0 32%', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', paddingTop:50 }}>
          <img src="/illus-signup.jpg" alt="" style={{ height:'75%', width:'75%', objectFit:'contain', mixBlendMode:'multiply' }} />
        </div>

        {/* Content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'24px 24px 36px' }}>
          <div style={{ fontFamily:'Georgia, serif', fontSize:38, color:'rgb(42,31,26)', lineHeight:1.1, marginBottom:8 }}>
            Let's build<br/>yours.
          </div>
          <div style={{ fontSize:15, color:'rgb(138,122,106)', marginBottom:24 }}>Your AI employee is waiting.</div>

          {/* Google button */}
          <button
            onClick={() => setShowGoogle(true)}
            style={{
              width:'100%', height:52, borderRadius:26, background:'#fff',
              border:'1.5px solid rgb(224,216,207)', display:'flex', alignItems:'center',
              justifyContent:'center', gap:10, fontSize:15, fontWeight:400,
              color:'rgb(42,31,26)', fontFamily:'inherit', cursor:'pointer', marginBottom:10,
            }}
          >
            <GoogleIcon /> Continue with Google
          </button>

          {/* Apple button */}
          <button style={{
            width:'100%', height:52, borderRadius:26, background:'#000', border:'none',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            fontSize:15, fontWeight:400, color:'#fff', fontFamily:'inherit', cursor:'pointer', marginBottom:14,
          }}>
            🍎 Continue with Apple
          </button>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <div style={{ flex:1, height:1, background:'rgb(224,216,207)' }} />
            <span style={{ fontSize:13, color:'rgb(138,122,106)' }}>or</span>
            <div style={{ flex:1, height:1, background:'rgb(224,216,207)' }} />
          </div>

          {/* Email button */}
          <button style={{
            width:'100%', height:52, borderRadius:26, background:'none',
            border:'1.5px solid rgb(224,216,207)', fontSize:15, fontWeight:400,
            color:'rgb(42,31,26)', fontFamily:'inherit', cursor:'pointer',
          }}>
            Sign up with email
          </button>

          {/* Log in link */}
          <div style={{ textAlign:'center', marginTop:14, fontSize:14, color:'rgb(138,122,106)' }}>
            Already have an account?{' '}
            <span onClick={onLogIn} style={{ color:'rgb(196,164,74)', fontWeight:400, cursor:'pointer' }}>Log in</span>
          </div>
        </div>

        {/* Google bottom sheet overlay */}
        {showGoogle && (
          <div
            onClick={(e) => { if (e.target === e.currentTarget) setShowGoogle(false) }}
            style={{
              position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300,
              display:'flex', alignItems:'flex-end',
              animation:'fadeIn 0.2s ease',
            }}
          >
            <div style={{
              width:'100%', background:'#fff', borderRadius:'24px 24px 0 0',
              padding:'20px 24px 40px',
              animation:'slideUp 0.3s ease',
            }}>
              {/* Handle */}
              <div style={{ width:36, height:4, borderRadius:2, background:'#e0e0e0', margin:'0 auto 20px' }} />

              <div style={{ fontSize:16, fontWeight:400, color:'#1a1a1a', marginBottom:16, textAlign:'center' }}>
                Sign in with Google
              </div>

              {/* Account row */}
              <div style={{
                display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
                background:'#f8f8f8', borderRadius:14, marginBottom:14,
              }}>
                <div style={{
                  width:38, height:38, borderRadius:'50%',
                  background:'linear-gradient(135deg, #4285F4, #34A853)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:13, fontWeight:400, color:'#fff',
                }}>IC</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:400, color:'#1a1a1a' }}>Iris Chang</div>
                  <div style={{ fontSize:12, color:'#888' }}>iris@lawtrades.com</div>
                </div>
                <div style={{ marginLeft:'auto', color:'#4285F4', fontSize:18 }}>✓</div>
              </div>

              <div style={{ fontSize:12, color:'#888', marginBottom:20, lineHeight:1.5 }}>
                Maestro will access your name and email to create your account.
              </div>

              <button
                onClick={onNext}
                style={{
                  width:'100%', height:50, borderRadius:25, background:'#4285F4',
                  border:'none', color:'#fff', fontSize:15, fontWeight:400,
                  fontFamily:'inherit', cursor:'pointer', display:'flex',
                  alignItems:'center', justifyContent:'center',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ───── SETUP SCREEN ───── */
const setupNodes = [
  { emoji: '🔗', label: 'LinkedIn', angle: 270 },
  { emoji: '✏️', label: 'Name', angle: 0 },
  { emoji: '🤓', label: 'Avatar', angle: 90 },
  { emoji: '💬', label: 'Tone', angle: 180 },
]

const nameOptions = ['Nova', 'Ace', 'Scout', 'Atlas', 'Sage']
const avatarOptions = ['👑', '⚡', '🦊', '🦉', '🔥', '💎', '🌙', '🤓', 'emoji_picker', 'photo_upload']
const toneOptions = [
  { label: 'Casual & friendly', preview: 'Hey! Just moved your meeting to Thursday 🙌 Calendar\'s all set.' },
  { label: 'Direct & concise', preview: 'Meeting moved to Thursday. Calendar updated.' },
  { label: 'Professional', preview: 'Your meeting has been rescheduled to Thursday. I\'ve updated your calendar accordingly.' },
  { label: 'Playful & witty', preview: 'Thursday it is! 🎯 Shuffled your calendar like a pro.' },
]

const setupKeyframes = `
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
.uni-node-inner:hover { transform: scale(1.14) !important; }
`

function generateStars(count) {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 0.5,
      duration: 2 + Math.random() * 2.8,
      delay: Math.random() * 3,
    })
  }
  return stars
}
const stars = generateStars(50)

function SetupScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false)
  const [merging, setMerging] = useState(false)
  const [sparking, setSparking] = useState(false)
  const [spinFast, setSpinFast] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [loadingFade, setLoadingFade] = useState(false)
  const handleLaunch = () => {
    // Phase 1: Speed up spin (0-800ms)
    setSpinFast(true)
    // Phase 2: Converge to center (800ms)
    setTimeout(() => setMerging(true), 800)
    // Phase 3: Glow on center (1600ms)
    setTimeout(() => setSparking(true), 1600)
    // Phase 4: Fade out orbit view (2400ms)
    setTimeout(() => setExiting(true), 2400)
    // Phase 5: Loading screen (3000ms)
    setTimeout(() => setLoadingScreen(true), 3000)
    // Phase 6: Fade loading, transition to chat
    setTimeout(() => setLoadingFade(true), 5400)
    setTimeout(() => onComplete && onComplete(selectedAvatar, displayName), 6000)
  }
  const [activeStep, setActiveStep] = useState(0)
  const [openPanel, setOpenPanel] = useState(null)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [selectedName, setSelectedName] = useState('Nova')
  const [customName, setCustomName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('👑')
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedTone, setSelectedTone] = useState('Direct & concise')
  const [eyeTarget, setEyeTarget] = useState(null) // {x, y} direction for mascot eyes

  const completedCount = completedSteps.size
  const displayName = customName || selectedName

  const handleDone = (stepIdx) => {
    const next = new Set(completedSteps)
    next.add(stepIdx)
    setCompletedSteps(next)
    setOpenPanel(null)
    // advance to next incomplete
    if (next.size >= 4) {
      setActiveStep(null)
      return
    }
    for (let i = 1; i <= 4; i++) {
      const candidate = (stepIdx + i) % 4
      if (!next.has(candidate)) { setActiveStep(candidate); return }
    }
  }

  const handleNodeTap = (idx) => {
    // LinkedIn (0) must be completed before other nodes become tappable
    if (idx !== 0 && !completedSteps.has(0)) return
    setActiveStep(idx)
    setOpenPanel(idx)
    // Set eye direction based on node angle
    const node = setupNodes[idx]
    const rad = (node.angle * Math.PI) / 180
    setEyeTarget({ x: Math.cos(rad) * 3, y: Math.sin(rad) * 3 })
  }

  const closePanel = () => setOpenPanel(null)

  const nodeRadius = 130

  return (
    <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
      <style>{setupKeyframes}</style>
      {/* Loading screen is now shown in the bottom card area */}
      <div style={{ height:'100%', background:'rgb(26,22,20)', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
        {/* Stars */}
        {stars.map((s, i) => (
          <div key={i} style={{
            position:'absolute', left:`${s.left}%`, top:`${s.top}%`,
            width:s.size, height:s.size, borderRadius:'50%',
            background:'rgba(255,255,255,0.2)',
            animation:`twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}

        {/* Progress dots */}
        <div style={{ paddingTop:60, display:'flex', flexDirection:'column', alignItems:'center', zIndex:2 }}>
          <div style={{ display:'flex', gap:6 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                width:8, height:8, borderRadius:4,
                background: completedSteps.has(i) ? 'rgb(52,168,83)' : 'rgba(255,255,255,0.18)',
              }} />
            ))}
          </div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)', marginTop:6 }}>{completedCount} of 4 done</div>
        </div>

        {/* Universe area */}
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
          {/* Orbit rings */}
          {[
            { size:180, border:'1px solid rgba(255,255,255,0.04)', anim:'spinCCW 18s linear infinite' },
            { size:240, border:'1px solid rgba(255,255,255,0.04)', anim:'spinCW 25s linear infinite' },
            { size:320, border:'1px solid rgba(255,255,255,0.024)', anim:'spinCW 35s linear infinite' },
          ].map((r, i) => (
            <div key={i} style={{
              position:'absolute', left:'50%', top:'50%',
              width:r.size, height:r.size, borderRadius:'50%',
              border:r.border, animation:r.anim,
              marginLeft: -r.size/2, marginTop: -r.size/2, transformOrigin:'center center',
            }} />
          ))}

          {/* Center */}
          <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', display:'flex', flexDirection:'column', alignItems:'center', zIndex:3 }}>
            <div style={{
              width:100, height:100, borderRadius:'50%',
              background: selectedAvatar === '👑' ? 'rgb(245,235,228)' : '#000000', overflow:'hidden',
              display:'flex', alignItems:'center', justifyContent:'center',
              position:'relative',
              animation: sparking ? 'sparkGlow 0.8s ease-out forwards' : 'none',
            }}>
              {/* Breathing ring */}
              <div style={{
                position:'absolute', width:100, height:100, borderRadius:'50%',
                border:'1.5px solid rgba(255,255,255,0.05)',
                animation:'breathe 3s ease-in-out infinite',
                top:'50%', left:'50%',
              }} />
              {selectedAvatar === '👑' ? (
                <img src="/mascot-peek.jpg" alt="" style={{ width:'100%', objectFit:'contain', position:'relative', zIndex:1, marginTop:-15 }} />
              ) : (
                <span style={{ fontSize:48, position:'relative', zIndex:1 }}>{selectedAvatar}</span>
              )}
              {sparking && <div style={{
                position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
                borderRadius:'50%', border:'2px solid rgba(200,90,58,0.6)',
                animation:'sparkRing 0.8s ease-out forwards', pointerEvents:'none',
              }} />}
            </div>
            {completedSteps.has(1) && (
              <div style={{ marginTop:8, fontSize:13, color:'rgba(255,255,255,0.5)', fontWeight:400 }}>{displayName}</div>
            )}
          </div>

          {/* Orbiting nodes container - spins as a group */}
          <div style={{
            position:'absolute', left:'50%', top:'50%',
            width: nodeRadius*2, height: nodeRadius*2,
            animation: merging ? 'none' : spinFast ? 'orbitSpin 3s linear infinite' : 'orbitSpin 25s linear infinite',
            zIndex:4,
            marginLeft: -nodeRadius,
            marginTop: -nodeRadius,
          }}>
            {setupNodes.map((node, idx) => {
              const rad = (node.angle * Math.PI) / 180
              const x = Math.cos(rad) * nodeRadius + nodeRadius
              const y = Math.sin(rad) * nodeRadius + nodeRadius
              const centerX = nodeRadius
              const centerY = nodeRadius
              const isActive = activeStep === idx
              const isCompleted = completedSteps.has(idx)
              const isLocked = idx !== 0 && !completedSteps.has(0)
              const isInactive = !isActive && !isCompleted

              return (
                <div key={idx} style={{
                  position:'absolute',
                  left: merging ? centerX : x - 24,
                  top: merging ? centerY : y - 24,
                  width:48, height:48,
                  animation: merging ? 'none' : spinFast ? 'orbitCounter 3s linear infinite' : 'orbitCounter 25s linear infinite',
                  opacity: merging ? 0 : undefined,
                  transition: merging ? `left 0.6s cubic-bezier(0.4,0,0.2,1) ${idx*0.12}s, top 0.6s cubic-bezier(0.4,0,0.2,1) ${idx*0.12}s, opacity 0.4s ease ${idx*0.12}s` : undefined,
                }}>
                  <div className="uni-node-inner" onClick={() => handleNodeTap(idx)} style={{
                    width:48, height:48, borderRadius:'50%',
                    background:'rgba(255,255,255,0.06)',
                    border: isActive ? '1.5px solid rgb(200,90,58)' : isCompleted ? '1.5px solid rgb(52,168,83)' : '1.5px solid rgba(255,255,255,0.08)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:20, cursor:'pointer',
                    opacity: isLocked ? 0.15 : isInactive ? 0.25 : 1,
                    transition:'opacity 0.3s, border 0.3s, transform 0.2s, box-shadow 0.2s',
                    boxShadow: isActive ? '0 0 12px rgba(200,90,58,0.3)' : 'none',
                    cursor: isLocked ? 'default' : 'pointer',
                    pointerEvents: isLocked ? 'none' : 'auto',
                    position:'relative',
                  }}>
                    {node.emoji}
                    {isCompleted && (
                      <div style={{
                        position:'absolute', top:-4, right:-4,
                        width:16, height:16, borderRadius:'50%',
                        background:'rgb(52,168,83)', display:'flex',
                        alignItems:'center', justifyContent:'center',
                        fontSize:9, color:'#fff', fontWeight:400,
                      }}>✓</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom prompt when no panel open */}
        {openPanel === null && completedCount === 0 && (
          <div style={{ position:'absolute', bottom:90, left:0, right:0, padding:'0 40px', textAlign:'center', zIndex:10 }}>
            <div style={{ fontFamily:'Georgia, serif', fontSize:24, color:'rgba(255,255,255,0.9)', lineHeight:1.35, marginBottom:6 }}>
              Start with your <em style={{ fontStyle:'italic', color:'rgb(200,90,58)' }}>LinkedIn</em>.<br/>Tap 🔗 above.
            </div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.3)' }}>I need to do my research first.</div>
          </div>
        )}
        {openPanel === null && completedCount > 0 && completedCount < 4 && (
          <div style={{ position:'absolute', bottom:90, left:0, right:0, padding:'0 40px', textAlign:'center', zIndex:10 }}>
            <div style={{ fontFamily:'Georgia, serif', fontSize:24, color:'rgba(255,255,255,0.9)', lineHeight:1.35, marginBottom:6 }}>
              Nice. Now build me.
            </div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.3)' }}>{4 - completedCount} more to go — any order.</div>
          </div>
        )}
        {openPanel === null && completedCount === 4 && !loadingScreen && (
          <div style={{ position:'absolute', bottom:60, left:0, right:0, padding:'0 40px', textAlign:'center', zIndex:10, opacity: merging ? 0 : 1, transition:'opacity 0.4s ease' }}>
            <div style={{ fontFamily:'Georgia, serif', fontSize:28, color:'rgb(200,90,58)', fontStyle:'italic', marginBottom:20 }}>
              All set.
            </div>
            <button onClick={handleLaunch} style={{
              width:'100%', height:52, borderRadius:26, border:'none',
              background:'rgb(200,90,58)', color:'#fff', fontSize:16, fontWeight:400,
              fontFamily:'inherit', cursor:'pointer', letterSpacing:'-0.01em',
            }}>
              Launch {displayName} →
            </button>
          </div>
        )}
        {loadingScreen && (
          <div style={{ position:'absolute', bottom:60, left:0, right:0, padding:'0 40px', textAlign:'center', zIndex:10, animation:'fadeInUp 0.5s ease' }}>
            <div style={{ fontFamily:'Georgia, serif', fontSize:24, color:'rgba(255,255,255,0.9)', marginBottom:8 }}>
              Getting everything ready...
            </div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.35)', lineHeight:1.5 }}>Reading your profile, mapping your workflow</div>
          </div>
        )}

        {/* Photo Upload Overlay */}
        {showPhotoUpload && (
          <div style={{ position:'absolute', inset:0, background:'rgb(245,235,228)', zIndex:50, display:'flex', flexDirection:'column', borderRadius:48, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'60px 24px 16px' }}>
              <span onClick={() => setShowPhotoUpload(false)} style={{ fontSize:15, color:'rgb(138,122,106)', cursor:'pointer' }}>Cancel</span>
              <span style={{ fontSize:16, fontWeight:400, color:'rgb(42,31,26)' }}>Profile Photo</span>
              <span style={{ fontSize:15, color:'rgb(138,122,106)', opacity:0.5 }}>Use</span>
            </div>
            <div style={{ height:1, background:'rgb(224,216,207)' }} />
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
              <div style={{ width:100, height:100, borderRadius:'50%', border:'2px dashed rgb(200,192,182)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>📷</div>
              <button style={{ padding:'10px 24px', borderRadius:20, background:'rgb(44,30,18)', border:'none', color:'#fff', fontSize:14, fontWeight:400, fontFamily:'inherit', cursor:'pointer' }}>Select photo</button>
              <div style={{ fontSize:12, color:'rgb(138,122,106)' }}>Max 5 MB · JPG or PNG only</div>
            </div>
          </div>
        )}

        {/* Emoji Picker Overlay */}
        {showEmojiPicker && (
          <div style={{ position:'absolute', inset:0, background:'rgb(32,28,26)', zIndex:50, display:'flex', flexDirection:'column', borderRadius:48, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'60px 24px 16px' }}>
              <span onClick={() => setShowEmojiPicker(false)} style={{ fontSize:15, color:'rgba(255,255,255,0.5)', cursor:'pointer' }}>Cancel</span>
              <span style={{ fontSize:16, fontWeight:400, color:'#fff' }}>Pick an emoji</span>
              <span style={{ width:50 }} />
            </div>
            <div style={{ height:1, background:'rgba(255,255,255,0.08)' }} />
            <div style={{ flex:1, display:'flex', flexWrap:'wrap', gap:8, padding:24, alignContent:'flex-start', overflowY:'auto' }}>
              {['😊','😎','🤩','🥳','😏','🧠','👻','🤖','🐱','🐶','🦁','🐸','🌈','🌟','💜','❤️','🫡','🫠','🤌','✌️','🎭','🎪','🪐','🌍','🍕','🎸','🎮','💡','🔮','🎯','🏆','🚀'].map(e => (
                <div key={e} onClick={() => { setSelectedAvatar(e); setShowEmojiPicker(false) }} style={{
                  width:52, height:52, borderRadius:14,
                  background:'rgba(255,255,255,0.06)',
                  border:'1.5px solid rgba(255,255,255,0.08)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:26, cursor:'pointer',
                }}>{e}</div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom panels */}
        {openPanel !== null && (
          <div style={{
            position:'absolute', bottom:0, left:0, right:0, zIndex:10,
            background:'rgb(32,28,26)', borderRadius:'24px 24px 0 0',
            padding:'20px 24px 36px',
            animation:'setupSlideUp 0.3s ease',
          }}>
            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontFamily:'Georgia, serif', fontSize:20, fontWeight:400, color:'#fff' }}>
                  {openPanel === 0 && 'LinkedIn'}
                  {openPanel === 1 && 'Name me'}
                  {openPanel === 2 && 'Pick your avatar'}
                  {openPanel === 3 && 'How should I talk?'}
                </span>
                {completedSteps.has(openPanel) && <span style={{ fontSize:14 }}>✅</span>}
              </div>
              <div onClick={closePanel} style={{ width:28, height:28, borderRadius:14, background:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:13, color:'rgba(255,255,255,0.5)' }}>✕</div>
            </div>

            {/* Step 1: LinkedIn */}
            {openPanel === 0 && (
              <div>
                <div style={{ display:'flex', alignItems:'center', height:48, borderRadius:14, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                  <span style={{ padding:'0 0 0 16px', fontSize:15, color:'rgba(255,255,255,0.35)', whiteSpace:'nowrap' }}>linkedin.com/in/</span>
                  <input
                    value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)}
                    placeholder="username"
                    style={{ flex:1, height:48, border:'none', background:'transparent', color:'#fff', fontSize:15, padding:'0 16px 0 0', fontFamily:'inherit', boxSizing:'border-box', outline:'none' }}
                  />
                </div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginTop:10 }}>🔒 Public profile only. I never post.</div>
              </div>
            )}

            {/* Step 2: Name */}
            {openPanel === 1 && (
              <div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
                  {nameOptions.map(n => (
                    <div key={n} onClick={() => { setSelectedName(n); setCustomName('') }} style={{
                      padding:'8px 18px', borderRadius:20,
                      background:'rgba(255,255,255,0.06)',
                      border: selectedName === n && !customName ? '1.5px solid rgb(200,90,58)' : '1.5px solid rgba(255,255,255,0.08)',
                      color:'#fff', fontSize:14, cursor:'pointer',
                    }}>{n}</div>
                  ))}
                </div>
                <input
                  value={customName} onChange={e => setCustomName(e.target.value)}
                  placeholder="Or type your own..."
                  style={{ width:'100%', height:48, borderRadius:14, border:'none', background:'rgba(255,255,255,0.06)', color:'#fff', fontSize:15, padding:'0 16px', fontFamily:'inherit', boxSizing:'border-box', outline:'none', marginBottom:12 }}
                />
                <div style={{ fontSize:12, color:'rgba(255,255,255,0.35)', marginBottom:6 }}>Your timezone</div>
                <div style={{ position:'relative' }}>
                  <select
                    defaultValue="America/New_York"
                    style={{ width:'100%', height:48, borderRadius:14, border:'none', background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.7)', fontSize:14, padding:'0 16px', fontFamily:'inherit', boxSizing:'border-box', appearance:'none', WebkitAppearance:'none', cursor:'pointer', outline:'none' }}
                  >
                    <option value="ET">Auto-detect (ET — Eastern)</option>
                    <option value="CT">CT — Central</option>
                    <option value="MT">MT — Mountain</option>
                    <option value="PT">PT — Pacific</option>
                    <option value="AKT">AKT — Alaska</option>
                    <option value="HAT">HAT — Hawaii</option>
                    <option value="GMT">GMT — Greenwich</option>
                    <option value="CET">CET — Central European</option>
                    <option value="JST">JST — Japan</option>
                    <option value="CST">CST — China</option>
                    <option value="IST">IST — India</option>
                    <option value="AEST">AEST — Australian Eastern</option>
                  </select>
                  <div style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.3)', fontSize:12, pointerEvents:'none' }}>▼</div>
                </div>
              </div>
            )}

            {/* Step 3: Avatar */}
            {openPanel === 2 && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
                {avatarOptions.map((a, i) => {
                  if (a === 'emoji_picker') {
                    return (
                      <div key={i} onClick={() => setShowEmojiPicker(true)} style={{
                        width:56, height:56, borderRadius:14,
                        background:'rgba(255,255,255,0.06)',
                        border:'1.5px solid rgba(255,255,255,0.08)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:24, cursor:'pointer',
                      }}>😊</div>
                    )
                  }
                  if (a === 'photo_upload') {
                    return (
                      <div key={i} onClick={() => setShowPhotoUpload(true)} style={{
                        width:56, height:56, borderRadius:14,
                        background:'rgba(255,255,255,0.03)',
                        border:'1.5px dashed rgba(255,255,255,0.15)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:20, cursor:'pointer',
                      }}>📷</div>
                    )
                  }
                  return (
                    <div key={i} onClick={() => setSelectedAvatar(a)} style={{
                      width:56, height:56, borderRadius:14,
                      background:'rgba(255,255,255,0.06)',
                      border: selectedAvatar === a ? '1.5px solid rgb(200,90,58)' : '1.5px solid rgba(255,255,255,0.08)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:24, cursor:'pointer',
                    }}>{a}</div>
                  )
                })}
              </div>
            )}

            {/* Step 4: Tone */}
            {openPanel === 3 && (
              <div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }}>
                  {toneOptions.map(t => (
                    <div key={t.label} onClick={() => setSelectedTone(t.label)} style={{
                      padding:'12px 14px', borderRadius:14,
                      background:'rgba(255,255,255,0.06)',
                      border: selectedTone === t.label ? '1.5px solid rgb(200,90,58)' : '1.5px solid rgba(255,255,255,0.08)',
                      color:'#fff', fontSize:13, cursor:'pointer', textAlign:'center',
                    }}>{t.label}</div>
                  ))}
                </div>
                <div style={{ borderLeft:'3px solid rgb(200,90,58)', paddingLeft:14, fontStyle:'italic', fontSize:14, color:'rgba(255,255,255,0.5)', lineHeight:1.5 }}>
                  {toneOptions.find(t => t.label === selectedTone)?.preview}
                </div>
              </div>
            )}

            {/* Done button */}
            <button onClick={() => handleDone(openPanel)} style={{
              width:'100%', height:52, borderRadius:26, border:'none',
              background:'rgb(245,235,228)', color:'rgb(26,22,20)',
              fontSize:16, fontWeight:400, fontFamily:'inherit',
              cursor:'pointer', marginTop:20,
            }}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ───── CHAT SCREEN ───── */
const finalChecklistItems = [
  'linkedin context loaded',
  'named: Nova',
  'writing style: casual',
  'Gmail connected',
  'morning brief at 7:30 AM',
]

function ChatScreen({ avatar = '👑', name = 'Nova', activeTab = 'chat', onTabChange }) {
  const [entering, setEntering] = useState(true)
  const [messages, setMessages] = useState([]) // rendered messages
  const [typing, setTyping] = useState(false)
  const [phase, setPhase] = useState(1)
  const [selectedChip, setSelectedChip] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [connectedApps, setConnectedApps] = useState(new Set())
  const [showGoogleSheet, setShowGoogleSheet] = useState(false)
  const [showFigmaSheet, setShowFigmaSheet] = useState(false)
  const [showSkipNudge, setShowSkipNudge] = useState(false)
  const [showSlackSheet, setShowSlackSheet] = useState(false)
  const [figmaToken, setFigmaToken] = useState('')
  const [currentAppIndex, setCurrentAppIndex] = useState(0)
  const [showTimeChips, setShowTimeChips] = useState(false)
  const [cardDragX, setCardDragX] = useState(0)
  const [cardDragging, setCardDragging] = useState(false)
  const [editingDraft, setEditingDraft] = useState(false)
  const [swipeDemoPlayed, setSwipeDemoPlayed] = useState(false)
  const [draftText, setDraftText] = useState("Good catch! I'll make the hero image link directly to the registration page. Pushing the update today.")
  const [previewCardIndex, setPreviewCardIndex] = useState(0)
  const [cardExited, setCardExited] = useState(false)
  const [figmaDraftText, setFigmaDraftText] = useState("Good catch! I'll adjust padding in Frame 4 and push a revision by EOD.")
  const [editingFigmaDraft, setEditingFigmaDraft] = useState(false)
  const [visibleChecklist, setVisibleChecklist] = useState(0)
  const [showFinalButton, setShowFinalButton] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showFinalChips, setShowFinalChips] = useState(false)
  const [lockScreenTapped, setLockScreenTapped] = useState(false)
  const [showBriefInChat, setShowBriefInChat] = useState(false)
  const [waitingForUser, setWaitingForUser] = useState(false)
  const scrollRef = useRef(null)
  const queueRef = useRef([])
  const processingRef = useRef(false)

  // Queue AI messages with typing delay
  const queueMessages = (msgs) => {
    queueRef.current.push(...msgs)
    processQueue()
  }

  const processQueue = () => {
    if (processingRef.current || queueRef.current.length === 0) return
    processingRef.current = true
    const msg = queueRef.current.shift()

    if (msg.type === 'typing') {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setTimeout(() => {
          processingRef.current = false
          processQueue()
        }, 100)
      }, msg.duration || 1200)
    } else if (msg.type === 'wait') {
      setWaitingForUser(true)
      processingRef.current = false
    } else {
      setMessages(prev => [...prev, msg])
      setTimeout(() => {
        processingRef.current = false
        processQueue()
      }, 300)
    }
  }

  // Entrance
  useEffect(() => {
    setTimeout(() => setEntering(false), 100)
    setTimeout(() => {
      queueMessages([
        { type:'typing', duration:1500 },
        { type:'ai', text:"Hey Iris! Brand and product designer — that's actually a rare combo. Most people pick a lane, but you're living at the intersection. Lawtrades gets both the craft and the systems thinking in one person.\n\nParsons, New York, legal tech — I've got a pretty clear picture of who I'm working with.", id:'p1a1' },
        { type:'typing', duration:1200 },
        { type:'ai', text:"Okay — what's the part of your week that's technically your job but mostly just feels like admin? The stuff that eats time without moving anything forward.", id:'p1a2' },
        { type:'wait' },
      ])
    }, 300)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }, 50)
    }
  }, [messages, typing, phase, showTimeChips, connectedApps, currentAppIndex, visibleChecklist, showFinalButton, waitingForUser])

  // Phase transition handlers
  const handleChipSelect = (chip) => {
    setSelectedChip(chip)
    setWaitingForUser(false)
    setPhase(2)
    queueRef.current = []
    processingRef.current = false
    setTyping(false)
    setMessages(prev => [...prev, { type:'user', text:chip, id:'p2u' }])
    setTimeout(() => {
      queueMessages([
        { type:'typing', duration:1200 },
        { type:'ai', text:"Context-switching for code reviews and feedback threads is brutal. I can draft the first pass so you're never starting from scratch.", id:'p2a1' },
        { type:'typing', duration:1500 },
        { type:'ai', text:"Here's what I can do for you specifically:\n\n• Draft code review comments and flag PRs blocking a merge\n• Catch open design feedback and draft replies so threads don't go stale\n• Draft replies and actions for you to approve in one tap\n• Send you a morning brief so you start every day knowing exactly what needs you\n\nWant to see it in action?", id:'p2a2' },
        { type:'wait' },
      ])
    }, 100)
  }

  const handleConnectApps = () => {
    setWaitingForUser(false)
    setPhase(3)
    setMessages(prev => [...prev, { type:'user', text:'Yes, let\'s do it', id:'p3u' }])
    setTimeout(() => {
      queueMessages([
        { type:'typing', duration:1000 },
        { type:'ai', text:"Perfect — let me pull up the apps you can connect.", id:'p3a1' },
        { type:'wait' },
      ])
    }, 100)
  }

  const handleContinueApps = () => {
    setWaitingForUser(false)
    setPhase(4)
    const apps = [...connectedApps].map(a => a.charAt(0).toUpperCase() + a.slice(1))
    const appList = apps.length > 0 ? apps.join(', ') + ' connected' : 'No apps connected yet'
    const connectedMsg = apps.length > 0
      ? `${appList} — I'm already syncing. Let me show you what I can do with this.`
      : "No worries — you can always connect apps later from Settings. Let me show you what I can do."
    setTimeout(() => {
      queueMessages([
        { type:'typing', duration:800 },
        { type:'ai', text: connectedMsg, id:'p4a0' },
        { type:'typing', duration:1200 },
        { type:'ai', text:"I can already see your inbox. Here's what jumped out:", id:'p4a3' },
        { type:'wait' },
      ])
    }, 100)
  }

  const [cardApproved, setCardApproved] = useState(false)
  const cardRef = useRef(null)
  const cardTouchRef = useRef({ sx:0, sy:0, locked:null, dragging:false, dx:0 })
  const handleCardActionRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const t = cardTouchRef.current
    const onStart = (e) => {
      const touch = e.touches[0]
      t.sx = touch.clientX; t.sy = touch.clientY; t.locked = null; t.dragging = false; t.dx = 0
    }
    const onMove = (e) => {
      if (t.sx === null) return
      const touch = e.touches[0]
      const dx = touch.clientX - t.sx
      const dy = touch.clientY - t.sy
      if (t.locked === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        t.locked = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v'
        if (t.locked === 'h') {
          // Disable scroll on parent
          el.closest('[style*="overflow"]')?.style?.setProperty('overflow-y', 'hidden')
        }
      }
      if (t.locked === 'h') {
        e.preventDefault()
        e.stopPropagation()
        t.dragging = true
        t.dx = dx
        setCardDragging(true)
        setCardDragX(dx)
      }
    }
    const onEnd = () => {
      // Re-enable scroll
      el.closest('[style*="overflow"]')?.style?.setProperty('overflow-y', 'auto')
      if (t.dragging) {
        setCardDragging(false)
        const dx = t.dx
        if (dx > 40) { handleCardActionRef.current('approve') }
        else if (dx < -40) { handleCardActionRef.current('skip') }
        else { setCardDragX(0) }
      }
      t.dragging = false; t.locked = null; t.sx = null
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
    }
  }, [phase, cardApproved])

  const handleCardAction = (action) => {
    setCardDragging(false)
    setCardDragX(action === 'approve' ? 400 : -400)
    setTimeout(() => {
      setCardDragX(0)
      setCardApproved(true)
      setTimeout(() => handleApprove(), 1500)
    }, 400)
  }
  handleCardActionRef.current = handleCardAction

  const handleApprove = () => {
    setWaitingForUser(false)
    setPhase(5)
    setTimeout(() => {
      queueMessages([
        { type:'system', text:'Let me show you what I can do.', id:'p5sys' },
        { type:'typing', duration:1200 },
        { type:'ai', text:"Exactly like that. Every task that comes through works the same way — swipe to approve, skip, or save.", id:'p5a1' },
        { type:'typing', duration:1500 },
        { type:'ai', text:"One last thing — your morning brief. Every morning before you open anything, I'll have a digest waiting:\n\n☀️ Weather + commute for your area\n📧 Emails that actually need you (not the noise)\n🎨 Figma comments waiting for your reply\n📈 Trending posts in legal tech + design on LinkedIn\n🚀 New product launches relevant to your work\n📅 Today's calendar with prep notes\n\nUnder 60 seconds to read. You start the day knowing exactly what matters.", id:'p6a1' },
        { type:'wait' },
      ])
      setPhase(6)
    }, 1000)
  }

  const handleSetupBrief = () => {
    setWaitingForUser(false)
    setShowTimeChips(true)
    queueMessages([
      { type:'typing', duration:800 },
      { type:'ai', text:"What time works best for you?", id:'p6a3' },
      { type:'wait' },
    ])
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setWaitingForUser(false)
    setPhase(7)
    setMessages(prev => [...prev, { type:'user', text:time, id:'p7u' }])
    setTimeout(() => {
      queueMessages([
        { type:'typing', duration:1200 },
        { type:'ai', text:`Perfect. I'll scan Gmail overnight and have everything ready by ${time}.\n\nHere's what a typical brief looks like:`, id:'p7a1' },
        { type:'lockscreen', id:'p7lock' },
        { type:'wait' },
      ])
    }, 100)
  }

  const handleLooksGood = () => {
    setWaitingForUser(false)
    setPhase(8)
    setMessages(prev => [...prev, { type:'system', text:'Almost there — putting everything together now.', id:'p8sys' }])
    setTimeout(() => {
      queueMessages([
        { type:'typing', duration:1000 },
        { type:'ai', text:"Setting you up...", id:'p8a1' },
        { type:'typing', duration:1800 },
        { type:'ai', text:`You're all set, Iris! I'm already scanning your tools. Here's what I can do for you — just tap a prompt to try:`, id:'p8a2' },
      ])
      // Show notification banner + final chips after messages finish
      setTimeout(() => {
        setShowNotification(true)
        setTimeout(() => setShowFinalChips(true), 300)
        // Auto-hide notification after 5s
        setTimeout(() => setShowNotification(false), 5000)
      }, 4500)
    }, 500)
  }

  // Phase 5 is handled inline now

  // Phase 8 checklist handled in handleLooksGood

  const chipOptions = ['Design feedback loops', 'Stakeholder reviews', 'Figma file chaos', 'Cross-team handoffs']
  const timeOptions = ['6:00 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM']

  const aiBubble = (text, key) => (
    <div key={key} style={{ display:'flex', justifyContent:'flex-start', marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
      <div style={{ maxWidth:'85%', background:'#fff', borderRadius:16, border:'1px solid rgb(224,216,207)', padding:16, fontSize:14, color:'rgb(42,31,26)', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{text}</div>
    </div>
  )

  const userBubble = (text, key) => (
    <div key={key} style={{ display:'flex', justifyContent:'flex-end', marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
      <div style={{ maxWidth:'85%', background:'rgb(44,30,18)', borderRadius:16, padding:'12px 16px', fontSize:14, color:'#fff', lineHeight:1.5 }}>{text}</div>
    </div>
  )

  const systemMsg = (text, key) => (
    <div key={key} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14, padding:'16px 0', animation:'fadeInUp 0.3s ease' }}>
      <div style={{ flex:1, height:1, background:'rgb(224,216,207)' }} />
      <div style={{ fontSize:12, color:'rgb(138,122,106)', textAlign:'center', whiteSpace:'nowrap', letterSpacing:'0.02em' }}>{text}</div>
      <div style={{ flex:1, height:1, background:'rgb(224,216,207)' }} />
    </div>
  )

  const ctaButton = (text, onClick, key) => (
    <div key={key} style={{ padding:'8px 0', animation:'fadeInUp 0.3s ease' }}>
      <button onClick={onClick} style={{ width:'100%', height:52, borderRadius:26, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:15, fontWeight:400, fontFamily:'inherit', cursor:'pointer' }}>{text}</button>
    </div>
  )

  return (
    <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', background:'rgb(250,248,245)', position:'relative', opacity: entering ? 0 : 1, transition:'opacity 0.5s ease' }}>
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes dotBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-4px)} }
@keyframes slideDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* Push notification banner */}
      {showNotification && (
        <div style={{ position:'absolute', top:8, left:12, right:12, zIndex:500, background:'rgba(60,45,30,0.92)', backdropFilter:'blur(12px)', borderRadius:16, padding:'12px 14px', display:'flex', alignItems:'center', gap:10, animation:'slideDown 0.3s ease', boxShadow:'0 4px 20px rgba(0,0,0,0.25)' }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'rgb(245,235,228)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>{avatar}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:2 }}>
              <div style={{ fontSize:13, fontWeight:400, color:'#fff' }}>{name}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>now</div>
            </div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,0.8)', lineHeight:1.3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>🌧️ It's going to rain today — remember your umbrella! 6 emails waiting, 2 meetings today.</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ paddingTop:54, paddingBottom:12, display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
        <div style={{ width:50, height:50, borderRadius:'50%', background:'rgb(245,235,228)', border:'1px solid rgb(224,216,207)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:6 }}>{avatar}</div>
        <div style={{ fontSize:16, fontWeight:400, color:'rgb(42,31,26)' }}>{name}</div>
        <div style={{ fontSize:13, color:'rgb(138,122,106)' }}>{showFinalChips ? "I'm ready to help" : 'Getting to know you'}</div>
      </div>
      <div style={{ height:1, background:'rgb(224,216,207)', flexShrink:0 }} />

      {/* Scrollable chat area */}
      <div ref={scrollRef} style={{ flex:1, overflowY:'auto', padding:'16px 16px 8px' }}>

        {/* Rendered messages from queue */}
        {messages.map((msg) => {
          if (msg.type === 'ai') return aiBubble(msg.text, msg.id)
          if (msg.type === 'user') return userBubble(msg.text, msg.id)
          if (msg.type === 'system') return systemMsg(msg.text, msg.id)
          if (msg.type === 'lockscreen') return (
            <div key={msg.id} style={{ borderRadius:20, overflow:'hidden', marginBottom:10, animation:'fadeInUp 0.3s ease', position:'relative', height:420 }}>
              <style>{`@keyframes lockNotifIn { 0% { transform:translateY(10px); opacity:0 } 100% { transform:translateY(0); opacity:1 } }`}</style>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, #1a1028 0%, #0d1b2a 30%, #1b2838 60%, #162028 100%)', zIndex:0 }} />
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'60%', background:'radial-gradient(ellipse at 30% 20%, rgba(90,60,140,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(40,80,120,0.2) 0%, transparent 50%)', zIndex:1 }} />
              <div style={{ position:'relative', zIndex:2, textAlign:'center', paddingTop:28 }}>
                <div style={{ fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:8 }}>🔒</div>
                <div style={{ fontSize:72, fontWeight:400, color:'#fff', letterSpacing:'-2px', lineHeight:1, fontFamily:'-apple-system, system-ui, sans-serif' }}>{selectedTime ? selectedTime.replace(/\s*(AM|PM)/i,'') : '8:30'}</div>
                <div style={{ fontSize:15, color:'rgba(255,255,255,0.65)', marginTop:4, fontWeight:400 }}>Thursday, March 20</div>
              </div>
              <div style={{ position:'relative', zIndex:3, padding:'0 12px', marginTop:40, animation:'lockNotifIn 0.6s ease-out 1.5s both' }}>
                <div style={{ background:'rgba(255,255,255,0.18)', backdropFilter:'blur(30px)', WebkitBackdropFilter:'blur(30px)', borderRadius:16, padding:'12px 14px', boxShadow:'0 2px 20px rgba(0,0,0,0.2)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <div style={{ width:22, height:22, borderRadius:5, background:'rgb(245,235,228)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>{avatar}</div>
                    <span style={{ fontSize:11, fontWeight:400, color:'rgba(255,255,255,0.6)', letterSpacing:0.5, textTransform:'uppercase' }}>{name}</span>
                    <span style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginLeft:'auto' }}>now</span>
                  </div>
                  <div style={{ fontSize:14, fontWeight:400, color:'#fff', lineHeight:1.4, marginBottom:2 }}>🌧️ It's going to rain today — remember your umbrella!</div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.7)', lineHeight:1.4 }}>6 emails waiting, 3 Figma comments, 2 meetings today. Tap to review your brief.</div>
                </div>
              </div>
            </div>
          )
          if (msg.type === 'approved') return (
            <div key={msg.id} style={{ background:'rgb(220,245,230)', borderRadius:16, padding:'24px 16px', textAlign:'center', marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>✓</div>
              <div style={{ fontSize:16, fontWeight:400, color:'rgb(34,120,60)' }}>{msg.text || 'Approved · Reply sent'}</div>
              <div style={{ fontSize:13, color:'rgb(138,122,106)', marginTop:4 }}>Nova took care of it</div>
            </div>
          )
          if (msg.type === 'checklist') return (
            <div key={msg.id} style={{ borderRadius:16, overflow:'hidden', border:'1px solid rgb(240,235,230)', marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
              <div style={{ background:'rgb(70,50,35)', padding:'12px 16px' }}>
                <div style={{ fontSize:12, fontWeight:400, color:'rgb(220,200,180)', letterSpacing:1, textTransform:'uppercase' }}>Setting up your agent</div>
              </div>
              <div style={{ background:'rgb(255,253,250)' }}>
                {finalChecklistItems.slice(0, visibleChecklist).map((item, j) => (
                  <div key={j} style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px', borderBottom: j < finalChecklistItems.length - 1 ? '1px solid rgb(240,235,230)' : 'none', animation:'fadeInUp 0.2s ease' }}>
                    <span style={{ fontSize:18 }}>✅</span>
                    <span style={{ fontSize:14, color:'rgb(42,31,26)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )
          return null
        })}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display:'flex', justifyContent:'flex-start', marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
            <div style={{ background:'rgb(250,248,245)', border:'1px solid rgb(224,216,207)', borderRadius:16, padding:'10px 18px', display:'flex', gap:4, alignItems:'center', height:40 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'rgb(138,122,106)', animation:`dotBounce 1.2s ${i*0.15}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}

        {/* Phase 2 CTA */}
        {phase === 2 && waitingForUser && ctaButton("Yes, let's connect my apps →", handleConnectApps, 'p2cta')}

        {/* Phase 3 app carousel */}
        {phase === 3 && waitingForUser && (
          <div style={{ animation:'fadeInUp 0.3s ease', marginBottom:10 }}
            onTouchStart={e => { e.currentTarget._sx = e.touches[0].clientX }}
            onTouchEnd={e => { const dx = e.currentTarget._sx - e.changedTouches[0].clientX; if(Math.abs(dx)>40){ if(dx>0 && currentAppIndex<2) setCurrentAppIndex(currentAppIndex+1); if(dx<0 && currentAppIndex>0) setCurrentAppIndex(currentAppIndex-1) } }}
            onMouseDown={e => { e.currentTarget._sx = e.clientX }}
            onMouseUp={e => { const dx = e.currentTarget._sx - e.clientX; if(Math.abs(dx)>40){ if(dx>0 && currentAppIndex<2) setCurrentAppIndex(currentAppIndex+1); if(dx<0 && currentAppIndex>0) setCurrentAppIndex(currentAppIndex-1) } }}
          >
            <div style={{ fontSize:14, color:'rgb(42,31,26)', fontWeight:400, marginBottom:6 }}>{connectedApps.size} of 3 connected</div>
            <div style={{ fontSize:12, color:'rgb(138,122,106)', marginBottom:12 }}>⚙️ You stay in control — disconnect anytime from Settings.</div>

            {/* Sliding cards container */}
            <div style={{ overflow:'hidden', borderRadius:16, marginBottom:12 }}>
              <div style={{ display:'flex', transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)', transform:`translateX(-${currentAppIndex * 100}%)` }}>
                {/* Gmail card */}
                {/* Gmail card */}
                <div style={{ minWidth:'100%', height:280, borderRadius:16, overflow:'hidden', border: connectedApps.has('gmail') ? '1.5px solid rgb(52,168,83)' : '1px solid rgb(224,216,207)', background:'#fff', boxSizing:'border-box', display:'flex', flexDirection:'column' }}>
                  <div style={{ height:4, background: connectedApps.has('gmail') ? 'rgb(52,168,83)' : '#EA4335' }} />
                  <div style={{ padding:16, flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                      <div style={{ width:48, height:48, borderRadius:12, background:'rgb(252,232,230)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>📧</div>
                      <div style={{ fontSize:16, color:'rgb(42,31,26)', flex:1 }}>Gmail</div>
                      {connectedApps.has('gmail') && <div style={{ fontSize:12, color:'rgb(52,168,83)', border:'1px solid rgb(52,168,83)', borderRadius:12, padding:'4px 10px' }}>✓ Connected</div>}
                    </div>
                    {connectedApps.has('gmail') ? (<>
                      <div style={{ fontSize:13, color:'rgb(138,122,106)', lineHeight:1.5, marginBottom:8 }}>I'll draft replies, flag urgent threads, and keep your inbox from becoming a to-do list.</div>
                      <div style={{ fontSize:11, color:'rgb(138,122,106)', marginBottom:12 }}>🔒 I'll only read — never send or act without your approval.</div>
                      <div style={{ flex:1 }} />
                      <div style={{ fontSize:13, color:'rgb(52,168,83)', textAlign:'center' }}>Connected! Tap the dots to add more.</div>
                    </>) : (<>
                      <div style={{ fontSize:12, color:'rgb(52,168,83)', marginBottom:8 }}>⚡ Instant — you're already on Google</div>
                      <div style={{ fontSize:13, color:'rgb(138,122,106)', lineHeight:1.5, marginBottom:8 }}>Read, draft, and send emails on your behalf. You approve everything first.</div>
                      <div style={{ fontSize:11, color:'rgb(138,122,106)', marginBottom:12 }}>🔒 We never sell your data.</div>
                      <div style={{ flex:1 }} />
                      <button onClick={() => setShowGoogleSheet(true)} style={{ width:'100%', height:44, borderRadius:22, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:14, fontFamily:'inherit', cursor:'pointer' }}>Sign in with Google</button>
                    </>)}
                  </div>
                </div>

                {/* Figma card */}
                <div style={{ minWidth:'100%', height:280, borderRadius:16, overflow:'hidden', border: connectedApps.has('figma') ? '1.5px solid rgb(52,168,83)' : '1px solid rgb(224,216,207)', background:'#fff', boxSizing:'border-box', display:'flex', flexDirection:'column' }}>
                  <div style={{ height:4, background: connectedApps.has('figma') ? 'rgb(52,168,83)' : '#A259FF' }} />
                  <div style={{ padding:16, flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                      <div style={{ width:48, height:48, borderRadius:12, background:'rgb(242,230,255)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>🎨</div>
                      <div style={{ fontSize:16, color:'rgb(42,31,26)', flex:1 }}>Figma</div>
                      {connectedApps.has('figma') && <div style={{ fontSize:12, color:'rgb(52,168,83)', border:'1px solid rgb(52,168,83)', borderRadius:12, padding:'4px 10px' }}>✓ Connected</div>}
                    </div>
                    {connectedApps.has('figma') ? (<>
                      <div style={{ fontSize:13, color:'rgb(138,122,106)', lineHeight:1.5, marginBottom:8 }}>I'll summarize design comments, flag review requests, and draft your replies to feedback.</div>
                      <div style={{ fontSize:11, color:'rgb(138,122,106)', marginBottom:12 }}>🔒 I'll only read — never send or act without your approval.</div>
                      <div style={{ flex:1 }} />
                      <div style={{ fontSize:13, color:'rgb(52,168,83)', textAlign:'center' }}>Connected! Tap the dots to add more.</div>
                    </>) : (<>
                      <div style={{ fontSize:13, color:'rgb(138,122,106)', lineHeight:1.5, marginBottom:12 }}>I'll summarize design comments, flag review requests, and draft your replies to feedback.</div>
                      <div style={{ fontSize:11, color:'rgb(138,122,106)', marginBottom:12 }}>🔒 I'll only read — never send or act without your approval.</div>
                      <div style={{ flex:1 }} />
                      <button onClick={() => setShowFigmaSheet(true)} style={{ width:'100%', height:44, borderRadius:22, border:'none', background:'transparent', border:'1.5px solid rgb(224,216,207)', color:'rgb(42,31,26)', fontSize:14, fontFamily:'inherit', cursor:'pointer' }}>🔑 Connect Figma</button>
                    </>)}
                  </div>
                </div>

                {/* Slack card */}
                <div style={{ minWidth:'100%', height:280, borderRadius:16, overflow:'hidden', border: connectedApps.has('slack') ? '1.5px solid rgb(52,168,83)' : '1px solid rgb(224,216,207)', background:'#fff', boxSizing:'border-box', display:'flex', flexDirection:'column' }}>
                  <div style={{ height:4, background: connectedApps.has('slack') ? 'rgb(52,168,83)' : '#4A154B' }} />
                  <div style={{ padding:16, flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                      <div style={{ width:48, height:48, borderRadius:12, background:'rgb(240,230,245)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>💬</div>
                      <div style={{ fontSize:16, color:'rgb(42,31,26)', flex:1 }}>Slack</div>
                      {connectedApps.has('slack') && <div style={{ fontSize:12, color:'rgb(52,168,83)', border:'1px solid rgb(52,168,83)', borderRadius:12, padding:'4px 10px' }}>✓ Connected</div>}
                    </div>
                    {connectedApps.has('slack') ? (<>
                      <div style={{ fontSize:13, color:'rgb(138,122,106)', lineHeight:1.5, marginBottom:8 }}>I'll surface important messages, draft replies, and stop threads from falling through the cracks.</div>
                      <div style={{ fontSize:11, color:'rgb(138,122,106)', marginBottom:12 }}>🔒 I'll only read — never send or act without your approval.</div>
                      <div style={{ flex:1 }} />
                      <div style={{ fontSize:13, color:'rgb(52,168,83)', textAlign:'center' }}>Connected! Tap the dots to add more.</div>
                    </>) : (<>
                      <div style={{ fontSize:13, color:'rgb(138,122,106)', lineHeight:1.5, marginBottom:12 }}>I'll surface important messages, draft replies, and stop threads from falling through the cracks.</div>
                      <div style={{ fontSize:11, color:'rgb(138,122,106)', marginBottom:12 }}>🔒 I'll only read — never send or act without your approval.</div>
                      <div style={{ flex:1 }} />
                      <button onClick={() => setShowSlackSheet(true)} style={{ width:'100%', height:44, borderRadius:22, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:14, fontFamily:'inherit', cursor:'pointer' }}>Connect Slack</button>
                    </>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display:'flex', justifyContent:'center', gap:6, marginBottom:12 }}>
              {[0,1,2].map(i => (
                <div key={i} onClick={() => setCurrentAppIndex(i)} style={{ width:8, height:8, borderRadius:4, background: i === currentAppIndex ? ((['gmail','figma','slack'][i] && connectedApps.has(['gmail','figma','slack'][i])) ? 'rgb(52,168,83)' : 'rgb(44,30,18)') : 'rgb(224,216,207)', cursor:'pointer' }} />
              ))}
            </div>

            {/* Skip / Continue */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span onClick={() => { if (connectedApps.size === 0 && currentAppIndex === 2) { setShowSkipNudge(true) } else if (currentAppIndex < 2) { setCurrentAppIndex(currentAppIndex + 1) } else { setShowSkipNudge(true) } }} style={{ fontSize:13, color:'rgb(138,122,106)', cursor:'pointer' }}>Skip for now</span>
              {connectedApps.size >= 1 && (
                <button onClick={handleContinueApps} style={{ height:40, padding:'0 24px', borderRadius:20, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:14, fontFamily:'inherit', cursor:'pointer' }}>Continue →</button>
              )}
            </div>
          </div>
        )}

        {/* Phase 4: Swipeable preview cards */}
        {phase === 4 && waitingForUser && (
          <div style={{ animation:'fadeInUp 0.3s ease' }}>
            <div style={{ background:'rgb(245,240,232)', borderRadius:12, padding:'10px 14px', fontSize:12, color:'rgb(138,122,106)', marginBottom:10, textAlign:'center' }}>✨ This is just a test — nothing is actually sent. It's just here so you can learn how Nova works.</div>
            {cardApproved ? (
              <div style={{ background:'rgb(220,245,230)', borderRadius:16, padding:'24px 16px', textAlign:'center', marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
                <div style={{ fontSize:32, marginBottom:8 }}>✓</div>
                <div style={{ fontSize:16, color:'rgb(34,120,60)' }}>Approved · Reply sent</div>
                <div style={{ fontSize:13, color:'rgb(138,122,106)', marginTop:4 }}>Nova took care of it</div>
              </div>
            ) : (
            <div style={{ borderRadius:16, overflow:'hidden', marginBottom:10, position:'relative' }}>
              {/* Action labels behind card */}
              <div style={{ position:'absolute', inset:0, borderRadius:16, display:'flex', overflow:'hidden' }}>
                <div style={{ flex:1, background:'rgb(220,80,60)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, gap:4 }}>✕ Skip</div>
                <div style={{ flex:1, background:'rgb(52,168,83)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, gap:4 }}>✓ Approve</div>
              </div>
              <style>{`
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
              `}</style>
              {/* Finger hint - only on first card */}
              {!cardApproved && <div style={{ position:'absolute', bottom:20, left:'50%', marginLeft:-18, zIndex:20, pointerEvents:'none', fontSize:36, opacity:0, animation: !cardDragging && cardDragX === 0 && !swipeDemoPlayed ? 'fingerDemo 3s ease-in-out 0.8s 1 forwards' : 'none' }}>👆</div>}
              {/* Draggable card */}
              <div ref={cardRef} style={{
                position:'relative', zIndex:5, background:'#fff', borderRadius:16, border:'1px solid rgb(224,216,207)',
                transform: cardDragX !== 0 || swipeDemoPlayed ? `translateX(${cardDragX}px) rotate(${cardDragX * 0.05}deg)` : undefined,
                animation: !swipeDemoPlayed && !cardDragging && cardDragX === 0 ? 'cardDemo 3s ease-in-out 0.8s 1 forwards' : 'none',
                transition: cardDragging ? 'none' : 'transform 0.3s ease',
                touchAction:'none',
                userSelect:'none',
              }}
                onAnimationEnd={() => setSwipeDemoPlayed(true)}
                onMouseDown={e => { setSwipeDemoPlayed(true); setCardDragging(true); e.currentTarget._sx = e.clientX; e.preventDefault() }}
                onMouseMove={e => { if(cardDragging && e.currentTarget._sx != null) setCardDragX(e.clientX - e.currentTarget._sx) }}
                onMouseUp={() => {
                  setCardDragging(false)
                  if (cardDragX > 40) { handleCardAction('approve') }
                  else if (cardDragX < -40) { handleCardAction('skip') }
                  else setCardDragX(0)
                }}
                onMouseLeave={() => { if(cardDragging){ setCardDragging(false); setCardDragX(0) } }}
              >
                {/* Email Draft Card */}
                {(<>
                  <div style={{ padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgb(240,235,230)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}><span>📧</span><span style={{ fontSize:14, color:'rgb(42,31,26)' }}>Email Draft</span></div>
                    <span style={{ fontSize:12, color:'rgb(138,122,106)' }}>12m ago</span>
                  </div>
                  <div style={{ padding:16 }}>
                    <div style={{ fontSize:12, color:'rgb(138,122,106)', marginBottom:4 }}>To: raad.ahmed@lawtrades.com</div>
                    <div style={{ fontSize:14, color:'rgb(42,31,26)', marginBottom:10 }}>Re: Hero image clickable link</div>
                    {editingDraft ? (<>
                      <textarea value={draftText} onChange={e => setDraftText(e.target.value)} style={{ width:'100%', minHeight:100, border:'1.5px dashed rgb(196,164,74)', borderRadius:10, background:'rgb(250,248,245)', padding:12, fontSize:13, color:'rgb(42,31,26)', lineHeight:1.5, fontFamily:'inherit', resize:'vertical', outline:'none', boxSizing:'border-box', marginBottom:10 }} autoFocus />
                      <button onClick={() => setEditingDraft(false)} style={{ height:36, padding:'0 16px', borderRadius:18, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:13, fontFamily:'inherit', cursor:'pointer', marginBottom:10 }}>Done editing</button>
                    </>) : (
                      <div style={{ background:'rgb(250,248,245)', borderRadius:10, padding:12, fontSize:13, color:'rgb(42,31,26)', lineHeight:1.5, marginBottom:10, position:'relative', cursor:'pointer' }} onClick={() => setEditingDraft(true)}>
                        {draftText}
                        <div style={{ position:'absolute', top:8, right:8, fontSize:12, color:'rgb(138,122,106)' }}>✏️ Edit</div>
                      </div>
                    )}
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={() => handleCardAction('skip')} style={{ flex:1, height:40, borderRadius:20, border:'1.5px solid rgb(220,80,60)', background:'none', color:'rgb(220,80,60)', fontSize:13, fontWeight:400, fontFamily:'inherit', cursor:'pointer' }}>← Skip</button>
                      <button style={{ flex:1, height:40, borderRadius:20, border:'1.5px solid rgb(224,216,207)', background:'none', color:'rgb(138,122,106)', fontSize:13, fontWeight:400, fontFamily:'inherit', cursor:'pointer' }}>↓ Later</button>
                      <button onClick={() => handleCardAction('approve')} style={{ flex:1, height:40, borderRadius:20, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:13, fontWeight:400, fontFamily:'inherit', cursor:'pointer' }}>Approve →</button>
                    </div>
                  </div>
                </>)}

              </div>
            </div>
            )}
          </div>
        )}

        {/* Phase 6: Brief CTA */}
        {phase === 6 && waitingForUser && !showTimeChips && ctaButton("Set up my brief →", handleSetupBrief, 'p6cta')}

        {/* Phase 6: Time chips */}
        {phase === 6 && showTimeChips && waitingForUser && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
            {timeOptions.map(t => (
              <div key={t} onClick={() => handleTimeSelect(t)} style={{ padding:'10px 8px', borderRadius:20, border:'1.5px solid rgb(224,216,207)', background:'#fff', fontSize:13, color:'rgb(42,31,26)', textAlign:'center', cursor:'pointer', fontWeight:400 }}>{t}</div>
            ))}
          </div>
        )}

        {/* Phase 7: Continue button below the lock screen notification card in chat */}
        {phase === 7 && waitingForUser && (
          <div style={{ animation:'fadeInUp 0.3s ease 2.5s both' }}>
            {ctaButton("Continue", handleLooksGood, 'p7cta')}
          </div>
        )}

        {/* Phase 8: Final prompt chips */}
        {showFinalChips && (
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:4, marginBottom:10, animation:'fadeInUp 0.3s ease' }}>
            {['📬 What\'s in my inbox?', '📅 What\'s on my calendar today?', '⚡ What needs my attention right now?', '📝 Draft a reply to my last email'].map(c => (
              <div key={c} style={{ background:'#fff', border:'1px solid rgb(224,216,207)', borderRadius:20, padding:'12px 16px', fontSize:14, color:'rgb(42,31,26)', cursor:'pointer', fontWeight:400 }}>{c}</div>
            ))}
          </div>
        )}

      </div>

      {/* Phase 1 chips - fixed above tab bar */}
      {phase === 1 && waitingForUser && (
        <div style={{ padding:'10px 16px', background:'rgb(250,248,245)', flexShrink:0, animation:'fadeInUp 0.3s ease' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
            {chipOptions.map(c => (
              <div key={c} onClick={() => handleChipSelect(c)} style={{ background:'rgb(232,226,218)', borderRadius:20, padding:'10px 16px', fontSize:13, color:'rgb(42,31,26)', cursor:'pointer', textAlign:'center' }}>{c}</div>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <input placeholder="e.g. reviewing PRs, inbox, design feedback..." style={{ flex:1, height:42, borderRadius:21, border:'1px solid rgb(224,216,207)', background:'#fff', padding:'0 14px', fontSize:13, fontFamily:'inherit', outline:'none' }} />
            <div style={{ width:36, height:36, borderRadius:'50%', background:'rgb(180,172,163)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, cursor:'pointer' }}>↑</div>
          </div>
        </div>
      )}

      {/* Phase 8: Message input bar */}
      {showFinalChips && (
        <div style={{ padding:'8px 16px', background:'rgb(250,248,245)', flexShrink:0, display:'flex', gap:8, alignItems:'center' }}>
          <input placeholder={`Message ${name}...`} style={{ flex:1, height:42, borderRadius:21, border:'1px solid rgb(224,216,207)', background:'#fff', padding:'0 14px', fontSize:13, fontFamily:'inherit', outline:'none' }} />
          <div style={{ width:36, height:36, borderRadius:'50%', background:'rgb(224,216,207)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgb(138,122,106)', fontSize:14, cursor:'pointer' }}>↑</div>
        </div>
      )}

      {/* Tab bar */}
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Google permissions bottom sheet */}
      {showGoogleSheet && (
        <div onClick={e => { if (e.target === e.currentTarget) setShowGoogleSheet(false) }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'flex-end', animation:'fadeIn 0.2s ease' }}>
          <div style={{ width:'100%', background:'#fff', borderRadius:'24px 24px 0 0', padding:'20px 24px 40px', animation:'slideUp 0.3s ease' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#e0e0e0', margin:'0 auto 20px' }} />
            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
                <span style={{ fontSize:24 }}>G</span>
              </div>
              <div>
                <div style={{ fontSize:16, color:'#1a1a1a' }}>Sign in with Google</div>
                <div style={{ fontSize:13, color:'rgb(138,122,106)' }}>to continue to Maestro</div>
              </div>
            </div>
            <div style={{ height:1, background:'rgb(240,235,230)', marginBottom:16 }} />
            {/* Account picker */}
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:14, border:'1.5px solid rgb(224,216,207)', marginBottom:16 }}>
              <div style={{ width:40, height:40, borderRadius:20, background:'rgb(66,133,244)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13 }}>IC</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, color:'#1a1a1a' }}>Iris Chang</div>
                <div style={{ fontSize:12, color:'rgb(138,122,106)' }}>iris@lawtrades.com</div>
              </div>
              <span style={{ fontSize:18, color:'rgb(138,122,106)' }}>✓</span>
            </div>
            {/* Permissions */}
            <div style={{ fontSize:11, color:'rgb(138,122,106)', letterSpacing:1, textTransform:'uppercase', marginBottom:12 }}>Maestro will be able to</div>
            {['Read your emails and threads', 'Create and send draft replies', 'Mark emails as read'].map((p, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom: i < 2 ? '1px solid rgb(245,240,235)' : 'none' }}>
                <span style={{ width:24, height:24, borderRadius:12, background:'rgb(52,168,83)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✓</span>
                <span style={{ fontSize:14, color:'rgb(42,31,26)' }}>{p}</span>
              </div>
            ))}
            <div style={{ fontSize:13, color:'rgb(138,122,106)', marginTop:16, marginBottom:20, lineHeight:1.5, background:'rgb(245,242,238)', borderRadius:10, padding:'10px 14px' }}>🔒 Maestro will only act when you approve. You can disconnect anytime.</div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setShowGoogleSheet(false)} style={{ flex:1, height:48, borderRadius:24, border:'1.5px solid rgb(224,216,207)', background:'none', fontSize:14, color:'rgb(42,31,26)', fontFamily:'inherit', cursor:'pointer' }}>Cancel</button>
              <button onClick={() => { const next = new Set(connectedApps); next.add('gmail'); setConnectedApps(next); setShowGoogleSheet(false); setCurrentAppIndex(1) }} style={{ flex:1, height:48, borderRadius:24, border:'none', background:'#4285F4', color:'#fff', fontSize:14, fontFamily:'inherit', cursor:'pointer' }}>Allow</button>
            </div>
          </div>
        </div>
      )}

      {/* Figma bottom sheet */}
      {showFigmaSheet && (
        <div onClick={e => { if (e.target === e.currentTarget) setShowFigmaSheet(false) }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'flex-end', animation:'fadeIn 0.2s ease' }}>
          <div style={{ width:'100%', background:'#fff', borderRadius:'24px 24px 0 0', padding:'20px 24px 40px', animation:'slideUp 0.3s ease', overflowY:'auto', maxHeight:'85%' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#e0e0e0', margin:'0 auto 20px' }} />
            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'rgb(242,230,255)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>🎨</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:16, color:'#1a1a1a' }}>Connect Figma</div>
                <div style={{ fontSize:13, color:'rgb(138,122,106)' }}>API key required</div>
              </div>
              <span onClick={() => setShowFigmaSheet(false)} style={{ fontSize:14, color:'rgb(138,122,106)', cursor:'pointer' }}>Cancel</span>
            </div>
            {/* Steps */}
            <div style={{ fontSize:11, color:'rgb(138,122,106)', letterSpacing:1, textTransform:'uppercase', marginBottom:12 }}>How to find your key</div>
            <div style={{ borderRadius:14, border:'1.5px solid rgb(240,235,228)', overflow:'hidden', marginBottom:14 }}>
              {[
                'Go to figma.com → click your profile icon (top left) → Settings',
                'Scroll to "Personal access tokens" section',
                'Click "Create new token" → name it "Maestro" → Enter',
                'Copy the token shown — it won\'t be visible again'
              ].map((step, i) => (
                <div key={i} style={{ display:'flex', gap:12, padding:'14px 14px', alignItems:'flex-start', borderBottom: i < 3 ? '1px solid rgb(245,240,235)' : 'none' }}>
                  <div style={{ width:28, height:28, borderRadius:14, background:'rgb(44,30,18)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>{i+1}</div>
                  <span style={{ fontSize:14, color:'rgb(42,31,26)', lineHeight:1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize:13, color:'rgb(138,122,106)', marginBottom:16, cursor:'pointer' }}>📖 View official Figma API docs ↗</div>
            {/* Token input */}
            <div style={{ fontSize:11, color:'rgb(138,122,106)', letterSpacing:1, textTransform:'uppercase', marginBottom:8 }}>Personal access token</div>
            <input value={figmaToken} onChange={e => setFigmaToken(e.target.value)} placeholder="figd_xxxxxxxxxxxxxxxxxxxxxxx" style={{ width:'100%', height:48, borderRadius:14, border:'1.5px solid rgb(224,216,207)', background:'#fff', padding:'0 14px', fontSize:14, fontFamily:'inherit', boxSizing:'border-box', outline:'none', marginBottom:10 }} />
            <div style={{ fontSize:13, color:'rgb(138,122,106)', marginBottom:20, lineHeight:1.5, background:'rgb(245,242,238)', borderRadius:10, padding:'10px 14px' }}>🔒 Your key is encrypted and stored securely. Maestro only reads data — it never modifies anything without your approval.</div>
            <button onClick={() => { if (figmaToken) { const next = new Set(connectedApps); next.add('figma'); setConnectedApps(next); setShowFigmaSheet(false); setCurrentAppIndex(2) } }} style={{ width:'100%', height:48, borderRadius:24, border:'none', background: figmaToken ? 'rgb(44,30,18)' : 'rgb(224,216,207)', color: figmaToken ? '#fff' : 'rgb(138,122,106)', fontSize:14, fontFamily:'inherit', cursor: figmaToken ? 'pointer' : 'default' }}>Connect Figma</button>
          </div>
        </div>
      )}

      {/* Slack permissions bottom sheet */}
      {showSlackSheet && (
        <div onClick={e => { if (e.target === e.currentTarget) setShowSlackSheet(false) }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'flex-end', animation:'fadeIn 0.2s ease' }}>
          <div style={{ width:'100%', background:'#fff', borderRadius:'24px 24px 0 0', padding:'20px 24px 40px', animation:'slideUp 0.3s ease' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#e0e0e0', margin:'0 auto 20px' }} />
            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:'rgb(74,21,75)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:20 }}>#</div>
              <div>
                <div style={{ fontSize:16, color:'#1a1a1a' }}>Sign in with Slack</div>
                <div style={{ fontSize:13, color:'rgb(138,122,106)' }}>to continue to Maestro</div>
              </div>
            </div>
            <div style={{ height:1, background:'rgb(240,235,230)', marginBottom:16 }} />
            {/* Account */}
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:14, border:'1.5px solid rgb(224,216,207)', marginBottom:16 }}>
              <div style={{ width:40, height:40, borderRadius:20, background:'rgb(74,21,75)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13 }}>IC</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, color:'#1a1a1a' }}>Iris Chang</div>
                <div style={{ fontSize:12, color:'rgb(138,122,106)' }}>iris@lawtrades.com</div>
              </div>
              <span style={{ fontSize:11, color:'rgb(74,21,75)', background:'rgb(240,230,245)', padding:'3px 8px', borderRadius:6 }}>Lawtrades</span>
              <span style={{ fontSize:18, color:'rgb(138,122,106)' }}>✓</span>
            </div>
            {/* Permissions */}
            <div style={{ fontSize:11, color:'rgb(138,122,106)', letterSpacing:1, textTransform:'uppercase', marginBottom:12 }}>Maestro will be able to</div>
            {['Read messages in your channels', 'View your Slack profile', 'Post messages on your behalf'].map((p, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom: i < 2 ? '1px solid rgb(245,240,235)' : 'none' }}>
                <span style={{ width:24, height:24, borderRadius:12, background:'rgb(52,168,83)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✓</span>
                <span style={{ fontSize:14, color:'rgb(42,31,26)' }}>{p}</span>
              </div>
            ))}
            <div style={{ fontSize:13, color:'rgb(138,122,106)', marginTop:16, marginBottom:20, lineHeight:1.5 }}>🔒 Maestro will never post without your approval.</div>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setShowSlackSheet(false)} style={{ flex:1, height:48, borderRadius:24, border:'1.5px solid rgb(224,216,207)', background:'none', fontSize:14, color:'rgb(42,31,26)', fontFamily:'inherit', cursor:'pointer' }}>Cancel</button>
              <button onClick={() => { const next = new Set(connectedApps); next.add('slack'); setConnectedApps(next); setShowSlackSheet(false) }} style={{ flex:1, height:48, borderRadius:24, border:'none', background:'rgb(74,21,75)', color:'#fff', fontSize:14, fontFamily:'inherit', cursor:'pointer' }}>Allow</button>
            </div>
          </div>
        </div>
      )}
      {/* Skip nudge modal */}
      {/* (lock screen is now inline in chat scroll area) */}

      {showSkipNudge && (
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', zIndex:60, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
          <div style={{ background:'rgb(250,248,245)', borderRadius:'20px 20px 0 0', padding:'24px 20px 32px', width:'100%', maxWidth:430 }}>
            <div style={{ fontSize:14, color:'rgb(42,31,26)', lineHeight:1.6, marginBottom:20 }}>
              Just a heads up — without at least one app connected, your first experience will be pretty limited. I work best when I can actually see your stuff. Connect one now and I'll make it worth it right away.
            </div>
            <button onClick={() => { setShowSkipNudge(false) }} style={{ width:'100%', height:48, borderRadius:24, border:'none', background:'rgb(44,30,18)', color:'#fff', fontSize:15, fontWeight:400, fontFamily:'inherit', cursor:'pointer', marginBottom:12 }}>Connect one real quick</button>
            <div onClick={() => { setShowSkipNudge(false); handleContinueApps() }} style={{ textAlign:'center', fontSize:14, color:'rgb(138,122,106)', cursor:'pointer' }}>I'll do it later</div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ───── TAB BAR ───── */
function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'activity', icon: '📄', label: 'Activity' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ]
  return (
    <div style={{ borderTop:'1px solid rgb(224,216,207)', display:'flex', alignItems:'center', justifyContent:'space-around', padding:'10px 0 28px', background:'rgb(250,248,245)', flexShrink:0 }}>
      {tabs.map(t => (
        <div key={t.id} onClick={() => onTabChange(t.id)} style={{
          display:'flex', alignItems:'center', gap:6, cursor:'pointer',
          ...(activeTab === t.id
            ? { background:'rgb(44,30,18)', padding:'8px 18px', borderRadius:20 }
            : { padding:'8px 18px' })
        }}>
          <span style={{ fontSize:14 }}>{t.icon}</span>
          <span style={{ fontSize:13, fontWeight:400, color: activeTab === t.id ? '#fff' : 'rgb(138,122,106)' }}>{t.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ───── ACTIVITY SCREEN ───── */
function ActivityScreen({ activeTab, onTabChange, onConnectGmail }) {
  return (
    <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', background:'rgb(250,248,245)' }}>
      {/* Header */}
      <div style={{ paddingTop:60, paddingBottom:16, paddingLeft:24, paddingRight:24, flexShrink:0 }}>
        <div style={{ fontSize:22, color:'rgb(42,31,26)', fontWeight:400 }}>Activity</div>
        <div style={{ fontSize:14, color:'rgb(138,122,106)', marginTop:4 }}>Your handled tasks and pending items show up here</div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex:1, overflowY:'auto', padding:'0 16px 16px' }}>
        {/* Empty state */}
        <div style={{ textAlign:'center', padding:'32px 16px 24px' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>📋</div>
          <div style={{ fontSize:17, color:'rgb(42,31,26)', fontWeight:400, marginBottom:6 }}>Nothing here yet</div>
          <div style={{ fontSize:14, color:'rgb(138,122,106)', lineHeight:1.55 }}>Once you start approving, skipping, or saving tasks, they'll all show up here.</div>
        </div>

        {/* App connection rows */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgb(224,216,207)', overflow:'hidden', marginBottom:20 }}>
          {[
            { icon:'📧', name:'Gmail' },
            { icon:'📅', name:'Calendar' },
            { icon:'#️⃣', name:'Slack' },
          ].map((app, i) => (
            <div key={i} onClick={app.name === 'Gmail' ? onConnectGmail : undefined} style={{
              display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
              borderBottom: i < 2 ? '1px solid rgb(240,235,230)' : 'none',
              cursor:'pointer',
            }}>
              <span style={{ fontSize:20 }}>{app.icon}</span>
              <span style={{ fontSize:15, color:'rgb(42,31,26)', flex:1, fontWeight:400 }}>{app.name}</span>
              <span style={{ fontSize:14, color:'rgb(196,164,74)', fontWeight:400 }}>Connect →</span>
            </div>
          ))}
        </div>

        {/* Section label */}
        <div style={{ fontSize:12, letterSpacing:1, color:'rgb(138,122,106)', textTransform:'uppercase', marginBottom:12, paddingLeft:4 }}>What you'll see here</div>

        {/* Info rows */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgb(224,216,207)', overflow:'hidden' }}>
          {[
            { icon:'✓', iconColor:'rgb(52,168,83)', title:'Approved items', desc:'Tasks you greenlit — sent, scheduled, or completed' },
            { icon:'⏳', iconColor:'rgb(138,122,106)', title:'Pending items', desc:'Waiting for your decision — swipe to approve or skip' },
            { icon:'✕', iconColor:'rgb(220,80,60)', title:'Skipped items', desc:'Things you passed on — revisit anytime' },
          ].map((row, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 16px', borderBottom: i < 2 ? '1px solid rgb(240,235,230)' : 'none' }}>
              <div style={{ width:28, height:28, borderRadius:14, background: i === 0 ? 'rgb(220,245,230)' : i === 1 ? 'rgb(245,240,232)' : 'rgb(252,232,230)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:row.iconColor, flexShrink:0, marginTop:2 }}>{row.icon}</div>
              <div>
                <div style={{ fontSize:15, color:'rgb(42,31,26)', fontWeight:400 }}>{row.title}</div>
                <div style={{ fontSize:13, color:'rgb(138,122,106)', lineHeight:1.5 }}>{row.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}

/* ───── SETTINGS SCREEN ───── */
function SettingsScreen({ activeTab, onTabChange, onConnectGmail }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAllActivity, setShowAllActivity] = useState(false)
  const [showAddApp, setShowAddApp] = useState(false)
  const [notifToggles, setNotifToggles] = useState({ morning: true, decision: true, urgent: false, quiet: false })
  const [activityFilter, setActivityFilter] = useState('all')

  const toggleNotif = (key) => setNotifToggles(prev => ({ ...prev, [key]: !prev[key] }))

  const allActivityItems = [
    { status:'done', title:'Reply sent to Raad Ahmed', app:'Gmail', time:'2h ago' },
    { status:'done', title:'Marketing Sync rescheduled', app:'Calendar', time:'3h ago' },
    { status:'done', title:'Replied to Jerry in #eng', app:'Slack', time:'4h ago' },
    { status:'saved', title:'Follow-up to Sarah saved', app:'Gmail', time:'Yesterday' },
    { status:'saved', title:'Design Review conflict saved', app:'Calendar', time:'Yesterday' },
    { status:'done', title:'Newsletter unsubscribed', app:'Gmail', time:'Yesterday' },
    { status:'skipped', title:'#random mention skipped', app:'Slack', time:'2 days' },
    { status:'skipped', title:'Duplicate standup skipped', app:'Calendar', time:'2 days' },
    { status:'done', title:'Standup posted in #general', app:'Slack', time:'2 days' },
    { status:'done', title:'Newsletter unsubscribed', app:'Gmail', time:'3 days' },
  ]

  const filteredItems = activityFilter === 'all' ? allActivityItems : allActivityItems.filter(i => i.status === activityFilter)

  const statusIcon = (s) => {
    if (s === 'done') return { symbol:'✓', color:'rgb(52,168,83)', bg:'rgb(220,245,230)' }
    if (s === 'saved') return { symbol:'⏳', color:'rgb(138,110,70)', bg:'rgb(245,240,232)' }
    return { symbol:'✕', color:'rgb(220,80,60)', bg:'rgb(252,232,230)' }
  }

  const appDot = (app) => {
    if (app === 'Gmail') return 'rgb(234,67,53)'
    if (app === 'Calendar') return 'rgb(66,133,244)'
    return 'rgb(74,21,75)'
  }

  // All Activity sub-screen
  if (showAllActivity) {
    return (
      <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', background:'rgb(250,248,245)' }}>
        <div style={{ paddingTop:60, paddingBottom:12, paddingLeft:24, paddingRight:24, flexShrink:0 }}>
          <div onClick={() => setShowAllActivity(false)} style={{ fontSize:14, color:'rgb(196,164,74)', cursor:'pointer', marginBottom:8, fontWeight:400 }}>‹ Settings</div>
          <div style={{ fontSize:22, color:'rgb(42,31,26)', fontWeight:400 }}>All Activity</div>
        </div>

        {/* Filter pills */}
        <div style={{ display:'flex', gap:8, padding:'0 24px 12px', flexShrink:0 }}>
          {[
            { id:'all', label:'All' },
            { id:'done', label:'✓ Done' },
            { id:'saved', label:'⏳ Saved' },
            { id:'skipped', label:'✕ Skipped' },
          ].map(f => (
            <div key={f.id} onClick={() => setActivityFilter(f.id)} style={{
              padding:'6px 14px', borderRadius:16, fontSize:13, cursor:'pointer', fontWeight:400,
              background: activityFilter === f.id ? 'rgb(44,30,18)' : '#fff',
              color: activityFilter === f.id ? '#fff' : 'rgb(42,31,26)',
              border: activityFilter === f.id ? 'none' : '1px solid rgb(224,216,207)',
            }}>{f.label}</div>
          ))}
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'0 16px 16px' }}>
          {filteredItems.map((item, i) => {
            const si = statusIcon(item.status)
            return (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 8px', borderBottom:'1px solid rgb(240,235,230)' }}>
                <div style={{ width:28, height:28, borderRadius:14, background:si.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, color:si.color, flexShrink:0 }}>{si.symbol}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, color:'rgb(42,31,26)', fontWeight:400 }}>{item.title}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                    <div style={{ width:6, height:6, borderRadius:3, background:appDot(item.app) }} />
                    <span style={{ fontSize:12, color:'rgb(138,122,106)' }}>{item.app}</span>
                    <span style={{ fontSize:12, color:'rgb(138,122,106)' }}>· {item.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <TabBar activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    )
  }

  const barHeights = [28, 36, 32, 44, 52, 24, 18]
  const barDays = ['M','T','W','T','F','S','S']

  return (
    <div style={{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column', background:'rgb(250,248,245)', position:'relative' }}>
      {/* Header */}
      <div style={{ paddingTop:60, paddingBottom:16, paddingLeft:24, paddingRight:24, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:22, color:'rgb(42,31,26)', fontWeight:400 }}>Settings</div>
        <div onClick={() => setShowNotifications(true)} style={{ fontSize:22, cursor:'pointer' }}>🔔</div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex:1, overflowY:'auto', padding:'0 16px 16px' }}>
        {/* THIS WEEK card */}
        <div style={{ fontSize:12, letterSpacing:1, color:'rgb(138,122,106)', textTransform:'uppercase', marginBottom:8, paddingLeft:4 }}>This week</div>
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgb(224,216,207)', padding:16, marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:4 }}>
            <span style={{ fontSize:28, color:'rgb(42,31,26)', fontWeight:400 }}>4.2h</span>
            <span style={{ fontSize:14, color:'rgb(138,122,106)', fontWeight:400 }}>saved</span>
          </div>
          <div style={{ fontSize:13, color:'rgb(196,164,74)', marginBottom:16, fontWeight:400 }}>↑ 12% from last week</div>
          {/* Bar chart */}
          <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:60, marginBottom:12 }}>
            {barHeights.map((h, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:'100%', height:h, borderRadius:4, background: i === 4 ? 'rgb(44,30,18)' : 'rgb(235,230,222)' }} />
                <span style={{ fontSize:10, color:'rgb(138,122,106)' }}>{barDays[i]}</span>
              </div>
            ))}
          </div>
          <div onClick={() => setShowAllActivity(true)} style={{ fontSize:14, color:'rgb(196,164,74)', textAlign:'center', cursor:'pointer', fontWeight:400, paddingTop:4 }}>See All Activity ›</div>
        </div>

        {/* YOUR APPS */}
        <div style={{ fontSize:12, letterSpacing:1, color:'rgb(138,122,106)', textTransform:'uppercase', marginBottom:8, paddingLeft:4 }}>Your apps</div>
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgb(224,216,207)', overflow:'hidden', marginBottom:12 }}>
          {[
            { icon:'📧', name:'Gmail' },
            { icon:'📅', name:'Calendar' },
          ].map((app, i) => (
            <div key={i} onClick={app.name === 'Gmail' ? onConnectGmail : undefined} style={{
              display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
              borderBottom: i < 1 ? '1px solid rgb(240,235,230)' : 'none',
              cursor:'pointer',
            }}>
              <span style={{ fontSize:20 }}>{app.icon}</span>
              <span style={{ fontSize:15, color:'rgb(42,31,26)', flex:1, fontWeight:400 }}>{app.name}</span>
              <span style={{ fontSize:13, color:'rgb(196,164,74)', fontWeight:400 }}>Tap to connect →</span>
              <span style={{ fontSize:14, color:'rgb(138,122,106)' }}>›</span>
            </div>
          ))}
        </div>

        {/* Add App button */}
        <div onClick={() => setShowAddApp(true)} style={{
          display:'flex', alignItems:'center', gap:12, padding:'14px 16px',
          borderRadius:16, border:'1.5px dashed rgb(224,216,207)', cursor:'pointer', marginBottom:16,
        }}>
          <div style={{ width:28, height:28, borderRadius:14, border:'1.5px solid rgb(224,216,207)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, color:'rgb(138,122,106)' }}>+</div>
          <span style={{ fontSize:15, color:'rgb(42,31,26)', fontWeight:400 }}>Add App</span>
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={onTabChange} />

      {/* Notifications bottom sheet */}
      {showNotifications && (
        <div onClick={e => { if (e.target === e.currentTarget) setShowNotifications(false) }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'flex-end', animation:'fadeIn 0.2s ease' }}>
          <div style={{ width:'100%', background:'#fff', borderRadius:'24px 24px 0 0', padding:'20px 24px 40px', animation:'slideUp 0.3s ease' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#e0e0e0', margin:'0 auto 20px' }} />
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <div style={{ fontSize:18, color:'rgb(42,31,26)', fontWeight:400 }}>Notifications</div>
              <div onClick={() => setShowNotifications(false)} style={{ fontSize:15, color:'rgb(196,164,74)', cursor:'pointer', fontWeight:400 }}>Done</div>
            </div>
            {[
              { key:'morning', icon:'🌅', title:'Morning Brief', desc:'Daily summary at 8:00 AM' },
              { key:'decision', icon:'⏳', title:'Decision Cards', desc:'When King needs your approval' },
              { key:'urgent', icon:'⚡', title:'Urgent Only', desc:'Time-sensitive items only' },
              { key:'quiet', icon:'🌙', title:'Quiet Hours', desc:'Silence from 10 PM – 8 AM' },
            ].map((row, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 0', borderBottom: i < 3 ? '1px solid rgb(240,235,230)' : 'none' }}>
                <span style={{ fontSize:20 }}>{row.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, color:'rgb(42,31,26)', fontWeight:400 }}>{row.title}</div>
                  <div style={{ fontSize:13, color:'rgb(138,122,106)' }}>{row.desc}</div>
                </div>
                <div onClick={() => toggleNotif(row.key)} style={{
                  width:46, height:26, borderRadius:13, cursor:'pointer',
                  background: notifToggles[row.key] ? 'rgb(52,168,83)' : 'rgb(200,195,188)',
                  position:'relative', transition:'background 0.2s',
                }}>
                  <div style={{
                    width:22, height:22, borderRadius:11, background:'#fff',
                    position:'absolute', top:2,
                    left: notifToggles[row.key] ? 22 : 2,
                    transition:'left 0.2s',
                    boxShadow:'0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add App bottom sheet */}
      {showAddApp && (
        <div onClick={e => { if (e.target === e.currentTarget) setShowAddApp(false) }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'flex-end', animation:'fadeIn 0.2s ease' }}>
          <div style={{ width:'100%', background:'#fff', borderRadius:'24px 24px 0 0', padding:'20px 24px 40px', animation:'slideUp 0.3s ease', maxHeight:'80%', overflowY:'auto' }}>
            <div style={{ width:36, height:4, borderRadius:2, background:'#e0e0e0', margin:'0 auto 20px' }} />
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <div style={{ fontSize:18, color:'rgb(42,31,26)', fontWeight:400 }}>Add App</div>
              <div onClick={() => setShowAddApp(false)} style={{ fontSize:15, color:'rgb(196,164,74)', cursor:'pointer', fontWeight:400 }}>Done</div>
            </div>
            {[
              { icon:'#️⃣', name:'Slack', desc:'Messages & @mentions', badge:'Login', badgeBg:'rgb(44,30,18)', badgeColor:'#fff' },
              { icon:'🐙', name:'GitHub', desc:'PRs, issues & code reviews', badge:'API key', badgeBg:'rgb(245,240,232)', badgeColor:'rgb(138,122,106)' },
              { icon:'📝', name:'Notion', desc:'Docs, tasks & wikis', badge:'API key', badgeBg:'rgb(245,240,232)', badgeColor:'rgb(138,122,106)' },
              { icon:'💎', name:'Linear', desc:'Issues & project tracking', badge:'API key', badgeBg:'rgb(245,240,232)', badgeColor:'rgb(138,122,106)' },
              { icon:'🎨', name:'Figma', desc:'Design comments & handoffs', badge:'API key', badgeBg:'rgb(245,240,232)', badgeColor:'rgb(138,122,106)' },
              { icon:'🚀', name:'Apollo', desc:'CRM & sales sequences', badge:'API key', badgeBg:'rgb(245,240,232)', badgeColor:'rgb(138,122,106)' },
              { icon:'📄', name:'Google Docs', desc:'Documents & comments', badge:'API key', badgeBg:'rgb(245,240,232)', badgeColor:'rgb(138,122,106)' },
            ].map((app, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 0', borderBottom: i < 6 ? '1px solid rgb(240,235,230)' : 'none' }}>
                <span style={{ fontSize:22 }}>{app.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, color:'rgb(42,31,26)', fontWeight:400 }}>{app.name}</div>
                  <div style={{ fontSize:13, color:'rgb(138,122,106)' }}>{app.desc}</div>
                </div>
                <div style={{ padding:'4px 10px', borderRadius:10, background:app.badgeBg, fontSize:12, color:app.badgeColor, fontWeight:400 }}>{app.badge}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connect Gmail bottom sheet */}
      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } @keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }`}</style>
    </div>
  )
}

/* ───── CONNECT GMAIL SHEET ───── */
function ConnectGmailSheet({ onClose }) {
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose() }} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex:400, display:'flex', alignItems:'flex-end', animation:'fadeIn 0.2s ease' }}>
      <div style={{ width:'100%', background:'#fff', borderRadius:'24px 24px 0 0', padding:'20px 24px 40px', animation:'slideUp 0.3s ease' }}>
        <div style={{ width:36, height:4, borderRadius:2, background:'#e0e0e0', margin:'0 auto 20px' }} />
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:4 }}>
          <span style={{ fontSize:28 }}>📧</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, color:'rgb(42,31,26)', fontWeight:400 }}>Connect Gmail</div>
            <div style={{ fontSize:13, color:'rgb(138,122,106)' }}>Login required</div>
          </div>
          <div onClick={onClose} style={{ fontSize:14, color:'rgb(138,122,106)', cursor:'pointer', fontWeight:400 }}>Cancel</div>
        </div>

        <div style={{ fontSize:12, letterSpacing:1, color:'rgb(138,122,106)', textTransform:'uppercase', marginTop:20, marginBottom:12 }}>King will be able to</div>
        {[
          'Read & send emails on your behalf',
          'Detect emails needing replies',
          'Mark emails as read',
        ].map((p, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom: i < 2 ? '1px solid rgb(245,240,235)' : 'none' }}>
            <span style={{ width:24, height:24, borderRadius:12, background:'rgb(52,168,83)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>✓</span>
            <span style={{ fontSize:14, color:'rgb(42,31,26)', fontWeight:400 }}>{p}</span>
          </div>
        ))}

        <div style={{ fontSize:13, color:'rgb(138,122,106)', marginTop:16, marginBottom:20, lineHeight:1.5, background:'rgb(245,242,238)', borderRadius:10, padding:'10px 14px' }}>
          🔒 King never sends anything without your approval. You can disconnect anytime in Settings.
        </div>

        <button style={{
          width:'100%', height:50, borderRadius:25, border:'none',
          background:'rgb(66,133,244)', color:'#fff', fontSize:15, fontWeight:400,
          fontFamily:'inherit', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        }}>
          <div style={{ width:8, height:8, borderRadius:4, background:'#fff' }} />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

/* ───── APP ───── */
function App() {
  const [screen, setScreen] = useState('splash')
  const [agentAvatar, setAgentAvatar] = useState('👑')
  const [agentName, setAgentName] = useState('Nova')
  const [activeTab, setActiveTab] = useState('chat')
  const [showConnectGmail, setShowConnectGmail] = useState(false)
  const handleSetupComplete = (avatar, name) => {
    if (avatar) setAgentAvatar(avatar)
    if (name) setAgentName(name)
    setScreen('chat')
  }

  return (
    <div style={{
      width:'100vw', height:'100vh', background:'rgb(248,137,103)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <PhoneFrame>
        {screen === 'splash' && (
          <SplashScreen
            onGetStarted={() => setScreen('onboarding')}
            onSkip={() => setScreen('setup')}
          />
        )}
        {screen === 'onboarding' && (
          <OnboardingScreen
            onSignUp={() => setScreen('signup')}
            onLogIn={() => setScreen('signup')}
          />
        )}
        {screen === 'signup' && (
          <SignUpScreen
            onLogIn={() => setScreen('onboarding')}
            onNext={() => setScreen('setup')}
          />
        )}
        {screen === 'setup' && (
          <SetupScreen onComplete={handleSetupComplete} />
        )}
        {screen === 'chat' && (
          <div style={{ flex:1, display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
            <div style={{ flex:1, display: activeTab === 'chat' ? 'flex' : 'none', flexDirection:'column', overflow:'hidden' }}>
              <ChatScreen avatar={agentAvatar} name={agentName} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            {activeTab === 'activity' && (
              <ActivityScreen activeTab={activeTab} onTabChange={setActiveTab} onConnectGmail={() => setShowConnectGmail(true)} />
            )}
            {activeTab === 'settings' && (
              <SettingsScreen activeTab={activeTab} onTabChange={setActiveTab} onConnectGmail={() => setShowConnectGmail(true)} />
            )}
            {showConnectGmail && <ConnectGmailSheet onClose={() => setShowConnectGmail(false)} />}
            <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } @keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }`}</style>
          </div>
        )}
      </PhoneFrame>
    </div>
  )
}

export default App
