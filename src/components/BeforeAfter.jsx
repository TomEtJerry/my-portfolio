import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 65dvw;
  margin: 0 auto;
  user-select: none;
  overflow: clip;
  border-radius: 15px;
  @media (max-width: 1000px) {
    max-width: 100dvw;
    border-radius: 0;
  }
  @media (max-width: 700px) {
    max-width: 100dvw;
    border-radius: 0;
  }
`

const BeforeImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  clip-path: inset(0 ${({ clip }) => clip}% 0 0);
  pointer-events: none;
`

const AfterImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
`

const Handle = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: ${({ pos }) => pos}%;
  transform: translateX(-50%);
  width: 0.8vw;
  height: 100%;
  background: linear-gradient(90deg, rgb(12, 90, 99) 0.09%, rgb(0, 48, 87) 99.91%);
  cursor: ew-resize;
  z-index: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-right: 0.1vw solid white;
  border-left: 0.1vw solid white;
  @media (max-width: 1000px) {
    width: 1.1vw;
  }
  @media (max-width: 700px) {
    width: 1.5vw;
  }
`

const Cursor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7dvw;
  position: absolute;
  width: 3.5dvw;
  height: 25%;
  background: linear-gradient(90deg, rgb(12, 90, 99) 0.09%, rgb(0, 48, 87) 99.91%);
  z-index: 1;
  border-radius: 1.5vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-right: 0.1vw solid white;
  border-left: 0.1vw solid white;
  @media (max-width: 1000px) {
    width: 4.5dvw;
    border-radius: 2vw;
    gap: 1.1dvw;
  }
  @media (max-width: 700px) {
    width: 5dvw;
    border-radius: 2vw;
    gap: 1.2dvw;
  }
`

const Line = styled.div`
  display: flex;
  width: 1.5dvw;
  height: 2px;
  background: white;
  z-index: 1;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 1000px) {
    height: 1.5px;
    width: 15px;
    border-radius: 10px;
  }
  @media (max-width: 700px) {
    height: 0.5px;
    width: 9px;
    border-radius: 10px;
  }
`

export function BeforeAfter({ beforeSrc, afterSrc }) {
  const wrapperRef = useRef()
  const [pos, setPos] = useState(50)  // curseur à 50% au départ
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max)

  // mise à jour par drag
  const updatePos = useCallback(clientX => {
    const rect = wrapperRef.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(clamp(pct, 0, 100))
  }, [])

  const startDrag = e => {
    e.preventDefault()
    const move = ev =>
      updatePos(ev.touches ? ev.touches[0].clientX : ev.clientX)
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move)
    const stop = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', stop)
      window.removeEventListener('touchend', stop)
    }
    window.addEventListener('mouseup', stop)
    window.addEventListener('touchend', stop)
  }

  // mise à jour par scroll
  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current
      if (!el) return

      const { top, height } = el.getBoundingClientRect()
      const vh = window.innerHeight

      // on ne démarre qu'à 5% sous le bas et on termine 5% avant de sortir
      const startOffset = vh * 0.50    // 40% de la hauteur d'écran
      const endOffset = vh * 0.40    // 40% avant que l'élément quitte l'écran
      // on décale top de startOffset et on réduit la plage de scroll par endOffset
      const raw = (vh - top - startOffset)
        / (vh + height - startOffset - endOffset)
      const pct = clamp(raw * 100, 0, 100)
      setPos(pct)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <SliderWrapper
      ref={wrapperRef}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      {/* l’after, en fond */}
      <AfterImg src={afterSrc} alt="Après" />

      {/* le before, masqué à droite en fonction du curseur */}
      <BeforeImg
        src={beforeSrc}
        alt="Avant"
        clip={100 - pos}
      />

      {/* le curseur */}
      <Handle pos={pos}>
        <Cursor>
          <Line /><Line /><Line />
        </Cursor>
      </Handle>
    </SliderWrapper>
  )
}
