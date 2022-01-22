import React from 'react'

const defaultState = {
  acceleration: {
    x: null,
    y: null,
    z: null,
  },
  accelerationIncludingGravity: {
    x: null,
    y: null,
    z: null,
  },
  rotationRate: {
    alpha: null,
    beta: null,
    gamma: null,
  },
  interval: 16,
  granted: false,
};

export default function useMotion() {
  const [state, setState] = React.useState(defaultState)
  const [granted, setGranted] = React.useState(false)

  React.useEffect(() => {
    if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
      window.DeviceMotionEvent.requestPermission()
        .then(() => {
          setGranted(true)
        })
    } else {
      setGranted(true)
    }
  }, [])

  React.useEffect(() => {
    const handler = (event) => {
      const { acceleration, accelerationIncludingGravity, rotationRate, interval } = event;

      setState({
        acceleration: {
          x: acceleration.x,
          y: acceleration.y,
          z: acceleration.z,
        },
        accelerationIncludingGravity: {
          x: accelerationIncludingGravity.x,
          y: accelerationIncludingGravity.y,
          z: accelerationIncludingGravity.z,
        },
        rotationRate: {
          alpha: rotationRate.alpha,
          beta: rotationRate.beta,
          gamma: rotationRate.gamma,
        },
        interval,
        granted,
      })
    }

    if (granted) {
      window.addEventListener('devicemotion', handler)
    }

    return () => window.removeEventListener('devicemotion', handler)
  }, [granted])

  return state
}
