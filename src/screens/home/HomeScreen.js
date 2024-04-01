import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import Camera from '../../components/camera';

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("text");

  const [image, setImage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("chooseImg");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if(!selectedImage) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(selectedImage);
    console.log(data)
    setTextResult(data.text);
  }, [worker, selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText])

  const handleChangeImage = e => {
    if(e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("có khongho")
    }
  }

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setImgAfterCrop(selectedImg);
    setCurrentMenu("cropImg");
  };
  const onCancelCam = (selectedImg) => {
    setImage(selectedImg);
    setImgAfterCrop(selectedImg);
    setCurrentMenu("chooseImg");
  };
  const onCropDone = (imgCroppedArea) => {
    // closeModal();

    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    if (context) {
      const imageObj1 = new Image();
      imageObj1.src = image;
      imageObj1.onload = function () {
        context.drawImage(
          imageObj1,
          imgCroppedArea.x,
          imgCroppedArea.y,
          imgCroppedArea.width,
          imgCroppedArea.height,
          0,
          0,
          imgCroppedArea.width,
          imgCroppedArea.height
        );
        const dataURL = canvasEle.toDataURL("image/jpeg");
        setImgAfterCrop(dataURL);
        console.log(dataURL);
        setCurrentMenu("imgCropped");
      };
    }
  };
  const onCropCancel = () => {
    setModalIsOpen(false);
  };




  return (
    <div className="App">


<div className="  flex flex-row   justify-center mb-14 md:mb-14  ">
                  {currentMenu === "chooseImg" ? (
                    // <div className=" reviewImg">
                    <div
                      className={`cropped-img NoneImg grid  flex  content-around md:py-5 lg:py-5 xl:py-5  `}
                    >
                      <div
                        className={`row-span-2 uploadView  `}
                      >
                        <p
                          className={` `}
                        >
                        
                          Camera{" "}
                        </p>
                        <p
                         
                        >
                          {" "}
                          OR
                        </p>
                        <p
                          className={``}
                        >
                          Upload an Image{" "}
                        </p>
                      </div>
                      <div className="justify-center">
                        <button
                          className="btn rounded-xl px-4 py-2 bg-purple-600 text-white "
                          onClick={() => setCurrentMenu("Camera")}
                        >
                          Camera
                        </button>
                      </div>
                      <div>
                        {/* <FileInput onImageSelected={onImageSelected} /> */}
                      </div>
                    </div>
                  ) : currentMenu === "Camera" ? (
                    <Camera
                      onCancelCam={onCancelCam}
                      onImageSelected={onImageSelected}
                    />
                  ) : (
                    <div className="  px-0 mx-0 cropped-img">
                      <img src={imgAfterCrop} className="aspect-square" />

                      <div className="grid grid-cols-2 ">
                        <button
                          onClick={() => {
                            setCurrentMenu("chooseImg");
                            setImage("");
                            // closeModal();
                          }}
                          className={` text-red-700 btn border items-center flex text-center justify-center   text-3xl p-2`}
                        >
                          {/* <FaRegTrashAlt /> */} CHs
                        </button>
                        <button
                          onClick={() => {
                            setCurrentMenu("cropImg");
                            // openModal();
                          }}
                          className={` text-green-500  btn  border  items-center flex text-center justify-center  text-3xl p-2`}
                        >
                          {/* <MdEditSquare /> */}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
      <h1>ImText</h1>
      <p>Gets words in image!</p>
      <div className="input-wrapper">
        <label htmlFor="upload">Upload Image</label>
        <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
      </div>

      <div className="result">
        {selectedImage && (
          <div className="box-image">
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
          </div>
        )}
        {textResult && (
          <div className="box-p">
            <p>{textResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
