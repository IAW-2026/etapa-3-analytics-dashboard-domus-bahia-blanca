import type { HTMLAttributes } from "react";

function SkeletonBlock({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-domus-secondary/70 ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

function ChartSkeleton() {
  return (
    <section className="min-w-0 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:p-6">
      <div className="mb-5 space-y-2">
        <SkeletonBlock className="h-5 w-52 rounded-lg" />
        <SkeletonBlock className="h-4 w-64 max-w-full rounded-lg" />
      </div>
      <div className="flex h-56 items-end gap-3 sm:h-64 lg:h-72">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonBlock
            key={index}
            className="flex-1 rounded-t-lg rounded-b-sm"
            style={{
              height: `${34 + ((index * 17) % 54)}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

function RankingSkeleton() {
  return (
    <section className="min-w-0 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:p-6">
      <div className="mb-5 space-y-2">
        <SkeletonBlock className="h-5 w-72 max-w-full rounded-lg" />
        <SkeletonBlock className="h-4 w-80 max-w-full rounded-lg" />
      </div>
      <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:gap-8">
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <div key={groupIndex} className="min-w-0 space-y-3">
            <SkeletonBlock className="h-4 w-24 rounded-lg" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <SkeletonBlock className="h-3 w-16 rounded-lg" />
                <SkeletonBlock
                  className="h-8 rounded-r-lg rounded-l-sm"
                  style={{ width: `${42 + ((index + groupIndex) * 13) % 46}%` }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TopPropertiesSkeleton() {
  return (
    <section className="min-w-0 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:p-6">
      <div className="mb-5 space-y-2">
        <SkeletonBlock className="h-5 w-56 rounded-lg" />
        <SkeletonBlock className="h-4 w-80 max-w-full rounded-lg" />
      </div>
      <ol className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="min-w-0 rounded-2xl border border-domus-secondary bg-white p-3 sm:p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <SkeletonBlock className="h-9 w-9 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <SkeletonBlock className="h-4 w-3/4 rounded-lg" />
                    <SkeletonBlock className="h-3 w-2/3 rounded-lg" />
                  </div>
                  <SkeletonBlock className="h-6 w-20 shrink-0 rounded-full" />
                </div>
                <SkeletonBlock className="h-2 w-full rounded-full" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SummarySkeleton() {
  return (
    <section className="min-w-0 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:p-6">
      <div className="mb-5 space-y-2">
        <SkeletonBlock className="h-5 w-44 rounded-lg" />
        <SkeletonBlock className="h-4 w-56 rounded-lg" />
      </div>
      <SkeletonBlock className="h-28 rounded-2xl" />
    </section>
  );
}

export default function SchedulingAppSkeleton() {
  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      <div className="min-w-0 space-y-2">
        <SkeletonBlock className="h-4 w-36 rounded-lg" />
        <SkeletonBlock className="h-9 w-80 max-w-full rounded-lg" />
        <SkeletonBlock className="h-5 w-full max-w-3xl rounded-lg" />
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-2 xl:gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <RankingSkeleton />
      <TopPropertiesSkeleton />

      <div className="grid min-w-0 gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
        <SummarySkeleton />
        <ChartSkeleton />
      </div>
    </div>
  );
}
