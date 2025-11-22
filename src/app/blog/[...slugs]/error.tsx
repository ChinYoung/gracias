"use client"; // Error boundaries must be Client Components

import { Button } from "antd";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (error.name === "NotFoundError") {
    return <div>404</div>;
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
