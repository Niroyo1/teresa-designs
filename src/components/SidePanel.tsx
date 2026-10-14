export default function SidePanel() {
  return (
    <aside
      className="opacity"
      style={{
        backgroundImage:
          'radial-gradient(circle, var(--color-ink) 1.1mm, transparent 1.2mm), radial-gradient(circle, var(--color-ink) 1.1mm, transparent 1.2mm)',
        backgroundSize: '18mm 18mm',
        backgroundPosition: '0 0, 9mm 9mm',
      }}
    />
  );
}