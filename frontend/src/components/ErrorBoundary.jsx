import { Component } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#070b13] px-4">
          <div className="max-w-md rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 text-center shadow-2xl backdrop-blur-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20">
              <FiAlertTriangle className="text-3xl text-rose-400" />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold text-white">Something went wrong</h1>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/";
              }}
              className="glass-button-primary mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white active:scale-95 shadow-lg shadow-indigo-600/10"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
