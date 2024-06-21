import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const id = params.id.split("-")[0];

  return (
    <div>
      <div>{id}</div>
    </div>
  );
}
