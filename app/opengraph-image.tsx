import { ImageResponse } from 'next/og'

export const alt = 'Ternixo — hands-on Git, Docker, and Linux labs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ background: '#0a0d12', color: '#e8ecf1', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', padding: '72px', width: '100%', fontFamily: 'sans-serif', border: '1px solid #1f242c' }}><div style={{ color: '#e8ecf1', display: 'flex', alignItems: 'center', fontSize: 28, fontWeight: 700 }}><span style={{ background: '#12161d', border: '1px solid #2b323d', color: '#a3e635', fontFamily: 'monospace', marginRight: 14, padding: '8px 10px' }}>&gt;_</span>ternixo<span style={{ color: '#5b6472' }}>.</span></div><div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ color: '#a3e635', fontSize: 22, fontWeight: 600, marginBottom: 24 }}>Hands-on learning for developers</div><div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, fontWeight: 700, letterSpacing: -4 }}>Learn by doing.<br /><span style={{ color: '#8a94a3' }}>Ship with confidence.</span></div></div><div style={{ color: '#8a94a3', display: 'flex', fontSize: 20 }}>Practical labs for Git, Docker, and Linux / Bash.</div></div>, size)
}
