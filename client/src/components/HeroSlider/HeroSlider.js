import React, { useState, useEffect, useRef } from 'react'

const heroImages = [
    '/images/hero_images/hero1.webp',
    '/images/hero_images/hero2.webp',
    '/images/hero_images/hero3.webp',
]

let count = 0
let interval
const imagesTotal = heroImages.length

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slideRef = useRef()

    const removeAnimation = () => {
        slideRef.current.classList.remove('animate-fadeAnim')
    }

    useEffect(() => {
        slideRef.current.addEventListener('animationend', removeAnimation)
        slideRef.current.addEventListener('mouseenter', pauseSlider)
        slideRef.current.addEventListener('mouseleave', startSlider)

        startSlider()
        return () => {
            pauseSlider()
        }
        // eslint-disable-next-line
    }, [])

    const startSlider = () => {
        interval = setInterval(() => {
            handleNext()
        }, 3000)
    }

    const pauseSlider = () => {
        clearInterval(interval)
    }

    const handlePrev = () => {
        count = (count + imagesTotal - 1) % imagesTotal
        setCurrentIndex(count)
        slideRef.current.classList.add('animate-fadeAnim')
    }
    const handleNext = () => {
        count = (count + 1) % imagesTotal
        setCurrentIndex(count)
        slideRef.current.classList.add('animate-fadeAnim')
    }

    return (
        <div
            ref={slideRef}
            className=" w-full select-none overflow-hidden relative"
        >
            <img
                className="min-w-min ml-[50%] -translate-x-1/2"
                src={heroImages[currentIndex]}
                alt="/images/Clothes 4Crew Logo.jpg"
            />
            <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
                <button onClick={handlePrev}>⏪</button>
                <button onClick={handleNext}>⏩</button>
            </div>
        </div>
    )
}
