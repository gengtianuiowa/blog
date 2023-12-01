import React from 'react';
import { Image } from 'antd';
// @ts-ignore
import img1 from "../../public/images/projects/ArcEngine.png";

export default () => {
  return (
    <div>
      <div style={{
        width: "100%", alignItems: "center", display: "flex",
        justifyContent: "center", marginBottom: "15px"
      }}>
        <Image src={img1} width={400} style={{
          marginRight: "10px"
        }}/>
      </div>
    </div>
  );
};
