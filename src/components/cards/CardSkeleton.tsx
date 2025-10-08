export function CardSkeleton() {
  return (
    <div className="w-full h-64 bg-muted rounded-xl animate-pulse">
      <div className="p-6 h-full flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
          <div className="h-4 bg-muted-foreground/20 rounded w-full" />
          <div className="h-4 bg-muted-foreground/20 rounded w-5/6" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-muted-foreground/20 rounded w-12" />
          <div className="h-3 bg-muted-foreground/20 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
