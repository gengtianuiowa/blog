import React from 'react';
import { Image } from 'antd';
// @ts-ignore
import img1 from "../../public/images/projects/flowmapper_1.png";
// @ts-ignore
import img2 from "../../public/images/projects/flowmapper_2.png";
// @ts-ignore
import img3 from "../../public/images/projects/flowmapper_3.png";
// @ts-ignore
import img4 from "../../public/images/projects/flowmapper_4.png";

export default () => {
  return (
    <div>
      <div style={{
        width: "100%", alignItems: "center", display: "flex",
        justifyContent: "center", marginBottom: "15px"
      }}>
        <Image src={img2} width={400} style={{
          marginRight: "10px"
        }}></Image>
        <Image src={img1} width={400}></Image>
      </div>
      <div style={{
        width: "100%", alignItems: "center", display: "flex",
        justifyContent: "center", marginBottom: "15px"
      }}>
        <Image src={img3} width={400} style={{
          marginRight: "10px"
        }}></Image>
        <Image src={img4} width={400}></Image>
      </div>
    </div>
  );
};
