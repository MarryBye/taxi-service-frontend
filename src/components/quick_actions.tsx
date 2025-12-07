export function QuickActionsPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-4 rounded items-center">
        <p className='font-bold'>Quick actions</p>
        <div className='flex flex-row gap-4 max-w-full max-y-full'>
            {children}
        </div>
    </div>
  );
};