import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function LoadingSkeleton() {
  return (
    <Card className="w-full space-y-5 p-6 h-44" radius="lg">
      <Skeleton className="rounded-md w-2/5">
        <div className="h-10 rounded-md bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-2/4 rounded-md">
          <div className="h-10 w-4/5 rounded-md bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
