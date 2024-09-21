import React from "react";

const page = ({ params }: { params: { subcontract: string } }) => {
  const SubContractId = parseInt(params.subcontract, 10);

  return <div>page view of SubContract of id :{SubContractId}</div>;
};

export default page;
