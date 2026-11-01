import React from 'react';

const searilizeError = (error: any) => {
  if (error instanceof Error) {
    return error.message + '\n' + error.stack;
  }
  return JSON.stringify(error, null, 2);
};

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: any;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('组件崩溃:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
            <div className="text-6xl mb-4">😵</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">页面出错了</h2>
            <p className="text-gray-500 mb-4">抱歉，页面加载出现问题</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
