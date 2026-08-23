import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('App crashed:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg text-ink px-6 text-center">
          <div>
            <p className="font-display text-2xl mb-4">Something glitched.</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-ink text-bg px-6 py-3 text-xs tracking-[0.1em] font-semibold"
            >
              RELOAD
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}