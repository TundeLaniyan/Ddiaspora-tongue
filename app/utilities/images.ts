import images from '../assets/images';
import assetImages from '../assets';
import React, { ReactElement } from 'react';
import { Image } from 'react-native';

const defaultImage = images['ablution'];

const imageSource = (url: string): any => {
  return images[url.toLowerCase()] || defaultImage
}

export const assetImage = (url: string): any => {
  return assetImages[url.toLowerCase()] || defaultImage
}

// export const Imagea = (url: string): any => {
//   const ImageSource = imageSource(url);
//   return function(props: any): ReactElement<any> { 
//     if (typeof ImageSource === "number") {
//       return <Image source={ImageSource} {...props} />; 
//     } else {
//       return <ImageSource {...props} /> 
//     }
//   }
// }

// export const Imagea = (url: string): any => {
//   const ImageSource = imageSource(url);
//   return function(props: any): ReactElement<any> { 
//     return (
//       // <>
//         {
//           typeof ImageSource === "number" ? 
//             <Image source={ImageSource} {...props} /> : 
//             <ImageSource {...props} />
//         }
//       // </>
//     )
//   }
// }




export default imageSource;