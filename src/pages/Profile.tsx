export default function Profile() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1fr]">
      <section>
        <h2 className="text-3xl font-bold">Profile</h2>
        <p className="mt-2 text-slate-700">Configure role defaults and privacy preferences for future analyses.</p>
      </section>

      <form className="grid gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm" aria-label="Profile preferences">
        <div>
          <label htmlFor="default-role" className="block text-sm font-semibold text-slate-700">Default target role</label>
          <input id="default-role" className="mt-2 w-full rounded-md border border-slate-300 p-3" placeholder="Product Manager" />
        </div>

        <fieldset className="grid gap-3">
          <legend className="text-sm font-semibold text-slate-700">Privacy defaults</legend>
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" defaultChecked />
            <span>Require consent confirmation before every upload</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" defaultChecked />
            <span>Mask personal contact details in previews when supported by the backend</span>
          </label>
        </fieldset>

        <button type="button" className="w-fit rounded-md bg-brand px-5 py-3 font-bold text-white hover:bg-teal-900">
          Save preferences
        </button>
      </form>
    </div>
  );
}
