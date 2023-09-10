export default function cloudinaryLoader({ src, width, quality }) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

  const splitedImgUrl = src.split('upload/');

  return `${splitedImgUrl[0]}upload/${params.join(',')}/${splitedImgUrl[1]}`;
}
