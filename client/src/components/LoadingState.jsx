function LoadingState({ message = "Loading dashboard..." }) {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="bg-white rounded-2xl shadow-md px-10 py-10 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

        <p className="mt-6 text-slate-500 font-medium">{message}</p>
      </div>
    </div>
  );
}

export default LoadingState;
