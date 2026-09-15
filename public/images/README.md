# Image assets

## In place

| File | Used by |
| --- | --- |
| `logo.png` | Footer (and LP2's top bar) — white wordmark, for dark backgrounds |
| `logo-dark.png` | LP1 top bar — same mark with the wordmark in ink, for the paper background. LP1 only. |
| `vehicles/*.webp` | Vehicle cards — 960x720 WebP, the 4:3 ratio the client's photos ship in |

The dark-background variant was derived from the client's PNG by recolouring the
white wordmark; the red is untouched. If the client has an official light-background
lockup, drop it in over `logo-dark.png` and nothing else changes.

Note the logo red is roughly `#FF2600`, which is brighter than either landing
page's accent red. Say the word if the palettes should be aligned to the brand mark.

## Still missing

| File | Used by | Recommended |
| --- | --- | --- |
| `hero.jpg` | Hero band | 2000 x 900, under 250 KB |
| `og-image.jpg` | Link previews (Meta, WhatsApp) | 1200 x 630 |

Until they exist the hero falls back to flat colour and link previews render
without an image. Nothing looks broken either way.

## Adding or swapping a vehicle

Put the photo in `vehicles/`, then point `image` at it in `src/data/vehicles.ts`.
Set `price` and `mileage` in the same file when the client confirms them — a null
price renders "Call for price".
