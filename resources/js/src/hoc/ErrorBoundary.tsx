import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Log the error message. You can also log the error to an error reporting service
        // log(error.message);

        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log the component stack (stack of React components) from where the error originated
        // log(errorInfo.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <div>Oops Something Went Wrong</div>;
        }

        return this.props.children;
    }
}
