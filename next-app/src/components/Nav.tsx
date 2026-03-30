import Image from 'next/image';

export default function Nav() {
  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <div className="nav-logo">
          <Image src="/assets/flent-logo.png" alt="Flent" width={88} height={22} priority />
        </div>
        <div className="nav-buttons">
          <button className="btn-base btn-pastel-peach">Sign in</button>
          <button className="btn-base btn-pastel-violet">Join — it&apos;s free</button>
        </div>
      </nav>
    </div>
  );
}
