"use client"

import { useEffect, useRef, useState } from "react"
import type P5 from "p5"

const CELL_SIZE = 65
const ROW_HEIGHT = CELL_SIZE * Math.sqrt(3) / 2
const MOUSE_RADIUS = 150
const MOUSE_PUSH = 2
const DRIFT_AMOUNT = 3
const DITHER_AMOUNT = 0

const NUM_BOIDS = 0
const BOID_SPEED_MIN = 0.05
const BOID_SPEED_MAX = 0.1
const PERCEPTION_RADIUS = 110
const SEPARATION_RADIUS = 40
const WEIGHT_ALIGNMENT = 1.2
const WEIGHT_COHESION = 1
const WEIGHT_SEPARATION = 2
const MOUSE_AVOID_RADIUS = 100
const WEIGHT_MOUSE_AVOID = 10
const JITTER_AMOUNT = 0.7

const BALL_RADIUS = 100
const BALL_INTENSITY = 0.4
const BOID_SIZE = 4

type GridPoint = { x: number, y: number }
type NodeIndex = { j: number, i: number }
type Boid = {
    j: number, i: number
    nextJ: number, nextI: number
    prevJ: number, prevI: number
    progress: number
    speed: number
    x: number, y: number
}

function pointAt(disp: GridPoint[][], node: NodeIndex): GridPoint | undefined {
    return disp[node.j]?.[node.i + 1]
}

function getNeighbors(j: number, i: number, maxJ: number, minI: number, maxI: number): NodeIndex[] {
    const candidates = [
        { j, i: i - 1 },
        { j, i: i + 1 },
        { j: j - 1, i },
        { j: j + 1, i },
    ]
    return candidates.filter((n) => n.j >= 0 && n.j <= maxJ && n.i >= minI && n.i <= maxI)
}

function chooseNextNode(
    boid: Boid,
    neighbors: NodeIndex[],
    boids: Boid[],
    mouse: { x: number, y: number },
    disp: GridPoint[][],
): NodeIndex {
    let candidates = neighbors.filter((n) => !(n.j === boid.prevJ && n.i === boid.prevI))
    if (candidates.length === 0) candidates = neighbors
    if (candidates.length === 0) return { j: boid.j, i: boid.i }

    const nearby: Boid[] = []
    let avgDirX = 0, avgDirY = 0
    let centroidX = 0, centroidY = 0
    for (const other of boids) {
        if (other === boid) continue
        const d = Math.hypot(other.x - boid.x, other.y - boid.y)
        if (d > PERCEPTION_RADIUS) continue
        nearby.push(other)
        const curPos = pointAt(disp, { j: other.j, i: other.i })
        const nextPos = pointAt(disp, { j: other.nextJ, i: other.nextI })
        if (curPos && nextPos) {
            avgDirX += nextPos.x - curPos.x
            avgDirY += nextPos.y - curPos.y
        }
        centroidX += other.x
        centroidY += other.y
    }

    let bestScore = -Infinity
    let best = candidates[0]
    for (const cand of candidates) {
        const pos = pointAt(disp, cand)
        if (!pos) continue

        let alignScore = 0
        if (nearby.length > 0 && (avgDirX !== 0 || avgDirY !== 0)) {
            const candDirX = pos.x - boid.x
            const candDirY = pos.y - boid.y
            const candMag = Math.hypot(candDirX, candDirY) || 1
            const avgMag = Math.hypot(avgDirX, avgDirY) || 1
            alignScore = (candDirX / candMag) * (avgDirX / avgMag) + (candDirY / candMag) * (avgDirY / avgMag)
        }

        let cohesionScore = 0
        if (nearby.length > 0) {
            const cx = centroidX / nearby.length
            const cy = centroidY / nearby.length
            const distNow = Math.hypot(boid.x - cx, boid.y - cy)
            const distCand = Math.hypot(pos.x - cx, pos.y - cy)
            cohesionScore = (distNow - distCand) * 0.03
        }

        let separationPenalty = 0
        for (const other of nearby) {
            const d = Math.hypot(pos.x - other.x, pos.y - other.y)
            if (d < SEPARATION_RADIUS) {
                separationPenalty += (SEPARATION_RADIUS - d) / SEPARATION_RADIUS
            }
        }

        let mouseScore = 0
        const distToMouseNow = Math.hypot(boid.x - mouse.x, boid.y - mouse.y)
        if (distToMouseNow < MOUSE_AVOID_RADIUS) {
            const distToMouseCand = Math.hypot(pos.x - mouse.x, pos.y - mouse.y)
            mouseScore = (distToMouseCand - distToMouseNow) * 0.05
        }

        const jitter = (Math.random() - 0.5) * JITTER_AMOUNT

        const score = alignScore * WEIGHT_ALIGNMENT
            + cohesionScore * WEIGHT_COHESION
            - separationPenalty * WEIGHT_SEPARATION
            + mouseScore * WEIGHT_MOUSE_AVOID
            + jitter

        if (score > bestScore) {
            bestScore = score
            best = cand
        }
    }

    return best
}

function findNearestNode(points: GridPoint[][], x: number, y: number): NodeIndex {
    let best: NodeIndex = { j: 0, i: 0 }
    let bestDist = Infinity
    for (let j = 0; j < points.length; j++) {
        for (let i = 0; i < points[j].length; i++) {
            const pt = points[j][i]
            const d = (pt.x - x) ** 2 + (pt.y - y) ** 2
            if (d < bestDist) {
                bestDist = d
                best = { j, i: i - 1 }
            }
        }
    }
    return best
}

export default function TriangleMesh() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let p5Instance: P5 | null = null
        let cancelled = false

        const mouse = { x: -9999, y: -9999 }
        const onMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }
        window.addEventListener("mousemove", onMouseMove)

        const pendingSpawns: { x: number, y: number }[] = []
        const onClick = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) return
            pendingSpawns.push({ x, y })
        }
        window.addEventListener("click", onClick)

        import("p5").then(({ default: P5Ctor }) => {
            if (cancelled || !container) return

            const sketch = (p: P5) => {
                let points: GridPoint[][] = []
                let boids: Boid[] = []
                let gridRows = 0
                let gridCols = 0
                let colorFaint: P5.Color
                let colorBright: P5.Color
                let colorAccent: P5.Color

                const spawnBoid = (node: NodeIndex): Boid => {
                    const neighbors = getNeighbors(node.j, node.i, gridRows, -1, gridCols)
                    const next = neighbors[Math.floor(Math.random() * neighbors.length)] ?? node
                    const pos = points[node.j]?.[node.i + 1] ?? { x: 0, y: 0 }
                    return {
                        j: node.j, i: node.i,
                        nextJ: next.j, nextI: next.i,
                        prevJ: NaN, prevI: NaN,
                        progress: 0,
                        speed: BOID_SPEED_MIN + Math.random() * (BOID_SPEED_MAX - BOID_SPEED_MIN),
                        x: pos.x, y: pos.y,
                    }
                }

                const buildGrid = () => {
                    const cols = Math.ceil(p.width / CELL_SIZE) + 2
                    const rows = Math.ceil(p.height / ROW_HEIGHT) + 1
                    gridRows = rows
                    gridCols = cols
                    points = []
                    for (let j = 0; j <= rows; j++) {
                        const row: GridPoint[] = []
                        const offset = j % 2 === 1 ? CELL_SIZE / 2 : 0
                        for (let i = -1; i <= cols; i++) {
                            row.push({ x: i * CELL_SIZE + offset, y: j * ROW_HEIGHT })
                        }
                        points.push(row)
                    }

                    boids = Array.from({ length: NUM_BOIDS }, () => {
                        const j = Math.floor(Math.random() * (rows + 1))
                        const i = Math.floor(Math.random() * (cols + 2)) - 1
                        return spawnBoid({ j, i })
                    })
                }

                p.setup = () => {
                    const canvas = p.createCanvas(container.clientWidth, container.clientHeight)
                    canvas.elt.style.pointerEvents = "none"
                    p.pixelDensity(1)
                    p.frameRate(30)

                    const styles = getComputedStyle(document.documentElement)
                    colorFaint = p.color(styles.getPropertyValue("--accent-darkgreen").trim() || "#3B5447")
                    colorBright = p.color(styles.getPropertyValue("--accent-lightgreen").trim() || "#ABC4B7")
                    colorAccent = p.color(styles.getPropertyValue("--accent-tangerine").trim() || "#E29578")

                    buildGrid()

                    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                        p.noLoop()
                    }

                    // Delay a frame so the first draw call has already painted
                    // before the CSS opacity transition starts, avoiding a pop-in.
                    requestAnimationFrame(() => setVisible(true))
                }

                p.draw = () => {
                    p.clear()
                    const t = p.frameCount * 0.004

                    const disp: GridPoint[][] = []
                    for (let j = 0; j < points.length; j++) {
                        const row: GridPoint[] = []
                        for (let i = 0; i < points[j].length; i++) {
                            const base = points[j][i]
                            let dx = (p.noise(i * 0.5, j * 0.5, t) - 0.5) * DRIFT_AMOUNT
                            let dy = (p.noise(i * 0.5 + 100, j * 0.5 + 100, t) - 0.5) * DRIFT_AMOUNT

                            const distX = base.x - mouse.x
                            const distY = base.y - mouse.y
                            const dist = Math.sqrt(distX * distX + distY * distY)
                            if (dist < MOUSE_RADIUS) {
                                const force = 1 - dist / MOUSE_RADIUS
                                const angle = Math.atan2(distY, distX)
                                dx += Math.cos(angle) * force * MOUSE_PUSH
                                dy += Math.sin(angle) * force * MOUSE_PUSH
                            }

                            row.push({ x: base.x + dx, y: base.y + dy })
                        }
                        disp.push(row)
                    }

                    while (pendingSpawns.length > 0) {
                        const spot = pendingSpawns.shift()!
                        const nearest = findNearestNode(points, spot.x, spot.y)
                        boids.push(spawnBoid(nearest))
                    }

                    // Walk each boid along the mesh's real edges - progress smoothly
                    // interpolates between the current and next vertex, and on arrival
                    // the next hop is chosen by the flocking + mouse-avoidance rules.
                    for (const boid of boids) {
                        const curPos = pointAt(disp, { j: boid.j, i: boid.i })
                        const nextPos = pointAt(disp, { j: boid.nextJ, i: boid.nextI })
                        if (curPos && nextPos) {
                            boid.x = p.lerp(curPos.x, nextPos.x, boid.progress)
                            boid.y = p.lerp(curPos.y, nextPos.y, boid.progress)
                        }

                        boid.progress += boid.speed
                        if (boid.progress >= 1) {
                            boid.progress = 0
                            boid.prevJ = boid.j
                            boid.prevI = boid.i
                            boid.j = boid.nextJ
                            boid.i = boid.nextI

                            const neighbors = getNeighbors(boid.j, boid.i, gridRows, -1, gridCols)
                            const chosen = neighbors.length > 0
                                ? chooseNextNode(boid, neighbors, boids, mouse, disp)
                                : { j: boid.prevJ, i: boid.prevI }
                            boid.nextJ = chosen.j
                            boid.nextI = chosen.i
                        }
                    }

                    for (let j = 0; j < disp.length - 1; j++) {
                        for (let i = 0; i < disp[j].length - 1; i++) {
                            const a = disp[j][i]
                            const b = disp[j][i + 1]
                            const c = disp[j + 1][i]
                            const d = disp[j + 1][i + 1]

                            // Row offset alternates each line, so the quad's equilateral
                            // diagonal flips direction to match (a-b-d/a-d-c vs a-b-c/b-d-c).
                            if (j % 2 === 0) {
                                drawTriangle(p, a, b, c, mouse, boids, colorFaint, colorBright, colorAccent)
                                drawTriangle(p, b, d, c, mouse, boids, colorFaint, colorBright, colorAccent)
                            } else {
                                drawTriangle(p, a, b, d, mouse, boids, colorFaint, colorBright, colorAccent)
                                drawTriangle(p, a, d, c, mouse, boids, colorFaint, colorBright, colorAccent)
                            }
                        }
                    }

                    p.push()
                    p.noStroke()
                    const glowColor = p.lerpColor(colorAccent, colorBright, 0.3)
                    const ctx = (p as unknown as { drawingContext: CanvasRenderingContext2D }).drawingContext
                    for (const boid of boids) {
                        ctx.shadowBlur = 10
                        ctx.shadowColor = `rgba(${p.red(glowColor)}, ${p.green(glowColor)}, ${p.blue(glowColor)}, 0.6)`
                        p.fill(p.red(glowColor), p.green(glowColor), p.blue(glowColor), 150)
                        p.circle(boid.x, boid.y, BOID_SIZE)
                    }
                    ctx.shadowBlur = 0
                    p.pop()
                }

                p.windowResized = () => {
                    if (!container) return
                    p.resizeCanvas(container.clientWidth, container.clientHeight)
                    buildGrid()
                }
            }

            p5Instance = new P5Ctor(sketch, container)
        })

        return () => {
            cancelled = true
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("click", onClick)
            p5Instance?.remove()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className={`absolute -top-24 inset-x-0 bottom-0 overflow-hidden transition-opacity duration-1000 ease-in ${visible ? "opacity-100" : "opacity-0"}`}
        />
    )
}

function drawTriangle(
    p: P5,
    a: GridPoint,
    b: GridPoint,
    c: GridPoint,
    mouse: { x: number, y: number },
    boids: Boid[],
    colorFaint: P5.Color,
    colorBright: P5.Color,
    colorAccent: P5.Color,
) {
    const cx = (a.x + b.x + c.x) / 3
    const cy = (a.y + b.y + c.y) / 3
    const distToMouse = Math.hypot(cx - mouse.x, cy - mouse.y)
    const proximity = Math.max(0, 1 - distToMouse / MOUSE_RADIUS)

    let ballGlow = 0
    for (const boid of boids) {
        const distToBall = Math.hypot(cx - boid.x, cy - boid.y)
        ballGlow = Math.max(ballGlow, Math.max(0, 1 - distToBall / BALL_RADIUS))
    }
    const glow = Math.max(proximity, ballGlow * BALL_INTENSITY)

    // Stable, position-keyed (not time-keyed) noise so the jitter doesn't
    // flicker frame to frame - it just softens the hard edges between
    // adjacent triangles' otherwise flat-shaded glow steps.
    const dither = (p.noise(cx * 0.08 + 500, cy * 0.08 + 500) - 0.5) * DITHER_AMOUNT

    const fillCol = p.lerpColor(colorFaint, colorBright, p.noise(cx * 0.01, cy * 0.01))
    p.fill(p.red(fillCol), p.green(fillCol), p.blue(fillCol), Math.max(0, 4 + glow * 22 + dither))

    const strokeCol = p.lerpColor(colorFaint, colorAccent, glow * 0.7)
    p.stroke(p.red(strokeCol), p.green(strokeCol), p.blue(strokeCol), Math.max(0, 14 + glow * 45 + dither * 1.5))
    p.strokeWeight(1)

    p.triangle(a.x, a.y, b.x, b.y, c.x, c.y)
}
