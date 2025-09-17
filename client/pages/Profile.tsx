export default function Profile() {
  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <h1 className="font-serif text-2xl mb-2">Profile</h1>
      <ul className="text-sm space-y-1">
        <li>• Mobile OTP sign‑in</li>
        <li>• Loyalty points & preferences</li>
        <li>• Enable biometrics</li>
      </ul>
      <p className="text-muted-foreground mt-3">These settings will live here once we hook up authentication.</p>
    </div>
  );
}
