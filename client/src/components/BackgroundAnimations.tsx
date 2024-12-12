'use client'

import { useEffect, useRef } from 'react'

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.1

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 223, 0, 0.2)'
        ctx.strokeStyle = 'rgba(255, 223, 0, 0.5)'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 223, 0, ${1 - distance / 100})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.closePath()
          }
        }

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1)
          i--
          particles.push(new Particle())
        }
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      // Cleanup function
      cancelAnimationFrame(animate)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  )
}

