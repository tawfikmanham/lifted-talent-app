const USERS = [
  {
    name: "Nex Ifa",
    email: "nexifa3806@mypethealh.com",
    role: "Ceo",
    keyContact: true,
  },
];

export function UsersPanel() {
  return (
    <section className="rounded-md bg-white shadow-sm ring-1 ring-border-subtle">
      <div className="px-5 py-4">
        <h2 className="text-lg font-semibold text-brand-ink">Users</h2>
      </div>
      <div className="grid grid-cols-4 gap-4 bg-page px-5 py-3 text-xs text-muted">
        <div>Name</div>
        <div>Email</div>
        <div>Agency Role</div>
        <div>Key Contact</div>
      </div>
      <ul>
        {USERS.map((u) => (
          <li
            key={u.email}
            className="grid grid-cols-4 gap-4 border-t border-border-subtle px-5 py-4 text-sm"
          >
            <div className="text-brand-ink">{u.name}</div>
            <div className="truncate text-brand-ink">{u.email}</div>
            <div className="text-brand-ink">{u.role}</div>
            <div>
              {u.keyContact && (
                <span className="inline-block rounded-full bg-lavender px-2.5 py-1 text-xs font-medium text-brand-primary">
                  Key contact
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
