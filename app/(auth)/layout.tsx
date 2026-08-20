// export default function layout({children}: LayoutProps<"/">){
//   return (
//   <div>{children}</div>
//   )
// }
//
//
function Authlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-amber-50 bg-gradient-to-b from-amber-200 to-amber-400">
      {children}
    </div>
  );
}

export default Authlayout;
