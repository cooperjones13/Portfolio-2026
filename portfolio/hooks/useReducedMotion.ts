"use client"

import { useEffect, useState } from "react"

export function useReducedMotion() {
    const [prefersReduced, setPrefersReduced] = useState(false)

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)")
        setPrefersReduced(query.matches)
        const handleChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
        query.addEventListener("change", handleChange)
        return () => query.removeEventListener("change", handleChange)
    }, [])

    return prefersReduced
}
