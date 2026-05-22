"use client";

export default function Error() {
  return (
    <div className={"absolute inset-0 grid place-content-center"}>
      <div className={"text-center"}>
        <h1 className={"text-foreground"}>An unexpected error occurred</h1>
        <p className={"text-muted-foreground"}>Please try again later</p>
      </div>
    </div>
  );
}
