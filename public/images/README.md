# Image assets

Nothing here yet — the brief lists the hero image and vehicle photos as
"asset not provided". The page renders fine without them (neutral placeholders),
so drop files in as they arrive. No code changes needed.

| File | Used by | Recommended |
| --- | --- | --- |
| `hero.jpg` | Hero band | 2000 x 900, under 250 KB |
| `og-image.jpg` | Link previews (Meta, WhatsApp) | 1200 x 630 |
| `vehicles/<name>.jpg` | Vehicle cards | 960 x 640, 3:2 |

For vehicle photos, also set the `image` field in `src/data/vehicles.ts`,
e.g. `image: '/images/vehicles/range-rover-sport.jpg'`.
Set `price` and `mileage` in the same file when the client confirms them —
a null price renders "Call for price".
