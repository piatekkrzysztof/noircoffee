"""Build the Noir logo set from real Cormorant Garamond outlines.

Usage (from the project root):
    pip install fonttools brotli
    curl -L -o scripts/fonts/Cormorant.ttf "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf"
    python scripts/make_logo.py .

Writes public/brand/*.svg, public/favicon.svg and data/logo.ts (used by components/NoirLogo.vue).
The PNG icons (public/apple-touch-icon.png, public/favicon-32.png) are rendered from public/favicon.svg.
"""
import math
import os
import sys

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT = sys.argv[1]
OUT = os.path.join(PROJECT, "public", "brand")
os.makedirs(OUT, exist_ok=True)

ESPRESSO = "#0d0906"
BRASS = "#C4963A"
CREAM = "#F0E0C8"
PAPER = "#efe2cc"


def load(weight):
    f = TTFont(os.path.join(HERE, "fonts", "Cormorant.ttf"))
    return instantiateVariableFont(f, {"wght": weight}, inplace=False)


def fmt(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def gname(font, ch):
    """Glyph name for a character; digits use the lining forms (two.lf) instead of old-style."""
    name = font.getBestCmap()[ord(ch)]
    if ch.isdigit() and f"{name}.lf" in font.getGlyphSet():
        return f"{name}.lf"
    return name


def glyph_path(font, ch, x, baseline, scale=1.0, rotate=None):
    """SVG path for a character, placed with its origin at (x, baseline) in a y-down space."""
    gs = font.getGlyphSet()
    name = gname(font, ch)
    pen = SVGPathPen(gs, ntos=fmt)
    if rotate is None:
        t = (scale, 0, 0, -scale, x, baseline)
    else:
        a, (cx, cy) = rotate  # rotate around (cx, cy) after placing
        ca, sa = math.cos(a), math.sin(a)
        # place glyph so its origin is at (cx, cy) on the circle, then rotate
        t = (scale * ca, scale * sa, scale * sa, -scale * ca, cx, cy)
    gs[name].draw(TransformPen(pen, t))
    return pen.getCommands(), gs[name].width * scale


def advance(font, ch, scale=1.0):
    gs = font.getGlyphSet()
    return gs[gname(font, ch)].width * scale


def ink_bounds(font, ch):
    gs = font.getGlyphSet()
    bp = BoundsPen(gs)
    gs[font.getBestCmap()[ord(ch)]].draw(bp)
    return bp.bounds  # xMin, yMin, xMax, yMax (y-up)


# ---------- the bean: an ellipse with an S-shaped crease cut out (fill-rule evenodd)
def bean_path(cx, cy, ry, rx_ratio=0.7, tilt_deg=-18, crease_w=0.11):
    rx = ry * rx_ratio
    a = math.radians(tilt_deg)
    ca, sa = math.cos(a), math.sin(a)

    def tp(x, y):  # unit coords -> page
        X, Y = x * rx, y * ry
        return cx + X * ca - Y * sa, cy + X * sa + Y * ca

    # ellipse as four cubic arcs
    k = 0.5523
    pts = [(1, 0), (1, k, k, 1, 0, 1), (-k, 1, -1, k, -1, 0), (-1, -k, -k, -1, 0, -1), (k, -1, 1, -k, 1, 0)]
    x0, y0 = tp(*pts[0])
    d = f"M{fmt(x0)} {fmt(y0)}"
    for seg in pts[1:]:
        p = [tp(seg[i], seg[i + 1]) for i in (0, 2, 4)]
        d += "C" + " ".join(f"{fmt(px)} {fmt(py)}" for px, py in p)
    d += "Z"

    # crease: an S curve, thickened, tapered at both ends
    w = crease_w
    top, bot = (0.06, -0.84), (-0.06, 0.84)
    c1, c2 = (-0.62, -0.30), (0.62, 0.30)
    left = [(top[0], top[1]), (c1[0] - w, c1[1]), (c2[0] - w, c2[1]), (bot[0], bot[1])]
    right = [(bot[0], bot[1]), (c2[0] + w, c2[1]), (c1[0] + w, c1[1]), (top[0], top[1])]
    L = [tp(*p) for p in left]
    R = [tp(*p) for p in right]
    d += f"M{fmt(L[0][0])} {fmt(L[0][1])}C" + " ".join(f"{fmt(x)} {fmt(y)}" for x, y in L[1:])
    d += "C" + " ".join(f"{fmt(x)} {fmt(y)}" for x, y in R[1:]) + "Z"
    return d


def svg(viewbox, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-label="{title}">'
            f"<title>{title}</title>{body}</svg>\n")


# ====================================================== WORDMARK: N [bean] i r
font = load(500)
upm = font["head"].unitsPerEm
xh = font["OS/2"].sxHeight or 400
cap = font["OS/2"].sCapHeight or 630
baseline = cap + 40  # leave a little room above the capital
x = 0.0
parts_ink, parts_bean = [], []

d, adv = glyph_path(font, "N", x, baseline)
parts_ink.append(d)
x += adv - 70  # tuck the bean into the N's open lower right

bean_ry = xh * 0.64  # a touch taller than x-height, like an o's overshoot but bolder
bean_rx = bean_ry * 0.7
bean_cx = x + bean_rx + 16
bean_cy = baseline - bean_ry * 0.93 + 14  # bottom overshoots the baseline slightly, like a round letter
parts_bean.append(bean_path(bean_cx, bean_cy, bean_ry))
x = bean_cx + bean_rx + 34

for ch, kern in (("i", -4), ("r", 0)):
    d, adv = glyph_path(font, ch, x, baseline)
    parts_ink.append(d)
    x += adv + kern

xmin, _, _, _ = ink_bounds(font, "N")
word_w = x - 10
word_h = max(baseline + 28, bean_cy + bean_ry + 24)
word_vb = f"{fmt(xmin - 8)} 0 {fmt(word_w - xmin + 16)} {fmt(word_h)}"
word_ink = "".join(parts_ink)
word_bean = "".join(parts_bean)

for name, ink in (("noir-wordmark.svg", CREAM), ("noir-wordmark-dark.svg", ESPRESSO)):
    body = f'<path fill="{ink}" d="{word_ink}"/><path fill="{BRASS}" fill-rule="evenodd" d="{word_bean}"/>'
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(svg(word_vb, body, "Noir"))

# ====================================================== MARK: an arched doorway holding the bean
MW, MH = 100, 128
r = MW / 2
arch = f"M0 {MH}V{r}A{r} {r} 0 0 1 {MW} {r}V{MH}Z"
mark_bean = bean_path(MW / 2, MH * 0.58, 30, rx_ratio=0.72, crease_w=0.13)
mark_vb = f"0 0 {MW} {MH}"
open(os.path.join(OUT, "noir-mark.svg"), "w", encoding="utf-8").write(
    svg(mark_vb, f'<path fill="{BRASS}" fill-rule="evenodd" d="{arch}{mark_bean}"/>', "Noir"))

# Favicon: the doorway on an espresso tile
FV = 64
s = 0.42
ox, oy = (FV - MW * s) / 2, (FV - MH * s) / 2 + 2
fav_arch = f"M{fmt(ox)} {fmt(oy + MH * s)}V{fmt(oy + r * s)}A{fmt(r * s)} {fmt(r * s)} 0 0 1 {fmt(ox + MW * s)} {fmt(oy + r * s)}V{fmt(oy + MH * s)}Z"
fav_bean = bean_path(ox + MW * s / 2, oy + MH * s * 0.6, 33 * s, rx_ratio=0.72, crease_w=0.2)
favicon = (f'<rect width="{FV}" height="{FV}" rx="14" fill="{ESPRESSO}"/>'
           f'<path fill="{BRASS}" fill-rule="evenodd" d="{fav_arch}{fav_bean}"/>')
open(os.path.join(PROJECT, "public", "favicon.svg"), "w", encoding="utf-8").write(svg(f"0 0 {FV} {FV}", favicon, "Noir"))

# ====================================================== SEAL: text around a ring, bean in the middle
SZ = 240
C = SZ / 2
ring_r = 112
text_r = 78  # baseline radius of the lettering (accents on Ń and Ó must clear the ring)
seal_font = load(600)
cap_s = seal_font["OS/2"].sCapHeight or 630
text = "FLORIAŃSKA 28 · KRAKÓW · OD 2019 · "
fs = 21 / cap_s * 0.95  # scale so capitals are ~20 units tall
track = 3.2
chars = list(text)
total = sum(advance(seal_font, ch, fs) + track for ch in chars)
circ = 2 * math.pi * text_r
# spread the run over the full circle
spread = circ / total
seal_text = []
pos = 0.0
for ch in chars:
    a_w = (advance(seal_font, ch, fs) + track) * spread
    if ch != " ":
        # angle of the glyph's left origin, measured clockwise from the top
        theta = (pos / circ) * 2 * math.pi
        ang = theta - math.pi / 2
        gx, gy = C + text_r * math.cos(ang), C + text_r * math.sin(ang)
        # rotate glyph so its baseline is tangent to the circle
        rot = theta
        d, _ = glyph_path(seal_font, ch, 0, 0, fs, rotate=(rot, (gx, gy)))
        seal_text.append(d)
    pos += a_w
ring = (f"M{C} {C - ring_r}A{ring_r} {ring_r} 0 1 1 {C - 0.01} {C - ring_r}Z"
        f"M{C} {C - ring_r + 4}A{ring_r - 4} {ring_r - 4} 0 1 0 {C + 0.01} {C - ring_r + 4}Z")
seal_bean = bean_path(C, C, 42, rx_ratio=0.7, crease_w=0.12)
seal_vb = f"0 0 {SZ} {SZ}"
seal_ink = "".join(seal_text)
open(os.path.join(OUT, "noir-seal.svg"), "w", encoding="utf-8").write(svg(
    seal_vb,
    f'<path fill="{ESPRESSO}" d="{ring}{seal_ink}"/><path fill="{BRASS}" fill-rule="evenodd" d="{seal_bean}"/>',
    "Noir, Floriańska 28, Kraków"))

# ====================================================== data for the Vue component
ts = f"""// data/logo.ts
// Generated from Cormorant Garamond outlines (see public/brand/). Do not edit by hand.

export const LOGO = {{
  wordmark: {{ viewBox: '{word_vb}', ink: '{word_ink}', bean: '{word_bean}' }},
  mark: {{ viewBox: '{mark_vb}', shape: '{arch}{mark_bean}' }},
  seal: {{ viewBox: '{seal_vb}', ink: '{ring}{seal_ink}', bean: '{seal_bean}' }},
}}
"""
open(os.path.join(PROJECT, "data", "logo.ts"), "w", encoding="utf-8").write(ts)
print("wordmark viewBox", word_vb)
print("files:", os.listdir(OUT))
