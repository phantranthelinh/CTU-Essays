import Resizer from "react-image-file-resizer";
const resizeFile = (file, maxwidth, maxheight) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxwidth,
      maxheight,
      "PNG",
      0,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export { resizeFile };