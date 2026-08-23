import { Component, ReactNode, Suspense, lazy } from 'react'

const Scene3D = lazy(() => import('./Scene3D'))

interface State { crashed: boolean }

class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state = { crashed: false }
  componentDidCatch() {
    this.setState({ crashed: true })
  }
  static getDerivedStateFromError() {
    return { crashed: true }
  }
  render() {
    if (this.state.crashed) return null
    return this.props.children
  }
}

export default function Scene3DWrapper() {
  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </ErrorBoundary>
  )
}