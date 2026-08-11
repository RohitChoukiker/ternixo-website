import { ImageResponse } from 'next/og'

export const alt = 'Ternixo — hands-on Git, Docker, and Linux labs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ background: '#f8fafc', color: '#0f172a', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '72px', width: '100%', fontFamily: 'sans-serif', backgroundImage: 'radial-gradient(circle at 85% 20%, #c7d2fe 0, transparent 30%)' }}><div style={{ color: '#0f172a', display: 'flex', alignItems: 'center', fontSize: 28, fontWeight: 700 }}><span style={{ background: '#6366f1', borderRadius: 10, color: '#fff', fontFamily: 'monospace', marginRight: 14, padding: '8px 10px' }}>&gt;_</span>ternixo<span style={{ color: '#6366f1' }}>.</span></div><div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ color: '#4f46e5', fontSize: 22, fontWeight: 600, marginBottom: 24 }}>Hands-on learning for developers</div><div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>Learn by doing.<br /><span style={{ color: '#6366f1' }}>Ship with confidence.</span></div></div><div style={{ color: '#475569', display: 'flex', fontSize: 20 }}>Practical labs for Git, Docker, and Linux / Bash.</div></div>, size)
}
