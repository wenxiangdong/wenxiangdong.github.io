import React from "react";

interface IProps {
    fallback: React.ReactElement;
}
interface IState {
    error: Error | undefined | null;
}
class ErrorBoundary extends React.Component<React.PropsWithChildren<IProps>, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            error: undefined
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {error};
    }

    componentDidCatch(e: Error) {
        console.log("error boudary", e);
    }

    render() {
        console.log(this.state);
        return this.state.error 
            ? this.props.fallback
            : this.props.children;
    }
};

const withErrorBoundary = <P extends object>(WrappedComponent: React.ComponentType<P>, fallback: React.ReactElement) => 
    (props: P) => {
        return (
            <ErrorBoundary fallback={fallback}>
                <WrappedComponent {...props} />
            </ErrorBoundary>
        );
    };

export default withErrorBoundary;

export {
    ErrorBoundary
};