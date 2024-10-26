import React from "react";
import TableCheckBox from "./TableCheckBox";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

interface WasteType {
  wasteType: string;
  description: string;
  selected: boolean;
}

interface SkipColorCode {
  skipColorCode: string;
  material: string;
  color: string;
  selected: boolean;
}

interface ManifestData {
  generatorName: string;
  projectName: string;
  manifestNo: number;
  wasteRemovalDate: string;
  wasteTypes: WasteType[];
  otherWasteType: string | null;
  quantity: number;
  skipColorCodes: SkipColorCode[];
  driverName: string;
  driverPhone: string;
  currentCompanyName: string;
  vehicleLicensePlate: string;
  permitNo: string | null;
  date: string;
  companyName: string;
  designation: string;
  recycleDate: string;
}
const ManifestTemplate: React.FC<{ data: ManifestData }> = ({ data }) => {
  return (
    <div id="manifest-template">
      <table
        style={{ width: "100%", borderCollapse: "collapse", border: "none", marginBottom: "-28px !important" }}
      >
        <tbody>
          <tr>
            <td
              style={{
                width: "79.0%",
                background: "#385623",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span style={{ color: "white" }}>
                    Waste Management Manifest
                  </span>
                </strong>
              </p>
            </td>
            <td
              style={{
                width: "25.0%",
                background: "#385623",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{ fontSize: 9, lineHeight: "106%", color: "white" }}
                  >
                    Rev.#: 820 Date : Mar. 2024
                  </span>
                </strong>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        style={{ width: "99.72%", borderCollapse: "collapse", border: "none" }}
      >
        <tbody>
          <tr>
            <td
              rowSpan={19}
              style={{
                width: "5.94%",
                border: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginTop: "0cm",
                  marginRight: "5.65pt",
                  marginBottom: "8.0pt",
                  marginLeft: "5.65pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{ fontSize: 8, lineHeight: "106%", color: "#385623" }}
                >
                  Generator
                </span>
              </p>
            </td>
            <td
              style={{
                width: "11.26%",
                border: "solid windowtext 1.0pt",
                borderLeft: "none",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: 12,
                      lineHeight: "106%",
                      color: "#385623",
                    }}
                  >
                    Generator Name
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "39.22%",
                border: "solid windowtext 1.0pt",
                borderLeft: "none",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span style={{ fontSize: 13, lineHeight: "106%" }}>
                    {data.generatorName}&nbsp;
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "18.92%",
                border: "solid windowtext 1.0pt",
                borderLeft: "none",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: 11,
                      lineHeight: "106%",
                      color: "#385623",
                    }}
                  >
                    Manifest No.
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "24.66%",
                border: "solid windowtext 1.0pt",
                borderLeft: "none",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span style={{ fontSize: 11, lineHeight: "106%" }}>
                    {data.manifestNo}
                  </span>
                </strong>
              </p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "11.26%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: 12,
                      lineHeight: "106%",
                      color: "#385623",
                    }}
                  >
                    Project Name
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "39.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span style={{ fontSize: 12, lineHeight: "106%" }}>
                    {data.projectName}
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "18.92%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: 11,
                      lineHeight: "106%",
                      color: "#385623",
                    }}
                  >
                    Waste Removal Date
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "24.66%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span style={{ fontSize: 13, lineHeight: "106%" }}>
                    {data.wasteRemovalDate}
                  </span>
                </strong>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                width: "50.48%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: 11,
                      lineHeight: "106%",
                      color: "#385623",
                    }}
                  >
                    Type of Waste Collected
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "18.92%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: 11,
                      lineHeight: "106%",
                      color: "#385623",
                    }}
                  >
                    Quantity
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "24.66%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{
                      fontSize: 11,
                      lineHeight: "106%",
                      color: "#385623",
                    }}
                  >
                    Skip Color Code
                  </span>
                </strong>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{ fontSize: 8, lineHeight: "106%", color: "#385623" }}
                >
                  Non-Hazardous
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "24.64%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{ fontSize: 8, lineHeight: "106%", color: "#385623" }}
                >
                  Hazardous
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "18.92%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span style={{ fontSize: 8, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "24.66%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span style={{ fontSize: 8, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[0]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[12]} />

            <td
              style={{
                width: "5.08%",
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
                  ☐
                </span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>5 CBM</span>
              </p>
            </td>
            <TableCheckBox type={"color"} object={data.skipColorCodes[0]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[1]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[13]} />
            <td
              style={{
                width: "5.08%",
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
                  ☐
                </span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>8 CBM</span>
              </p>
            </td>
            <TableCheckBox type={"color"} object={data.skipColorCodes[1]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[2]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[14]} />
            <td
              style={{
                width: "5.08%",
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
                  ☐
                </span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>10 CBM</span>
              </p>
            </td>
            <TableCheckBox type={"color"} object={data.skipColorCodes[2]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[3]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[15]} />
            <td
              style={{
                width: "5.08%",
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
                  ☐
                </span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>16 CBM</span>
              </p>
            </td>
            <TableCheckBox type={"color"} object={data.skipColorCodes[3]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[4]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[16]} />
            <td
              style={{
                width: "5.08%",
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
                  ☐
                </span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>20 CBM</span>
              </p>
            </td>

            <TableCheckBox type={"color"} object={data.skipColorCodes[4]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[5]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[17]} />
            <td
              style={{
                width: "5.08%",
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
                <span style={{ fontFamily: '"MS Gothic"' }}>☐</span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>35 CBM</span>
              </p>
            </td>

            <TableCheckBox type={"color"} object={data.skipColorCodes[5]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[6]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[18]} />
            <td
              style={{
                width: "5.08%",
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
                <span style={{ fontFamily: '"MS Gothic"' }}>☐</span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>45 CBM</span>
              </p>
            </td>

            <TableCheckBox type={"color"} object={data.skipColorCodes[6]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[7]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[19]} />
            <td
              style={{
                width: "5.08%",
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
                <span style={{ fontFamily: '"MS Gothic"' }}>☐</span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>3 TON</span>
              </p>
            </td>

            <TableCheckBox type={"color"} object={data.skipColorCodes[7]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[8]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[20]} />
            <td
              style={{
                width: "5.08%",
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
                <span style={{ fontFamily: '"MS Gothic"' }}>☐</span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                <span style={{ fontSize: 11, lineHeight: "106%" }}>7 TON</span>
              </p>
            </td>

            <TableCheckBox type={"color"} object={data.skipColorCodes[8]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[9]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[21]} />
            <td
              style={{
                width: "5.08%",
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
                <span style={{ fontFamily: '"MS Gothic"' }}>☒</span>
              </p>
            </td>
            <td
              style={{
                width: "13.84%",
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
                  Other (Specify)
                </span>
              </p>
            </td>
            <TableCheckBox type={"color"} object={data.skipColorCodes[9]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[10]} />
            <TableCheckBox type={"waste"} object={data.wasteTypes[22]} />

            <td
              colSpan={2}
              rowSpan={2}
              style={{
                width: "18.92%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>
                  {data.quantity} KILOGRAME
                </span>
              </p>
            </td>

            <TableCheckBox type={"color"} object={data.skipColorCodes[10]} />
          </tr>
          <tr>
            <TableCheckBox type={"waste"} object={data.wasteTypes[23]} />
          </tr>
          <tr>
            <td
              colSpan={9}
              style={{
                width: "94.06%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
                padding: "0cm 5.4pt 0cm 5.4pt",
              }}
            >
              <p
                style={{
                  margin: "0cm",
                  textAlign: "justify",
                  textIndent: "0cm",
                  fontSize: 16,
                  fontFamily: '"Times New Roman",serif',
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  GENERATOR'S CERTIFICATION: I hereby declare that the contents
                  of this consignment are fully and accurately described above
                  and are appropriately classified, packaged, and labelled in
                  accordance with the applicable laws and regulations of the
                  kingdom.
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#F7CAAC",
                padding: "0cm 5.4pt 0cm 5.4pt",
              }}
            >
              <p
                style={{
                  margin: "0cm",
                  textAlign: "justify",
                  textIndent: "0cm",
                  fontSize: 16,
                  fontFamily: '"Times New Roman",serif',
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  Authorized Representative
                </span>
              </p>
            </td>
            <td
              colSpan={7}
              style={{
                width: "68.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span style={{ fontSize: 8, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "1pt solid windowtext",
                borderRight: "1pt solid windowtext",
                background: "rgb(247, 202, 172)",
                padding: "0cm 5.4pt",
                verticalAlign: "top",
              }}
            >
              <p
                style={{
                  margin: "0cm",
                  textAlign: "left",
                  textIndent: "0cm",
                  fontSize: 16,
                  fontFamily: '"Times New Roman",serif',
                  // marginBottom: "8.0pt",

                }}
              >
                <span
                  style={{ fontSize: 13, lineHeight: "106%", color: "black" }}
                >
                  Sign / Stamp
                </span>
              </p>
            </td>
            <td
              colSpan={7}
              style={{
                width: "68.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span style={{ fontSize: 8, lineHeight: "106%" }}>&nbsp;</span>
              </p>

              <p
                style={{
                  margin: "0cm",
                  textAlign: "center",
                  textIndent: "0cm",
                  fontSize: 16,
                  fontFamily: '"Times New Roman",serif',
                  marginBottom: "8.0pt",
                  lineHeight: "106%",
                }}
              >
                <span style={{ fontSize: 8, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              rowSpan={6}
              style={{
                width: "5.94%",
                border: "solid windowtext 1.0pt",
                borderTop: "none",
                background: "#C5E0B3",
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
                  marginTop: "0cm",
                  marginRight: "5.65pt",
                  marginBottom: ".0001pt",
                  marginLeft: "5.65pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  TRANSPORTER
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              rowSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#C5E0B3",
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
                  paddingBottom: "12px"
                }}
              >
                <span style={{ fontSize: 12 }}>
                  Waste Transporter – Representative
                </span>
              </p>
            </td>
            <td
              colSpan={7}
              style={{
                width: "68.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
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
                  marginLeft: "16.05pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: "106%",
                    fontFamily: '"Segoe UI Symbol",sans-serif',
                    color: "black",
                  }}
                >
                  {data.driverName}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#C5E0B3",
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
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  Tel. No.
                </span>
              </p>
            </td>
            <td
              colSpan={7}
              style={{
                width: "68.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
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
                  marginLeft: "16.05pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: "106%",
                    fontFamily: '"Segoe UI Symbol",sans-serif',
                    color: "black",
                  }}
                >
                  {data.driverPhone}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#C5E0B3",
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
                  paddingBottom: "12px"

                }}
              >
                <span
                  style={{ fontSize: 12}}
                >
                  Company Name
                </span>
              </p>
            </td>
            <td
              colSpan={7}
              style={{
                width: "68.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
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
                  marginLeft: "16.05pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: "106%",
                    fontFamily: '"Segoe UI Symbol",sans-serif',
                    color: "black",
                  }}
                >
                  {data.currentCompanyName}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#C5E0B3",
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
                  paddingBottom: "12px"
                }}
              >
                <span
                  style={{ fontSize: 12}}
                >
                  Vehicle No.
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "24.64%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
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
                  marginLeft: "16.05pt",
                  lineHeight: "106%",
                }}
              >
                {data.vehicleLicensePlate}
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "18.92%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#C5E0B3",
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
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  Permit No.
                </span>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "24.66%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0cm 5.4pt 0cm 5.4pt",
              }}
            >
              {data.permitNo}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#C5E0B3",
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
                  paddingBottom: "12px"

                }}
              >
                <span
                  style={{ fontSize: 12}}
                >
                  Date
                </span>
              </p>
            </td>
            <td
              colSpan={7}
              style={{
                width: "68.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
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
                  marginLeft: "16.05pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: "106%",
                    fontFamily: '"Segoe UI Symbol",sans-serif',
                    color: "black",
                  }}
                >
                  {data.date}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                width: "25.84%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#C5E0B3",
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
                  paddingBottom: "12px"

                }}
              >
                <span
                  style={{ fontSize: 12 }}
                >
                  Sign / Stamp
                </span>
              </p>
            </td>
            <td
              colSpan={7}
              style={{
                width: "68.22%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              rowSpan={6}
              style={{
                width: "5.94%",
                border: "solid windowtext 1.0pt",
                borderTop: "none",
                background: "#BDD6EE",
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
                  marginTop: "0cm",
                  marginRight: "5.65pt",
                  marginBottom: ".0001pt",
                  marginLeft: "5.65pt",
                  lineHeight: "106%",
                }}
              >
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  RECEIVER
                </span>
              </p>
            </td>
            <td
              colSpan={3}
              style={{
                width: "30.9%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#BDD6EE",
                padding: "0cm 5.4pt 0cm 5.4pt",
              }}
            >
              <p
                style={{
                  margin: "0cm",
                  textAlign: "justify",
                  textIndent: "0cm",
                  fontSize: 16,
                  fontFamily: '"Times New Roman",serif',
                }}
              >
                <strong>
                  <span
                    style={{ fontSize: 12}}
                  >
                    Discrepancy Indication Space
                  </span>
                </strong>
              </p>
            </td>
            <td
              colSpan={6}
              style={{
                width: "63.16%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#BDD6EE",
                padding: "0cm 5.4pt 0cm 5.4pt",
              }}
            >
              <p
                style={{
                  margin: "0cm",
                  textAlign: "justify",
                  textIndent: "0cm",
                  fontSize: 16,
                  fontFamily: '"Times New Roman",serif',
                  lineHeight: "106%",
                }}
              >
                <strong>
                  <span
                    style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                  >
                    Waste Receiving Facility - Representative
                  </span>
                </strong>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              rowSpan={5}
              style={{
                width: "30.9%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
            <td
              colSpan={4}
              style={{
                width: "38.58%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#BDD6EE",
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
                  paddingBottom: "12px"
                }}
              >
                <span
                  style={{ fontSize: 12}}
                >
                  Facility Owner / Operator
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "24.56%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>
                  {data.companyName}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                width: "38.58%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#BDD6EE",
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
                  paddingTop: "2px"
                }}
              >
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  Designation
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "24.56%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                padding: "0cm 5.4pt 0cm 5.4pt",
              }}
            >
              <span
                style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
              >
                {data.designation}
              </span>
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                width: "38.58%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#BDD6EE",
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
                  paddingBottom: "12px"

                }}
              >
                <span
                  style={{ fontSize: 12, }}
                >
                  Facility Name
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "24.56%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>
                  {data.companyName}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                width: "38.58%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#BDD6EE",
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
                  paddingBottom: "12px"
                }}
              >
                <span
                  style={{ fontSize: 12}}
                >
                  Date
                </span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "24.56%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: "106%",
                    fontFamily: '"Segoe UI Symbol",sans-serif',
                    color: "black",
                  }}
                >
                  {data.recycleDate}
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                width: "38.58%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
                background: "#BDD6EE",
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
                <span
                  style={{ fontSize: 12, lineHeight: "106%", color: "black" }}
                >
                  Sign / Stamp
                </span>
              </p>
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
            <td
              colSpan={2}
              style={{
                width: "24.56%",
                borderTop: "none",
                borderLeft: "none",
                borderBottom: "solid windowtext 1.0pt",
                borderRight: "solid windowtext 1.0pt",
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
                <span style={{ fontSize: 12, lineHeight: "106%" }}>&nbsp;</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
            <td style={{ border: "none" }}>
              <br />
            </td>
          </tr>
        </tbody>
      </table>
      <p
        dir="RTL"
        style={{
          margin: "0cm",
          textAlign: "justify",
          textIndent: "0cm",
          fontSize: 16,
          fontFamily: '"Times New Roman",serif',
        }}
      >
        <span dir="LTR">&nbsp;</span>
      </p>
      <p
        dir="RTL"
        style={{
          margin: "0cm",
          textAlign: "justify",
          textIndent: "0cm",
          fontSize: 16,
          fontFamily: '"Times New Roman",serif',
        }}
      >
        <span dir="LTR">&nbsp;</span>
      </p>
    </div>
  );
};

export default ManifestTemplate;
