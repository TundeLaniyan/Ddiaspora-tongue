import * as images from '../assets/images';
import * as assetImages from '../assets';
import React, { ReactElement } from 'react';
import toCamelcase from './toCamelcase';
// import { Image } from 'react-native';

const defaultImage = images['answer'];

const imageSource = (url: string): any => {
  return images[toCamelcase(url)] || defaultImage
}

export const assetImage = (url: string): any => {
  return assetImages[toCamelcase(url)] || defaultImage
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