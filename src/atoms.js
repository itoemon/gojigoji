import { atom, selector } from "recoil";

export const counterState = atom({
  key: 'counterState',
  default:
  {
    count: 0,
  }
})

export const propertiesState = atom({
  key: 'propertiesState',
  default:{
    property001 : {
      basicInfo: {
        name: "物件１",
        imgUrl: `${process.env.PUBLIC_URL}/imgs/background_img.jpg`
      },
      roomsInfo : [
        {
          roomId : "101",
          rent: "7,1000",
          floorImg: ``,
        },
        {
          roomId : "202",
          rent: "7,1000",
          floorImg: ``,
        },
      ],
    },


  }
})