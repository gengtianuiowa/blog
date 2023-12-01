import React from 'react';
import { Image } from 'antd';
import img1 from "../../public/images/projects/immuseai_1.png";
import img2 from "../../public/images/projects/immuseai_2.png";
import img3 from "../../public/images/projects/immuseai_3.png";

export default () => {
  return (
    <div>
      <div style={{
        width: "100%", alignItems: "center", display: "flex",
        justifyContent: "center", marginBottom: "15px"
      }}>
        <Image src={img1} width={400} style={{
          marginRight: "10px"
        }}></Image>
        <Image src={img2} width={400}></Image>
      </div>
      <div style={{
        width: "100%", alignItems: "center", display: "flex",
        justifyContent: "center",
      }}>
        <Image src={img3} width={400}></Image>
      </div>
    </div>
  );
};
