export default function Message({ role, content }) {
  return (
    <div style={{ background: '#eee', padding: 16, margin: 8 }}>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  )
}
