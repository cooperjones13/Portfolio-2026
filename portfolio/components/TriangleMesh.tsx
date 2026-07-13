"use client"

import { useEffect, useRef } from "react"
import type P5 from "p5"

const CELL_SIZE = 70
const ROW_HEIGHT = CELL_SIZE * Math.sqrt(3) / 2
const MOUSE_RADIUS = 220
const MOUSE_PUSH = 10
const DRIFT_AMOUNT = 3

export default function TriangleMesh() {
    const containerRef = useRef<HTMLDivElement>(null)

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

        import("p5").then(({ default: P5Ctor }) => {
            if (cancelled || !container) return

            const sketch = (p: P5) => {
                let points: { x: number, y: number }[][] = []
                let colorFaint: P5.Color
                let colorBright: P5.Color
                let colorAccent: P5.Color

                const buildGrid = () => {
                    const cols = Math.ceil(p.width / CELL_SIZE) + 2
                    const rows = Math.ceil(p.height / ROW_HEIGHT) + 1
                    points = []
                    for (let j = 0; j <= rows; j++) {
                        const row: { x: number, y: number }[] = []
                        const offset = j % 2 === 1 ? CELL_SIZE / 2 : 0
                        for (let i = -1; i <= cols; i++) {
                            row.push({ x: i * CELL_SIZE + offset, y: j * ROW_HEIGHT })
                        }
                        points.push(row)
                    }
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
                }

                p.draw = () => {
                    p.clear()
                    const t = p.frameCount * 0.004

                    const disp: { x: number, y: number }[][] = []
                    for (let j = 0; j < points.length; j++) {
                        const row: { x: number, y: number }[] = []
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

                    for (let j = 0; j < disp.length - 1; j++) {
                        for (let i = 0; i < disp[j].length - 1; i++) {
                            const a = disp[j][i]
                            const b = disp[j][i + 1]
                            const c = disp[j + 1][i]
                            const d = disp[j + 1][i + 1]

                            // Row offset alternates each line, so the quad's equilateral
                            // diagonal flips direction to match (a-b-d/a-d-c vs a-b-c/b-d-c).
                            if (j % 2 === 0) {
                                drawTriangle(p, a, b, c, mouse, colorFaint, colorBright, colorAccent)
                                drawTriangle(p, b, d, c, mouse, colorFaint, colorBright, colorAccent)
                            } else {
                                drawTriangle(p, a, b, d, mouse, colorFaint, colorBright, colorAccent)
                                drawTriangle(p, a, d, c, mouse, colorFaint, colorBright, colorAccent)
                            }
                        }
                    }
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
            p5Instance?.remove()
        }
    }, [])

    return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
}

function drawTriangle(
    p: P5,
    a: { x: number, y: number },
    b: { x: number, y: number },
    c: { x: number, y: number },
    mouse: { x: number, y: number },
    colorFaint: P5.Color,
    colorBright: P5.Color,
    colorAccent: P5.Color,
) {
    const cx = (a.x + b.x + c.x) / 3
    const cy = (a.y + b.y + c.y) / 3
    const distToMouse = Math.hypot(cx - mouse.x, cy - mouse.y)
    const proximity = Math.max(0, 1 - distToMouse / MOUSE_RADIUS)

    const fillCol = p.lerpColor(colorFaint, colorBright, p.noise(cx * 0.01, cy * 0.01))
    p.fill(p.red(fillCol), p.green(fillCol), p.blue(fillCol), 4 + proximity * 14)

    const strokeCol = p.lerpColor(colorFaint, colorAccent, proximity * 0.5)
    p.stroke(p.red(strokeCol), p.green(strokeCol), p.blue(strokeCol), 14 + proximity * 30)
    p.strokeWeight(1)

    p.triangle(a.x, a.y, b.x, b.y, c.x, c.y)
}
