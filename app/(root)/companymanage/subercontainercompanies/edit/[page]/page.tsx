import React from "react";

const page = ({ params }: { params: { companyid: number } }) => {
  const companyId = params.companyid;

  return <div>edit Suber container Compaines {companyId}</div>;
};

export default page;
