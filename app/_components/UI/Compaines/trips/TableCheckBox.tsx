import React from "react";

interface T {
  type?: string;
  object: any;
}
const TableCheckBox = ({ type, object }: T) => {
  return (
    <>
      {type === "waste" ? (
        <>
          <td
            style={{
              width: "11.26%",
              border: "none",
              padding: "0cm 5.4pt 0cm 5.4pt",
            }}
          >
            <p
              style={{
                margin: "0cm",
                textAlign: "center",
                textIndent: "0cm",
                fontSize: 16,
                fontFamily: '"Times New Roman",serif',
                lineHeight: "106%",
              }}
            >
              <span style={{ lineHeight: "106%", fontFamily: '"MS Gothic"' }}>
                {object.selected === true ? "☒" : "☐"}
              </span>
            </p>
          </td>
          <td
            style={{
              width: "14.58%",
              border: "none",
              borderRight: "solid windowtext 1.0pt",
              padding: "0cm 5.4pt 0cm 5.4pt",
            }}
          >
            <p
              style={{
                margin: "0cm",
                textAlign: "left",
                textIndent: "0cm",
                fontSize: 16,
                fontFamily: '"Times New Roman",serif',
                lineHeight: "106%",
              }}
            >
              <span style={{ fontSize: 11, lineHeight: "106%" }}>
                {formateLabel(object.description)}
              </span>
            </p>
          </td>
        </>
      ) : (
        <>
          <td
            colSpan={2}
            style={{
              width: "5.1%",
              border: "none",
              padding: "0cm 5.4pt 0cm 5.4pt",
            }}
          >
            <p
              style={{
                margin: "0cm",
                textAlign: "center",
                textIndent: "0cm",
                fontSize: 16,
                fontFamily: '"Times New Roman",serif',
                lineHeight: "106%",
              }}
            >
              <span style={{ lineHeight: "106%", fontFamily: '"MS Gothic"' }}>
                {object.selected === true ? "☒" : "☐"}
              </span>
            </p>
          </td>
          <td
            style={{
              width: "19.56%",
              border: "none",
              borderRight: "solid windowtext 1.0pt",
              padding: "0cm 5.4pt 0cm 5.4pt",
            }}
          >
            <p
              style={{
                margin: "0cm",
                textAlign: "left",
                textIndent: "0cm",
                fontSize: 16,
                fontFamily: '"Times New Roman",serif',
                lineHeight: "106%",
              }}
            >
              <span style={{ fontSize: 11, lineHeight: "106%" }}>
                {formateLabel(object.skipColorCode)}
                {object?.color && `(${object?.color})`}
              </span>
            </p>
          </td>
        </>
      )}
    </>
  );
};

export default TableCheckBox;

const formateLabel = (code: string) => {
  return code.split("_").join(" ");
};
