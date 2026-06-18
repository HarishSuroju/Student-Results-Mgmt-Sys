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
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
          <div className="max-w-md rounded-[2rem] border border-rose-200 bg-white p-10 text-center shadow-lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <FiAlertTriangle className="text-3xl text-rose-500" />
            </div>
            <h1 className="mt-6 font-display text-2xl text-slate-900">Something went wrong</h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/";
              }}
              className="mt-8 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
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
