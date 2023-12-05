import Resizer from "react-image-file-resizer";

const resizeFile = (files) =>
  files.map(
    (file) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "file"
        );
      })
  );

export default resizeFile