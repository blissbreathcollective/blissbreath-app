/** Maps the live site’s hash rooms (#reset, #nourish, …) onto app paths. */
export const HASH_ROOMS: Record<string, string> = {
  home: "/",
  path: "/path",
  breathe: "/breathe",
  nourish: "/nourish",
  reset: "/reset",
  about: "/about",
  journal: "/journal",
  dosha: "/dosha",
};

export function destFromHash(hash: string): string | null {
  const raw = decodeURIComponent(hash.replace(/^#/, "").replace(/^\//, "")).trim();
  if (!raw) return null;
  const parts = raw.split("/").filter(Boolean);
  const head = parts[0] ?? "";
  if (head === "nourish" && parts[1]) return `/nourish/${parts[1]}`;
  if (head === "path" && parts[1]) return `/path/${parts[1]}`;
  return HASH_ROOMS[head] ?? null;
}

/** Runs before React paints so #reset never flashes the home sanctuary. */
export const HASH_BOOT_SCRIPT = `(()=>{try{var h=(location.hash||"").replace(/^#\\/?/,"");if(!h)return;var p=h.split("/").filter(Boolean);var k=p[0];var d=null;if(k==="nourish"&&p[1])d="/nourish/"+p[1];else if(k==="path"&&p[1])d="/path/"+p[1];else d=({home:"/",path:"/path",breathe:"/breathe",nourish:"/nourish",reset:"/reset",about:"/about",journal:"/journal",dosha:"/dosha"})[k];if(d&&location.pathname==="/")location.replace(d);}catch(e){}})();`;
