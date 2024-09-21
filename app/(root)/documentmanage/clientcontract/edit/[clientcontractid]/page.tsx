import React from "react";

const page = ({ params }: { params: { clientcontractid: string } }) => {
  const clientContractId = parseInt(params.clientcontractid, 10);
  return <div>Edit client contract number {clientContractId}</div>;
};

export default page;
